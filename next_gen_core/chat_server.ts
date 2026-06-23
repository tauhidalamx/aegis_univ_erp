export interface ChatMessage {
  id: string;
  chatId: string;
  senderId: string;
  content: string;
  timestamp: string;
  attachments?: string[];
}

export interface UserPresence {
  userId: string;
  status: 'online' | 'offline' | 'away';
  lastSeen: string;
}

export class ClusteredChatGateway {
  // Simulated Redis Client for Pub/Sub and Presence storage
  private static redisPubSub = new Map<string, Array<(msg: string) => void>>();
  private static presenceStore = new Map<string, UserPresence>();
  private static writeBehindQueue: ChatMessage[] = []; // Write-behind queue

  /**
   * 1. Dynamic User Connection presence mapping (Simulating Redis HSET)
   */
  public static onUserConnect(userId: string) {
    const presence: UserPresence = {
      userId,
      status: 'online',
      lastSeen: new Date().toISOString()
    };
    ClusteredChatGateway.presenceStore.set(`presence:${userId}`, presence);
    
    // Broadcast status change across cluster pods using Redis Pub/Sub
    ClusteredChatGateway.publishRedis('presence_channel', JSON.stringify({
      type: 'presence_change',
      userId,
      status: 'online'
    }));
  }

  public static onUserDisconnect(userId: string) {
    const presence: UserPresence = {
      userId,
      status: 'offline',
      lastSeen: new Date().toISOString()
    };
    ClusteredChatGateway.presenceStore.set(`presence:${userId}`, presence);

    ClusteredChatGateway.publishRedis('presence_channel', JSON.stringify({
      type: 'presence_change',
      userId,
      status: 'offline'
    }));
  }

  /**
   * 2. Message Dispatcher & Redis PubSub Coordination
   */
  public static handleIncomingMessage(
    chatId: string, 
    senderId: string, 
    content: string, 
    attachments?: string[]
  ): ChatMessage {
    const message: ChatMessage = {
      id: `msg_${Math.random().toString(36).substr(2, 9)}`,
      chatId,
      senderId,
      content,
      timestamp: new Date().toISOString(),
      attachments
    };

    // 1. Publish to Redis Pub/Sub (Socket.IO adapter layer distributes to other pods)
    ClusteredChatGateway.publishRedis(`chat:${chatId}`, JSON.stringify(message));

    // 2. Add to Write-Behind Batching Queue for database persistence throttling
    ClusteredChatGateway.writeBehindQueue.push(message);
    if (ClusteredChatGateway.writeBehindQueue.length >= 10) {
      ClusteredChatGateway.flushMessagesToDatabase();
    }

    return message;
  }

  /**
   * 3. Batching Write-Behind Flush Process
   */
  public static flushMessagesToDatabase(): number {
    const batchSize = ClusteredChatGateway.writeBehindQueue.length;
    if (batchSize === 0) return 0;

    const messagesToSave = [...ClusteredChatGateway.writeBehindQueue];
    ClusteredChatGateway.writeBehindQueue = [];

    // Simulate bulk DB write transaction block
    console.log(`[WRITE-BEHIND] Persisted ${batchSize} chat messages to database cluster.`);
    return batchSize;
  }

  /**
   * 4. Multi-Tenant Room Join Verification
   */
  public static verifyRoomAccess(userId: string, role: string, chatId: string, tenantId: string): boolean {
    // Standard Class/Department groups security check
    if (chatId.startsWith('dept_')) {
      const allowedDepts = ['CS', 'EE', 'ME'];
      const targetDept = chatId.split('_')[1];
      return allowedDepts.includes(targetDept) && ['admin', 'hod', 'faculty'].includes(role);
    }
    return true;
  }

  // Redis Simulation Drivers
  private static publishRedis(channel: string, message: string) {
    const subscribers = ClusteredChatGateway.redisPubSub.get(channel) || [];
    subscribers.forEach(sub => sub(message));
  }

  public static subscribeRedis(channel: string, listener: (msg: string) => void) {
    const subscribers = ClusteredChatGateway.redisPubSub.get(channel) || [];
    subscribers.push(listener);
    ClusteredChatGateway.redisPubSub.set(channel, subscribers);
  }

  public static getUserPresence(userId: string): UserPresence | null {
    return ClusteredChatGateway.presenceStore.get(`presence:${userId}`) || null;
  }
}
