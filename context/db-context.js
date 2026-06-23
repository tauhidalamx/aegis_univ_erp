'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

const DbContext = createContext(null);

export function DbProvider({ children }) {
  const [students, setStudents] = useState([]);
  const [faculty, setFaculty] = useState([]);
  const [courses, setCourses] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [exams, setExams] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [activities, setActivities] = useState([]);
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    const loadDbData = () => {
      const db = window.UniversityDB;
      if (db) {
        setStudents([...db.getStudents()]);
        setFaculty([...db.getFaculty()]);
        setCourses([...db.getCourses()]);
        setTransactions([...db.getTransactions()]);
        setExams([...db.getExams()]);
        setAnnouncements([...db.getAnnouncements()]);
        setActivities([...db.getActivities()]);
        setDepartments([...db.getDepartments()]);
        return true;
      }
      return false;
    };

    if (typeof window !== 'undefined') {
      if (!loadDbData()) {
        const interval = setInterval(() => {
          if (loadDbData()) {
            clearInterval(interval);
          }
        }, 100);
        return () => clearInterval(interval);
      }
    }
  }, []);

  const addStudent = (stu) => {
    setStudents(prev => {
      const next = [...prev, stu];
      if (typeof window !== 'undefined' && window.UniversityDB) {
        window.UniversityDB.addStudent(stu);
      }
      return next;
    });
  };

  const updateStudent = (id, updatedData) => {
    setStudents(prev => {
      const next = prev.map(s => s.id === id ? { ...s, ...updatedData } : s);
      if (typeof window !== 'undefined' && window.UniversityDB) {
        window.UniversityDB.updateStudent(id, updatedData);
      }
      return next;
    });
  };

  const deleteStudent = (id) => {
    setStudents(prev => {
      const next = prev.filter(s => s.id !== id);
      if (typeof window !== 'undefined' && window.UniversityDB) {
        window.UniversityDB.deleteStudent(id);
      }
      return next;
    });
  };

  const addTransaction = (tx) => {
    setTransactions(prev => {
      const next = [tx, ...prev];
      if (typeof window !== 'undefined' && window.UniversityDB) {
        window.UniversityDB.addTransaction(tx);
      }
      return next;
    });
  };

  const addAnnouncement = (ann) => {
    setAnnouncements(prev => {
      const next = [ann, ...prev];
      if (typeof window !== 'undefined' && window.UniversityDB) {
        window.UniversityDB.addAnnouncement(ann);
      }
      return next;
    });
  };

  const deleteAnnouncement = (id) => {
    setAnnouncements(prev => {
      const next = prev.filter(a => a.id !== id);
      if (typeof window !== 'undefined' && window.UniversityDB) {
        const list = window.UniversityDB.getAnnouncements();
        const idx = list.findIndex(ann => ann.id === id);
        if (idx !== -1) {
          list.splice(idx, 1);
        }
      }
      return next;
    });
  };

  return (
    <DbContext.Provider value={{
      students,
      faculty,
      courses,
      transactions,
      exams,
      announcements,
      activities,
      departments,
      addStudent,
      updateStudent,
      deleteStudent,
      addTransaction,
      addAnnouncement,
      deleteAnnouncement
    }}>
      {children}
    </DbContext.Provider>
  );
}

export function useDb() {
  return useContext(DbContext);
}
