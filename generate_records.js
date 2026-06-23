const fs = require('fs');
const path = require('path');

// 1. Helper to hash password matching the client-side implementation
function _hashPassword(plain) {
  var hash = 0;
  for (var i = 0; i < plain.length; i++) {
    var ch = plain.charCodeAt(i);
    hash = ((hash << 5) - hash) + ch;
    hash |= 0; // Convert to 32-bit integer
  }
  return 'h$' + Math.abs(hash).toString(36);
}

// 2. Load UniversityDB by mocking global window object
global.window = {};
const dataPath = path.join(__dirname, 'js', 'data.js');
if (!fs.existsSync(dataPath)) {
  console.error("Error: Could not find js/data.js");
  process.exit(1);
}
require(dataPath);

const faculty = global.window.UniversityDB.getFaculty();
const students = global.window.UniversityDB.getStudents();

// 3. Generate Accounts
const defaultAccounts = [
  {
    "id": "usr_001",
    "name": "Dr. Evelyn Sterling",
    "email": "admin@aegis.edu",
    "password": _hashPassword("admin123"),
    "role": "admin",
    "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
    "createdAt": "2024-01-01T00:00:00.000Z"
  },
  {
    "id": "usr_002",
    "name": "Prof. Marcus Chen",
    "email": "faculty@aegis.edu",
    "password": _hashPassword("faculty123"),
    "role": "faculty",
    "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
    "createdAt": "2024-01-15T00:00:00.000Z"
  },
  {
    "id": "usr_003",
    "name": "Aria Nakamura",
    "email": "student@aegis.edu",
    "password": _hashPassword("student123"),
    "role": "student",
    "avatar": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
    "createdAt": "2024-02-01T00:00:00.000Z"
  },
  {
    "id": "usr_004",
    "name": "Prof. Sarah Jenkins",
    "email": "hod@aegis.edu",
    "password": _hashPassword("hod123"),
    "role": "hod",
    "avatar": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150",
    "createdAt": "2024-01-20T00:00:00.000Z"
  }
];

const facultyRegistry = [];
const studentRegistry = [];

// Process Faculty
faculty.forEach(fac => {
  const parts = fac.name.trim().split(/\s+/);
  const lastName = parts[parts.length - 1];
  const cleanLastName = lastName.replace(/[^a-zA-Z0-9]/g, '');
  const plainPassword = `${cleanLastName}@${fac.id}`;
  const hashedPassword = _hashPassword(plainPassword);

  defaultAccounts.push({
    "id": `usr_${fac.id.toLowerCase()}`,
    "name": fac.name,
    "email": fac.email,
    "password": hashedPassword,
    "role": "faculty",
    "avatar": fac.avatar || "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
    "createdAt": "2026-06-08T10:38:14.513Z"
  });

  facultyRegistry.push({
    id: fac.id,
    name: fac.name,
    email: fac.email,
    password: plainPassword
  });
});

// Process Students
students.forEach(stu => {
  const parts = stu.name.trim().split(/\s+/);
  const firstName = parts[0];
  const cleanFirstName = firstName.replace(/[^a-zA-Z0-9]/g, '');
  const plainPassword = `${cleanFirstName}@${stu.id}`;
  const hashedPassword = _hashPassword(plainPassword);

  defaultAccounts.push({
    "id": `usr_${stu.id.toLowerCase()}`,
    "name": stu.name,
    "email": stu.email,
    "password": hashedPassword,
    "role": "student",
    "avatar": stu.avatar || "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150",
    "createdAt": "2026-06-08T10:38:14.514Z"
  });

  studentRegistry.push({
    id: stu.id,
    name: stu.name,
    email: stu.email,
    password: plainPassword
  });
});

// 4. Generate authentication.txt content
let txtContent = `================================================================================
AEGIS UNIVERSITY ERP - AUTHENTICATION REGISTRY
================================================================================

This file contains the email (user ID) and password credentials for all accounts 
pre-registered in the Aegis University ERP platform.

--------------------------------------------------------------------------------
1. DEFAULT DEMO ACCOUNTS
--------------------------------------------------------------------------------
Role: Administrator
Name: Dr. Evelyn Sterling
User ID (Email): admin@aegis.edu
Password: admin123

Role: Faculty Member
Name: Prof. Marcus Chen
User ID (Email): faculty@aegis.edu
Password: faculty123

Role: HOD (Department Head)
Name: Prof. Sarah Jenkins
User ID (Email): hod@aegis.edu
Password: hod123

Role: Student
Name: Aria Nakamura
User ID (Email): student@aegis.edu
Password: student123


--------------------------------------------------------------------------------
2. FACULTY ACCOUNTS (Total: ${facultyRegistry.length})
--------------------------------------------------------------------------------
`;

facultyRegistry.forEach(fac => {
  txtContent += `ID: ${fac.id}
Name: ${fac.name}
User ID (Email): ${fac.email}
Password: ${fac.password}
--------------------------------------------------\n`;
});

txtContent += `\n--------------------------------------------------------------------------------
3. STUDENT ACCOUNTS (Total: ${studentRegistry.length})
--------------------------------------------------------------------------------
`;

studentRegistry.forEach(stu => {
  txtContent += `ID: ${stu.id}
Name: ${stu.name}
User ID (Email): ${stu.email}
Password: ${stu.password}
--------------------------------------------------\n`;
});

// Save authentication.txt
const authTxtPath = path.join(__dirname, 'authentication.txt');
fs.writeFileSync(authTxtPath, txtContent, 'utf8');
console.log(`Successfully generated and saved ${authTxtPath}`);

// 5. Update js/auth.js
const authJsPath = path.join(__dirname, 'js', 'auth.js');
if (fs.existsSync(authJsPath)) {
  let authJsContent = fs.readFileSync(authJsPath, 'utf8');
  
  // Locate the DEFAULT_ACCOUNTS declaration block
  const startMarker = '  const DEFAULT_ACCOUNTS = [';
  const startIndex = authJsContent.indexOf(startMarker);
  
  if (startIndex !== -1) {
    const endMatch = authJsContent.substring(startIndex).match(/\r?\n\s*\];/);
    if (endMatch) {
      const endIndex = startIndex + endMatch.index + endMatch[0].length;
      
      // Generate formatted JSON
      const accountsJson = JSON.stringify(defaultAccounts, null, 2);
      
      // Indent each line of the JSON to match formatting
      const indentedJson = accountsJson
        .split('\n')
        .map((line, idx) => {
          if (idx === 0) return line;
          return '  ' + line;
        })
        .join('\n');
        
      const newContent = authJsContent.substring(0, startIndex + '  const DEFAULT_ACCOUNTS = '.length) +
                         indentedJson +
                         ';' +
                         authJsContent.substring(endIndex);
                         
      fs.writeFileSync(authJsPath, newContent, 'utf8');
      console.log(`Successfully updated ${authJsPath} with ${defaultAccounts.length} accounts.`);
    } else {
      console.error("Warning: Could not find matching closing array marker in js/auth.js");
    }
  } else {
    console.error("Warning: Could not find DEFAULT_ACCOUNTS array declaration in js/auth.js");
  }
} else {
  console.error("Error: Could not find js/auth.js to update.");
}
