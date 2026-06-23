import { EventEmitter } from 'events';

export interface CloudEvent<T = any> {
  id: string;
  source: string;
  type: string;
  specversion: string;
  datacontenttype: string;
  data: T;
  time: string;
  tenantId: string;
}

export interface StudentCreatedPayload {
  studentId: string;
  name: string;
  email: string;
  dept: string;
}

export interface AttendanceMarkedPayload {
  studentId: string;
  courseCode: string;
  status: 'Present' | 'Absent';
  timestamp: string;
}

export class KafkaEventMesh extends EventEmitter {
  private static instance: KafkaEventMesh;
  private auditLogs: string[] = [];
  private dlqStorage: CloudEvent[] = [];

  private constructor() {
    super();
    this.setupRetryQueues();
  }

  public static getInstance(): KafkaEventMesh {
    if (!KafkaEventMesh.instance) {
      KafkaEventMesh.instance = new KafkaEventMesh();
    }
    return KafkaEventMesh.instance;
  }

  /**
   * 1. Register base topics and bind retry hooks
   */
  private setupRetryQueues() {
    // Audit listener
    this.on('*', (topic: string, event: CloudEvent) => {
      this.auditLogs.push(`[AUDIT] [${event.time}] Topic: ${topic} | Tenant: ${event.tenantId} | Event ID: ${event.id}`);
    });

    // Dead letter handler
    this.on('dlq.events', (event: CloudEvent) => {
      console.error(`🚨 [DLQ EXHAUSTED] Event: ${event.type} Routing to DLQ. ID: ${event.id}`);
      this.dlqStorage.push(event);
    });
  }

  /**
   * 2. Transactional Event Publisher with Partition Routing
   */
  public async publish(topic: string, event: CloudEvent): Promise<boolean> {
    try {
      // Kafka partition selection simulation (hashed by tenantId for strict sequencing)
      const partition = this.selectPartition(event.tenantId, 12);
      
      this.emit('*', topic, event); // Push to audit streams
      
      // Simulate asynchronous broker write
      setTimeout(() => {
        this.emit(topic, event, partition);
      }, 50);

      return true;
    } catch (err) {
      console.error(`Failed to publish event to topic ${topic}`, err);
      // Failover to retry logic
      this.emit('retry.' + topic, event, 1);
      return false;
    }
  }

  /**
   * 3. Consumer Subscription with Resilience/Retry Pipeline
   */
  public subscribe(topic: string, consumerGroup: string, handler: (event: CloudEvent) => Promise<void>) {
    this.on(topic, async (event: CloudEvent, partition: number) => {
      try {
        // Run consumer business logic
        await handler(event);
      } catch (err: any) {
        console.warn(`[RETRY QUEUE] Consumer ${consumerGroup} failed on topic: ${topic}. Error: ${err.message}`);
        this.routeToRetry(topic, event, 1, handler);
      }
    });
  }

  /**
   * 4. Multi-level Delay Retries & DLQ Routing
   */
  private routeToRetry(originalTopic: string, event: CloudEvent, attempt: number, handler: (event: CloudEvent) => Promise<void>) {
    const maxAttempts = 3;
    if (attempt > maxAttempts) {
      this.emit('dlq.events', event);
      return;
    }

    const retryDelay = Math.pow(2, attempt) * 100; // Exponential backoff: 200ms, 400ms, 800ms
    console.log(`[RETRY] Attempt ${attempt} scheduled in ${retryDelay}ms for Event: ${event.type}`);

    setTimeout(async () => {
      try {
        await handler(event);
        console.log(`✓ [RETRY SUCCESS] Event ${event.id} processed successfully on attempt ${attempt}`);
      } catch (err) {
        this.routeToRetry(originalTopic, event, attempt + 1, handler);
      }
    }, retryDelay);
  }

  private selectPartition(key: string, partitionsCount: number): number {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash = key.charCodeAt(i) + ((hash << 5) - hash);
    }
    return Math.abs(hash % partitionsCount);
  }

  // Debug methods
  public getAuditTrail(): string[] {
    return this.auditLogs;
  }

  public getDlqRecords(): CloudEvent[] {
    return this.dlqStorage;
  }
}

/**
 * 5. Event Sourced Domain Aggregate Root base class
 */
export abstract class AggregateRoot {
  private baseVersion: number = 0;
  private uncommittedEvents: CloudEvent[] = [];

  public getVersion(): number {
    return this.baseVersion;
  }

  public getUncommittedEvents(): CloudEvent[] {
    return this.uncommittedEvents;
  }

  public clearUncommittedEvents() {
    this.uncommittedEvents = [];
  }

  protected applyChange(event: CloudEvent, isNew: boolean = true) {
    this.apply(event);
    if (isNew) {
      this.uncommittedEvents.push(event);
      this.baseVersion++;
    }
  }

  public loadFromHistory(history: CloudEvent[]) {
    history.forEach(event => {
      this.apply(event);
      this.baseVersion = event.data.version || this.baseVersion;
    });
  }

  protected abstract apply(event: CloudEvent): void;
}
