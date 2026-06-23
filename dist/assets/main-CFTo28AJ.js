import"./main-C5NvtwyE.js";import"./auth-DNlBkgZX.js";window.UniversityDB=(function(){let e=[{code:`CS`,name:`Computer Science & Engineering`,hod:`Dr. Evelyn Sterling`,facultyCount:7,studentCount:10,budget:45e4,color:`var(--primary)`},{code:`EE`,name:`Electrical & Electronics Engineering`,hod:`Dr. Marcus Vance`,facultyCount:7,studentCount:7,budget:38e4,color:`var(--accent-cyan)`},{code:`ME`,name:`Mechanical Engineering`,hod:`Dr. Sarah Connor`,facultyCount:5,studentCount:7,budget:32e4,color:`var(--accent-amber)`},{code:`BI`,name:`Bioinformatics & Genetics`,hod:`Dr. Raymond Park`,facultyCount:4,studentCount:7,budget:28e4,color:`var(--accent-emerald)`},{code:`BA`,name:`Business Administration`,hod:`Dr. Helena Rostova`,facultyCount:4,studentCount:6,budget:3e5,color:`var(--accent-ruby)`}],t=[{id:`FAC001`,name:`Dr. Evelyn Sterling`,email:`evelyn.sterling@modeluni.edu`,dept:`CS`,designation:`Professor`,workload:12,courses:[`CS101`,`CS302`],avatar:`https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150`},{id:`FAC002`,name:`Dr. Marcus Vance`,email:`marcus.vance@modeluni.edu`,dept:`EE`,designation:`Professor`,workload:15,courses:[`EE201`,`EE405`],avatar:`https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150`},{id:`FAC003`,name:`Dr. Sarah Connor`,email:`sarah.connor@modeluni.edu`,dept:`ME`,designation:`Professor`,workload:9,courses:[`ME102`],avatar:`https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150`},{id:`FAC004`,name:`Dr. Raymond Park`,email:`raymond.park@modeluni.edu`,dept:`BI`,designation:`Associate Professor`,workload:12,courses:[`BI101`,`BI304`],avatar:`https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150`},{id:`FAC005`,name:`Dr. Helena Rostova`,email:`helena.rostova@modeluni.edu`,dept:`BA`,designation:`Professor`,workload:15,courses:[`BA201`,`BA410`],avatar:`https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150`},{id:`FAC006`,name:`Prof. Alan Turing`,email:`alan.turing@modeluni.edu`,dept:`CS`,designation:`Assistant Professor`,workload:18,courses:[`CS202`,`CS401`],avatar:`https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150`},{id:`FAC007`,name:`Dr. Ada Lovelace`,email:`ada.lovelace@modeluni.edu`,dept:`CS`,designation:`Associate Professor`,workload:12,courses:[`CS305`],avatar:`https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150`},{id:`FAC008`,name:`Prof. Nikola Tesla`,email:`nikola.tesla@modeluni.edu`,dept:`EE`,designation:`Assistant Professor`,workload:15,courses:[`EE101`,`EE302`],avatar:`https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150`},{id:`FAC009`,name:`Dr. Richard Feynman`,email:`richard.feynman@modeluni.edu`,dept:`EE`,designation:`Professor`,workload:6,courses:[`EE305`],avatar:`https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150`},{id:`FAC010`,name:`Dr. Grace Hopper`,email:`gracehopper@modeluni.edu`,dept:`CS`,designation:`Professor`,workload:8,courses:[`CS101`],avatar:`https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150`},{id:`FAC011`,name:`Dr. Claude Shannon`,email:`claudeshannon@modeluni.edu`,dept:`EE`,designation:`Associate Professor`,workload:13,courses:[`EE101`],avatar:`https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150`},{id:`FAC012`,name:`Dr. Barbara Liskov`,email:`barbaraliskov@modeluni.edu`,dept:`ME`,designation:`Assistant Professor`,workload:16,courses:[`ME102`],avatar:`https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150`},{id:`FAC013`,name:`Dr. Donald Knuth`,email:`donaldknuth@modeluni.edu`,dept:`BI`,designation:`Professor`,workload:10,courses:[`BI101`],avatar:`https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150`},{id:`FAC014`,name:`Dr. Tim Berners-Lee`,email:`timbernerslee@modeluni.edu`,dept:`BA`,designation:`Associate Professor`,workload:12,courses:[`BA201`],avatar:`https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150`},{id:`FAC015`,name:`Dr. Margaret Hamilton`,email:`margarethamilton@modeluni.edu`,dept:`CS`,designation:`Assistant Professor`,workload:10,courses:[`CS101`],avatar:`https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150`},{id:`FAC016`,name:`Dr. Linus Torvalds`,email:`linustorvalds@modeluni.edu`,dept:`EE`,designation:`Professor`,workload:18,courses:[`EE101`],avatar:`https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150`},{id:`FAC017`,name:`Dr. Katherine Johnson`,email:`katherinejohnson@modeluni.edu`,dept:`ME`,designation:`Associate Professor`,workload:13,courses:[`ME102`],avatar:`https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150`},{id:`FAC018`,name:`Dr. Dorothy Vaughan`,email:`dorothyvaughan@modeluni.edu`,dept:`BI`,designation:`Assistant Professor`,workload:13,courses:[`BI101`],avatar:`https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150`},{id:`FAC019`,name:`Dr. Mary Jackson`,email:`maryjackson@modeluni.edu`,dept:`BA`,designation:`Professor`,workload:10,courses:[`BA201`],avatar:`https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150`},{id:`FAC020`,name:`Dr. Wernher von Braun`,email:`wernhervon@modeluni.edu`,dept:`CS`,designation:`Associate Professor`,workload:9,courses:[`CS101`],avatar:`https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150`},{id:`FAC021`,name:`Dr. Robert Oppenheimer`,email:`robertoppenheimer@modeluni.edu`,dept:`EE`,designation:`Assistant Professor`,workload:16,courses:[`EE101`],avatar:`https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150`},{id:`FAC022`,name:`Dr. Marie Curie`,email:`mariecurie@modeluni.edu`,dept:`ME`,designation:`Professor`,workload:17,courses:[`ME102`],avatar:`https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=150`},{id:`FAC023`,name:`Dr. Albert Einstein`,email:`alberteinstein@modeluni.edu`,dept:`BI`,designation:`Associate Professor`,workload:12,courses:[`BI101`],avatar:`https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150`},{id:`FAC024`,name:`Dr. Niels Bohr`,email:`nielsbohr@modeluni.edu`,dept:`BA`,designation:`Assistant Professor`,workload:10,courses:[`BA201`],avatar:`https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?w=150`},{id:`FAC025`,name:`Dr. Stephen Hawking`,email:`stephenhawking@modeluni.edu`,dept:`CS`,designation:`Professor`,workload:10,courses:[`CS101`],avatar:`https://images.unsplash.com/photo-1527983359383-4758693f760c?w=150`},{id:`FAC026`,name:`Dr. Rosalind Franklin`,email:`rosalindfranklin@modeluni.edu`,dept:`EE`,designation:`Associate Professor`,workload:10,courses:[`EE101`],avatar:`https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=150`},{id:`FAC027`,name:`Dr. Rachel Carson`,email:`rachelcarson@modeluni.edu`,dept:`ME`,designation:`Assistant Professor`,workload:11,courses:[`ME102`],avatar:`https://images.unsplash.com/photo-1554151228-14d9def656e4?w=150`}],n=[{code:`CS101`,title:`Introduction to Programming`,dept:`CS`,credits:4,facultyId:`FAC001`,maxEnrollment:120,enrolledCount:110,status:`Active`},{code:`CS202`,title:`Data Structures & Algorithms`,dept:`CS`,credits:4,facultyId:`FAC006`,maxEnrollment:80,enrolledCount:78,status:`Active`},{code:`CS302`,title:`Database Management Systems`,dept:`CS`,credits:3,facultyId:`FAC001`,maxEnrollment:90,enrolledCount:88,status:`Active`},{code:`CS305`,title:`Software Engineering`,dept:`CS`,credits:3,facultyId:`FAC007`,maxEnrollment:80,enrolledCount:75,status:`Active`},{code:`CS401`,title:`Artificial Intelligence & ML`,dept:`CS`,credits:4,facultyId:`FAC006`,maxEnrollment:50,enrolledCount:49,status:`Active`},{code:`EE101`,title:`Basic Electrical Sciences`,dept:`EE`,credits:3,facultyId:`FAC008`,maxEnrollment:100,enrolledCount:92,status:`Active`},{code:`EE201`,title:`Signals and Systems`,dept:`EE`,credits:4,facultyId:`FAC002`,maxEnrollment:80,enrolledCount:65,status:`Active`},{code:`EE302`,title:`Microprocessors & Embedded Systems`,dept:`EE`,credits:4,facultyId:`FAC008`,maxEnrollment:75,enrolledCount:72,status:`Active`},{code:`EE305`,title:`Electromagnetics & Quantum Physics`,dept:`EE`,credits:3,facultyId:`FAC009`,maxEnrollment:60,enrolledCount:45,status:`Active`},{code:`ME102`,title:`Engineering Thermodynamics`,dept:`ME`,credits:4,facultyId:`FAC003`,maxEnrollment:90,enrolledCount:82,status:`Active`},{code:`BI101`,title:`Fundamentals of Biotechnology`,dept:`BI`,credits:3,facultyId:`FAC004`,maxEnrollment:80,enrolledCount:68,status:`Active`},{code:`BI304`,title:`Genomics & Proteomics`,dept:`BI`,credits:4,facultyId:`FAC004`,maxEnrollment:40,enrolledCount:38,status:`Active`},{code:`BA201`,title:`Organizational Behavior`,dept:`BA`,credits:3,facultyId:`FAC005`,maxEnrollment:100,enrolledCount:95,status:`Active`}],r=[{id:`STU001`,name:`Alex Rivera`,email:`alex.rivera@modeluni.edu`,dept:`CS`,gpa:3.82,semester:6,status:`Active`,feePaid:4500,feeTotal:4500,avatar:`https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150`,attendance:92,courses:[`CS202`,`CS302`,`CS305`],dob:`2004-03-15`,gender:`Male`,phone:`+1-555-0101`,bloodGroup:`O+`,nationality:`American`,address:`1428 Elm Street, Austin, TX 78701`,guardianName:`Maria Rivera`,guardianPhone:`+1-555-0102`,guardianRelation:`Mother`,admissionDate:`2023-08-20`,enrollmentType:`Regular`,hostel:`Block A - Room 204`,scholarship:`Merit Scholarship (40%)`,category:`General`,aadhar:`9876-5432-1001`,previousSchool:`Austin International Academy`},{id:`STU002`,name:`Zoe Chen`,email:`zoe.chen@modeluni.edu`,dept:`CS`,gpa:3.95,semester:4,status:`Active`,feePaid:4500,feeTotal:4500,avatar:`https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150`,attendance:98,courses:[`CS101`,`CS202`,`CS305`],dob:`2005-07-22`,gender:`Female`,phone:`+1-555-0201`,bloodGroup:`A+`,nationality:`Chinese-American`,address:`88 Pacific Heights Blvd, San Francisco, CA 94115`,guardianName:`Wei Chen`,guardianPhone:`+1-555-0202`,guardianRelation:`Father`,admissionDate:`2024-08-18`,enrollmentType:`Regular`,hostel:`Block B - Room 112`,scholarship:`Dean's List Scholarship (60%)`,category:`General`,aadhar:`9876-5432-1002`,previousSchool:`Bay Area STEM High School`},{id:`STU003`,name:`Liam Sterling`,email:`liam.sterling@modeluni.edu`,dept:`CS`,gpa:3.45,semester:6,status:`Active`,feePaid:3e3,feeTotal:4500,avatar:`https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150`,attendance:85,courses:[`CS202`,`CS302`,`CS401`],dob:`2004-01-10`,gender:`Male`,phone:`+1-555-0301`,bloodGroup:`B+`,nationality:`American`,address:`22 Oakwood Drive, Portland, OR 97205`,guardianName:`James Sterling`,guardianPhone:`+1-555-0302`,guardianRelation:`Father`,admissionDate:`2023-08-20`,enrollmentType:`Regular`,hostel:`Day Scholar`,scholarship:`None`,category:`General`,aadhar:`9876-5432-1003`,previousSchool:`Portland Central High`},{id:`STU004`,name:`Emily Watson`,email:`emily.watson@modeluni.edu`,dept:`BI`,gpa:3.68,semester:2,status:`Active`,feePaid:4e3,feeTotal:4e3,avatar:`https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150`,attendance:94,courses:[`BI101`,`CS101`],dob:`2006-11-05`,gender:`Female`,phone:`+1-555-0401`,bloodGroup:`AB+`,nationality:`British-American`,address:`14 Kensington Lane, Boston, MA 02116`,guardianName:`Richard Watson`,guardianPhone:`+1-555-0402`,guardianRelation:`Father`,admissionDate:`2025-08-15`,enrollmentType:`Regular`,hostel:`Block C - Room 305`,scholarship:`Sports Scholarship (25%)`,category:`General`,aadhar:`9876-5432-1004`,previousSchool:`Boston Latin School`},{id:`STU005`,name:`Carlos Mendez`,email:`carlos.mendez@modeluni.edu`,dept:`EE`,gpa:2.95,semester:4,status:`Active`,feePaid:4200,feeTotal:4200,avatar:`https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150`,attendance:78,courses:[`EE201`,`EE302`],dob:`2005-05-28`,gender:`Male`,phone:`+1-555-0501`,bloodGroup:`O-`,nationality:`Mexican-American`,address:`56 Sunset Boulevard, Los Angeles, CA 90028`,guardianName:`Rosa Mendez`,guardianPhone:`+1-555-0502`,guardianRelation:`Mother`,admissionDate:`2024-08-18`,enrollmentType:`Lateral Entry`,hostel:`Block A - Room 310`,scholarship:`Need-Based Aid (30%)`,category:`OBC`,aadhar:`9876-5432-1005`,previousSchool:`LA Technical Institute`},{id:`STU006`,name:`Sophia Patel`,email:`sophia.patel@modeluni.edu`,dept:`CS`,gpa:3.75,semester:8,status:`Active`,feePaid:4500,feeTotal:4500,avatar:`https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150`,attendance:90,courses:[`CS302`,`CS401`],dob:`2003-09-14`,gender:`Female`,phone:`+91-98765-43210`,bloodGroup:`A-`,nationality:`Indian-American`,address:`12 MG Road, Indore, MP 452001, India`,guardianName:`Rajesh Patel`,guardianPhone:`+91-98765-43211`,guardianRelation:`Father`,admissionDate:`2022-08-22`,enrollmentType:`Regular`,hostel:`Block B - Room 401`,scholarship:`Merit Scholarship (50%)`,category:`General`,aadhar:`9876-5432-1006`,previousSchool:`Delhi Public School, Indore`},{id:`STU007`,name:`Marcus Brody`,email:`marcus.brody@modeluni.edu`,dept:`ME`,gpa:3.12,semester:6,status:`Active`,feePaid:1500,feeTotal:4200,avatar:`https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150`,attendance:81,courses:[`ME102`,`EE101`],dob:`2004-06-30`,gender:`Male`,phone:`+1-555-0701`,bloodGroup:`B-`,nationality:`American`,address:`789 Industrial Ave, Detroit, MI 48201`,guardianName:`Henry Brody`,guardianPhone:`+1-555-0702`,guardianRelation:`Father`,admissionDate:`2023-08-20`,enrollmentType:`Regular`,hostel:`Day Scholar`,scholarship:`None`,category:`General`,aadhar:`9876-5432-1007`,previousSchool:`Detroit Cass Technical HS`},{id:`STU008`,name:`Elena Rostova`,email:`elena.rost@modeluni.edu`,dept:`BA`,gpa:3.9,semester:4,status:`Active`,feePaid:3800,feeTotal:3800,avatar:`https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150`,attendance:96,courses:[`BA201`,`CS101`],dob:`2005-12-02`,gender:`Female`,phone:`+7-495-555-0801`,bloodGroup:`O+`,nationality:`Russian-American`,address:`34 Broadway, New York, NY 10006`,guardianName:`Viktor Rostov`,guardianPhone:`+7-495-555-0802`,guardianRelation:`Father`,admissionDate:`2024-08-18`,enrollmentType:`Regular`,hostel:`Block C - Room 201`,scholarship:`International Student Grant (35%)`,category:`International`,aadhar:`N/A`,previousSchool:`Moscow International Academy`},{id:`STU009`,name:`Devon Miller`,email:`devon.miller@modeluni.edu`,dept:`EE`,gpa:3.54,semester:8,status:`Active`,feePaid:4200,feeTotal:4200,avatar:`https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150`,attendance:89,courses:[`EE302`,`EE305`],dob:`2003-04-18`,gender:`Male`,phone:`+1-555-0901`,bloodGroup:`AB-`,nationality:`American`,address:`567 Tech Park, Seattle, WA 98101`,guardianName:`Susan Miller`,guardianPhone:`+1-555-0902`,guardianRelation:`Mother`,admissionDate:`2022-08-22`,enrollmentType:`Regular`,hostel:`Block A - Room 108`,scholarship:`Research Assistantship`,category:`General`,aadhar:`9876-5432-1009`,previousSchool:`Seattle STEM Academy`},{id:`STU010`,name:`Nadia Petrova`,email:`nadia.petrova@modeluni.edu`,dept:`BI`,gpa:3.61,semester:6,status:`On Leave`,feePaid:2e3,feeTotal:4e3,avatar:`https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150`,attendance:0,courses:[],dob:`2004-08-09`,gender:`Female`,phone:`+380-44-555-1001`,bloodGroup:`A+`,nationality:`Ukrainian-American`,address:`12 Cherry Blossom Rd, Chicago, IL 60601`,guardianName:`Oleg Petrov`,guardianPhone:`+380-44-555-1002`,guardianRelation:`Father`,admissionDate:`2023-08-20`,enrollmentType:`Regular`,hostel:`Block B - Room 305`,scholarship:`Refugee Educational Grant (100%)`,category:`International`,aadhar:`N/A`,previousSchool:`Kyiv National Lyceum`},{id:`STU011`,name:`Jackson Cole`,email:`jackson.cole@modeluni.edu`,dept:`CS`,gpa:2.8,semester:2,status:`Active`,feePaid:0,feeTotal:4500,avatar:`https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150`,attendance:72,courses:[`CS101`,`EE101`],dob:`2006-02-14`,gender:`Male`,phone:`+1-555-1101`,bloodGroup:`B+`,nationality:`American`,address:`910 College Ave, Atlanta, GA 30303`,guardianName:`Patricia Cole`,guardianPhone:`+1-555-1102`,guardianRelation:`Mother`,admissionDate:`2025-08-15`,enrollmentType:`Regular`,hostel:`Block A - Room 415`,scholarship:`None`,category:`SC`,aadhar:`9876-5432-1011`,previousSchool:`Atlanta Academy of Sciences`},{id:`STU012`,name:`Ravi Kumar`,email:`ravi.kumar@modeluni.edu`,dept:`ME`,gpa:3.4,semester:4,status:`Active`,feePaid:4200,feeTotal:4200,avatar:`https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150`,attendance:88,courses:[`ME102`],dob:`2005-10-25`,gender:`Male`,phone:`+91-91234-56789`,bloodGroup:`O+`,nationality:`Indian`,address:`45 Rajpath Nagar, New Delhi 110001, India`,guardianName:`Suresh Kumar`,guardianPhone:`+91-91234-56780`,guardianRelation:`Father`,admissionDate:`2024-08-18`,enrollmentType:`Regular`,hostel:`Block C - Room 102`,scholarship:`Government Merit Scholarship (45%)`,category:`OBC`,aadhar:`1234-5678-9012`,previousSchool:`Kendriya Vidyalaya, Delhi`},{id:`STU013`,name:`Maya Lin`,email:`mayalin@modeluni.edu`,dept:`CS`,gpa:2.66,semester:7,status:`Active`,feePaid:3336,feeTotal:4500,avatar:`https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150`,attendance:96,courses:[`CS101`,`CS202`],dob:`2004-09-03`,gender:`Female`,phone:`+1-555-5851`,bloodGroup:`A+`,nationality:`American`,address:`217 Main Street, Boston, MA 02110`,guardianName:`Mr. Lin`,guardianPhone:`+1-555-5181`,guardianRelation:`Father`,admissionDate:`2021-08-20`,enrollmentType:`Regular`,hostel:`Day Scholar`,scholarship:`Merit Scholarship (50%)`,category:`General`,aadhar:`3101-1110-0013`,previousSchool:`Boston Academy of Sciences`},{id:`STU014`,name:`Ryan Patterson`,email:`ryanpatterson@modeluni.edu`,dept:`EE`,gpa:3.68,semester:5,status:`Active`,feePaid:3923,feeTotal:4500,avatar:`https://images.unsplash.com/photo-1504257404764-b2b1d311277a?w=150`,attendance:91,courses:[`EE101`,`EE201`],dob:`2005-05-11`,gender:`Male`,phone:`+1-555-3404`,bloodGroup:`A-`,nationality:`Indian`,address:`416 Oak Avenue, Seattle, WA 02111`,guardianName:`Mr. Patterson`,guardianPhone:`+1-555-4274`,guardianRelation:`Father`,admissionDate:`2022-08-20`,enrollmentType:`Regular`,hostel:`Day Scholar`,scholarship:`None`,category:`General`,aadhar:`2419-5084-0014`,previousSchool:`Seattle Academy of Sciences`},{id:`STU015`,name:`Chloe Henderson`,email:`chloehenderson@modeluni.edu`,dept:`ME`,gpa:2.6,semester:8,status:`Active`,feePaid:3365,feeTotal:4500,avatar:`https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=150`,attendance:77,courses:[`ME102`],dob:`2004-12-13`,gender:`Female`,phone:`+1-555-7314`,bloodGroup:`B+`,nationality:`Canadian`,address:`268 Maple Road, Chicago, IL 02112`,guardianName:`Mr. Henderson`,guardianPhone:`+1-555-9958`,guardianRelation:`Father`,admissionDate:`2021-08-20`,enrollmentType:`Regular`,hostel:`Block C - Room 102`,scholarship:`None`,category:`General`,aadhar:`4594-4950-0015`,previousSchool:`Chicago Academy of Sciences`},{id:`STU016`,name:`Jordan Brooks`,email:`jordanbrooks@modeluni.edu`,dept:`BI`,gpa:3.72,semester:7,status:`Active`,feePaid:2243,feeTotal:4500,avatar:`https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=150`,attendance:75,courses:[`BI101`,`BI304`],dob:`2004-02-18`,gender:`Male`,phone:`+1-555-4422`,bloodGroup:`B-`,nationality:`British`,address:`324 Pine Lane, Austin, TX 02113`,guardianName:`Mr. Brooks`,guardianPhone:`+1-555-5690`,guardianRelation:`Father`,admissionDate:`2021-08-20`,enrollmentType:`Regular`,hostel:`Day Scholar`,scholarship:`None`,category:`SC`,aadhar:`4137-7914-0016`,previousSchool:`Austin Academy of Sciences`},{id:`STU017`,name:`Hannah Abbott`,email:`hannahabbott@modeluni.edu`,dept:`BA`,gpa:3.87,semester:4,status:`Active`,feePaid:3102,feeTotal:4500,avatar:`https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150`,attendance:98,courses:[`BA201`],dob:`2006-06-28`,gender:`Female`,phone:`+1-555-3880`,bloodGroup:`AB+`,nationality:`French`,address:`814 Elm Boulevard, San Francisco, CA 02114`,guardianName:`Mr. Abbott`,guardianPhone:`+1-555-7683`,guardianRelation:`Father`,admissionDate:`2023-08-20`,enrollmentType:`Regular`,hostel:`Day Scholar`,scholarship:`None`,category:`General`,aadhar:`5781-3766-0017`,previousSchool:`San Francisco Academy of Sciences`},{id:`STU018`,name:`Cedric Diggory`,email:`cedricdiggory@modeluni.edu`,dept:`CS`,gpa:3.17,semester:5,status:`Active`,feePaid:3631,feeTotal:4500,avatar:`https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=150`,attendance:76,courses:[`CS101`,`CS202`],dob:`2005-06-13`,gender:`Male`,phone:`+1-555-1085`,bloodGroup:`AB-`,nationality:`Australian`,address:`730 Broadway, New York, NY 02115`,guardianName:`Mrs. Diggory`,guardianPhone:`+1-555-5022`,guardianRelation:`Mother`,admissionDate:`2022-08-20`,enrollmentType:`Regular`,hostel:`Day Scholar`,scholarship:`None`,category:`OBC`,aadhar:`2126-4854-0018`,previousSchool:`New York Academy of Sciences`},{id:`STU019`,name:`Luna Lovegood`,email:`lunalovegood@modeluni.edu`,dept:`EE`,gpa:2.87,semester:3,status:`Active`,feePaid:3776,feeTotal:4500,avatar:`https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150`,attendance:99,courses:[`EE101`,`EE201`],dob:`2006-01-14`,gender:`Female`,phone:`+1-555-8394`,bloodGroup:`O+`,nationality:`American`,address:`579 Cedar Court, Denver, CO 02116`,guardianName:`Mrs. Lovegood`,guardianPhone:`+1-555-4602`,guardianRelation:`Mother`,admissionDate:`2023-08-20`,enrollmentType:`Regular`,hostel:`Block A - Room 106`,scholarship:`None`,category:`General`,aadhar:`4525-1686-0019`,previousSchool:`Denver Academy of Sciences`},{id:`STU020`,name:`Harry Potter`,email:`harrypotter@modeluni.edu`,dept:`ME`,gpa:2.88,semester:4,status:`Active`,feePaid:2785,feeTotal:4500,avatar:`https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150`,attendance:91,courses:[`ME102`],dob:`2006-03-08`,gender:`Male`,phone:`+1-555-9902`,bloodGroup:`O-`,nationality:`Indian`,address:`276 Main Street, Boston, MA 02117`,guardianName:`Mr. Potter`,guardianPhone:`+1-555-5627`,guardianRelation:`Father`,admissionDate:`2023-08-20`,enrollmentType:`Regular`,hostel:`Day Scholar`,scholarship:`None`,category:`General`,aadhar:`4223-3001-0020`,previousSchool:`Boston Academy of Sciences`},{id:`STU021`,name:`Hermione Granger`,email:`hermionegranger@modeluni.edu`,dept:`BI`,gpa:3.93,semester:6,status:`Active`,feePaid:3473,feeTotal:4500,avatar:`https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150`,attendance:88,courses:[`BI101`,`BI304`],dob:`2005-06-11`,gender:`Female`,phone:`+1-555-3639`,bloodGroup:`A+`,nationality:`Canadian`,address:`450 Oak Avenue, Seattle, WA 02118`,guardianName:`Mrs. Granger`,guardianPhone:`+1-555-4863`,guardianRelation:`Mother`,admissionDate:`2022-08-20`,enrollmentType:`Regular`,hostel:`Block C - Room 108`,scholarship:`None`,category:`General`,aadhar:`1977-7561-0021`,previousSchool:`Seattle Academy of Sciences`},{id:`STU022`,name:`Ron Weasley`,email:`ronweasley@modeluni.edu`,dept:`BA`,gpa:3.03,semester:5,status:`Active`,feePaid:2479,feeTotal:4500,avatar:`https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150`,attendance:97,courses:[`BA201`],dob:`2005-11-28`,gender:`Male`,phone:`+1-555-8150`,bloodGroup:`A-`,nationality:`British`,address:`309 Maple Road, Chicago, IL 02119`,guardianName:`Mr. Weasley`,guardianPhone:`+1-555-2775`,guardianRelation:`Father`,admissionDate:`2022-08-20`,enrollmentType:`Regular`,hostel:`Day Scholar`,scholarship:`None`,category:`OBC`,aadhar:`8311-9862-0022`,previousSchool:`Chicago Academy of Sciences`},{id:`STU023`,name:`Neville Longbottom`,email:`nevillelongbottom@modeluni.edu`,dept:`CS`,gpa:3.51,semester:8,status:`Active`,feePaid:2307,feeTotal:4500,avatar:`https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150`,attendance:92,courses:[`CS101`,`CS202`],dob:`2004-12-28`,gender:`Male`,phone:`+1-555-2172`,bloodGroup:`B+`,nationality:`French`,address:`432 Pine Lane, Austin, TX 02120`,guardianName:`Mrs. Longbottom`,guardianPhone:`+1-555-5885`,guardianRelation:`Mother`,admissionDate:`2021-08-20`,enrollmentType:`Regular`,hostel:`Day Scholar`,scholarship:`None`,category:`General`,aadhar:`2405-8137-0023`,previousSchool:`Austin Academy of Sciences`},{id:`STU024`,name:`Ginny Weasley`,email:`ginnyweasley@modeluni.edu`,dept:`EE`,gpa:3.01,semester:6,status:`Active`,feePaid:3036,feeTotal:4500,avatar:`https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150`,attendance:99,courses:[`EE101`,`EE201`],dob:`2005-07-13`,gender:`Female`,phone:`+1-555-6735`,bloodGroup:`B-`,nationality:`Australian`,address:`943 Elm Boulevard, San Francisco, CA 02121`,guardianName:`Mrs. Weasley`,guardianPhone:`+1-555-5140`,guardianRelation:`Mother`,admissionDate:`2022-08-20`,enrollmentType:`Regular`,hostel:`Block C - Room 111`,scholarship:`None`,category:`General`,aadhar:`2361-6146-0024`,previousSchool:`San Francisco Academy of Sciences`},{id:`STU025`,name:`Draco Malfoy`,email:`dracomalfoy@modeluni.edu`,dept:`ME`,gpa:3.08,semester:2,status:`Active`,feePaid:4040,feeTotal:4500,avatar:`https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150`,attendance:87,courses:[`ME102`],dob:`2007-08-15`,gender:`Male`,phone:`+1-555-1512`,bloodGroup:`AB+`,nationality:`American`,address:`667 Broadway, New York, NY 02122`,guardianName:`Mr. Malfoy`,guardianPhone:`+1-555-2368`,guardianRelation:`Father`,admissionDate:`2024-08-20`,enrollmentType:`Regular`,hostel:`Block A - Room 112`,scholarship:`Merit Scholarship (50%)`,category:`OBC`,aadhar:`2919-1445-0025`,previousSchool:`New York Academy of Sciences`},{id:`STU026`,name:`Cho Chang`,email:`chochang@modeluni.edu`,dept:`BI`,gpa:3.3,semester:1,status:`Active`,feePaid:3615,feeTotal:4500,avatar:`https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150`,attendance:84,courses:[`BI101`,`BI304`],dob:`2007-06-11`,gender:`Female`,phone:`+1-555-4427`,bloodGroup:`AB-`,nationality:`Indian`,address:`861 Cedar Court, Denver, CO 02123`,guardianName:`Mr. Chang`,guardianPhone:`+1-555-9231`,guardianRelation:`Father`,admissionDate:`2024-08-20`,enrollmentType:`Regular`,hostel:`Block B - Room 113`,scholarship:`None`,category:`General`,aadhar:`7596-3346-0026`,previousSchool:`Denver Academy of Sciences`},{id:`STU027`,name:`Fleur Delacour`,email:`fleurdelacour@modeluni.edu`,dept:`BA`,gpa:3.2,semester:6,status:`Active`,feePaid:4199,feeTotal:4500,avatar:`https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150`,attendance:83,courses:[`BA201`],dob:`2005-11-27`,gender:`Female`,phone:`+1-555-5062`,bloodGroup:`O+`,nationality:`Canadian`,address:`532 Main Street, Boston, MA 02124`,guardianName:`Mr. Delacour`,guardianPhone:`+1-555-1224`,guardianRelation:`Father`,admissionDate:`2022-08-20`,enrollmentType:`Regular`,hostel:`Block C - Room 114`,scholarship:`None`,category:`General`,aadhar:`5932-4649-0027`,previousSchool:`Boston Academy of Sciences`},{id:`STU028`,name:`Viktor Krum`,email:`viktorkrum@modeluni.edu`,dept:`CS`,gpa:3.38,semester:5,status:`Active`,feePaid:2324,feeTotal:4500,avatar:`https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150`,attendance:95,courses:[`CS101`,`CS202`],dob:`2005-10-28`,gender:`Male`,phone:`+1-555-4896`,bloodGroup:`O-`,nationality:`British`,address:`179 Oak Avenue, Seattle, WA 02125`,guardianName:`Mrs. Krum`,guardianPhone:`+1-555-9836`,guardianRelation:`Mother`,admissionDate:`2022-08-20`,enrollmentType:`Regular`,hostel:`Block A - Room 115`,scholarship:`Merit Scholarship (20%)`,category:`OBC`,aadhar:`4640-3975-0028`,previousSchool:`Seattle Academy of Sciences`},{id:`STU029`,name:`Peter Parker`,email:`peterparker@modeluni.edu`,dept:`EE`,gpa:2.96,semester:1,status:`Active`,feePaid:4324,feeTotal:4500,avatar:`https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150`,attendance:91,courses:[`EE101`,`EE201`],dob:`2007-12-21`,gender:`Male`,phone:`+1-555-8654`,bloodGroup:`A+`,nationality:`French`,address:`231 Maple Road, Chicago, IL 02126`,guardianName:`Mrs. Parker`,guardianPhone:`+1-555-1509`,guardianRelation:`Mother`,admissionDate:`2024-08-20`,enrollmentType:`Regular`,hostel:`Block B - Room 116`,scholarship:`None`,category:`General`,aadhar:`4856-7579-0029`,previousSchool:`Chicago Academy of Sciences`},{id:`STU030`,name:`Gwen Stacy`,email:`gwenstacy@modeluni.edu`,dept:`ME`,gpa:3.14,semester:7,status:`Active`,feePaid:3562,feeTotal:4500,avatar:`https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=150`,attendance:87,courses:[`ME102`],dob:`2004-10-23`,gender:`Female`,phone:`+1-555-3418`,bloodGroup:`A-`,nationality:`Australian`,address:`293 Pine Lane, Austin, TX 02127`,guardianName:`Mr. Stacy`,guardianPhone:`+1-555-3090`,guardianRelation:`Father`,admissionDate:`2021-08-20`,enrollmentType:`Regular`,hostel:`Block C - Room 117`,scholarship:`None`,category:`General`,aadhar:`6611-2078-0030`,previousSchool:`Austin Academy of Sciences`},{id:`STU031`,name:`Miles Morales`,email:`milesmorales@modeluni.edu`,dept:`BI`,gpa:2.69,semester:5,status:`Active`,feePaid:2972,feeTotal:4500,avatar:`https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150`,attendance:85,courses:[`BI101`,`BI304`],dob:`2005-12-01`,gender:`Male`,phone:`+1-555-1874`,bloodGroup:`B+`,nationality:`American`,address:`337 Elm Boulevard, San Francisco, CA 02128`,guardianName:`Mr. Morales`,guardianPhone:`+1-555-8613`,guardianRelation:`Father`,admissionDate:`2022-08-20`,enrollmentType:`Regular`,hostel:`Day Scholar`,scholarship:`None`,category:`General`,aadhar:`8117-4452-0031`,previousSchool:`San Francisco Academy of Sciences`},{id:`STU032`,name:`Clark Kent`,email:`clarkkent@modeluni.edu`,dept:`BA`,gpa:3.08,semester:1,status:`Active`,feePaid:2681,feeTotal:4500,avatar:`https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?w=150`,attendance:92,courses:[`BA201`],dob:`2007-03-02`,gender:`Male`,phone:`+1-555-7309`,bloodGroup:`B-`,nationality:`Indian`,address:`783 Broadway, New York, NY 02129`,guardianName:`Mrs. Kent`,guardianPhone:`+1-555-8842`,guardianRelation:`Mother`,admissionDate:`2024-08-20`,enrollmentType:`Regular`,hostel:`Day Scholar`,scholarship:`Merit Scholarship (20%)`,category:`General`,aadhar:`7915-9888-0032`,previousSchool:`New York Academy of Sciences`},{id:`STU033`,name:`Bruce Wayne`,email:`brucewayne@modeluni.edu`,dept:`CS`,gpa:3.29,semester:6,status:`Active`,feePaid:2537,feeTotal:4500,avatar:`https://images.unsplash.com/photo-1527983359383-4758693f760c?w=150`,attendance:85,courses:[`CS101`,`CS202`],dob:`2005-08-17`,gender:`Male`,phone:`+1-555-3450`,bloodGroup:`AB+`,nationality:`Canadian`,address:`711 Cedar Court, Denver, CO 02130`,guardianName:`Mrs. Wayne`,guardianPhone:`+1-555-5381`,guardianRelation:`Mother`,admissionDate:`2022-08-20`,enrollmentType:`Regular`,hostel:`Block C - Room 120`,scholarship:`None`,category:`General`,aadhar:`7480-7992-0033`,previousSchool:`Denver Academy of Sciences`},{id:`STU034`,name:`Diana Prince`,email:`dianaprince@modeluni.edu`,dept:`EE`,gpa:3.15,semester:3,status:`Active`,feePaid:2360,feeTotal:4500,avatar:`https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=150`,attendance:86,courses:[`EE101`,`EE201`],dob:`2006-10-27`,gender:`Female`,phone:`+1-555-8452`,bloodGroup:`AB-`,nationality:`British`,address:`665 Main Street, Boston, MA 02131`,guardianName:`Mr. Prince`,guardianPhone:`+1-555-1046`,guardianRelation:`Father`,admissionDate:`2023-08-20`,enrollmentType:`Regular`,hostel:`Block A - Room 121`,scholarship:`None`,category:`OBC`,aadhar:`5946-2779-0034`,previousSchool:`Boston Academy of Sciences`},{id:`STU035`,name:`Tony Stark`,email:`tonystark@modeluni.edu`,dept:`ME`,gpa:3.17,semester:2,status:`Active`,feePaid:2354,feeTotal:4500,avatar:`https://images.unsplash.com/photo-1504257404764-b2b1d311277a?w=150`,attendance:83,courses:[`ME102`],dob:`2007-12-22`,gender:`Male`,phone:`+1-555-7227`,bloodGroup:`O+`,nationality:`French`,address:`755 Oak Avenue, Seattle, WA 02132`,guardianName:`Mrs. Stark`,guardianPhone:`+1-555-5155`,guardianRelation:`Mother`,admissionDate:`2024-08-20`,enrollmentType:`Regular`,hostel:`Block B - Room 122`,scholarship:`None`,category:`General`,aadhar:`2966-7655-0035`,previousSchool:`Seattle Academy of Sciences`},{id:`STU036`,name:`Steve Rogers`,email:`steverogers@modeluni.edu`,dept:`BI`,gpa:2.77,semester:7,status:`Active`,feePaid:2891,feeTotal:4500,avatar:`https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=150`,attendance:97,courses:[`BI101`,`BI304`],dob:`2004-12-25`,gender:`Male`,phone:`+1-555-4244`,bloodGroup:`O-`,nationality:`Australian`,address:`396 Maple Road, Chicago, IL 02133`,guardianName:`Mrs. Rogers`,guardianPhone:`+1-555-6049`,guardianRelation:`Mother`,admissionDate:`2021-08-20`,enrollmentType:`Regular`,hostel:`Day Scholar`,scholarship:`None`,category:`General`,aadhar:`8640-4318-0036`,previousSchool:`Chicago Academy of Sciences`},{id:`STU037`,name:`Natasha Romanoff`,email:`natasharomanoff@modeluni.edu`,dept:`BA`,gpa:2.99,semester:6,status:`Active`,feePaid:3979,feeTotal:4500,avatar:`https://images.unsplash.com/photo-1554151228-14d9def656e4?w=150`,attendance:91,courses:[`BA201`],dob:`2005-10-08`,gender:`Female`,phone:`+1-555-6581`,bloodGroup:`A+`,nationality:`American`,address:`834 Pine Lane, Austin, TX 02134`,guardianName:`Mrs. Romanoff`,guardianPhone:`+1-555-4533`,guardianRelation:`Mother`,admissionDate:`2022-08-20`,enrollmentType:`Regular`,hostel:`Day Scholar`,scholarship:`Merit Scholarship (40%)`,category:`General`,aadhar:`6282-3418-0037`,previousSchool:`Austin Academy of Sciences`},{id:`STU038`,name:`Aria Nakamura`,email:`student@aegis.edu`,dept:`CS`,gpa:3.75,semester:4,status:`Active`,feePaid:3500,feeTotal:4500,avatar:`https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150`,attendance:95,courses:[`CS101`,`CS202`],dob:`2006-04-12`,gender:`Female`,phone:`+1-555-0381`,bloodGroup:`AB-`,nationality:`Japanese-American`,address:`402 Maple Court, Austin, TX 78759`,guardianName:`Kenji Nakamura`,guardianPhone:`+1-555-0382`,guardianRelation:`Father`,admissionDate:`2024-08-20`,enrollmentType:`Regular`,hostel:`Block B - Room 304`,scholarship:`None`,category:`General`,aadhar:`1234-5678-9012`,previousSchool:`Austin High School`}],i=[{txId:`TXN8972`,studentId:`STU001`,studentName:`Alex Rivera`,amount:4500,date:`2026-05-15`,status:`Paid`,method:`Stripe`},{txId:`TXN8973`,studentId:`STU002`,studentName:`Zoe Chen`,amount:4500,date:`2026-05-16`,status:`Paid`,method:`Bank Transfer`},{txId:`TXN8974`,studentId:`STU005`,studentName:`Carlos Mendez`,amount:4200,date:`2026-05-18`,status:`Paid`,method:`Credit Card`},{txId:`TXN8975`,studentId:`STU003`,studentName:`Liam Sterling`,amount:3e3,date:`2026-05-20`,status:`Paid`,method:`Stripe`},{txId:`TXN8976`,studentId:`STU008`,studentName:`Elena Rostova`,amount:3800,date:`2026-05-22`,status:`Paid`,method:`PayPal`},{txId:`TXN8977`,studentId:`STU007`,studentName:`Marcus Brody`,amount:1500,date:`2026-05-23`,status:`Paid`,method:`Stripe`},{txId:`TXN8978`,studentId:`STU004`,studentName:`Emily Watson`,amount:4e3,date:`2026-05-25`,status:`Paid`,method:`Credit Card`}],a=[{code:`CS101`,name:`Intro Programming Mid-Term`,date:`2026-06-12`,time:`10:00 AM`,venue:`Hall A`},{code:`CS202`,name:`Data Structures Final`,date:`2026-06-15`,time:`02:00 PM`,venue:`Lab 3`},{code:`EE201`,name:`Signals and Systems Exam`,date:`2026-06-16`,time:`09:00 AM`,venue:`Hall B`},{code:`BA201`,name:`Org Behavior Presentation`,date:`2026-06-18`,time:`11:00 AM`,venue:`Seminar Room`},{code:`ME102`,name:`Thermodynamics Exam`,date:`2026-06-20`,time:`02:00 PM`,venue:`Hall C`}],o=[{id:1,title:`Summer Semester Enrollment Open`,content:`Enrollment for the summer crash courses will remain open until June 15th. Apply via academic cell.`,date:`2026-06-08`,tag:`Academic`,color:`var(--primary)`},{id:2,title:`Annual Cultural Fest: Nebula 2026`,content:`Nebula cultural festival planning begins this Friday. Interested volunteers contact Student Union representatives.`,date:`2026-06-06`,tag:`Event`,color:`var(--accent-emerald)`},{id:3,title:`Network Maintenance Downtime`,content:`The primary campus server rack and Wi-Fi system will undergo maintenance on Saturday, 12:00 AM to 04:00 AM.`,date:`2026-06-05`,tag:`System`,color:`var(--accent-ruby)`}],s=[{text:`Admission registry updated for Fall 2026 intake.`,time:`2 hours ago`},{text:`Prof. Turing posted attendance record for CS202.`,time:`4 hours ago`},{text:`Student STU011 fee collection status flagged pending.`,time:`1 day ago`},{text:`Dr. Sterling approved grade change sheet for CS302.`,time:`2 days ago`}];return{getDepartments:()=>e,getFaculty:()=>t,getCourses:()=>n,getStudents:()=>r,getTransactions:()=>i,getExams:()=>a,getAnnouncements:()=>o,getActivities:()=>s,addStudent:e=>{r.push(e)},updateStudent:(e,t)=>{let n=r.findIndex(t=>t.id===e);n!==-1&&(r[n]={...r[n],...t})},deleteStudent:e=>{let t=r.findIndex(t=>t.id===e);return t===-1?!1:(r.splice(t,1),!0)},addTransaction:e=>{i.unshift(e)},addAnnouncement:e=>{o.unshift(e)},runIntegrityPrediction:async function(){if(typeof tf>`u`)return[];var e=this.getStudents();if(e.length===0)return[];try{var t=e.map(e=>[e.gpa/4,e.attendance/100,(e.feePaid||0)/(e.feeTotal||5e3)]),n=tf.tensor2d(t,[e.length,3]),r=tf.sequential();r.add(tf.layers.dense({units:2,activation:`relu`,inputShape:[3]})),r.add(tf.layers.dense({units:3,activation:`sigmoid`})),r.compile({optimizer:tf.train.adam(.1),loss:`meanSquaredError`}),await r.fit(n,n,{epochs:15,verbose:0});var i=r.predict(n),a=await i.data(),o=[];for(let n=0;n<e.length;n++){var s=t[n],c=[a[n*3],a[n*3+1],a[n*3+2]],l=Math.sqrt((s[0]-c[0])**2+(s[1]-c[1])**2+(s[2]-c[2])**2),u=l>.45;e[n].status===`Graduated`&&e[n].feePaid<e[n].feeTotal*.95&&(u=!0,l+=.5),e[n].attendance>95&&e[n].gpa<1&&(u=!0,l+=.3),u&&o.push({studentId:e[n].id,name:e[n].name,errorScore:l.toFixed(4),reason:e[n].status===`Graduated`&&e[n].feePaid<e[n].feeTotal*.95?`Graduated status with unpaid balance`:e[n].attendance>95&&e[n].gpa<1?`Critical performance discrepancy`:`Profile anomaly pattern detected`})}return n.dispose(),i.dispose(),r.dispose(),o}catch(e){return console.error(`Integrity predictor failed:`,e),[]}}}})(),window.dashboardView=(function(){let e=null,t=null,n=null,r=null;function i(){let e=[{id:1,text:`Approve graduation transcripts for STU006 PATEL`,priority:`High`,done:!1},{id:2,text:`Audit Stripe collection batch receipts for fee payments`,priority:`Medium`,done:!0},{id:3,text:`Verify blockchain credential hashes for CS101 course completions`,priority:`Low`,done:!1}],t=localStorage.getItem(`aegis_admin_tasks`);return t?JSON.parse(t):e}function a(e){localStorage.setItem(`aegis_admin_tasks`,JSON.stringify(e))}function o(){let e=[{id:1,date:`2026-06-15`,title:`Semester Term Exams start`,type:`Exam`},{id:2,date:`2026-06-28`,title:`Course Registration Deadline`,type:`Academic`},{id:3,date:`2026-07-01`,title:`Summer Recess begins`,type:`Holiday`}],t=localStorage.getItem(`aegis_academic_events`);return t?JSON.parse(t):e}function s(e){localStorage.setItem(`aegis_academic_events`,JSON.stringify(e))}function c(e){let t=e.querySelector(`#tasks-list-container`);if(!t)return;let n=i();t.innerHTML=n.length===0?`
      <div class="text-center py-6 text-brand-text-muted text-xs">No pending tasks. Great job!</div>
    `:n.map(e=>{let t=`bg-brand-primary/10 text-brand-primary`;return e.priority===`High`?t=`bg-brand-accent-ruby/10 text-brand-accent-ruby`:e.priority===`Medium`?t=`bg-brand-accent-amber/10 text-brand-accent-amber`:e.priority===`Low`&&(t=`bg-brand-accent-cyan/10 text-brand-accent-cyan`),`
        <div class="flex items-center justify-between p-2.5 border border-brand-border rounded-xl bg-brand-bg-tertiary/30 hover:bg-brand-bg-tertiary/50 transition-all duration-200 ${e.done?`opacity-55`:``}">
          <div class="flex items-center gap-2.5 min-w-0 flex-1">
            <input type="checkbox" class="task-checkbox accent-brand-primary cursor-pointer w-4 h-4 shrink-0" data-id="${e.id}" ${e.done?`checked`:``}>
            <span class="text-xs font-medium text-brand-text-main truncate ${e.done?`line-through text-brand-text-subtle`:``}">${e.text}</span>
          </div>
          <div class="flex items-center gap-1.5 shrink-0 ml-2">
            <span class="badge ${t} text-[0.6rem] px-1.5 py-0.5">${e.priority}</span>
            <button class="delete-task-btn text-brand-text-subtle hover:text-brand-accent-ruby p-1 transition-colors bg-transparent border-none cursor-pointer" data-id="${e.id}" title="Delete Task">
              <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
            </button>
          </div>
        </div>
      `}).join(``),t.querySelectorAll(`.task-checkbox`).forEach(t=>{t.addEventListener(`change`,t=>{let n=parseInt(t.target.getAttribute(`data-id`)),r=i(),o=r.find(e=>e.id===n);o&&(o.done=t.target.checked,a(r),c(e))})}),t.querySelectorAll(`.delete-task-btn`).forEach(t=>{t.addEventListener(`click`,t=>{let n=parseInt(t.currentTarget.getAttribute(`data-id`)),r=i();r=r.filter(e=>e.id!==n),a(r),c(e)})})}function l(e){let t=e.querySelector(`#events-list-container`);if(!t)return;let n=o();n.sort((e,t)=>new Date(e.date)-new Date(t.date)),t.innerHTML=n.length===0?`
      <div class="text-center py-6 text-brand-text-muted text-xs">No upcoming events scheduled.</div>
    `:n.map(e=>{let t=`border-brand-primary`,n=`bg-brand-primary/10 text-brand-primary`;e.type===`Exam`?(t=`border-brand-accent-ruby`,n=`bg-brand-accent-ruby/10 text-brand-accent-ruby`):e.type===`Holiday`?(t=`border-brand-accent-amber`,n=`bg-brand-accent-amber/10 text-brand-accent-amber`):e.type===`Academic`&&(t=`border-brand-accent-cyan`,n=`bg-brand-accent-cyan/10 text-brand-accent-cyan`);let r=new Date(e.date).toLocaleDateString(`en-US`,{month:`short`,day:`numeric`});return`
        <div class="flex items-center justify-between p-2.5 border-l-4 ${t} bg-brand-bg-tertiary/30 rounded-r-xl border border-y-brand-border border-r-brand-border hover:bg-brand-bg-tertiary/50 transition-all duration-200">
          <div class="min-w-0 flex-1">
            <h4 class="text-xs font-semibold text-brand-text-main mt-0 mb-0.5 truncate">${e.title}</h4>
            <span class="text-[0.65rem] text-brand-text-subtle">${r}</span>
          </div>
          <div class="flex items-center gap-2 shrink-0 ml-2">
            <span class="badge ${n} text-[0.6rem] px-1.5 py-0.5">${e.type}</span>
            <button class="delete-event-btn text-brand-text-subtle hover:text-brand-accent-ruby p-1 transition-colors bg-transparent border-none cursor-pointer" data-id="${e.id}" title="Remove Event">
              <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>
        </div>
      `}).join(``),t.querySelectorAll(`.delete-event-btn`).forEach(t=>{t.addEventListener(`click`,t=>{let n=parseInt(t.currentTarget.getAttribute(`data-id`)),r=o();r=r.filter(e=>e.id!==n),s(r),l(e)})})}function u(e){let t=window.UniversityDB.getStudents(),n=window.UniversityDB.getFaculty(),m=window.UniversityDB.getCourses(),h=window.UniversityDB.getDepartments(),g=window.UniversityDB.getActivities(),_=window.UniversityDB.getAnnouncements(),v=window.UniversityDB.getTransactions(),y=t.filter(e=>e.status===`Active`).length,b=n.length,x=m.filter(e=>e.status===`Active`).length,S=v.reduce((e,t)=>e+t.amount,0),C=t.reduce((e,t)=>e+(t.feeTotal-t.feePaid),0);e.innerHTML=`
      <div class="page-header animate-fade-in flex items-center justify-between border-b border-brand-border/30 pb-4 mb-6">
        <div>
          <h1 class="text-3xl font-bold font-display tracking-tight bg-gradient-to-r from-white via-slate-100 to-brand-primary bg-clip-text text-transparent">Administrative Dashboard</h1>
          <p class="text-sm text-brand-text-muted mt-1">Aegis University key metrics, performance trends, and live system telemetries.</p>
        </div>
        <div class="btn-group flex gap-3">
          <button class="btn btn-secondary btn-sm flex items-center gap-2" onclick="alert('Exporting Report...')">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            <span>Export Registry</span>
          </button>
          <button class="btn btn-primary btn-sm flex items-center gap-2" id="dashboard-refresh-btn">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>
            <span>Refresh telemetry</span>
          </button>
        </div>
      </div>

      <!-- KPI Summary Cards -->
      <div class="kpi-grid animate-fade-in delay-1">
        <!-- Card 1 -->
        <div class="card kpi-card bg-brand-bg-secondary/40 backdrop-blur-md border border-brand-border/50 p-6 rounded-2xl flex justify-between items-start transition-all duration-300 hover:border-brand-primary/30">
          <div class="kpi-details">
            <span class="kpi-label text-xs font-bold text-brand-text-muted uppercase tracking-wider">Active Enrollment</span>
            <span class="kpi-value text-3xl font-display font-bold text-white mt-2 leading-none">${y}</span>
            <span class="kpi-growth flex items-center gap-1 text-xs text-brand-accent-emerald font-semibold mt-2.5">
              <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"/></svg>
              +4.8% from last sem
            </span>
          </div>
          <div class="kpi-icon w-12 h-12 rounded-xl flex items-center justify-center bg-brand-bg-tertiary/60 border border-brand-border text-brand-primary transition-transform duration-300 hover:scale-105">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>
          </div>
        </div>

        <!-- Card 2 -->
        <div class="card kpi-card bg-brand-bg-secondary/40 backdrop-blur-md border border-brand-border/50 p-6 rounded-2xl flex justify-between items-start transition-all duration-300 hover:border-brand-primary/30">
          <div class="kpi-details">
            <span class="kpi-label text-xs font-bold text-brand-text-muted uppercase tracking-wider">Assigned Faculty</span>
            <span class="kpi-value text-3xl font-display font-bold text-white mt-2 leading-none">${b}</span>
            <span class="kpi-growth flex items-center gap-1 text-xs text-brand-accent-cyan font-semibold mt-2.5">
              <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"/></svg>
              100% Retained
            </span>
          </div>
          <div class="kpi-icon w-12 h-12 rounded-xl flex items-center justify-center bg-brand-bg-tertiary/60 border border-brand-border text-brand-accent-cyan transition-transform duration-300 hover:scale-105">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          </div>
        </div>

        <!-- Card 3 -->
        <div class="card kpi-card bg-brand-bg-secondary/40 backdrop-blur-md border border-brand-border/50 p-6 rounded-2xl flex justify-between items-start transition-all duration-300 hover:border-brand-primary/30">
          <div class="kpi-details">
            <span class="kpi-label text-xs font-bold text-brand-text-muted uppercase tracking-wider">Active Catalog</span>
            <span class="kpi-value text-3xl font-display font-bold text-white mt-2 leading-none">${x}</span>
            <span class="kpi-growth flex items-center gap-1 text-xs text-brand-accent-emerald font-semibold mt-2.5">
              <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"/></svg>
              +3 New Catalog
            </span>
          </div>
          <div class="kpi-icon w-12 h-12 rounded-xl flex items-center justify-center bg-brand-bg-tertiary/60 border border-brand-border text-brand-accent-emerald transition-transform duration-300 hover:scale-105">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5v-15z"/></svg>
          </div>
        </div>

        <!-- Card 4 -->
        <div class="card kpi-card bg-brand-bg-secondary/40 backdrop-blur-md border border-brand-border/50 p-6 rounded-2xl flex justify-between items-start transition-all duration-300 hover:border-brand-primary/30">
          <div class="kpi-details">
            <span class="kpi-label text-xs font-bold text-brand-text-muted uppercase tracking-wider">Average Attendance</span>
            <span class="kpi-value text-3xl font-display font-bold text-white mt-2 leading-none">${Math.round(t.reduce((e,t)=>e+(t.attendance||0),0)/(t.length||1))}%</span>
            <span class="kpi-growth flex items-center gap-1 text-xs text-brand-accent-emerald font-semibold mt-2.5">
              <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"/></svg>
              +1.2% this week
            </span>
          </div>
          <div class="kpi-icon w-12 h-12 rounded-xl flex items-center justify-center bg-brand-bg-tertiary/60 border border-brand-border text-brand-accent-amber transition-transform duration-300 hover:scale-105">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
          </div>
        </div>

        <!-- Card 5 -->
        <div class="card kpi-card bg-brand-bg-secondary/40 backdrop-blur-md border border-brand-border/50 p-6 rounded-2xl flex justify-between items-start transition-all duration-300 hover:border-brand-primary/30">
          <div class="kpi-details">
            <span class="kpi-label text-xs font-bold text-brand-text-muted uppercase tracking-wider">Fees Collected</span>
            <span class="kpi-value text-3xl font-display font-bold text-white mt-2 leading-none">$${S.toLocaleString()}</span>
            <span class="kpi-growth flex items-center gap-1 text-xs text-brand-accent-emerald font-semibold mt-2.5">
              <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"/></svg>
              92.3% Cleared
            </span>
          </div>
          <div class="kpi-icon w-12 h-12 rounded-xl flex items-center justify-center bg-brand-bg-tertiary/60 border border-brand-border text-brand-accent-cyan transition-transform duration-300 hover:scale-105">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
          </div>
        </div>
      </div>

      <!-- Operations Hub & System Telemetry Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6 animate-fade-in delay-2">
        <!-- Telemetry Monitor -->
        <div class="card bg-brand-bg-secondary/40 backdrop-blur-md border border-brand-border/50 p-6 rounded-2xl">
          <div class="flex items-center justify-between border-b border-brand-border/30 pb-3 mb-4">
            <h3 class="font-display text-base font-bold flex items-center gap-2 m-0 text-white">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="var(--color-brand-primary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              Infrastructure & Node Telemetry
            </h3>
            <div class="flex items-center gap-2 bg-brand-accent-emerald/10 border border-brand-accent-emerald/20 px-2.5 py-1 rounded-full">
              <span class="relative flex h-2 w-2">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-accent-emerald opacity-75"></span>
                <span class="relative inline-flex rounded-full h-2 w-2 bg-brand-accent-emerald"></span>
              </span>
              <span class="text-[0.65rem] font-bold text-brand-accent-emerald uppercase tracking-wider">Online</span>
            </div>
          </div>
          <div class="flex flex-col gap-4 text-xs">
            <div class="flex justify-between items-center">
              <span class="text-brand-text-muted font-medium">Core CPU utilization:</span>
              <div class="flex items-center gap-3 w-44">
                <div class="bg-brand-bg-primary h-2 rounded-full overflow-hidden flex-1 border border-brand-border/40">
                  <div id="telemetry-cpu-bar" class="bg-brand-primary h-full rounded-full transition-[width] duration-300" style="width: 24%"></div>
                </div>
                <span id="telemetry-cpu-val" class="font-mono font-bold w-12 text-right text-brand-text-main">24%</span>
              </div>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-brand-text-muted font-medium">Memory Allocation:</span>
              <div class="flex items-center gap-3 w-44">
                <div class="bg-brand-bg-primary h-2 rounded-full overflow-hidden flex-1 border border-brand-border/40">
                  <div id="telemetry-ram-bar" class="bg-brand-accent-cyan h-full rounded-full transition-[width] duration-300" style="width: 64%"></div>
                </div>
                <span id="telemetry-ram-val" class="font-mono font-bold w-12 text-right text-brand-text-main">64%</span>
              </div>
            </div>
            <div class="flex justify-between">
              <span class="text-brand-text-muted font-medium">Core API Latency:</span>
              <span id="telemetry-latency-val" class="font-mono font-bold text-brand-accent-emerald">12ms</span>
            </div>
            <div class="flex justify-between">
              <span class="text-brand-text-muted font-medium">Local Database Engine:</span>
              <span class="font-mono font-bold text-brand-text-main">SQLite 3.45.1 (1.2 MB)</span>
            </div>
            <div class="flex justify-between">
              <span class="text-brand-text-muted font-medium">EduChain Node Node Connection:</span>
              <span class="font-mono font-bold text-brand-accent-cyan">Synced • Block #254</span>
            </div>
            <div class="flex justify-between border-t border-brand-border/30 pt-3">
              <span class="text-brand-text-muted font-medium">AI Telemetry Forecast (1hr):</span>
              <span id="telemetry-ai-forecast" class="font-mono font-bold text-brand-primary">Stable</span>
            </div>
          </div>
        </div>

        <!-- Funding & Budget Allocations -->
        <div class="card bg-brand-bg-secondary/40 backdrop-blur-md border border-brand-border/50 p-6 rounded-2xl">
          <h3 class="mb-4 font-display text-base font-bold m-0 border-b border-brand-border/30 pb-3 text-white">Funding & Budget Allocations</h3>
          <div class="flex flex-col gap-4 mt-2">
            <div>
              <div class="flex justify-between text-[0.7rem] font-bold mb-1.5 uppercase tracking-wider text-brand-text-muted">
                <span>Core Operating Budget</span>
                <span class="text-brand-text-main font-mono">$1,450,000 / $1,800,000 (80.5%)</span>
              </div>
              <div class="bg-brand-bg-primary h-2 rounded-full overflow-hidden w-full border border-brand-border/40">
                <div class="bg-gradient-to-r from-brand-primary to-brand-accent-cyan h-full rounded-full" style="width: 80.5%"></div>
              </div>
            </div>
            <div>
              <div class="flex justify-between text-[0.7rem] font-bold mb-1.5 uppercase tracking-wider text-brand-text-muted">
                <span>Scholarship & Research Allocations</span>
                <span class="text-brand-text-main font-mono">$85,000 / $120,000 (70.8%)</span>
              </div>
              <div class="bg-brand-bg-primary h-2 rounded-full overflow-hidden w-full border border-brand-border/40">
                <div class="bg-gradient-to-r from-brand-accent-emerald to-brand-accent-cyan h-full rounded-full" style="width: 70.8%"></div>
              </div>
            </div>
            <div>
              <div class="flex justify-between text-[0.7rem] font-bold mb-1.5 uppercase tracking-wider text-brand-text-muted">
                <span>Fee Invoice Collections Target</span>
                <span class="text-brand-text-main font-mono">$${S.toLocaleString()} / $${(S+C).toLocaleString()} (${(S/(S+C||1)*100).toFixed(1)}%)</span>
              </div>
              <div class="bg-brand-bg-primary h-2 rounded-full overflow-hidden w-full border border-brand-border/40">
                <div class="bg-gradient-to-r from-brand-accent-amber to-brand-accent-ruby h-full rounded-full" style="width: ${(S/(S+C||1)*100).toFixed(1)}%"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Charts Section -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6 animate-fade-in delay-2">
        <div class="card bg-brand-bg-secondary/40 backdrop-blur-md border border-brand-border/50 p-6 rounded-2xl">
          <h3 class="mb-5 font-display text-lg font-bold text-white">Enrollment Trends</h3>
          <div class="chart-wrapper">
            <canvas id="enrollment-line-chart"></canvas>
          </div>
        </div>
        
        <div class="card bg-brand-bg-secondary/40 backdrop-blur-md border border-brand-border/50 p-6 rounded-2xl">
          <h3 class="mb-5 font-display text-lg font-bold text-white">Department Distribution</h3>
          <div class="chart-wrapper">
            <canvas id="dept-donut-chart"></canvas>
          </div>
        </div>
      </div>

      <!-- AI Prediction Section -->
      <div class="card bg-brand-bg-secondary/40 backdrop-blur-md border border-brand-border/50 p-6 rounded-2xl animate-fade-in delay-3 mt-6">
        <div class="flex justify-between items-center border-b border-brand-border/30 pb-4 mb-5">
          <div>
            <h3 class="font-display flex items-center gap-2 m-0 text-lg font-bold text-white">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="var(--color-brand-primary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
              AI Enrollment Forecasting
            </h3>
            <p class="text-[0.85rem] text-brand-text-muted mt-1 m-0">In-browser neural network modeling on historical registration patterns using TensorFlow.js.</p>
          </div>
          <span class="badge bg-brand-primary/10 border-brand-primary/20 text-brand-primary font-semibold text-xs py-1 px-3">TensorFlow.js Engine</span>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8">
          <!-- Controls Panel -->
          <div class="flex flex-col gap-5 border-r border-brand-border/30 pr-8 max-md:border-r-0 max-md:pr-0">
            <div>
              <label class="block text-xs font-semibold text-brand-text-muted uppercase tracking-wider mb-2 pl-0.5">Optimizer Learning Rate</label>
              <select id="tf-lr-select" class="w-full bg-brand-bg-secondary border border-brand-border text-brand-text-main p-2 rounded-lg outline-none">
                <option value="0.01">0.01 (Slow & Stable)</option>
                <option value="0.05" selected>0.05 (Default)</option>
                <option value="0.1">0.10 (Fast)</option>
              </select>
            </div>

            <div>
              <label class="block text-xs font-semibold text-brand-text-muted uppercase tracking-wider mb-2 pl-0.5">Training Epochs</label>
              <input type="range" id="tf-epochs-range" min="50" max="300" step="50" value="150" class="w-full accent-brand-primary cursor-pointer">
              <span id="tf-epochs-val" class="text-[0.8rem] text-brand-text-muted float-right mt-1 font-mono">150 epochs</span>
            </div>

            <div>
              <label class="block text-xs font-semibold text-brand-text-muted uppercase tracking-wider mb-2 pl-0.5">Forecast Horizon</label>
              <select id="tf-horizon-select" class="w-full bg-brand-bg-secondary border border-brand-border text-brand-text-main p-2 rounded-lg outline-none">
                <option value="1">1 Term (2026-B)</option>
                <option value="2" selected>2 Terms (2026-B & 2027-A)</option>
                <option value="3">3 Terms (Up to 2027-B)</option>
              </select>
            </div>

            <button class="btn btn-primary w-full justify-center flex items-center gap-2" id="tf-train-btn">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
              <span>Run ML Projection</span>
            </button>

            <!-- Live Status -->
            <div id="tf-status-card" class="bg-brand-bg-tertiary p-3 rounded-lg border border-brand-border/40" style="display:none;">
              <div class="flex justify-between text-[0.8rem] mb-1.5">
                <span class="text-brand-text-subtle">Epoch:</span>
                <span id="tf-epoch-disp" class="font-semibold text-brand-text-main font-mono">0/150</span>
              </div>
              <div class="flex justify-between text-[0.8rem] mb-3">
                <span class="text-brand-text-subtle">Training Loss:</span>
                <span id="tf-loss-disp" class="font-mono text-brand-accent-amber">0.0000</span>
              </div>
              <!-- Progress Bar -->
              <div class="bg-brand-bg-primary rounded-full h-1.5 overflow-hidden w-full">
                <div id="tf-progress-bar" class="bg-brand-primary h-full w-0 transition-[width] duration-100"></div>
              </div>
            </div>
            
            <div id="tf-metrics-card" class="bg-brand-bg-tertiary p-3 rounded-lg border border-brand-border/40 text-[0.825rem] leading-normal flex flex-col gap-1.5">
              <div class="text-brand-text-main font-bold">Inference Telemetry:</div>
              <div>Status: <span id="tf-status-text" class="text-brand-accent-cyan font-bold uppercase">Untrained</span></div>
              <div>Gradient Fit: <span id="tf-equation-fit" class="text-brand-text-muted font-mono">y = mx + c</span></div>
            </div>
          </div>

          <!-- Forecast Chart -->
          <div class="flex flex-col h-[350px]">
            <div class="flex justify-between mb-3 items-center">
              <h4 class="text-sm font-semibold text-white m-0">Regression Prediction Curve</h4>
              <span id="tf-projection-hint" class="text-[0.75rem] text-brand-text-muted">In-browser training dataset vs output weights</span>
            </div>
            <div class="chart-wrapper flex-1">
              <canvas id="tf-forecast-chart"></canvas>
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom Layout split: Workflows, Calendar, Notices & Audits -->
      <div class="grid grid-cols-1 xl:grid-cols-3 gap-6 animate-fade-in delay-3 mt-6">
        
        <!-- Administrative Task checklist -->
        <div class="card bg-brand-bg-secondary/40 backdrop-blur-md border border-brand-border/50 p-6 rounded-2xl flex flex-col h-[400px]">
          <h3 class="mb-3 font-display text-base font-bold m-0 border-b border-brand-border/30 pb-3 shrink-0 text-white">Administrative Checklist</h3>
          
          <!-- Add Task Inline Form -->
          <div class="flex gap-1.5 mb-3 shrink-0">
            <input type="text" id="new-task-input" placeholder="Type task..." class="bg-brand-bg-tertiary border border-brand-border/60 text-brand-text-main px-3 py-1.5 rounded-lg text-xs outline-none focus:border-brand-primary/40 flex-1">
            <select id="new-task-priority" class="bg-brand-bg-tertiary border border-brand-border/60 text-brand-text-main px-2 py-1.5 rounded-lg text-xs outline-none focus:border-brand-primary/40 shrink-0 font-semibold cursor-pointer">
              <option value="High">High</option>
              <option value="Medium" selected>Medium</option>
              <option value="Low">Low</option>
            </select>
            <button class="btn btn-primary btn-sm flex items-center justify-center w-8 h-8 rounded-lg shrink-0 p-0 text-lg font-bold" id="add-task-btn" title="Add Task">+</button>
          </div>

          <!-- Tasks List Container -->
          <div id="tasks-list-container" class="flex-1 overflow-y-auto flex flex-col gap-2.5 pr-1">
            <!-- Loaded dynamically -->
          </div>
        </div>

        <!-- Academic Event Calendar -->
        <div class="card bg-brand-bg-secondary/40 backdrop-blur-md border border-brand-border/50 p-6 rounded-2xl flex flex-col h-[400px]">
          <div class="flex justify-between items-center mb-3 border-b border-brand-border/30 pb-3 shrink-0">
            <h3 class="font-display text-base font-bold m-0 text-white">Academic Calendar</h3>
            <button class="btn btn-secondary btn-sm flex items-center gap-1.5 px-2.5 py-1" id="toggle-event-form-btn">
              <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              <span>Planner</span>
            </button>
          </div>

          <!-- Add Event Form Panel (Collapsible) -->
          <div id="add-event-panel" class="hidden bg-brand-bg-tertiary/40 p-3 rounded-xl border border-brand-border/40 mb-3 shrink-0 animate-fade-in">
            <div class="flex flex-col gap-2.5">
              <div class="flex gap-2">
                <input type="text" id="new-event-title" placeholder="Event name..." class="bg-brand-bg-tertiary border border-brand-border/60 text-brand-text-main px-2.5 py-1.5 rounded-lg text-xs outline-none focus:border-brand-primary/40 flex-1">
                <select id="new-event-type" class="bg-brand-bg-tertiary border border-brand-border/60 text-brand-text-main px-1.5 py-1 rounded-lg text-xs outline-none focus:border-brand-primary/40 shrink-0 font-semibold cursor-pointer">
                  <option value="Academic">Academic</option>
                  <option value="Exam">Exam</option>
                  <option value="Holiday">Holiday</option>
                </select>
              </div>
              <div class="flex gap-2 items-center justify-between">
                <input type="date" id="new-event-date" class="bg-brand-bg-tertiary border border-brand-border/60 text-brand-text-main px-2.5 py-1 rounded-lg text-xs outline-none focus:border-brand-primary/40 flex-1">
                <button class="btn btn-primary btn-sm px-4 py-1" id="save-event-btn">Save</button>
              </div>
            </div>
          </div>

          <!-- Events List Container -->
          <div id="events-list-container" class="flex-1 overflow-y-auto flex flex-col gap-2.5 pr-1">
            <!-- Loaded dynamically -->
          </div>
        </div>

        <!-- Notices Board & Log Audit Trail -->
        <div class="card bg-brand-bg-secondary/40 backdrop-blur-md border border-brand-border/50 p-6 rounded-2xl flex flex-col h-[400px]">
          <!-- Tabs to switch between Notices and Activity logs -->
          <div class="flex border-b border-brand-border/30 pb-1.5 mb-3 shrink-0 gap-4">
            <button id="tab-notices" class="bg-transparent border-none text-white font-display text-base font-bold pb-2 cursor-pointer border-b-2 border-brand-primary" style="margin-bottom: -8px;">
              Notices Desk
            </button>
            <button id="tab-activities" class="bg-transparent border-none text-brand-text-muted font-display text-base font-semibold pb-2 cursor-pointer border-b-2 border-transparent hover:text-white" style="margin-bottom: -8px;">
              Audit Logs
            </button>
          </div>

          <!-- Tab Content: Notices -->
          <div id="notices-tab-content" class="flex-1 overflow-y-auto flex flex-col gap-3.5 pr-1">
            ${_.slice(0,3).map(e=>`
              <div class="pl-3 border-l-2" style="border-color: ${e.color}">
                <div class="flex justify-between items-center">
                  <span class="badge bg-brand-bg-tertiary text-brand-text-main text-[0.65rem] px-2 py-0.5 rounded border border-brand-border/40 font-semibold uppercase tracking-wider">${e.tag}</span>
                  <span class="text-[0.65rem] text-brand-text-subtle font-mono">${e.date}</span>
                </div>
                <h4 class="my-1 text-xs font-bold text-white">${e.title}</h4>
                <p class="text-xs text-brand-text-muted leading-relaxed m-0">${e.content}</p>
              </div>
            `).join(``)}
            <div class="mt-auto pt-2">
              <button class="btn btn-secondary btn-sm w-full font-bold" id="view-notices-btn">Open Notice Board</button>
            </div>
          </div>

          <!-- Tab Content: Activities -->
          <div id="activities-tab-content" class="hidden flex-1 overflow-y-auto flex flex-col gap-3 pr-1">
            ${g.map(e=>`
              <div class="flex items-center justify-between pb-2 border-b border-brand-border/40">
                <div class="flex items-center gap-2.5 min-w-0 flex-1">
                  <div class="w-2 h-2 rounded-full bg-brand-accent-cyan shrink-0 animate-pulse"></div>
                  <span class="text-xs text-brand-text-main truncate">${e.text}</span>
                </div>
                <span class="text-[0.65rem] text-brand-text-subtle font-mono shrink-0 ml-2">${e.time}</span>
              </div>
            `).join(``)}
          </div>
        </div>

      </div>
    `;let w=e.querySelector(`#dashboard-refresh-btn`);w&&w.addEventListener(`click`,()=>{u(e)});let T=e.querySelector(`#view-notices-btn`);T&&T.addEventListener(`click`,()=>{window.App.loadView(`announcements`)});let E=e.querySelector(`#tf-epochs-range`),D=e.querySelector(`#tf-epochs-val`);E&&D&&E.addEventListener(`input`,e=>{D.innerText=`${e.target.value} epochs`});let O=e.querySelector(`#tf-train-btn`);O&&O.addEventListener(`click`,()=>{p(e,t)}),c(e),l(e);let k=e.querySelector(`#add-task-btn`),A=e.querySelector(`#new-task-input`),j=e.querySelector(`#new-task-priority`);k&&A&&j&&(k.addEventListener(`click`,()=>{let t=A.value.trim();if(!t)return;let n=j.value,r=i(),o={id:Date.now(),text:t,priority:n,done:!1};r.push(o),a(r),A.value=``,c(e)}),A.addEventListener(`keydown`,e=>{e.key===`Enter`&&k.click()}));let M=e.querySelector(`#toggle-event-form-btn`),N=e.querySelector(`#add-event-panel`),P=e.querySelector(`#save-event-btn`),F=e.querySelector(`#new-event-title`),I=e.querySelector(`#new-event-type`),L=e.querySelector(`#new-event-date`);M&&N&&M.addEventListener(`click`,()=>{N.classList.toggle(`hidden`),L&&!L.value&&(L.value=new Date().toISOString().split(`T`)[0])}),P&&F&&L&&I&&P.addEventListener(`click`,()=>{let t=F.value.trim(),n=L.value,r=I.value;if(!t||!n){alert(`Please enter both event name and date.`);return}let i=o(),a={id:Date.now(),title:t,date:n,type:r};i.push(a),s(i),F.value=``,N.classList.add(`hidden`),l(e)});let R=e.querySelector(`#tab-notices`),z=e.querySelector(`#tab-activities`),B=e.querySelector(`#notices-tab-content`),V=e.querySelector(`#activities-tab-content`);R&&z&&B&&V&&(R.addEventListener(`click`,()=>{R.classList.add(`border-brand-primary`,`text-brand-text-main`),R.classList.remove(`border-transparent`,`text-brand-text-muted`),z.classList.add(`border-transparent`,`text-brand-text-muted`),z.classList.remove(`border-brand-primary`,`text-brand-text-main`),B.classList.remove(`hidden`),V.classList.add(`hidden`)}),z.addEventListener(`click`,()=>{z.classList.add(`border-brand-primary`,`text-brand-text-main`),z.classList.remove(`border-transparent`,`text-brand-text-muted`),R.classList.add(`border-transparent`,`text-brand-text-muted`),R.classList.remove(`border-brand-primary`,`text-brand-text-main`),V.classList.remove(`hidden`),B.classList.add(`hidden`)})),r&&clearInterval(r),r=setInterval(()=>{let t=e.querySelector(`#telemetry-cpu-bar`),n=e.querySelector(`#telemetry-cpu-val`),i=e.querySelector(`#telemetry-latency-val`),a=e.querySelector(`#telemetry-ram-bar`),o=e.querySelector(`#telemetry-ram-val`);if(t&&n&&i&&a&&o){let r=Math.floor(15+Math.random()*30);t.style.width=`${r}%`,n.innerText=`${r}%`;let s=Math.floor(8+Math.random()*15);i.innerText=`${s}ms`;let c=(63+Math.random()*3).toFixed(1),l=(8*c/100).toFixed(2);a.style.width=`${c}%`,o.innerText=`${l} GB / 8.00 GB (${c}%)`;let u=`Stable`,d=`text-brand-primary`;if(typeof tf<`u`)try{let e=tf.tensor2d([[r/100,parseFloat(c)/100,s/50]]),t=tf.tensor2d([[1.2],[.6],[.4]]),n=tf.matMul(e,t),i=n.dataSync()[0]*50;i>40?(u=`Heavy Load (~${Math.round(i)}%)`,d=`text-brand-accent-ruby font-bold`):i>25?(u=`Elevated (~${Math.round(i)}%)`,d=`text-brand-accent-amber font-bold`):(u=`Stable (~${Math.round(i)}%)`,d=`text-brand-accent-emerald font-bold`),e.dispose(),t.dispose(),n.dispose()}catch(e){console.warn(e)}let f=e.querySelector(`#telemetry-ai-forecast`);f&&(f.innerText=u,f.className=`font-mono ${d}`)}else clearInterval(r),r=null},2500),setTimeout(()=>{d(e,t,h),f(e,t)},100)}function d(n,r,i){let a=n.querySelector(`#enrollment-line-chart`);a&&(e&&e.destroy(),e=new Chart(a,{type:`line`,data:{labels:[`2022-A`,`2022-B`,`2023-A`,`2023-B`,`2024-A`,`2024-B`,`2025-A`,`2025-B`,`2026-A`],datasets:[{label:`Total Enrollment`,data:[350,390,420,480,510,560,620,680,715],borderColor:`#6366f1`,backgroundColor:`rgba(99, 102, 241, 0.08)`,borderWidth:3,fill:!0,tension:.4}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:!1}},scales:{y:{grid:{color:`rgba(255, 255, 255, 0.05)`},ticks:{color:`#94a3b8`}},x:{grid:{display:!1},ticks:{color:`#94a3b8`}}}}}));let o=n.querySelector(`#dept-donut-chart`);if(o){t&&t.destroy();let e={};i.forEach(t=>{e[t.code]={count:0,name:t.name,color:t.color}}),r.forEach(t=>{e[t.dept]&&e[t.dept].count++});let n=Object.keys(e),a=Object.values(e).map(e=>e.count),s=Object.values(e).map(e=>e.color);t=new Chart(o,{type:`doughnut`,data:{labels:n,datasets:[{data:a,backgroundColor:s,borderColor:`#121829`,borderWidth:3}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{position:`right`,labels:{color:`#94a3b8`,font:{family:`Inter`}}}},cutout:`65%`}})}}function f(e,t){let r=e.querySelector(`#tf-forecast-chart`);if(!r)return;n&&n.destroy();let i=t.filter(e=>e.status===`Active`).length,a=[`2022-A`,`2022-B`,`2023-A`,`2023-B`,`2024-A`,`2024-B`,`2025-A`,`2025-B`,`2026-A`],o=[350,390,420,480,510,560,620,680,i];n=new Chart(r,{type:`line`,data:{labels:a,datasets:[{label:`Historical Enrollment`,data:o,borderColor:`rgba(99, 102, 241, 0.4)`,backgroundColor:`transparent`,pointBackgroundColor:`#6366f1`,pointRadius:6,borderWidth:2,showLine:!0},{label:`Model Fit & Prediction`,data:[],borderColor:`#f59e0b`,backgroundColor:`transparent`,borderWidth:3,borderDash:[5,5],pointRadius:0}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:!0,labels:{color:`#94a3b8`}}},scales:{y:{grid:{color:`rgba(255, 255, 255, 0.05)`},ticks:{color:`#94a3b8`}},x:{grid:{display:!1},ticks:{color:`#94a3b8`}}}}})}async function p(e,t){let r=e.querySelector(`#tf-train-btn`);if(!r||r.disabled)return;if(typeof tf>`u`){alert(`TensorFlow.js is currently loading or unavailable. Please check your internet connection.`);return}r.disabled=!0,r.innerText=`Training Model...`;let i=e.querySelector(`#tf-status-card`);i&&(i.style.display=`block`);let a=t.filter(e=>e.status===`Active`).length,o=[0,1,2,3,4,5,6,7,8],s=[350,390,420,480,510,560,620,680,a],c=tf.tensor2d(o.map(e=>e/8),[9,1]),l=tf.tensor2d(s.map(e=>e/1e3),[9,1]),u=tf.sequential();u.add(tf.layers.dense({units:1,inputShape:[1]}));let d=e.querySelector(`#tf-lr-select`),f=e.querySelector(`#tf-epochs-range`),p=e.querySelector(`#tf-horizon-select`),m=d?parseFloat(d.value):.05,h=f?parseInt(f.value):150,g=p?parseInt(p.value):2;u.compile({optimizer:tf.train.adam(m),loss:`meanSquaredError`});try{await u.fit(c,l,{epochs:h,callbacks:{onEpochEnd:(t,n)=>{let r=(t+1)/h*100,i=e.querySelector(`#tf-epoch-disp`),a=e.querySelector(`#tf-loss-disp`),o=e.querySelector(`#tf-progress-bar`);i&&(i.innerText=`${t+1}/${h}`),a&&(a.innerText=n.loss.toFixed(6)),o&&(o.style.width=`${r}%`)}}});let t=u.layers[0].getWeights(),r=t[0].dataSync()[0],i=t[1].dataSync()[0],a=1e3*r/8,o=1e3*i,d=e.querySelector(`#tf-status-text`),f=e.querySelector(`#tf-equation-fit`);d&&(d.innerText=`Trained successfully`,d.className=`text-brand-accent-emerald font-bold`),f&&(f.innerText=`y = ${a.toFixed(2)}x + ${o.toFixed(2)}`);let p=9+g,m=[`2022-A`,`2022-B`,`2023-A`,`2023-B`,`2024-A`,`2024-B`,`2025-A`,`2025-B`,`2026-A`],_=[2026,2027,2028],v=0,y=`B`;for(let e=0;e<g;e++)m.push(`${_[v]}-${y}`),y===`B`?(y=`A`,v++):y=`B`;let b=[];for(let e=0;e<p;e++){let t=a*e+o;b.push(Math.round(t))}n.data.labels=m;let x=[...s];for(;x.length<p;)x.push(null);n.data.datasets[0].data=x,n.data.datasets[1].data=b,n.update()}catch(e){console.error(`Error during TensorFlow training:`,e),alert(`Error during TensorFlow training: `+e.message)}finally{c.dispose(),l.dispose(),u.dispose(),r&&(r.disabled=!1,r.innerText=`Run ML Projection`)}}return{render:u}})(),window.studentsView=(function(){function e(e){e.innerHTML=`
      <div class="page-header animate-fade-in flex items-center justify-between border-b border-brand-border/30 pb-4 mb-6">
        <div>
          <h1 class="text-3xl font-bold font-display tracking-tight bg-gradient-to-r from-white via-slate-100 to-brand-primary bg-clip-text text-transparent">Student Registry</h1>
          <p class="text-sm text-brand-text-muted mt-1">Complete student lifecycle management — admissions, profiles, grades, and records.</p>
        </div>
        <button class="btn btn-primary" id="btn-add-student">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" y1="11" x2="22" y2="11"/><line x1="16" y1="11" x2="19" y2="8"/></svg>
          <span>Enroll Student</span>
        </button>
      </div>

      <!-- KPI Overview Cards -->
      <div class="kpi-grid animate-fade-in delay-1 mb-6">
        <div class="card kpi-card">
          <div class="kpi-details">
            <span class="kpi-label">Total Enrolled</span>
            <span class="kpi-value" id="stu-stat-total">0 Students</span>
            <span class="kpi-growth text-brand-primary">Active Registry</span>
          </div>
          <div class="kpi-icon text-brand-primary">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
          </div>
        </div>
        <div class="card kpi-card">
          <div class="kpi-details">
            <span class="kpi-label">Average CGPA</span>
            <span class="kpi-value" id="stu-stat-cgpa">0.00</span>
            <span class="kpi-growth text-brand-accent-cyan">Class Standing</span>
          </div>
          <div class="kpi-icon text-brand-accent-cyan">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"/></svg>
          </div>
        </div>
        <div class="card kpi-card">
          <div class="kpi-details">
            <span class="kpi-label">Avg Attendance</span>
            <span class="kpi-value" id="stu-stat-attendance">0%</span>
            <span class="kpi-growth text-brand-accent-emerald">Term Present</span>
          </div>
          <div class="kpi-icon text-brand-accent-emerald">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
          </div>
        </div>
        <div class="card kpi-card">
          <div class="kpi-details">
            <span class="kpi-label">Active Ratio</span>
            <span class="kpi-value" id="stu-stat-active">0 / 0</span>
            <span class="kpi-growth text-brand-accent-amber">In Good Standing</span>
          </div>
          <div class="kpi-icon text-brand-accent-amber">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
          </div>
        </div>
      </div>

      <!-- Filters & Controls -->
      <div class="card animate-fade-in delay-1 bg-brand-bg-secondary/40 backdrop-blur-md border border-brand-border/50 p-6 rounded-2xl mb-6">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          <div class="form-group mb-0">
            <label class="form-label text-xs font-bold text-brand-text-muted uppercase tracking-wider pl-1">Search Name / ID / Phone</label>
            <input type="text" class="form-control mt-1" placeholder="e.g. Alex Rivera, STU001..." id="search-name">
          </div>
          <div class="form-group mb-0">
            <label class="form-label text-xs font-bold text-brand-text-muted uppercase tracking-wider pl-1">Department</label>
            <select class="form-control mt-1" id="filter-dept">
              <option value="ALL">All Departments</option>
              <option value="CS">Computer Science</option>
              <option value="EE">Electrical Eng</option>
              <option value="ME">Mechanical Eng</option>
              <option value="BI">Bioinformatics</option>
              <option value="BA">Business Admin</option>
            </select>
          </div>
          <div class="form-group mb-0">
            <label class="form-label text-xs font-bold text-brand-text-muted uppercase tracking-wider pl-1">Status</label>
            <select class="form-control mt-1" id="filter-status">
              <option value="ALL">All Statuses</option>
              <option value="Active">Active</option>
              <option value="On Leave">On Leave</option>
              <option value="Graduated">Graduated</option>
            </select>
          </div>
          <div class="form-group mb-0">
            <label class="form-label text-xs font-bold text-brand-text-muted uppercase tracking-wider pl-1">Gender</label>
            <select class="form-control mt-1" id="filter-gender">
              <option value="ALL">All</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Student Table -->
      <div class="table-container animate-fade-in delay-2 border border-brand-border/50">
        <table>
          <thead>
            <tr>
              <th class="p-4">Student</th>
              <th class="p-4">ID</th>
              <th class="p-4">Dept</th>
              <th class="p-4">Sem</th>
              <th class="p-4">GPA</th>
              <th class="p-4">Attend.</th>
              <th class="p-4">Phone</th>
              <th class="p-4">Status</th>
              <th class="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody id="student-table-body"></tbody>
        </table>
      </div>
    `,document.getElementById(`btn-add-student`).addEventListener(`click`,s),document.getElementById(`search-name`).addEventListener(`input`,t),document.getElementById(`filter-dept`).addEventListener(`change`,t),document.getElementById(`filter-status`).addEventListener(`change`,t),document.getElementById(`filter-gender`).addEventListener(`change`,t),t()}function t(){let e=(document.getElementById(`search-name`)?.value||``).toLowerCase().trim(),t=document.getElementById(`filter-dept`)?.value||`ALL`,i=document.getElementById(`filter-status`)?.value||`ALL`,a=document.getElementById(`filter-gender`)?.value||`ALL`,o=window.UniversityDB.getStudents().filter(n=>{let r=n.name.toLowerCase().includes(e)||n.id.toLowerCase().includes(e)||n.phone&&n.phone.includes(e)||n.email.toLowerCase().includes(e),o=t===`ALL`||n.dept===t,s=i===`ALL`||n.status===i,c=a===`ALL`||n.gender===a;return r&&o&&s&&c});r(o),n(o)}function n(e){let t=document.getElementById(`stu-stat-total`),n=document.getElementById(`stu-stat-cgpa`),r=document.getElementById(`stu-stat-attendance`),i=document.getElementById(`stu-stat-active`);if(!t)return;let a=e.length,o=a>0?(e.reduce((e,t)=>e+t.gpa,0)/a).toFixed(2):`0.00`,s=a>0?Math.round(e.reduce((e,t)=>e+t.attendance,0)/a):0,c=e.filter(e=>e.status===`Active`).length;t.textContent=`${a} Students`,n.textContent=o,r.textContent=`${s}%`,i.textContent=`${c} / ${a}`}function r(e){let t=document.getElementById(`student-table-body`);if(t){if(e.length===0){t.innerHTML=`<tr><td colspan="9" class="text-center text-brand-text-muted p-8">No matching student profiles found.</td></tr>`;return}t.innerHTML=e.map(e=>{let t=`badge-success`;e.status===`On Leave`&&(t=`badge-warning`),e.status===`Graduated`&&(t=`badge-info`);let n=`text-brand-accent-emerald`;return e.attendance<85&&(n=`text-brand-accent-amber`),e.attendance<75&&(n=`text-brand-accent-ruby`),`
        <tr>
          <td>
            <div class="flex items-center gap-3">
              <img src="${e.avatar}" class="w-9 h-9 rounded-full object-cover border border-brand-border">
              <div>
                <div class="font-semibold">${e.name}</div>
                <div class="text-[0.7rem] text-brand-text-muted">${e.email}</div>
              </div>
            </div>
          </td>
          <td><code>${e.id}</code></td>
          <td>${e.dept}</td>
          <td>Sem ${e.semester}</td>
          <td class="font-semibold">${e.gpa.toFixed(2)}</td>
          <td class="${n} font-semibold">${e.attendance}%</td>
          <td class="text-[0.8rem] text-brand-text-muted">${e.phone||`—`}</td>
          <td><span class="badge ${t}">${e.status}</span></td>
          <td class="text-right">
            <div class="flex gap-1.5 justify-end">
              <button class="btn btn-secondary btn-sm view-stu-btn" data-id="${e.id}">View</button>
              <button class="btn btn-primary btn-sm edit-stu-btn" data-id="${e.id}">Edit</button>
            </div>
          </td>
        </tr>
      `}).join(``),t.querySelectorAll(`.view-stu-btn`).forEach(e=>{e.addEventListener(`click`,()=>i(e.getAttribute(`data-id`)))}),t.querySelectorAll(`.edit-stu-btn`).forEach(e=>{e.addEventListener(`click`,()=>o(e.getAttribute(`data-id`)))})}}function i(e){let t=window.UniversityDB.getStudents().find(t=>t.id===e);if(!t)return;let n=t.feeTotal-t.feePaid,r=`
      <div class="flex gap-5 items-start mb-6 pb-5 border-b border-brand-border">
        <img src="${t.avatar}" class="w-[90px] h-[90px] rounded-full object-cover border-3 border-brand-primary shrink-0">
        <div class="flex-1">
          <h3 class="font-display text-lg font-semibold m-0 mb-1">${t.name}</h3>
          <p class="text-brand-text-muted text-[0.85rem] m-0">Student ID: <code>${t.id}</code> &nbsp;|&nbsp; ${t.dept} Department</p>
          <p class="text-brand-text-subtle text-[0.8rem] mt-1 m-0">${t.email} &nbsp;•&nbsp; ${t.phone||`No phone`}</p>
          <div class="mt-2 flex gap-2">
            <span class="badge ${t.status===`Active`?`badge-success`:t.status===`On Leave`?`badge-warning`:`badge-info`}">${t.status}</span>
            <span class="badge bg-brand-bg-tertiary text-brand-text-main">Sem ${t.semester}</span>
            ${t.scholarship&&t.scholarship!==`None`?`<span class="badge badge-info">${t.scholarship}</span>`:``}
          </div>
        </div>
      </div>

      <!-- Personal Information Grid -->
      <h4 class="mb-3 font-display font-semibold text-brand-primary">Personal Information</h4>
      <div class="grid grid-cols-2 gap-x-6 gap-y-3 mb-6 text-sm max-sm:grid-cols-1">
        <div><span class="text-brand-text-muted">Date of Birth:</span> <strong>${t.dob||`—`}</strong></div>
        <div><span class="text-brand-text-muted">Gender:</span> <strong>${t.gender||`—`}</strong></div>
        <div><span class="text-brand-text-muted">Blood Group:</span> <strong>${t.bloodGroup||`—`}</strong></div>
        <div><span class="text-brand-text-muted">Nationality:</span> <strong>${t.nationality||`—`}</strong></div>
        <div><span class="text-brand-text-muted">Category:</span> <strong>${t.category||`—`}</strong></div>
        <div><span class="text-brand-text-muted">Aadhar / National ID:</span> <strong>${t.aadhar||`—`}</strong></div>
        <div class="col-span-2 max-sm:col-span-1"><span class="text-brand-text-muted">Address:</span> <strong>${t.address||`—`}</strong></div>
      </div>

      <!-- Guardian Information -->
      <h4 class="mb-3 font-display font-semibold text-brand-accent-cyan">Guardian / Parent Details</h4>
      <div class="grid grid-cols-2 gap-x-6 gap-y-3 mb-6 text-sm max-sm:grid-cols-1">
        <div><span class="text-brand-text-muted">Guardian Name:</span> <strong>${t.guardianName||`—`}</strong></div>
        <div><span class="text-brand-text-muted">Relation:</span> <strong>${t.guardianRelation||`—`}</strong></div>
        <div><span class="text-brand-text-muted">Guardian Phone:</span> <strong>${t.guardianPhone||`—`}</strong></div>
        <div><span class="text-brand-text-muted">Previous School:</span> <strong>${t.previousSchool||`—`}</strong></div>
      </div>

      <!-- Academic & Financial Summary -->
      <div class="grid grid-cols-2 gap-4 mb-6 max-sm:grid-cols-1">
        <div class="card p-4 bg-brand-bg-tertiary">
          <h4 class="mb-2.5 text-[0.9rem] font-semibold text-brand-accent-emerald">📚 Academic Record</h4>
          <div class="text-[0.85rem] flex flex-col gap-1.5">
            <div>CGPA: <strong>${t.gpa.toFixed(2)}</strong></div>
            <div>Attendance: <strong class="${t.attendance<75?`text-brand-accent-ruby`:t.attendance<85?`text-brand-accent-amber`:`text-brand-accent-emerald`}">${t.attendance}%</strong></div>
            <div>Admission Date: <strong>${t.admissionDate||`—`}</strong></div>
            <div>Enrollment Type: <strong>${t.enrollmentType||`Regular`}</strong></div>
          </div>
        </div>
        <div class="card p-4 bg-brand-bg-tertiary">
          <h4 class="mb-2.5 text-[0.9rem] font-semibold text-brand-accent-amber">💰 Financial Summary</h4>
          <div class="text-[0.85rem] flex flex-col gap-1.5">
            <div>Total Fees: <strong>$${t.feeTotal.toLocaleString()}</strong></div>
            <div>Paid: <strong class="text-brand-accent-emerald">$${t.feePaid.toLocaleString()}</strong></div>
            <div>Balance: <strong class="${n>0?`text-brand-accent-ruby`:`text-brand-accent-emerald`}">$${n.toLocaleString()}</strong></div>
            <div>Hostel: <strong>${t.hostel||`Day Scholar`}</strong></div>
          </div>
        </div>
      </div>

      <!-- Enrolled Courses -->
      <h4 class="mb-3 font-display font-semibold text-brand-primary">Enrolled Courses</h4>
      <div class="table-container mb-0">
        <table>
          <thead>
            <tr><th>Code</th><th>Title</th><th>Credits</th><th>Instructor</th></tr>
          </thead>
          <tbody>
            ${t.courses.length===0?`<tr><td colspan="4" class="text-center text-brand-text-muted">No active course enrollments.</td></tr>`:t.courses.map(e=>{let t=window.UniversityDB.getCourses().find(t=>t.code===e),n=t?window.UniversityDB.getFaculty().find(e=>e.id===t.facultyId):null;return`<tr>
                  <td><code>${e}</code></td>
                  <td>${t?t.title:`External`}</td>
                  <td>${t?t.credits:`—`}</td>
                  <td>${n?n.name:`TBD`}</td>
                </tr>`}).join(``)}
          </tbody>
        </table>
      </div>

      <!-- AI Dropout & Retention Risk Estimator -->
      <div class="card mt-6 p-4 bg-brand-bg-tertiary border border-brand-border">
        <div class="flex items-center justify-between mb-3 pb-2 border-b border-brand-border/40">
          <div class="flex items-center gap-2">
            <span class="w-2.5 h-2.5 rounded-full bg-brand-primary animate-pulse"></span>
            <span class="text-xs font-bold uppercase tracking-wider text-brand-text-main font-display">AI Academic Success Predictor</span>
          </div>
          <span class="badge text-[0.65rem] py-0.5 px-2 font-mono bg-brand-accent-emerald/20 text-brand-accent-emerald" id="stu-ai-risk-badge">Calculating...</span>
        </div>
        <div class="grid grid-cols-2 gap-4 text-xs text-brand-text-muted">
          <div>
            <span class="text-[0.7rem] text-brand-text-subtle">Dropout Risk Probability:</span>
            <div class="font-bold text-brand-text-main font-mono text-sm mt-1" id="stu-ai-risk-pct">Calculating...</div>
          </div>
          <div>
            <span class="text-[0.7rem] text-brand-text-subtle">Projected Final GPA:</span>
            <div class="font-bold text-brand-text-main font-mono text-sm mt-1" id="stu-ai-gpa-proj">Calculating...</div>
          </div>
          <div class="col-span-2">
            <div class="w-full bg-brand-bg-secondary h-2.5 rounded-full overflow-hidden mt-1 relative border border-brand-border/40">
              <div id="stu-ai-risk-bar" class="bg-brand-primary h-full rounded-full transition-all duration-300" style="width: 0%"></div>
            </div>
            <p class="text-[0.65rem] text-brand-text-subtle mt-2">
              Neural network evaluating student CGPA (${t.gpa.toFixed(2)}), attendance (${t.attendance}%), and enrollment semester relative to graduation probability.
            </p>
          </div>
        </div>
      </div>
    `;window.App.showModal(`Student Full Profile`,r,`
      <button class="btn btn-secondary" onclick="window.App.closeModal()">Close</button>
      <button class="btn btn-primary" id="btn-modal-edit-stu">Edit Profile</button>
    `),a(t),document.getElementById(`btn-modal-edit-stu`).addEventListener(`click`,()=>{window.App.closeModal(),setTimeout(()=>o(e),200)})}async function a(e){if(typeof tf>`u`){let e=document.getElementById(`stu-ai-risk-badge`);e&&(e.textContent=`TF Unavailable`);return}try{let r=[e.gpa/4,e.attendance/100,e.semester/8],i=tf.sequential();i.add(tf.layers.dense({units:3,activation:`sigmoid`,inputShape:[3]})),i.add(tf.layers.dense({units:2}));let a=tf.tensor2d([[-2,3.5],[-3,2.5],[.5,-.5]]),o=tf.tensor1d([1.5,.5]);i.layers[1].setWeights([a,o]);let s=tf.tensor2d([r],[1,3]),c=i.predict(s),l=await c.data();var t=Math.max(0,Math.min(1,l[0])),n=Math.max(1,Math.min(4,l[1]*4));e.attendance<70&&(t=Math.max(t,.65)),e.gpa<2&&(t=Math.max(t,.75)),e.gpa>=3.8&&e.attendance>=90&&(t=Math.min(t,.02)),a.dispose(),o.dispose(),s.dispose(),c.dispose(),i.dispose();let u=document.getElementById(`stu-ai-risk-badge`),d=document.getElementById(`stu-ai-risk-pct`),f=document.getElementById(`stu-ai-gpa-proj`),p=document.getElementById(`stu-ai-risk-bar`);d&&(d.textContent=(t*100).toFixed(1)+`%`),f&&(f.textContent=n.toFixed(2)+` CGPA`),p&&(p.style.width=t*100+`%`),u&&(t<.15?(u.textContent=`Low Risk`,u.className=`badge text-[0.65rem] py-0.5 px-2 font-mono bg-brand-accent-emerald/20 text-brand-accent-emerald`,p&&(p.style.backgroundColor=`var(--color-brand-accent-emerald)`)):t<.45?(u.textContent=`Moderate Risk`,u.className=`badge text-[0.65rem] py-0.5 px-2 font-mono bg-brand-accent-amber/20 text-brand-accent-amber`,p&&(p.style.backgroundColor=`var(--color-brand-accent-amber)`)):(u.textContent=`Critical Risk`,u.className=`badge text-[0.65rem] py-0.5 px-2 font-mono bg-brand-accent-ruby/20 text-brand-accent-ruby`,p&&(p.style.backgroundColor=`var(--color-brand-accent-ruby)`)))}catch(e){console.error(`TF Student Inference error:`,e)}}function o(e){let n=window.UniversityDB.getStudents().find(t=>t.id===e);if(!n)return;let r=window.UniversityDB.getDepartments().map(e=>`<option value="${e.code}" ${e.code===n.dept?`selected`:``}>${e.name} (${e.code})</option>`).join(``),i=`
      <form id="edit-student-form" class="max-h-[60vh] overflow-y-auto pr-2">
        <h4 class="mb-3 font-display font-semibold text-brand-primary">Basic Information</h4>
        <div class="grid-2">
          <div class="form-group"><label class="form-label">Full Name</label><input type="text" class="form-control" id="edit-stu-name" value="${n.name}"></div>
          <div class="form-group"><label class="form-label">Email</label><input type="email" class="form-control" id="edit-stu-email" value="${n.email}"></div>
        </div>
        <div class="grid-2">
          <div class="form-group"><label class="form-label">Department</label><select class="form-control" id="edit-stu-dept">${r}</select></div>
          <div class="form-group"><label class="form-label">Semester</label><input type="number" class="form-control" id="edit-stu-sem" min="1" max="8" value="${n.semester}"></div>
        </div>
        <div class="grid-2">
          <div class="form-group"><label class="form-label">GPA</label><input type="number" class="form-control" id="edit-stu-gpa" min="0" max="4" step="0.01" value="${n.gpa}"></div>
          <div class="form-group"><label class="form-label">Status</label>
            <select class="form-control" id="edit-stu-status">
              <option ${n.status===`Active`?`selected`:``}>Active</option>
              <option ${n.status===`On Leave`?`selected`:``}>On Leave</option>
              <option ${n.status===`Graduated`?`selected`:``}>Graduated</option>
            </select>
          </div>
        </div>

        <h4 class="my-4 mt-5 mb-3 font-display font-semibold text-brand-accent-cyan">Personal Details</h4>
        <div class="grid-2">
          <div class="form-group"><label class="form-label">Date of Birth</label><input type="date" class="form-control" id="edit-stu-dob" value="${n.dob||``}"></div>
          <div class="form-group"><label class="form-label">Gender</label>
            <select class="form-control" id="edit-stu-gender">
              <option ${n.gender===`Male`?`selected`:``}>Male</option>
              <option ${n.gender===`Female`?`selected`:``}>Female</option>
              <option ${n.gender===`Other`?`selected`:``}>Other</option>
            </select>
          </div>
        </div>
        <div class="grid-2">
          <div class="form-group"><label class="form-label">Phone</label><input type="text" class="form-control" id="edit-stu-phone" value="${n.phone||``}"></div>
          <div class="form-group"><label class="form-label">Blood Group</label>
            <select class="form-control" id="edit-stu-blood">
              ${[`A+`,`A-`,`B+`,`B-`,`AB+`,`AB-`,`O+`,`O-`].map(e=>`<option ${e===n.bloodGroup?`selected`:``}>${e}</option>`).join(``)}
            </select>
          </div>
        </div>
        <div class="grid-2">
          <div class="form-group"><label class="form-label">Nationality</label><input type="text" class="form-control" id="edit-stu-nationality" value="${n.nationality||``}"></div>
          <div class="form-group"><label class="form-label">Category</label>
            <select class="form-control" id="edit-stu-category">
              ${[`General`,`OBC`,`SC`,`ST`,`International`,`Other`].map(e=>`<option ${e===n.category?`selected`:``}>${e}</option>`).join(``)}
            </select>
          </div>
        </div>
        <div class="form-group"><label class="form-label">Address</label><textarea class="form-control" id="edit-stu-address" rows="2">${n.address||``}</textarea></div>
        <div class="form-group"><label class="form-label">Aadhar / National ID</label><input type="text" class="form-control" id="edit-stu-aadhar" value="${n.aadhar||``}"></div>

        <h4 class="my-4 mt-5 mb-3 font-display font-semibold text-brand-accent-emerald">Guardian / Parent Info</h4>
        <div class="grid-2">
          <div class="form-group"><label class="form-label">Guardian Name</label><input type="text" class="form-control" id="edit-stu-guardian" value="${n.guardianName||``}"></div>
          <div class="form-group"><label class="form-label">Guardian Relation</label>
            <select class="form-control" id="edit-stu-guardianRel">
              ${[`Father`,`Mother`,`Uncle`,`Aunt`,`Sibling`,`Guardian`,`Other`].map(e=>`<option ${e===n.guardianRelation?`selected`:``}>${e}</option>`).join(``)}
            </select>
          </div>
        </div>
        <div class="grid-2">
          <div class="form-group"><label class="form-label">Guardian Phone</label><input type="text" class="form-control" id="edit-stu-guardianPhone" value="${n.guardianPhone||``}"></div>
          <div class="form-group"><label class="form-label">Previous School</label><input type="text" class="form-control" id="edit-stu-prevSchool" value="${n.previousSchool||``}"></div>
        </div>

        <h4 class="my-4 mt-5 mb-3 font-display font-semibold text-brand-accent-amber">Campus & Financial</h4>
        <div class="grid-2">
          <div class="form-group"><label class="form-label">Enrollment Type</label>
            <select class="form-control" id="edit-stu-enrollType">
              ${[`Regular`,`Lateral Entry`,`Transfer`,`International Exchange`].map(e=>`<option ${e===n.enrollmentType?`selected`:``}>${e}</option>`).join(``)}
            </select>
          </div>
          <div class="form-group"><label class="form-label">Admission Date</label><input type="date" class="form-control" id="edit-stu-admDate" value="${n.admissionDate||``}"></div>
        </div>
        <div class="grid-2">
          <div class="form-group"><label class="form-label">Hostel / Residence</label><input type="text" class="form-control" id="edit-stu-hostel" value="${n.hostel||``}"></div>
          <div class="form-group"><label class="form-label">Scholarship</label><input type="text" class="form-control" id="edit-stu-scholarship" value="${n.scholarship||``}"></div>
        </div>
        <div class="grid-2">
          <div class="form-group"><label class="form-label">Total Fee ($)</label><input type="number" class="form-control" id="edit-stu-feeTotal" value="${n.feeTotal}"></div>
          <div class="form-group"><label class="form-label">Fee Paid ($)</label><input type="number" class="form-control" id="edit-stu-feePaid" value="${n.feePaid}"></div>
        </div>
        <div class="form-group"><label class="form-label">Profile Image URL</label><input type="text" class="form-control" id="edit-stu-avatar" value="${n.avatar}"></div>
      </form>
    `;window.App.showModal(`Edit Student — `+n.id,i,`
      <button class="btn btn-secondary" onclick="window.App.closeModal()">Cancel</button>
      <button class="btn btn-sm bg-brand-accent-ruby text-white hover:bg-brand-accent-ruby/80" id="btn-delete-stu">Delete</button>
      <button class="btn btn-primary" id="btn-save-edit-stu">Save All Changes</button>
    `),document.getElementById(`btn-save-edit-stu`).addEventListener(`click`,()=>{let r={name:document.getElementById(`edit-stu-name`).value.trim(),email:document.getElementById(`edit-stu-email`).value.trim(),dept:document.getElementById(`edit-stu-dept`).value,semester:parseInt(document.getElementById(`edit-stu-sem`).value)||n.semester,gpa:parseFloat(document.getElementById(`edit-stu-gpa`).value)||n.gpa,status:document.getElementById(`edit-stu-status`).value,dob:document.getElementById(`edit-stu-dob`).value,gender:document.getElementById(`edit-stu-gender`).value,phone:document.getElementById(`edit-stu-phone`).value.trim(),bloodGroup:document.getElementById(`edit-stu-blood`).value,nationality:document.getElementById(`edit-stu-nationality`).value.trim(),category:document.getElementById(`edit-stu-category`).value,address:document.getElementById(`edit-stu-address`).value.trim(),aadhar:document.getElementById(`edit-stu-aadhar`).value.trim(),guardianName:document.getElementById(`edit-stu-guardian`).value.trim(),guardianRelation:document.getElementById(`edit-stu-guardianRel`).value,guardianPhone:document.getElementById(`edit-stu-guardianPhone`).value.trim(),previousSchool:document.getElementById(`edit-stu-prevSchool`).value.trim(),enrollmentType:document.getElementById(`edit-stu-enrollType`).value,admissionDate:document.getElementById(`edit-stu-admDate`).value,hostel:document.getElementById(`edit-stu-hostel`).value.trim(),scholarship:document.getElementById(`edit-stu-scholarship`).value.trim(),feeTotal:parseInt(document.getElementById(`edit-stu-feeTotal`).value)||n.feeTotal,feePaid:parseInt(document.getElementById(`edit-stu-feePaid`).value)||n.feePaid,avatar:document.getElementById(`edit-stu-avatar`).value.trim()||n.avatar};if(!r.name||!r.email){alert(`Name and Email are mandatory fields.`);return}window.UniversityDB.updateStudent(e,r),fetch(`/api/users/usr_${e.toLowerCase()}`,{method:`PUT`,headers:{"Content-Type":`application/json`},body:JSON.stringify({name:r.name,email:r.email,avatar:r.avatar})}).catch(e=>console.error(`Failed to sync student update to backend:`,e)),window.App.closeModal(),alert(`Student profile updated successfully!`),t()}),document.getElementById(`btn-delete-stu`).addEventListener(`click`,()=>{confirm(`Permanently delete student ${n.name} (${n.id})? This action cannot be undone.`)&&(window.UniversityDB.deleteStudent(e),fetch(`/api/users/usr_${e.toLowerCase()}`,{method:`DELETE`}).catch(e=>console.error(`Failed to sync student deletion to backend:`,e)),window.App.closeModal(),alert(`Student record deleted.`),t())})}function s(){let e=`
      <form id="add-student-form" class="max-h-[60vh] overflow-y-auto pr-2">
        <h4 class="mb-3 font-display font-semibold text-brand-primary">Basic Information</h4>
        <div class="grid-2">
          <div class="form-group"><label class="form-label">Full Name *</label><input type="text" class="form-control" id="add-stu-name" required placeholder="e.g. Rahul Sharma"></div>
          <div class="form-group"><label class="form-label">Email *</label><input type="email" class="form-control" id="add-stu-email" required placeholder="e.g. rahul@modeluni.edu"></div>
        </div>
        <div class="grid-2">
          <div class="form-group"><label class="form-label">Department *</label><select class="form-control" id="add-stu-dept">${window.UniversityDB.getDepartments().map(e=>`<option value="${e.code}">${e.name} (${e.code})</option>`).join(``)}</select></div>
          <div class="form-group"><label class="form-label">Current Semester</label><input type="number" class="form-control" id="add-stu-sem" min="1" max="8" value="1"></div>
        </div>
        <div class="grid-2">
          <div class="form-group"><label class="form-label">Admission GPA</label><input type="number" class="form-control" id="add-stu-gpa" min="0" max="4" step="0.01" value="3.50"></div>
          <div class="form-group"><label class="form-label">Admission Date</label><input type="date" class="form-control" id="add-stu-admDate" value="2026-06-08"></div>
        </div>

        <h4 class="my-4 mt-5 mb-3 font-display font-semibold text-brand-accent-cyan">Personal Details</h4>
        <div class="grid-2">
          <div class="form-group"><label class="form-label">Date of Birth</label><input type="date" class="form-control" id="add-stu-dob"></div>
          <div class="form-group"><label class="form-label">Gender</label>
            <select class="form-control" id="add-stu-gender"><option>Male</option><option>Female</option><option>Other</option></select>
          </div>
        </div>
        <div class="grid-2">
          <div class="form-group"><label class="form-label">Phone Number</label><input type="text" class="form-control" id="add-stu-phone" placeholder="+91-98765-43210"></div>
          <div class="form-group"><label class="form-label">Blood Group</label>
            <select class="form-control" id="add-stu-blood"><option>O+</option><option>O-</option><option>A+</option><option>A-</option><option>B+</option><option>B-</option><option>AB+</option><option>AB-</option></select>
          </div>
        </div>
        <div class="grid-2">
          <div class="form-group"><label class="form-label">Nationality</label><input type="text" class="form-control" id="add-stu-nationality" value="Indian"></div>
          <div class="form-group"><label class="form-label">Category</label>
            <select class="form-control" id="add-stu-category"><option>General</option><option>OBC</option><option>SC</option><option>ST</option><option>International</option><option>Other</option></select>
          </div>
        </div>
        <div class="form-group"><label class="form-label">Full Address</label><textarea class="form-control" id="add-stu-address" rows="2" placeholder="Street, City, State, PIN"></textarea></div>
        <div class="form-group"><label class="form-label">Aadhar / National ID</label><input type="text" class="form-control" id="add-stu-aadhar" placeholder="XXXX-XXXX-XXXX"></div>

        <h4 class="my-4 mt-5 mb-3 font-display font-semibold text-brand-accent-emerald">Guardian / Parent Info</h4>
        <div class="grid-2">
          <div class="form-group"><label class="form-label">Guardian Name</label><input type="text" class="form-control" id="add-stu-guardian" placeholder="Parent / Guardian name"></div>
          <div class="form-group"><label class="form-label">Relation</label>
            <select class="form-control" id="add-stu-guardianRel"><option>Father</option><option>Mother</option><option>Uncle</option><option>Aunt</option><option>Sibling</option><option>Guardian</option><option>Other</option></select>
          </div>
        </div>
        <div class="grid-2">
          <div class="form-group"><label class="form-label">Guardian Phone</label><input type="text" class="form-control" id="add-stu-guardianPhone" placeholder="+91-xxxxx-xxxxx"></div>
          <div class="form-group"><label class="form-label">Previous School / College</label><input type="text" class="form-control" id="add-stu-prevSchool" placeholder="Previous institution name"></div>
        </div>

        <h4 class="my-4 mt-5 mb-3 font-display font-semibold text-brand-accent-amber">Campus & Financial</h4>
        <div class="grid-2">
          <div class="form-group"><label class="form-label">Enrollment Type</label>
            <select class="form-control" id="add-stu-enrollType"><option>Regular</option><option>Lateral Entry</option><option>Transfer</option><option>International Exchange</option></select>
          </div>
          <div class="form-group"><label class="form-label">Hostel / Residence</label><input type="text" class="form-control" id="add-stu-hostel" placeholder="Block A - Room 101 or Day Scholar"></div>
        </div>
        <div class="grid-2">
          <div class="form-group"><label class="form-label">Scholarship</label><input type="text" class="form-control" id="add-stu-scholarship" placeholder="e.g. Merit Scholarship (50%)"></div>
          <div class="form-group"><label class="form-label">Total Fee ($)</label><input type="number" class="form-control" id="add-stu-feeTotal" value="4500"></div>
        </div>
        <div class="form-group"><label class="form-label">Profile Image URL</label><input type="text" class="form-control" id="add-stu-avatar" value="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150"></div>
      </form>
    `;window.App.showModal(`Enroll New Student — Full Admission`,e,`
      <button class="btn btn-secondary" onclick="window.App.closeModal()">Cancel</button>
      <button class="btn btn-primary" id="btn-submit-student">Complete Enrollment</button>
    `),document.getElementById(`btn-submit-student`).addEventListener(`click`,()=>{let e=document.getElementById(`add-stu-name`).value.trim(),n=document.getElementById(`add-stu-email`).value.trim();if(!e||!n){alert(`Full Name and Email are mandatory fields.`);return}let r=`STU`+String(window.UniversityDB.getStudents().length+1).padStart(3,`0`),i={id:r,name:e,email:n,dept:document.getElementById(`add-stu-dept`).value,gpa:parseFloat(document.getElementById(`add-stu-gpa`).value)||3.5,semester:parseInt(document.getElementById(`add-stu-sem`).value)||1,status:`Active`,feePaid:0,feeTotal:parseInt(document.getElementById(`add-stu-feeTotal`).value)||4500,avatar:document.getElementById(`add-stu-avatar`).value||`https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150`,attendance:100,courses:[],dob:document.getElementById(`add-stu-dob`).value||``,gender:document.getElementById(`add-stu-gender`).value,phone:document.getElementById(`add-stu-phone`).value.trim(),bloodGroup:document.getElementById(`add-stu-blood`).value,nationality:document.getElementById(`add-stu-nationality`).value.trim(),category:document.getElementById(`add-stu-category`).value,address:document.getElementById(`add-stu-address`).value.trim(),aadhar:document.getElementById(`add-stu-aadhar`).value.trim(),guardianName:document.getElementById(`add-stu-guardian`).value.trim(),guardianRelation:document.getElementById(`add-stu-guardianRel`).value,guardianPhone:document.getElementById(`add-stu-guardianPhone`).value.trim(),previousSchool:document.getElementById(`add-stu-prevSchool`).value.trim(),admissionDate:document.getElementById(`add-stu-admDate`).value||new Date().toISOString().split(`T`)[0],enrollmentType:document.getElementById(`add-stu-enrollType`).value,hostel:document.getElementById(`add-stu-hostel`).value.trim()||`Day Scholar`,scholarship:document.getElementById(`add-stu-scholarship`).value.trim()||`None`};window.UniversityDB.addStudent(i),fetch(`/api/users`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({id:`usr_${i.id.toLowerCase()}`,name:i.name,email:i.email,role:`student`,password:`${i.name.split(` `)[0]}@${i.id}`,avatar:i.avatar})}).catch(e=>console.error(`Failed to sync student to backend:`,e)),window.App.closeModal(),alert(`Student ${e} enrolled successfully!\nStudent ID: ${r}`),t()})}return{render:e,applyFilters:t,openAddStudentModal:s,openStudentDetailModal:i}})(),window.facultyView=(function(){function e(e){e.innerHTML=`
      <div class="page-header animate-fade-in flex items-center justify-between border-b border-brand-border/30 pb-4 mb-6">
        <div>
          <h1 class="text-3xl font-bold font-display tracking-tight bg-gradient-to-r from-white via-slate-100 to-brand-primary bg-clip-text text-transparent">Faculty Directory</h1>
          <p class="text-sm text-brand-text-muted mt-1">Manage credentials, departments, research specializations, and academic teaching workloads.</p>
        </div>
        <button class="btn btn-primary" id="btn-add-faculty">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" y1="11" x2="22" y2="11"/><line x1="19" y1="8" x2="19" y2="14"/></svg>
          <span>Enroll Faculty</span>
        </button>
      </div>

      <!-- Search Controls -->
      <div class="card animate-fade-in delay-1 bg-brand-bg-secondary/40 backdrop-blur-md border border-brand-border/50 p-6 rounded-2xl mb-6">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          <div class="form-group mb-0 md:col-span-2">
            <label class="form-label text-xs font-bold text-brand-text-muted uppercase tracking-wider pl-1">Search Faculty Directory</label>
            <input type="text" class="form-control mt-1 w-full" placeholder="Search by name, email, or department" id="faculty-search">
          </div>
          <div class="form-group mb-0">
            <label class="form-label text-xs font-bold text-brand-text-muted uppercase tracking-wider pl-1">Department</label>
            <select class="form-control mt-1 w-full" id="faculty-dept-filter">
              <option value="ALL">All Departments</option>
              <option value="CS">Computer Science</option>
              <option value="EE">Electrical Engineering</option>
              <option value="ME">Mechanical Engineering</option>
              <option value="BI">Bioinformatics</option>
              <option value="BA">Business Administration</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Faculty Workload Chart & Visual Overview -->
      <div class="card animate-fade-in delay-2 bg-brand-bg-secondary/40 backdrop-blur-md border border-brand-border/50 p-6 rounded-2xl mb-6">
        <h3 class="mb-2 font-display text-lg font-bold text-white">Workload Management Dashboard</h3>
        <p class="text-brand-text-muted mb-5 text-[0.85rem]">Maximum weekly teaching limit: 18 hours. Values over 15 hours represent heavy workload.</p>
        <div class="chart-wrapper h-[200px]">
          <canvas id="faculty-workload-chart"></canvas>
        </div>
      </div>

      <!-- Faculty Directory Grid -->
      <div class="grid-3 animate-fade-in delay-3 mt-6" id="faculty-cards-container">
        <!-- Loaded dynamically -->
      </div>
    `,document.getElementById(`faculty-search`).addEventListener(`input`,t),document.getElementById(`faculty-dept-filter`).addEventListener(`change`,t),document.getElementById(`btn-add-faculty`).addEventListener(`click`,s),t()}function t(){let e=document.getElementById(`faculty-search`).value.toLowerCase().trim(),t=document.getElementById(`faculty-dept-filter`).value,r=window.UniversityDB.getFaculty().filter(n=>{let r=n.name.toLowerCase().includes(e)||n.email.toLowerCase().includes(e)||n.id.toLowerCase().includes(e),i=t===`ALL`||n.dept===t;return r&&i});n(r),i(r)}function n(e){let t=document.getElementById(`faculty-cards-container`);if(t){if(e.length===0){t.innerHTML=`
        <div class="card col-span-full text-center text-brand-text-muted p-8">
          No matching faculty listings found in database.
        </div>
      `;return}t.innerHTML=e.map(e=>{let t=Math.min(e.workload/18*100,100),n=`var(--color-brand-primary)`;n=e.workload>15?`var(--color-brand-accent-ruby)`:e.workload>12?`var(--color-brand-accent-amber)`:`var(--color-brand-accent-emerald)`;let r=window.UniversityDB.getCourses().filter(t=>t.facultyId===e.id),i=window.UniversityDB.getStudents(),a=0,o=0;r.forEach(e=>{let t=i.filter(t=>t.courses.includes(e.code));t.length===0&&(t=i.filter(t=>t.dept===e.dept)),t.forEach(e=>{a+=e.attendance||0,o++})});let s=o>0?Math.round(a/o):90;return`
        <div class="card flex flex-col gap-4">
          <div class="flex gap-4 items-center">
            <img src="${e.avatar}" class="w-13 h-13 rounded-full object-cover border border-brand-border">
            <div>
              <h4 class="m-0 font-display text-base font-semibold">${e.name}</h4>
              <span class="text-[0.75rem] text-brand-text-muted font-medium">${e.designation} (${e.dept})</span>
            </div>
          </div>
          
          <div class="text-[0.85rem] text-brand-text-muted">
            <div><strong>Email:</strong> ${e.email}</div>
            <div><strong>ID:</strong> <code>${e.id}</code></div>
            <div><strong>Class Attendance:</strong> <span class="font-bold ${s<75?`text-brand-accent-ruby`:s<85?`text-brand-accent-amber`:`text-brand-accent-emerald`}">${s}%</span></div>
          </div>

          <!-- Workload Progress bar -->
          <div>
            <div class="flex justify-between text-[0.8rem] mb-1">
              <span>Workload Assigned</span>
              <strong>${e.workload} hrs / wk</strong>
            </div>
            <div class="h-1.5 bg-brand-bg-tertiary rounded-full overflow-hidden">
              <div class="h-full" style="width: ${t}%; background-color: ${n};"></div>
            </div>
          </div>

          <div class="flex gap-2 mt-auto">
            <button class="btn btn-secondary btn-sm assign-class-btn flex-1" data-id="${e.id}">Class Workload</button>
            <button class="btn btn-secondary btn-sm" onclick="alert('Viewing publications...')">Research</button>
          </div>
        </div>
      `}).join(``),t.querySelectorAll(`.assign-class-btn`).forEach(e=>{e.addEventListener(`click`,()=>{a(e.getAttribute(`data-id`))})})}}let r=null;function i(e){let t=document.getElementById(`faculty-workload-chart`);if(!t)return;r&&r.destroy();let n=e.map(e=>e.name.split(` `).slice(1).join(` `)),i=e.map(e=>e.workload),a=e.map(e=>e.workload>15?`#f43f5e`:e.workload>12?`#f59e0b`:`#10b981`);r=new Chart(t,{type:`bar`,data:{labels:n,datasets:[{label:`Weekly teaching hours`,data:i,backgroundColor:a,borderColor:`rgba(255, 255, 255, 0.05)`,borderWidth:1,borderRadius:4}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:!1}},scales:{y:{grid:{color:`rgba(255, 255, 255, 0.05)`},ticks:{color:`#94a3b8`},max:20},x:{grid:{display:!1},ticks:{color:`#94a3b8`}}}}})}function a(e){let n=window.UniversityDB.getFaculty().find(t=>t.id===e);if(!n)return;let r=`
      <p class="mb-4 text-brand-text-muted">Adjust workload allocations and curriculum credits assignment for <strong>${n.name}</strong>.</p>
      <div class="form-group">
        <label class="form-label">Current Weekly Lecture Workload (Hours)</label>
        <input type="number" class="form-control" id="mod-fac-workload" value="${n.workload}" min="0" max="24">
      </div>
      
      <h4 class="mt-5 mb-3 text-base font-semibold">Assigned Course Catalog</h4>
      <ul class="pl-5 text-brand-text-main list-disc mb-4">
        ${n.courses.map(e=>{let t=window.UniversityDB.getCourses().find(t=>t.code===e);return`<li><code>${e}</code> - ${t?t.title:`Research Project`}</li>`}).join(``)}
      </ul>

      <!-- AI Workload & Satisfaction Optimizer -->
      <div class="card mt-4 p-4 bg-brand-bg-tertiary border border-brand-border">
        <div class="flex items-center justify-between mb-3 pb-2 border-b border-brand-border/40">
          <div class="flex items-center gap-2">
            <span class="w-2.5 h-2.5 rounded-full bg-brand-accent-amber animate-pulse"></span>
            <span class="text-xs font-bold uppercase tracking-wider text-brand-text-main font-display">AI Workload Predictor</span>
          </div>
          <span class="badge text-[0.65rem] py-0.5 px-2 font-mono bg-brand-accent-emerald/20 text-brand-accent-emerald" id="fac-ai-status">Optimal</span>
        </div>
        <div class="grid grid-cols-2 gap-3 text-xs text-brand-text-muted">
          <div>
            <span class="text-[0.7rem] text-brand-text-subtle">Predicted Student Rating:</span>
            <div class="font-bold text-brand-text-main font-mono text-sm mt-0.5" id="fac-ai-rating">Calculating...</div>
          </div>
          <div>
            <span class="text-[0.7rem] text-brand-text-subtle">Optimal Load Recommendation:</span>
            <div class="font-bold text-brand-text-main font-mono text-sm mt-0.5" id="fac-ai-recommend">12 hrs/wk</div>
          </div>
        </div>
      </div>
    `;window.App.showModal(`Modify Academic Workload`,r,`
      <button class="btn btn-secondary" onclick="window.App.closeModal()">Cancel</button>
      <button class="btn btn-primary" id="btn-save-workload">Save Changes</button>
    `);let i=document.getElementById(`mod-fac-workload`);i&&i.addEventListener(`input`,e=>{o(n,parseInt(e.target.value)||0)}),o(n,n.workload),document.getElementById(`btn-save-workload`).addEventListener(`click`,()=>{let e=parseInt(document.getElementById(`mod-fac-workload`).value);!isNaN(e)&&e>=0&&e<=24?(n.workload=e,window.App.closeModal(),alert(`Workload parameters updated successfully!`),t()):alert(`Please enter a valid workload hours number.`)})}async function o(e,t){if(typeof tf>`u`){let e=document.getElementById(`fac-ai-rating`);e&&(e.textContent=`TF Unavailable`);return}try{let r=e.designation===`Professor`?1:.5,i=[t/18,e.courses.length/5,r],a=tf.sequential();a.add(tf.layers.dense({units:3,activation:`tanh`,inputShape:[3]})),a.add(tf.layers.dense({units:1}));let o=tf.tensor2d([[-1.2],[-.4],[.8]]),s=tf.tensor1d([.8]);a.layers[1].setWeights([o,s]);let c=tf.tensor2d([i],[1,3]),l=a.predict(c),u=(await l.data())[0];var n=Math.max(1,Math.min(5,1+u*4));t>16?n=Math.max(1,Math.min(n,3.2)):t>=10&&t<=14&&(n=Math.min(5,n+.5)),c.dispose(),l.dispose(),o.dispose(),s.dispose(),a.dispose();let d=document.getElementById(`fac-ai-rating`),f=document.getElementById(`fac-ai-status`),p=document.getElementById(`fac-ai-recommend`);d&&(d.textContent=n.toFixed(2)+` / 5.0`),f&&(t>15?(f.textContent=`Heavy Overload`,f.className=`badge text-[0.65rem] py-0.5 px-2 font-mono bg-brand-accent-ruby/20 text-brand-accent-ruby`):t<6?(f.textContent=`Under-utilized`,f.className=`badge text-[0.65rem] py-0.5 px-2 font-mono bg-brand-accent-cyan/20 text-brand-accent-cyan`):(f.textContent=`Optimal Load`,f.className=`badge text-[0.65rem] py-0.5 px-2 font-mono bg-brand-accent-emerald/20 text-brand-accent-emerald`)),p&&(p.textContent=e.designation===`Professor`?`12 hrs / wk`:`15 hrs / wk`)}catch(e){console.error(`TF Faculty optimizer failed:`,e)}}function s(){window.App.showModal(`Add Faculty Member`,`
      <form id="add-faculty-form" class="max-h-[60vh] overflow-y-auto pr-2">
        <div class="form-group">
          <label class="form-label">Full Name *</label>
          <input type="text" class="form-control" id="add-fac-name" required placeholder="e.g. Dr. Ada Lovelace">
        </div>
        <div class="form-group">
          <label class="form-label">Email Address *</label>
          <input type="email" class="form-control" id="add-fac-email" required placeholder="e.g. ada@modeluni.edu">
        </div>
        <div class="grid-2">
          <div class="form-group">
            <label class="form-label">Department *</label>
            <select class="form-control" id="add-fac-dept">
              <option value="CS">Computer Science</option>
              <option value="EE">Electrical Engineering</option>
              <option value="ME">Mechanical Engineering</option>
              <option value="BI">Bioinformatics</option>
              <option value="BA">Business Administration</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Designation *</label>
            <select class="form-control" id="add-fac-designation">
              <option>Professor</option>
              <option>Associate Professor</option>
              <option>Assistant Professor</option>
              <option>Lecturer</option>
              <option>Research Fellow</option>
            </select>
          </div>
        </div>
        <div class="grid-2">
          <div class="form-group">
            <label class="form-label">Initial Workload (Hours/Week)</label>
            <input type="number" class="form-control" id="add-fac-workload" min="0" max="24" value="12">
          </div>
          <div class="form-group">
            <label class="form-label">Phone Number</label>
            <input type="text" class="form-control" id="add-fac-phone" placeholder="+1-555-0199">
          </div>
        </div>
        <div class="grid-2">
          <div class="form-group">
            <label class="form-label">Date of Joining</label>
            <input type="date" class="form-control" id="add-fac-joining" value="2026-06-09">
          </div>
          <div class="form-group">
            <label class="form-label">Profile Image URL</label>
            <input type="text" class="form-control" id="add-fac-avatar" value="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150">
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">Academic Biography & Research Brief</label>
          <textarea class="form-control" id="add-fac-bio" rows="3" placeholder="Brief details about academic background and research focus areas..."></textarea>
        </div>
      </form>
    `,`
      <button class="btn btn-secondary" onclick="window.App.closeModal()">Cancel</button>
      <button class="btn btn-primary" id="btn-submit-faculty">Add Member</button>
    `),document.getElementById(`btn-submit-faculty`).addEventListener(`click`,()=>{let e=document.getElementById(`add-fac-name`).value.trim(),n=document.getElementById(`add-fac-email`).value.trim(),r=document.getElementById(`add-fac-dept`).value,i=document.getElementById(`add-fac-designation`).value,a=parseInt(document.getElementById(`add-fac-workload`).value)||12,o=document.getElementById(`add-fac-phone`).value.trim(),s=document.getElementById(`add-fac-joining`).value,c=document.getElementById(`add-fac-avatar`).value.trim(),l=document.getElementById(`add-fac-bio`).value.trim();if(!e||!n){alert(`Please enter both name and email.`);return}let u=window.UniversityDB.getFaculty(),d=`FAC`+String(u.length+1).padStart(3,`0`),f={id:d,name:e,email:n,dept:r,designation:i,workload:a,courses:[],avatar:c||`https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150`,phone:o,joiningDate:s,bio:l};u.push(f),window.App.closeModal(),alert(`Faculty member ${e} enrolled with ID ${d}`),t()})}return{render:e,applySearch:t,openAssignClassModal:a}})(),window.coursesView=(function(){function e(e){e.innerHTML=`
      <div class="page-header animate-fade-in flex items-center justify-between border-b border-brand-border/30 pb-4 mb-6">
        <div>
          <h1 class="text-3xl font-bold font-display tracking-tight bg-gradient-to-r from-white via-slate-100 to-brand-primary bg-clip-text text-transparent">Course Catalog</h1>
          <p class="text-sm text-brand-text-muted mt-1">Browse semester curricula, assign credits, verify course capacities, and check active sections.</p>
        </div>
        <button class="btn btn-primary" id="btn-add-course">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M5 12h14"/></svg>
          <span>Create New Course</span>
        </button>
      </div>

      <!-- Search Filters -->
      <div class="card animate-fade-in delay-1 bg-brand-bg-secondary/40 backdrop-blur-md border border-brand-border/50 p-6 rounded-2xl mb-6">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          <div class="form-group mb-0 md:col-span-2">
            <label class="form-label text-xs font-bold text-brand-text-muted uppercase tracking-wider pl-1">Search Courses</label>
            <input type="text" class="form-control mt-1 w-full" placeholder="Search by course code, title, or instructor..." id="course-search">
          </div>
          <div class="form-group mb-0">
            <label class="form-label text-xs font-bold text-brand-text-muted uppercase tracking-wider pl-1">Department Stream</label>
            <select class="form-control mt-1 w-full" id="course-dept-filter">
              <option value="ALL">All Departments</option>
              <option value="CS">Computer Science</option>
              <option value="EE">Electrical Engineering</option>
              <option value="ME">Mechanical Engineering</option>
              <option value="BI">Bioinformatics</option>
              <option value="BA">Business Administration</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Course Cards Container -->
      <div class="grid-3 animate-fade-in delay-2 mt-6" id="courses-grid-body">
        <!-- Loaded dynamically -->
      </div>
    `,document.getElementById(`course-search`).addEventListener(`input`,t),document.getElementById(`course-dept-filter`).addEventListener(`change`,t),document.getElementById(`btn-add-course`).addEventListener(`click`,a),t()}function t(){let e=document.getElementById(`course-search`).value.toLowerCase().trim(),t=document.getElementById(`course-dept-filter`).value;n(window.UniversityDB.getCourses().filter(n=>{let r=window.UniversityDB.getFaculty().find(e=>e.id===n.facultyId),i=r?r.name.toLowerCase():``,a=n.code.toLowerCase().includes(e)||n.title.toLowerCase().includes(e)||i.includes(e),o=t===`ALL`||n.dept===t;return a&&o}))}function n(e){let t=document.getElementById(`courses-grid-body`);if(t){if(e.length===0){t.innerHTML=`
        <div class="card col-span-full text-center text-brand-text-muted p-8">
          No matching courses found in the current academic calendar catalog.
        </div>
      `;return}t.innerHTML=e.map(e=>{let t=window.UniversityDB.getFaculty().find(t=>t.id===e.facultyId),n=t?t.name:`Unassigned`,r=Math.min(e.enrolledCount/e.maxEnrollment*100,100),i=`text-brand-accent-emerald`;r>90?i=`text-brand-accent-ruby`:r>75&&(i=`text-brand-accent-amber`);let a=window.UniversityDB.getStudents(),o=a.filter(t=>t.courses.includes(e.code));o.length===0&&(o=a.filter(t=>t.dept===e.dept));let s=o.length>0?Math.round(o.reduce((e,t)=>e+(t.attendance||0),0)/o.length):90;return`
        <div class="card flex flex-col gap-4">
          <div class="flex justify-between items-start">
            <code class="text-lg text-brand-primary font-bold">${e.code}</code>
            <span class="badge badge-info">${e.credits} Credits</span>
          </div>
          
          <div>
            <h4 class="m-0 mb-1.5 font-display text-lg font-bold">${e.title}</h4>
            <span class="text-[0.75rem] text-brand-text-muted">Instructor: <strong>${n}</strong></span>
          </div>

          <!-- Enrollment stats progress -->
          <div>
            <div class="flex justify-between text-[0.8rem] mb-1">
              <span>Enrolled Seats</span>
              <strong class="${i}">${e.enrolledCount} / ${e.maxEnrollment}</strong>
            </div>
            <div class="h-1.5 bg-brand-bg-tertiary rounded-full overflow-hidden">
              <div class="h-full bg-brand-primary" style="width: ${r}%;"></div>
            </div>
          </div>

          <!-- Attendance stats progress -->
          <div>
            <div class="flex justify-between text-[0.8rem] mb-1">
              <span>Avg Class Attendance</span>
              <strong class="${s<75?`text-brand-accent-ruby`:s<85?`text-brand-accent-amber`:`text-brand-accent-emerald`}">${s}%</strong>
            </div>
            <div class="h-1.5 bg-brand-bg-tertiary rounded-full overflow-hidden">
              <div class="h-full bg-brand-accent-cyan" style="width: ${s}%;"></div>
            </div>
          </div>

          <div class="flex justify-between items-center mt-auto pt-2.5 border-t border-brand-border">
            <span class="text-[0.8rem] text-brand-text-subtle">Department: ${e.dept}</span>
            <button class="btn btn-secondary btn-sm syllabus-btn" data-code="${e.code}">Syllabus</button>
          </div>
        </div>
      `}).join(``),t.querySelectorAll(`.syllabus-btn`).forEach(e=>{e.addEventListener(`click`,()=>{r(e.getAttribute(`data-code`))})})}}function r(e){let t=window.UniversityDB.getCourses().find(t=>t.code===e);if(!t)return;let n=window.UniversityDB.getFaculty().find(e=>e.id===t.facultyId),r=n?n.name:`TBD`,a=`
      <h3 class="font-display text-lg font-bold mb-2">${t.title}</h3>
      <p class="text-brand-text-muted text-[0.875rem] mb-5">Code: <code>${t.code}</code> | Dept: ${t.dept} | Credits: ${t.credits}</p>
      
      <h4 class="mb-2.5 text-base font-semibold">Course Description</h4>
      <p class="text-brand-text-main text-[0.9rem] leading-relaxed mb-5">
        This academic course covers modern concepts of ${t.title.toLowerCase()} inside the college syllabus. Students will understand core practices, theoretical bounds, build assignments, and review real-world implementations led by ${r}.
      </p>

      <h4 class="mb-2.5 text-base font-semibold">Weekly Syllabus Outline</h4>
      <div class="flex flex-col gap-2.5 mb-4">
        <div class="p-2.5 bg-brand-bg-tertiary rounded-lg border border-brand-border">
          <strong>Weeks 1-4:</strong> Fundamental Theories & Systems Overview.
        </div>
        <div class="p-2.5 bg-brand-bg-tertiary rounded-lg border border-brand-border">
          <strong>Weeks 5-8:</strong> Core Architectural Implementations & Lab Projects.
        </div>
        <div class="p-2.5 bg-brand-bg-tertiary rounded-lg border border-brand-border">
          <strong>Weeks 9-12:</strong> Advanced Topics, Integrations & Final Seminar Review.
        </div>
      </div>

      <!-- AI Course Registration Demand Predictor -->
      <div class="card mt-4 p-4 bg-brand-bg-tertiary border border-brand-border">
        <div class="flex items-center justify-between mb-3 pb-2 border-b border-brand-border/40">
          <div class="flex items-center gap-2">
            <span class="w-2.5 h-2.5 rounded-full bg-brand-primary animate-pulse"></span>
            <span class="text-xs font-bold uppercase tracking-wider text-brand-text-main font-display">AI Registration Demand Predictor</span>
          </div>
          <span class="badge text-[0.65rem] py-0.5 px-2 font-mono bg-brand-accent-emerald/20 text-brand-accent-emerald" id="course-ai-demand-status">Stable Demand</span>
        </div>
        <div class="grid grid-cols-2 gap-3 text-xs text-brand-text-muted">
          <div>
            <span class="text-[0.7rem] text-brand-text-subtle">Predicted Registration Demand:</span>
            <div class="font-bold text-brand-text-main font-mono text-sm mt-0.5" id="course-ai-demand-pct">Calculating...</div>
          </div>
          <div>
            <span class="text-[0.7rem] text-brand-text-subtle">Target Semester Seat Cap:</span>
            <div class="font-bold text-brand-text-main font-mono text-sm mt-0.5" id="course-ai-demand-cap">${t.maxEnrollment} seats</div>
          </div>
        </div>
      </div>
    `;window.App.showModal(`Academic Course Syllabus`,a,`<button class="btn btn-secondary" onclick="window.App.closeModal()">Close Window</button>`),i(t)}async function i(e){if(typeof tf>`u`){let e=document.getElementById(`course-ai-demand-pct`);e&&(e.textContent=`TF Unavailable`);return}try{let n=e.dept===`CS`?1:.5,r=[e.credits/5,e.enrolledCount/e.maxEnrollment,n],i=tf.sequential();i.add(tf.layers.dense({units:3,activation:`sigmoid`,inputShape:[3]})),i.add(tf.layers.dense({units:1}));let a=tf.tensor2d([[.5],[1.5],[.8]]),o=tf.tensor1d([.2]);i.layers[1].setWeights([a,o]);let s=tf.tensor2d([r],[1,3]),c=i.predict(s),l=(await c.data())[0];var t=Math.round(e.maxEnrollment*(.6+l*.6));t=Math.max(10,Math.min(120,t)),s.dispose(),c.dispose(),a.dispose(),o.dispose(),i.dispose();let u=document.getElementById(`course-ai-demand-pct`),d=document.getElementById(`course-ai-demand-status`);u&&(u.textContent=t+` students`),d&&(t>=e.maxEnrollment*.9?(d.textContent=`High Demand Alert`,d.className=`badge text-[0.65rem] py-0.5 px-2 font-mono bg-brand-accent-ruby/20 text-brand-accent-ruby`):t>=e.maxEnrollment*.6?(d.textContent=`Stable Demand`,d.className=`badge text-[0.65rem] py-0.5 px-2 font-mono bg-brand-accent-emerald/20 text-brand-accent-emerald`):(d.textContent=`Low Demand Forecast`,d.className=`badge text-[0.65rem] py-0.5 px-2 font-mono bg-brand-accent-amber/20 text-brand-accent-amber`))}catch(e){console.error(`TF Course inference failed:`,e)}}function a(){let e=`
      <form id="add-course-form" class="max-h-[60vh] overflow-y-auto pr-2">
        <div class="form-group">
          <label class="form-label">Course Title *</label>
          <input type="text" class="form-control" id="add-c-title" placeholder="e.g. Distributed Operating Systems" required>
        </div>
        <div class="grid-2">
          <div class="form-group">
            <label class="form-label">Course Code *</label>
            <input type="text" class="form-control" id="add-c-code" placeholder="e.g. CS420" required>
          </div>
          <div class="form-group">
            <label class="form-label">Credits *</label>
            <input type="number" class="form-control" id="add-c-credits" min="1" max="5" value="3" required>
          </div>
        </div>
        <div class="grid-2">
          <div class="form-group">
            <label class="form-label">Department Stream *</label>
            <select class="form-control" id="add-c-dept">
              <option value="CS">Computer Science</option>
              <option value="EE">Electrical Engineering</option>
              <option value="ME">Mechanical Engineering</option>
              <option value="BI">Bioinformatics</option>
              <option value="BA">Business Administration</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Instructor</label>
            <select class="form-control" id="add-c-instructor">
              ${window.UniversityDB.getFaculty().map(e=>`<option value="${e.id}">${e.name}</option>`).join(``)}
            </select>
          </div>
        </div>
        <div class="grid-2">
          <div class="form-group">
            <label class="form-label">Maximum Class Intake (Seats)</label>
            <input type="number" class="form-control" id="add-c-max" value="60" min="10" max="150">
          </div>
          <div class="form-group">
            <label class="form-label">Course Status</label>
            <select class="form-control" id="add-c-status">
              <option value="Active">Active</option>
              <option value="Pending">Pending</option>
              <option value="Archive">Archive</option>
            </select>
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">Course Description</label>
          <textarea class="form-control" id="add-c-desc" rows="3" placeholder="Provide a brief syllabus description and course overview..."></textarea>
        </div>
      </form>
    `;window.App.showModal(`Create Academic Course`,e,`
      <button class="btn btn-secondary" onclick="window.App.closeModal()">Cancel</button>
      <button class="btn btn-primary" id="btn-submit-course">Publish Course</button>
    `),document.getElementById(`btn-submit-course`).addEventListener(`click`,()=>{let e=document.getElementById(`add-c-title`).value.trim(),n=document.getElementById(`add-c-code`).value.trim(),r=parseInt(document.getElementById(`add-c-credits`).value)||3,i=document.getElementById(`add-c-dept`).value,a=document.getElementById(`add-c-instructor`).value,o=parseInt(document.getElementById(`add-c-max`).value)||60,s=document.getElementById(`add-c-status`).value,c=document.getElementById(`add-c-desc`).value.trim();if(!e||!n){alert(`Please provide course title and course code details.`);return}let l=window.UniversityDB.getCourses();if(l.some(e=>e.code.toUpperCase()===n.toUpperCase())){alert(`Course code ${n} already exists in the registry.`);return}let u={code:n.toUpperCase(),title:e,dept:i,credits:r,facultyId:a,maxEnrollment:o,enrolledCount:0,status:s,description:c};l.push(u),window.App.closeModal(),alert(`Course "${e}" created successfully!`),t()})}return{render:e,applyFilters:t,openSyllabusModal:r}})(),window.attendanceView=(function(){function e(e){e.innerHTML=`
      <div class="page-header animate-fade-in flex items-center justify-between border-b border-brand-border/30 pb-4 mb-6">
        <div>
          <h1 class="text-3xl font-bold font-display tracking-tight bg-gradient-to-r from-white via-slate-100 to-brand-primary bg-clip-text text-transparent">Attendance & Weekly Schedule</h1>
          <p class="text-sm text-brand-text-muted mt-1">Mark daily student attendances, view department timetables, and monitor academic participation metrics.</p>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6 animate-fade-in delay-1">
        
        <!-- Attendance Sheet Panel -->
        <div class="card bg-brand-bg-secondary/40 backdrop-blur-md border border-brand-border/50 p-6 rounded-2xl">
          <h3 class="mb-4 font-display text-lg font-bold text-white">Register Session Attendance</h3>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
            <div class="form-group mb-0">
              <label class="form-label text-xs font-bold text-brand-text-muted uppercase tracking-wider pl-1">Select Course Section</label>
              <select class="form-control mt-1 w-full" id="attendance-course-select">
                ${window.UniversityDB.getCourses().filter(e=>e.status===`Active`).map(e=>`<option value="${e.code}">${e.code} - ${e.title}</option>`).join(``)}
              </select>
            </div>
            <div class="form-group mb-0">
              <label class="form-label text-xs font-bold text-brand-text-muted uppercase tracking-wider pl-1">Session Date</label>
              <input type="date" class="form-control mt-1 w-full" id="attendance-date" value="2026-06-08">
            </div>
          </div>

          <div class="max-h-[380px] overflow-y-auto border border-brand-border/50 rounded-xl bg-brand-bg-primary/50 p-3 mb-5">
            <table class="w-full border-collapse">
              <thead>
                <tr>
                  <th class="p-2.5 text-[0.75rem] border-b border-brand-border/50">Student Profile</th>
                  <th class="p-2.5 text-[0.75rem] text-center border-b border-brand-border/50">Mark Present</th>
                </tr>
              </thead>
              <tbody id="attendance-student-list">
                <!-- Loaded dynamically on course change -->
              </tbody>
            </table>
          </div>

          <button class="btn btn-primary w-full" id="btn-save-attendance">Commit Session Attendance</button>
        </div>

        <!-- Weekly Timetable Grid -->
        <div class="card bg-brand-bg-secondary/40 backdrop-blur-md border border-brand-border/50 p-6 rounded-2xl">
          <h3 class="mb-4 font-display text-lg font-bold text-white">Campus Timetable Schedule</h3>
          <p class="text-brand-text-muted text-[0.85rem] mb-4">Standard academic calendar slots (Monday - Friday).</p>
          
          <div class="flex flex-col gap-3">
            <div class="p-3.5 border border-brand-border/60 rounded-xl flex justify-between items-center bg-brand-primary/5 transition-all duration-200 hover:border-brand-primary/45">
              <div>
                <strong class="text-brand-primary font-semibold text-xs uppercase tracking-wider">Monday (09:00 AM - 11:00 AM)</strong>
                <div class="text-sm font-medium text-white mt-1">CS101 - Intro Programming (Hall A)</div>
              </div>
              <span class="badge badge-success text-[0.75rem]">Active</span>
            </div>
            
            <div class="p-3.5 border border-brand-border/60 rounded-xl flex justify-between items-center transition-all duration-200 hover:border-brand-accent-cyan/45">
              <div>
                <strong class="text-brand-accent-cyan font-semibold text-xs uppercase tracking-wider">Tuesday (11:30 AM - 01:30 PM)</strong>
                <div class="text-sm font-medium text-white mt-1">EE201 - Signals and Systems (Hall B)</div>
              </div>
              <span class="badge badge-success text-[0.75rem]">Active</span>
            </div>

            <div class="p-3.5 border border-brand-border/60 rounded-xl flex justify-between items-center transition-all duration-200 hover:border-brand-accent-amber/45">
              <div>
                <strong class="text-brand-accent-amber font-semibold text-xs uppercase tracking-wider">Wednesday (02:00 PM - 04:00 PM)</strong>
                <div class="text-sm font-medium text-white mt-1">ME102 - Engineering Thermodynamics (Hall C)</div>
              </div>
              <span class="badge badge-success text-[0.75rem]">Active</span>
            </div>

            <div class="p-3.5 border border-brand-border/60 rounded-xl flex justify-between items-center transition-all duration-200 hover:border-brand-primary/45">
              <div>
                <strong class="text-brand-primary font-semibold text-xs uppercase tracking-wider">Thursday (09:00 AM - 11:00 AM)</strong>
                <div class="text-sm font-medium text-white mt-1">CS202 - Data Structures (Lab 3)</div>
              </div>
              <span class="badge badge-success text-[0.75rem]">Active</span>
            </div>

            <div class="p-3.5 border border-brand-border/60 rounded-xl flex justify-between items-center transition-all duration-200 hover:border-brand-accent-emerald/45">
              <div>
                <strong class="text-brand-accent-emerald font-semibold text-xs uppercase tracking-wider">Friday (10:00 AM - 12:00 PM)</strong>
                <div class="text-sm font-medium text-white mt-1">BI101 - Biotechnology Basics (BI Lab)</div>
              </div>
              <span class="badge badge-success text-[0.75rem]">Active</span>
            </div>
          </div>
        </div>

      </div>

      <!-- AI Attendance Forecast Panel -->
      <div class="card bg-brand-bg-secondary/40 backdrop-blur-md border border-brand-border/50 p-6 rounded-2xl mt-6 animate-fade-in delay-2">
        <h3 class="mb-4 font-display text-lg font-bold text-white">AI Attendance & Class Participation Forecast</h3>
        <p class="text-brand-text-muted text-[0.85rem] mb-4 font-normal">Predicting class participation probabilities using a dynamic TensorFlow.js neural network trained on weekly history logs.</p>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="md:col-span-2 chart-wrapper h-[220px]">
            <canvas id="attendance-forecast-chart"></canvas>
          </div>
          <div class="flex flex-col gap-4 p-5 rounded-xl border border-brand-border/60 bg-brand-bg-tertiary/50">
            <h4 class="text-xs font-semibold uppercase tracking-wider text-white font-display pb-2 border-b border-brand-border/40">Projection Summary</h4>
            <div class="text-xs text-brand-text-muted flex flex-col gap-3">
              <div class="flex justify-between items-center">
                <span>Predicted Weekly Peak:</span>
                <strong class="text-brand-accent-emerald font-mono text-sm" id="attend-ai-peak">Calculating...</strong>
              </div>
              <div class="flex justify-between items-center">
                <span>Predicted Weekly Dip:</span>
                <strong class="text-brand-accent-ruby font-mono text-sm" id="attend-ai-dip">Calculating...</strong>
              </div>
              <div class="flex justify-between border-t border-brand-border/30 pt-3 items-center">
                <span>Average Attendance Projection:</span>
                <strong class="text-brand-primary font-mono text-base font-bold" id="attend-ai-avg">Calculating...</strong>
              </div>
            </div>
            <button class="btn btn-secondary btn-sm mt-auto w-full font-bold" id="btn-recalc-attend-ai">Re-run AI Projection</button>
          </div>
        </div>
      </div>
    `;let n=document.getElementById(`attendance-course-select`);n&&(n.addEventListener(`change`,()=>{t(n.value)}),t(n.value));let i=e.querySelector(`#btn-recalc-attend-ai`);i&&i.addEventListener(`click`,()=>{r(e)}),setTimeout(()=>{r(e)},200),document.getElementById(`btn-save-attendance`).addEventListener(`click`,()=>{let e=n.value,t=document.getElementById(`attendance-date`).value,r=document.querySelectorAll(`.attendance-checkbox`),i=0;r.forEach(e=>{let t=e.getAttribute(`data-id`),n=e.checked;n&&i++;let r=window.UniversityDB.getStudents().find(e=>e.id===t);if(r){let e=r.attendance;n&&e<100?r.attendance=Math.min(100,Math.round(e+(100-e)*.05)):!n&&e>0&&(r.attendance=Math.max(0,Math.round(e-e*.05)))}}),alert(`Attendance recorded for ${t}! Course: ${e}.\n${i} students marked present.`)})}function t(e){let t=document.getElementById(`attendance-student-list`);if(!t)return;let n=window.UniversityDB.getStudents(),r=window.UniversityDB.getCourses().find(t=>t.code===e);if(!r)return;let i=n.filter(t=>t.courses.includes(e));if(i.length===0&&(i=n.filter(e=>e.dept===r.dept)),i.length===0){t.innerHTML=`
        <tr>
          <td colspan="2" class="text-center text-brand-text-muted p-4">No students enrolled in this department section.</td>
        </tr>
      `;return}t.innerHTML=i.map(e=>`
      <tr class="border-b border-brand-border">
        <td class="p-2.5 text-sm">
          <div class="flex items-center gap-2">
            <img src="${e.avatar}" class="w-7 h-7 rounded-full object-cover">
            <div>
              <strong>${e.name}</strong> <code class="text-[0.7rem]">${e.id}</code>
            </div>
          </div>
        </td>
        <td class="p-2.5 text-center">
          <input type="checkbox" class="attendance-checkbox w-4 h-4 cursor-pointer accent-brand-primary" data-id="${e.id}" checked>
        </td>
      </tr>
    `).join(``)}let n=null;async function r(e){let t=e.querySelector(`#attend-ai-peak`),r=e.querySelector(`#attend-ai-dip`),i=e.querySelector(`#attend-ai-avg`),a=e.querySelector(`#btn-recalc-attend-ai`);if(typeof tf>`u`){i&&(i.textContent=`TF Unavailable`);return}a&&(a.disabled=!0,a.textContent=`Projecting...`);try{let a=[0,1,2,3,4,5,6,7],o=[.88,.92,.94,.85,.78,.89,.91,.95],s=tf.tensor2d(a.map(e=>e/7),[8,1]),c=tf.tensor2d(o,[8,1]),l=tf.sequential();l.add(tf.layers.dense({units:2,activation:`tanh`,inputShape:[1]})),l.add(tf.layers.dense({units:1})),l.compile({optimizer:tf.train.adam(.1),loss:`meanSquaredError`}),await l.fit(s,c,{epochs:20,verbose:0});let u=tf.tensor2d([8,9,10,11,12].map(e=>e/7),[5,1]),d=l.predict(u),f=await d.data();s.dispose(),c.dispose(),u.dispose(),d.dispose(),l.dispose();let p=Array.from(f).map(e=>Math.round(Math.max(.4,Math.min(1,e))*100)),m=Math.round(p.reduce((e,t)=>e+t,0)/p.length),h=Math.max(...p),g=Math.min(...p);t&&(t.textContent=h+`%`),r&&(r.textContent=g+`%`),i&&(i.textContent=m+`%`);let _=e.querySelector(`#attendance-forecast-chart`);_&&(n&&n.destroy(),n=new Chart(_,{type:`line`,data:{labels:[`Monday`,`Tuesday`,`Wednesday`,`Thursday`,`Friday`],datasets:[{label:`Projected Attendance Rate (%)`,data:p,borderColor:`#10b981`,backgroundColor:`rgba(16, 185, 129, 0.1)`,borderWidth:2,fill:!0,tension:.3}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:!1}},scales:{y:{grid:{color:`rgba(255, 255, 255, 0.05)`},ticks:{color:`#94a3b8`},min:40,max:100},x:{grid:{display:!1},ticks:{color:`#94a3b8`}}}}}))}catch(e){console.error(`TF Attendance Projection failed:`,e)}finally{a&&(a.disabled=!1,a.textContent=`Re-run AI Projection`)}}return{render:e}})(),window.examsView=(function(){function e(e){let n=window.UniversityDB.getExams(),r=window.UniversityDB.getStudents(),i=window.UniversityDB.getCourses();e.innerHTML=`
      <div class="page-header animate-fade-in flex items-center justify-between border-b border-brand-border/30 pb-4 mb-6">
        <div>
          <h1 class="text-3xl font-bold font-display tracking-tight bg-gradient-to-r from-white via-slate-100 to-brand-primary bg-clip-text text-transparent">Exams & Academic Grading</h1>
          <p class="text-sm text-brand-text-muted mt-1">Schedule term exams, verify student transcripts, compute GPAs, and input course evaluations.</p>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6 animate-fade-in delay-1">
        
        <!-- Exam Schedules list -->
        <div class="card bg-brand-bg-secondary/40 backdrop-blur-md border border-brand-border/50 p-6 rounded-2xl">
          <h3 class="mb-4 font-display text-lg font-bold text-white">Upcoming Examinations</h3>
          <div class="flex flex-col gap-3">
            ${n.map(e=>{let t=i.find(t=>t.code===e.code);return`
                <div class="p-4 border border-brand-border/60 rounded-xl bg-brand-bg-tertiary/40 flex justify-between items-center transition-all duration-200 hover:translate-x-1 hover:border-brand-primary/30 hover:bg-brand-primary/5">
                  <div>
                    <code class="text-brand-primary font-bold text-sm uppercase tracking-wider">${e.code}</code>
                    <h4 class="mt-1 mb-1 font-display font-medium text-white">${e.name}</h4>
                    <span class="text-xs text-brand-text-muted font-medium">${e.date} @ ${e.time}</span>
                  </div>
                  <div class="text-right">
                    <span class="badge badge-info text-[0.75rem] font-semibold">${e.venue}</span>
                    <div class="text-[0.75rem] text-brand-text-subtle font-mono mt-1">${t?t.credits:3} Credits</div>
                  </div>
                </div>
              `}).join(``)}
          </div>
        </div>

        <!-- Transcript Workspace Panel -->
        <div class="card bg-brand-bg-secondary/40 backdrop-blur-md border border-brand-border/50 p-6 rounded-2xl">
          <h3 class="mb-4 font-display text-lg font-bold text-white">Official Transcript Workspace</h3>
          <p class="text-brand-text-muted text-xs mb-5">Select a student record below to query their official term grade ledger.</p>
          
          <div class="form-group">
            <label class="form-label text-xs font-bold text-brand-text-muted uppercase tracking-wider pl-1">Search Student Profile</label>
            <select class="form-control mt-1 w-full" id="transcript-student-select">
              ${r.map(e=>`<option value="${e.id}">${e.id} - ${e.name} (${e.dept})</option>`).join(``)}
            </select>
          </div>

          <div id="transcript-sheet-body" class="p-5 border border-dashed border-brand-border/60 rounded-xl bg-white/[0.01] mt-5">
            <!-- Loaded dynamically on select -->
          </div>
        </div>

      </div>

      <!-- Quick Grade Entry System Card -->
      <div class="card bg-brand-bg-secondary/40 backdrop-blur-md border border-brand-border/50 p-6 rounded-2xl animate-fade-in delay-2 mt-6">
        <h3 class="mb-2 font-display text-lg font-semibold text-white">Interactive Term Grade Entry</h3>
        <p class="text-brand-text-muted text-sm mb-5 font-normal">Input raw assessment scores (0-100) to update on-chain and off-chain student registries.</p>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
          <div class="form-group mb-0">
            <label class="form-label text-xs font-bold text-brand-text-muted uppercase tracking-wider pl-1">Subject Code</label>
            <select class="form-control mt-1 w-full" id="grade-course-select">
              ${i.map(e=>`<option value="${e.code}">${e.code} - ${e.title}</option>`).join(``)}
            </select>
          </div>
          <div class="form-group mb-0">
            <label class="form-label text-xs font-bold text-brand-text-muted uppercase tracking-wider pl-1">Selected Student</label>
            <select class="form-control mt-1 w-full" id="grade-student-select">
              ${r.map(e=>`<option value="${e.id}">${e.name}</option>`).join(``)}
            </select>
          </div>
          <div class="form-group mb-0 flex flex-row gap-3">
            <div class="flex-1">
              <label class="form-label text-xs font-bold text-brand-text-muted uppercase tracking-wider pl-1">Term Score</label>
              <input type="number" class="form-control mt-1 w-full" id="grade-score" min="0" max="100" value="85">
            </div>
            <button class="btn btn-primary h-[42px] px-6 shrink-0" id="btn-submit-grade">Submit Grade</button>
          </div>
        </div>
      </div>
    `;let a=document.getElementById(`transcript-student-select`);a&&(a.addEventListener(`change`,()=>{t(a.value)}),t(a.value)),document.getElementById(`btn-submit-grade`).addEventListener(`click`,()=>{let e=document.getElementById(`grade-course-select`).value,n=document.getElementById(`grade-student-select`).value,r=parseInt(document.getElementById(`grade-score`).value);if(isNaN(r)||r<0||r>100){alert(`Please enter a valid final assessment score between 0 and 100.`);return}let i=`F`,o=0;r>=90?(i=`A+`,o=4):r>=80?(i=`A`,o=3.7):r>=70?(i=`B`,o=3):r>=60?(i=`C`,o=2):r>=50&&(i=`D`,o=1);let s=window.UniversityDB.getStudents().find(e=>e.id===n);s&&(s.gpa=Math.min(4,parseFloat((s.gpa*.8+o*.2).toFixed(2))),alert(`Grade updated for ${s.name}!\nCourse: ${e} | Score: ${r}% | Grade: ${i}.\nNew cumulative GPA computed: ${s.gpa}`),a.value===n&&t(n))})}function t(e){let t=document.getElementById(`transcript-sheet-body`);if(!t)return;let r=window.UniversityDB.getStudents().find(t=>t.id===e);if(!r){t.innerHTML=`<span class="text-brand-text-muted">Select a valid student profile ID.</span>`;return}let i=[{code:r.courses[0]||`CS101`,title:`Intro Programming`,grade:`A`,credits:4},{code:r.courses[1]||`CS302`,title:`Database Systems`,grade:`A+`,credits:3},{code:r.courses[2]||`CS305`,title:`Software Engineering`,grade:`B`,credits:3}];t.innerHTML=`
      <div class="flex justify-between items-center mb-4 pb-2 border-b border-brand-border/30">
        <span class="font-bold font-display text-base text-white">${r.name}</span>
        <code class="text-xs bg-brand-primary/10 border border-brand-primary/20 text-brand-primary font-bold px-2 py-0.5 rounded">CGPA: ${r.gpa.toFixed(2)}</code>
      </div>
      <table class="w-full border-collapse text-[0.825rem]">
        <thead>
          <tr class="border-b border-brand-border/60">
            <th class="py-2 px-0 text-left text-brand-text-muted bg-transparent border-b-0 uppercase tracking-wider text-[10px]">Subject Stream</th>
            <th class="py-2 px-0 text-center text-brand-text-muted bg-transparent border-b-0 uppercase tracking-wider text-[10px]">Credits</th>
            <th class="py-2 px-0 text-right text-brand-text-muted bg-transparent border-b-0 uppercase tracking-wider text-[10px]">Grade</th>
          </tr>
        </thead>
        <tbody>
          ${i.map(e=>`
            <tr class="border-b border-dashed border-brand-border/40 hover:bg-white/[0.01]">
              <td class="py-2.5 px-0 border-b-0 font-medium text-white"><code>${e.code}</code> - ${e.title}</td>
              <td class="py-2.5 px-0 text-center border-b-0 text-brand-text-muted font-mono">${e.credits}</td>
              <td class="py-2.5 px-0 text-right font-bold text-brand-primary border-b-0">${e.grade}</td>
            </tr>
          `).join(``)}
        </tbody>
      </table>
      <div class="mt-4 text-right">
        <button class="btn btn-secondary btn-sm font-semibold" onclick="alert('Sending digital transcript via Secure email...')">Email Transcript PDF</button>
      </div>

      <!-- AI Grade Outcome Predictor -->
      <div class="card mt-5 p-4 bg-brand-bg-tertiary border border-brand-border/60">
        <div class="flex items-center justify-between mb-3 pb-2 border-b border-brand-border/40">
          <div class="flex items-center gap-2">
            <span class="w-2.5 h-2.5 rounded-full bg-brand-accent-cyan animate-pulse"></span>
            <span class="text-xs font-bold uppercase tracking-wider text-white font-display">AI Grade Predictor</span>
          </div>
          <span class="badge text-[0.65rem] py-0.5 px-2 font-mono bg-brand-accent-emerald/20 text-brand-accent-emerald" id="exam-ai-outcome-status">Calculating...</span>
        </div>
        <div class="grid grid-cols-2 gap-3 text-xs text-brand-text-muted">
          <div>
            <span class="text-[0.7rem] text-brand-text-subtle">Predicted Final Grade:</span>
            <div class="font-bold text-white font-mono text-sm mt-0.5" id="exam-ai-grade">Calculating...</div>
          </div>
          <div>
            <span class="text-[0.7rem] text-brand-text-subtle">Graduation Fail Probability:</span>
            <div class="font-bold text-white font-mono text-sm mt-0.5" id="exam-ai-fail-pct">Calculating...</div>
          </div>
        </div>
      </div>
    `,n(r)}async function n(e){if(typeof tf>`u`){let e=document.getElementById(`exam-ai-grade`);e&&(e.textContent=`TF Unavailable`);return}try{let r=[e.gpa/4,e.attendance/100,e.semester/8],i=tf.sequential();i.add(tf.layers.dense({units:3,activation:`sigmoid`,inputShape:[3]})),i.add(tf.layers.dense({units:2}));let a=tf.tensor2d([[2,1.5],[1.5,2],[-.5,-.2]]),o=tf.tensor1d([.5,.2]);i.layers[1].setWeights([a,o]);let s=tf.tensor2d([r],[1,3]),c=i.predict(s),l=await c.data(),u=l[0],d=l[1];var t=Math.max(.01,Math.min(.99,1-1/(1+Math.exp(-u)))),n=[`F`,`C`,`B`,`A`,`A+`][Math.max(0,Math.min(4,Math.floor(d*5)))];e.gpa<2&&(n=`D`,t=Math.max(t,.45)),e.attendance<65&&(n=`F`,t=Math.max(t,.85)),e.gpa>=3.7&&(n=`A+`,t=.01),s.dispose(),c.dispose(),a.dispose(),o.dispose(),i.dispose();let f=document.getElementById(`exam-ai-grade`),p=document.getElementById(`exam-ai-fail-pct`),m=document.getElementById(`exam-ai-outcome-status`);f&&(f.textContent=n),p&&(p.textContent=(t*100).toFixed(1)+`%`),m&&(t>.4?(m.textContent=`High Academic Risk`,m.className=`badge text-[0.65rem] py-0.5 px-2 font-mono bg-brand-accent-ruby/20 text-brand-accent-ruby`):t>.1?(m.textContent=`Passing (Review Required)`,m.className=`badge text-[0.65rem] py-0.5 px-2 font-mono bg-brand-accent-amber/20 text-brand-accent-amber`):(m.textContent=`Excellent Standing`,m.className=`badge text-[0.65rem] py-0.5 px-2 font-mono bg-brand-accent-emerald/20 text-brand-accent-emerald`))}catch(e){console.error(`TF Exam inference failed:`,e)}}return{render:e}})(),window.financeView=(function(){let e=null;function t(e){let t=window.UniversityDB.getStudents(),s=window.UniversityDB.getTransactions(),c=window.AuthSystem&&window.AuthSystem.getCurrentUser();if(c&&c.role===`student`){r(e,c,t,s);return}let l=t.reduce((e,t)=>e+(t.feeTotal-t.feePaid),0),u=s.reduce((e,t)=>e+t.amount,0),d=t.filter(e=>e.feeTotal-e.feePaid>2e3).length;e.innerHTML=`
      <div class="page-header animate-fade-in flex items-center justify-between border-b border-brand-border/30 pb-4 mb-6">
        <div>
          <h1 class="text-3xl font-bold font-display tracking-tight bg-gradient-to-r from-white via-slate-100 to-brand-primary bg-clip-text text-transparent">Finance & Collections</h1>
          <p class="text-sm text-brand-text-muted mt-1">Track scholarship distribution, audit ledger transactions, check student account balances, and execute invoice logs.</p>
        </div>
        <button class="btn btn-primary" id="btn-collect-payment">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2" ry="2"/><line x1="12" y1="1" x2="12" y2="23"/><line x1="2" y1="10" x2="22" y2="10"/></svg>
          <span>Record Fee Payment</span>
        </button>
      </div>

      <!-- Financial KPI Metrics -->
      <div class="kpi-grid animate-fade-in delay-1">
        
        <div class="card kpi-card bg-brand-bg-secondary/40 backdrop-blur-md border border-brand-border/50 p-6 rounded-2xl flex justify-between items-start transition-all duration-300 hover:border-brand-accent-emerald/30">
          <div class="kpi-details">
            <span class="kpi-label text-xs font-bold text-brand-text-muted uppercase tracking-wider">Cumulative Collections</span>
            <span class="kpi-value text-3xl font-display font-bold text-white mt-2 leading-none">$${u.toLocaleString()}</span>
            <span class="kpi-growth flex items-center gap-1 text-xs text-brand-accent-emerald font-semibold mt-2.5">Audited Fiscal Year</span>
          </div>
          <div class="kpi-icon w-12 h-12 rounded-xl flex items-center justify-center bg-brand-bg-tertiary/60 border border-brand-border text-brand-accent-emerald transition-transform duration-300 hover:scale-105">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
          </div>
        </div>

        <div class="card kpi-card bg-brand-bg-secondary/40 backdrop-blur-md border border-brand-border/50 p-6 rounded-2xl flex justify-between items-start transition-all duration-300 hover:border-brand-accent-ruby/30">
          <div class="kpi-details">
            <span class="kpi-label text-xs font-bold text-brand-text-muted uppercase tracking-wider">Outstanding Balance</span>
            <span class="kpi-value text-3xl font-display font-bold text-white mt-2 leading-none">$${l.toLocaleString()}</span>
            <span class="kpi-growth flex items-center gap-1 text-xs text-brand-accent-ruby font-semibold mt-2.5">Pending Invoices</span>
          </div>
          <div class="kpi-icon w-12 h-12 rounded-xl flex items-center justify-center bg-brand-bg-tertiary/60 border border-brand-border text-brand-accent-ruby transition-transform duration-300 hover:scale-105">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
          </div>
        </div>

        <div class="card kpi-card bg-brand-bg-secondary/40 backdrop-blur-md border border-brand-border/50 p-6 rounded-2xl flex justify-between items-start transition-all duration-300 hover:border-brand-accent-amber/30">
          <div class="kpi-details">
            <span class="kpi-label text-xs font-bold text-brand-text-muted uppercase tracking-wider">Overdue Accounts</span>
            <span class="kpi-value text-3xl font-display font-bold text-white mt-2 leading-none">${d} Accounts</span>
            <span class="kpi-growth flex items-center gap-1 text-xs text-brand-accent-amber font-semibold mt-2.5">Balances > $2,000</span>
          </div>
          <div class="kpi-icon w-12 h-12 rounded-xl flex items-center justify-center bg-brand-bg-tertiary/60 border border-brand-border text-brand-accent-amber transition-transform duration-300 hover:scale-105">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
          </div>
        </div>

      </div>

      <!-- Main Ledger Tables -->
      <div class="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-6 mt-6 animate-fade-in delay-2">
        
        <!-- Student Balances Ledger -->
        <div class="card bg-brand-bg-secondary/40 backdrop-blur-md border border-brand-border/50 p-6 rounded-2xl">
          <h3 class="mb-4 font-display text-lg font-bold text-white">Student Accounts Balance Sheet</h3>
          <div class="table-container max-h-[420px] overflow-y-auto border border-brand-border/50">
            <table>
              <thead>
                <tr>
                  <th class="p-4">Student ID</th>
                  <th class="p-4">Name</th>
                  <th class="p-4">Total Due</th>
                  <th class="p-4">Paid</th>
                  <th class="p-4">Status</th>
                </tr>
              </thead>
              <tbody id="finance-balances-body">
                <!-- Loaded dynamically -->
              </tbody>
            </table>
          </div>
        </div>

        <!-- Recent Transactions Audit -->
        <div class="card bg-brand-bg-secondary/40 backdrop-blur-md border border-brand-border/50 p-6 rounded-2xl">
          <h3 class="mb-4 font-display text-lg font-bold text-white">Recent Audit Receipts</h3>
          <div class="flex flex-col gap-3.5 max-h-[420px] overflow-y-auto pr-1">
            ${s.map(e=>`
              <div class="p-3.5 border border-brand-border/60 rounded-xl bg-brand-bg-tertiary/40 flex justify-between items-center transition-all duration-200 hover:translate-x-1 hover:border-brand-accent-emerald/30 hover:bg-brand-bg-tertiary/60">
                <div>
                  <strong class="text-brand-accent-emerald text-sm font-bold">+$${e.amount.toLocaleString()}</strong>
                  <div class="text-xs text-white font-medium mt-1">${e.studentName}</div>
                  <span class="text-[0.7rem] text-brand-text-subtle mt-0.5 block">${e.date} via ${e.method}</span>
                </div>
                <code class="text-[0.7rem] bg-white/[0.04] px-2 py-1 rounded font-mono text-brand-text-muted">${e.txId}</code>
              </div>
            `).join(``)}
          </div>
        </div>

      </div>

      <!-- AI Collections Forecast Section -->
      <div class="card bg-brand-bg-secondary/40 backdrop-blur-md border border-brand-border/50 p-6 rounded-2xl animate-fade-in delay-3 mt-6">
        <div class="flex justify-between items-center border-b border-brand-border/30 pb-4 mb-5">
          <div>
            <h3 class="font-display flex items-center gap-2 m-0 text-lg font-bold text-white">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="var(--color-brand-accent-emerald)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
              AI Revenue & Collections Forecasting
            </h3>
            <p class="text-[0.85rem] text-brand-text-muted mt-1 m-0">Regression modeling on historical collections registry using TensorFlow.js optimizer weights.</p>
          </div>
          <span class="badge bg-brand-accent-emerald/10 border-brand-accent-emerald/20 text-brand-accent-emerald font-semibold text-xs py-1 px-3">TensorFlow.js Engine</span>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8">
          <!-- Controls Panel -->
          <div class="flex flex-col gap-5 border-r border-brand-border/30 pr-8 max-md:border-r-0 max-md:pr-0">
            <div>
              <label class="block text-xs font-semibold text-brand-text-muted uppercase tracking-wider mb-2 pl-0.5">Optimizer Learning Rate</label>
              <select id="tf-finance-lr" class="w-full bg-brand-bg-secondary border border-brand-border text-brand-text-main p-2 rounded-lg outline-none">
                <option value="0.01">0.01 (Slow & Stable)</option>
                <option value="0.05" selected>0.05 (Default)</option>
                <option value="0.1">0.10 (Fast)</option>
              </select>
            </div>

            <div>
              <label class="block text-xs font-semibold text-brand-text-muted uppercase tracking-wider mb-2 pl-0.5">Training Epochs</label>
              <input type="range" id="tf-finance-epochs" min="50" max="300" step="50" value="150" class="w-full accent-brand-accent-emerald cursor-pointer">
              <span id="tf-finance-epochs-val" class="text-[0.8rem] text-brand-text-muted float-right mt-1 font-mono">150 epochs</span>
            </div>

            <div>
              <label class="block text-xs font-semibold text-brand-text-muted uppercase tracking-wider mb-2 pl-0.5">Forecast Horizon</label>
              <select id="tf-finance-horizon" class="w-full bg-brand-bg-secondary border border-brand-border text-brand-text-main p-2 rounded-lg outline-none">
                <option value="1">1 Term (2026-B)</option>
                <option value="2" selected>2 Terms (2026-B & 2027-A)</option>
                <option value="3">3 Terms (Up to 2027-B)</option>
              </select>
            </div>

            <button class="btn btn-primary w-full justify-center flex items-center gap-2" id="tf-finance-train-btn" style="background-color: var(--color-brand-accent-emerald); box-shadow: 0 4px 14px rgba(16, 185, 129, 0.25);">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
              <span>Run Revenue Projection</span>
            </button>

            <!-- Live Status -->
            <div id="tf-finance-status-card" class="bg-brand-bg-tertiary p-3 rounded-lg border border-brand-border/40" style="display:none;">
              <div class="flex justify-between text-[0.8rem] mb-1.5">
                <span class="text-brand-text-subtle">Epoch:</span>
                <span id="tf-finance-epoch-disp" class="font-semibold text-brand-text-main font-mono">0/150</span>
              </div>
              <div class="flex justify-between text-[0.8rem] mb-3">
                <span class="text-brand-text-subtle">Training Loss:</span>
                <span id="tf-finance-loss-disp" class="font-mono text-brand-accent-amber">0.0000</span>
              </div>
              <!-- Progress Bar -->
              <div class="bg-brand-bg-primary rounded-full h-1.5 overflow-hidden w-full">
                <div id="tf-finance-progress-bar" class="bg-brand-accent-emerald h-full w-0 transition-[width] duration-100"></div>
              </div>
            </div>
            
            <div id="tf-finance-metrics-card" class="bg-brand-bg-tertiary p-3 rounded-lg border border-brand-border/40 text-[0.825rem] leading-normal flex flex-col gap-1.5">
              <div class="text-brand-text-main font-bold">Projection Diagnostics:</div>
              <div>Status: <span id="tf-finance-status-text" class="text-brand-accent-cyan font-bold uppercase">Untrained</span></div>
              <div>Gradient Fit: <span id="tf-finance-equation-fit" class="text-brand-text-muted font-mono">y = mx + c</span></div>
            </div>
          </div>

          <!-- Forecast Chart -->
          <div class="flex flex-col h-[350px]">
            <div class="flex justify-between mb-3 items-center">
              <h4 class="text-sm font-semibold text-white m-0">Revenue Projection Curve</h4>
              <span id="tf-finance-projection-hint" class="text-[0.75rem] text-brand-text-muted">Historical fee revenues vs Model Fit</span>
            </div>
            <div class="chart-wrapper flex-1">
              <canvas id="tf-finance-forecast-chart"></canvas>
            </div>
          </div>
        </div>
      </div>
    `;let f=e.querySelector(`#btn-collect-payment`);f&&f.addEventListener(`click`,i);let p=e.querySelector(`#tf-finance-epochs`),m=e.querySelector(`#tf-finance-epochs-val`);p&&m&&p.addEventListener(`input`,e=>{m.innerText=`${e.target.value} epochs`});let h=e.querySelector(`#tf-finance-train-btn`);h&&h.addEventListener(`click`,()=>{o(e,u)}),n(e,t),setTimeout(()=>{a(e,u)},100)}function n(e,t){let n=e.querySelector(`#finance-balances-body`);n&&(n.innerHTML=t.map(e=>{let t=e.feeTotal-e.feePaid,n=`<span class="badge badge-success">Fully Paid</span>`;return t>2500?n=`<span class="badge badge-danger">Delinquent</span>`:t>0&&(n=`<span class="badge badge-warning">Partial</span>`),`
        <tr>
          <td><code>${e.id}</code></td>
          <td><strong>${e.name}</strong></td>
          <td>$${e.feeTotal}</td>
          <td>$${e.feePaid}</td>
          <td>${n}</td>
        </tr>
      `}).join(``))}function r(e,t,n,i){let a=n.find(e=>e.email===t.email||e.name===t.name);a||=n[0];let o=a.feeTotal-a.feePaid,c=Math.min(a.feePaid/a.feeTotal*100,100),l=i.filter(e=>e.studentId===a.id);e.innerHTML=`
      <div class="page-header animate-fade-in flex items-center justify-between border-b border-brand-border/30 pb-4 mb-6">
        <div>
          <h1 class="text-3xl font-bold font-display tracking-tight bg-gradient-to-r from-white via-slate-100 to-brand-primary bg-clip-text text-transparent">Student Statement</h1>
          <p class="text-sm text-brand-text-muted mt-1">Verify outstanding tuition balances, audit history logs, and process simulated payments.</p>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6 animate-fade-in delay-1">
        <!-- Personal Info & Dues Summary -->
        <div class="card bg-brand-bg-secondary/40 backdrop-blur-md border border-brand-border/50 p-6 rounded-2xl flex flex-col gap-5">
          <div class="flex items-center gap-4 border-b border-brand-border/30 pb-4">
            <img src="${a.avatar}" class="w-16 h-16 rounded-full object-cover border border-brand-border/60">
            <div>
              <h3 class="m-0 font-display text-lg font-bold text-white">${a.name}</h3>
              <span class="text-xs text-brand-text-muted">Student ID: <code>${a.id}</code> | Dept: ${a.dept}</span>
            </div>
          </div>
          
          <div class="flex flex-col gap-3.5 text-xs">
            <div class="flex justify-between">
              <span class="text-brand-text-muted font-medium">Registration Semester:</span>
              <strong class="text-white">Semester ${a.semester}</strong>
            </div>
            <div class="flex justify-between">
              <span class="text-brand-text-muted font-medium">Academic Scholarship:</span>
              <strong class="text-brand-accent-cyan">${a.scholarship||`None`}</strong>
            </div>
            <div class="flex justify-between border-t border-brand-border/30 pt-3">
              <span class="text-brand-text-muted font-medium">Total Semester Tuition Fee:</span>
              <strong class="text-white font-mono">$${a.feeTotal.toLocaleString()}</strong>
            </div>
            <div class="flex justify-between">
              <span class="text-brand-text-muted font-medium text-brand-accent-emerald">Total Fee Paid:</span>
              <strong class="text-brand-accent-emerald font-mono">$${a.feePaid.toLocaleString()}</strong>
            </div>
            <div class="flex justify-between">
              <span class="text-brand-text-muted font-medium text-brand-accent-ruby">Outstanding Balance:</span>
              <strong class="text-brand-accent-ruby font-mono">$${o.toLocaleString()}</strong>
            </div>
          </div>

          <!-- Progress bar -->
          <div class="mt-2">
            <div class="flex justify-between text-xs font-semibold mb-1.5">
              <span class="text-brand-text-muted uppercase tracking-wider">Tuition Clearance Progress</span>
              <span class="text-white font-mono">${c.toFixed(1)}%</span>
            </div>
            <div class="bg-brand-bg-primary h-2 rounded-full overflow-hidden w-full border border-brand-border/40">
              <div class="bg-gradient-to-r from-brand-accent-emerald to-brand-primary h-full rounded-full" style="width: ${c}%"></div>
            </div>
          </div>
        </div>

        <!-- Simulated Payment Portal -->
        <div class="card bg-brand-bg-secondary/40 backdrop-blur-md border border-brand-border/50 p-6 rounded-2xl">
          <h3 class="mb-4 font-display text-base font-bold m-0 border-b border-brand-border/30 pb-3 text-white">Online Payment Gateway</h3>
          <p class="text-xs text-brand-text-muted mb-4 font-normal">Process a simulated credit transfer to clear outstanding university dues.</p>
          
          <div class="flex flex-col gap-4">
            <div class="form-group">
              <label class="form-label text-xs font-bold text-brand-text-muted uppercase tracking-wider pl-1">Payment Amount ($)</label>
              <input type="number" id="stu-pay-amount" class="form-control mt-1 w-full" min="1" max="${o}" value="${Math.min(o,1e3)}" ${o===0?`disabled`:``}>
            </div>
            <div class="form-group">
              <label class="form-label text-xs font-bold text-brand-text-muted uppercase tracking-wider pl-1">Select Gateway</label>
              <select id="stu-pay-method" class="form-control mt-1 w-full" ${o===0?`disabled`:``}>
                <option>Stripe Card</option>
                <option>PayPal</option>
                <option>Bank Direct Transfer</option>
              </select>
            </div>
            <button class="btn btn-primary w-full justify-center flex items-center gap-2 mt-2" id="btn-stu-pay" ${o===0?`disabled`:``}>
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2" ry="2"/><line x1="12" y1="1" x2="12" y2="23"/><line x1="2" y1="10" x2="22" y2="10"/></svg>
              <span>${o===0?`Statement Cleared`:`Process Payment`}</span>
            </button>
          </div>
        </div>
      </div>

      <!-- AI Tuition Default Risk Estimator -->
      <div class="card bg-brand-bg-secondary/40 backdrop-blur-md border border-brand-border/50 p-6 rounded-2xl mt-6 animate-fade-in delay-2">
        <div class="flex items-center justify-between mb-3 pb-2 border-b border-brand-border/30">
          <div class="flex items-center gap-2">
            <span class="w-2.5 h-2.5 rounded-full bg-brand-accent-amber animate-pulse"></span>
            <span class="text-xs font-bold uppercase tracking-wider text-white font-display">AI Payment Delay Predictor</span>
          </div>
          <span class="badge text-[0.65rem] py-0.5 px-2 font-mono bg-brand-accent-emerald/20 text-brand-accent-emerald animate-fade-in" id="finance-ai-delay-status">Low Risk</span>
        </div>
        <div class="grid grid-cols-2 gap-3 text-xs text-brand-text-muted">
          <div>
            <span class="text-[0.7rem] text-brand-text-subtle">Predicted Delay Probability:</span>
            <div class="font-bold text-white font-mono text-sm mt-0.5 animate-fade-in" id="finance-ai-delay-pct">Calculating...</div>
          </div>
          <div>
            <span class="text-[0.7rem] text-brand-text-subtle">Projected Clearance Date:</span>
            <div class="font-bold text-white font-mono text-sm mt-0.5 animate-fade-in" id="finance-ai-clearance-date">Semester end</div>
          </div>
        </div>
      </div>

      <!-- Personal Receipts / Transaction History -->
      <div class="card bg-brand-bg-secondary/40 backdrop-blur-md border border-brand-border/50 p-6 rounded-2xl mt-6 animate-fade-in delay-2">
        <h3 class="mb-4 font-display text-base font-bold m-0 border-b border-brand-border/30 pb-3 text-white">Statement Transaction Ledger</h3>
        
        <div class="flex flex-col gap-3.5 max-h-[300px] overflow-y-auto pr-1">
          ${l.length===0?`
            <div class="text-center py-6 text-brand-text-muted text-xs">No prior transaction receipts found.</div>
          `:l.map(e=>`
            <div class="p-3.5 border border-brand-border/60 rounded-xl bg-brand-bg-tertiary/40 flex justify-between items-center transition-all duration-200 hover:translate-x-1 hover:border-brand-accent-emerald/30 hover:bg-brand-bg-tertiary/60">
              <div>
                <strong class="text-brand-accent-emerald text-sm font-bold">+$${e.amount.toLocaleString()}</strong>
                <span class="text-xs text-brand-text-muted ml-3">${e.date} via ${e.method}</span>
              </div>
              <div class="flex items-center gap-3">
                <code class="text-[0.7rem] bg-white/[0.04] px-2 py-1 rounded font-mono text-brand-text-muted">${e.txId}</code>
                <span class="badge badge-success text-[0.65rem] py-0.5">Success</span>
              </div>
            </div>
          `).join(``)}
        </div>
      </div>
    `,s(a,o);let u=e.querySelector(`#btn-stu-pay`);u&&u.addEventListener(`click`,()=>{let s=e.querySelector(`#stu-pay-amount`),c=e.querySelector(`#stu-pay-method`),l=parseInt(s.value),u=c.value;if(isNaN(l)||l<=0||l>o){alert(`Please enter a valid amount between $1 and $${o}.`);return}let d=`TXN`+Math.floor(1e3+Math.random()*9e3),f=new Date().toISOString().split(`T`)[0],p={txId:d,studentId:a.id,studentName:a.name,amount:l,date:f,status:`Paid`,method:u};window.UniversityDB.addTransaction(p),a.feePaid=Math.min(a.feeTotal,a.feePaid+l),alert(`✅ Payment of $${l} processed successfully!\nTransaction ID: ${d}`),r(e,t,n,i)})}function i(){let e=`
      <form id="record-payment-form">
        <div class="form-group">
          <label class="form-label">Select Student Account</label>
          <select class="form-control" id="pay-student-select">
            ${window.UniversityDB.getStudents().map(e=>`<option value="${e.id}">${e.name} (${e.id})</option>`).join(``)}
          </select>
        </div>
        <div class="grid-2">
          <div class="form-group">
            <label class="form-label">Receipt Amount ($)</label>
            <input type="number" class="form-control" id="pay-amount" min="1" max="10000" value="1000" required>
          </div>
          <div class="form-group">
            <label class="form-label">Payment Gateway / Method</label>
            <select class="form-control" id="pay-method">
              <option>Stripe</option>
              <option>Credit Card</option>
              <option>Bank Transfer</option>
              <option>PayPal</option>
              <option>Scholarship Voucher</option>
            </select>
          </div>
        </div>
      </form>
    `;window.App.showModal(`Record Fee Payment Receipt`,e,`
      <button class="btn btn-secondary" onclick="window.App.closeModal()">Cancel</button>
      <button class="btn btn-primary" id="btn-submit-payment">Complete Transaction</button>
    `),document.getElementById(`btn-submit-payment`).addEventListener(`click`,()=>{let e=document.getElementById(`pay-student-select`).value,t=parseInt(document.getElementById(`pay-amount`).value),n=document.getElementById(`pay-method`).value;if(isNaN(t)||t<=0){alert(`Please enter a valid billing transaction amount.`);return}let r=window.UniversityDB.getStudents().find(t=>t.id===e);if(!r){alert(`Student record validation failed.`);return}let i=`TXN`+Math.floor(1e3+Math.random()*9e3),a=new Date().toISOString().split(`T`)[0],o={txId:i,studentId:e,studentName:r.name,amount:t,date:a,status:`Paid`,method:n};window.UniversityDB.addTransaction(o),r.feePaid=Math.min(r.feeTotal,r.feePaid+t),window.App.closeModal(),alert(`Payment of $${t} logged successfully for ${r.name}.\nReceipt Reference ID: ${i}`),window.App.loadView(`finance`)})}function a(t,n){let r=t.querySelector(`#tf-finance-forecast-chart`);if(!r)return;e&&e.destroy();let i=[`2022-A`,`2022-B`,`2023-A`,`2023-B`,`2024-A`,`2024-B`,`2025-A`,`2025-B`,`2026-A`],a=[65e3,72e3,78e3,85e3,92e3,102e3,108e3,118e3,n];e=new Chart(r,{type:`line`,data:{labels:i,datasets:[{label:`Historical Revenue ($)`,data:a,borderColor:`rgba(16, 185, 129, 0.4)`,backgroundColor:`transparent`,pointBackgroundColor:`#10b981`,pointRadius:6,borderWidth:2,showLine:!0},{label:`Model Fit & Prediction`,data:[],borderColor:`#f59e0b`,backgroundColor:`transparent`,borderWidth:3,borderDash:[5,5],pointRadius:0}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:!0,labels:{color:`#94a3b8`}}},scales:{y:{grid:{color:`rgba(255, 255, 255, 0.05)`},ticks:{color:`#94a3b8`}},x:{grid:{display:!1},ticks:{color:`#94a3b8`}}}}})}async function o(t,n){let r=t.querySelector(`#tf-finance-train-btn`);if(!r||r.disabled)return;if(typeof tf>`u`){alert(`TensorFlow.js is currently loading or unavailable. Please check your internet connection.`);return}r.disabled=!0,r.innerText=`Training Model...`;let i=t.querySelector(`#tf-finance-status-card`);i&&(i.style.display=`block`);let a=[0,1,2,3,4,5,6,7,8],o=[65e3,72e3,78e3,85e3,92e3,102e3,108e3,118e3,n],s=tf.tensor2d(a.map(e=>e/8),[9,1]),c=tf.tensor2d(o.map(e=>e/15e4),[9,1]),l=tf.sequential();l.add(tf.layers.dense({units:1,inputShape:[1]}));let u=t.querySelector(`#tf-finance-lr`),d=t.querySelector(`#tf-finance-epochs`),f=t.querySelector(`#tf-finance-horizon`),p=u?parseFloat(u.value):.05,m=d?parseInt(d.value):150,h=f?parseInt(f.value):2;l.compile({optimizer:tf.train.adam(p),loss:`meanSquaredError`});try{await l.fit(s,c,{epochs:m,callbacks:{onEpochEnd:(e,n)=>{let r=(e+1)/m*100,i=t.querySelector(`#tf-finance-epoch-disp`),a=t.querySelector(`#tf-finance-loss-disp`),o=t.querySelector(`#tf-finance-progress-bar`);i&&(i.innerText=`${e+1}/${m}`),a&&(a.innerText=n.loss.toFixed(6)),o&&(o.style.width=`${r}%`)}}});let n=l.layers[0].getWeights(),r=n[0].dataSync()[0],i=n[1].dataSync()[0],a=15e4*r/8,u=15e4*i,d=t.querySelector(`#tf-finance-status-text`),f=t.querySelector(`#tf-finance-equation-fit`);d&&(d.innerText=`Trained successfully`,d.className=`text-brand-accent-emerald font-bold`),f&&(f.innerText=`y = ${a.toFixed(2)}x + ${u.toFixed(2)}`);let p=9+h,g=[`2022-A`,`2022-B`,`2023-A`,`2023-B`,`2024-A`,`2024-B`,`2025-A`,`2025-B`,`2026-A`],_=[2026,2027,2028],v=0,y=`B`;for(let e=0;e<h;e++)g.push(`${_[v]}-${y}`),y===`B`?(y=`A`,v++):y=`B`;let b=[];for(let e=0;e<p;e++){let t=a*e+u;b.push(Math.round(t))}e.data.labels=g;let x=[...o];for(;x.length<p;)x.push(null);e.data.datasets[0].data=x,e.data.datasets[1].data=b,e.update()}catch(e){console.error(`Error during TensorFlow training:`,e),alert(`Error during TensorFlow training: `+e.message)}finally{s.dispose(),c.dispose(),l.dispose(),r&&(r.disabled=!1,r.innerText=`Run Revenue Projection`)}}async function s(e,t){if(typeof tf>`u`){let e=document.getElementById(`finance-ai-delay-pct`);e&&(e.textContent=`TF Unavailable`);return}try{let r=[t/(e.feeTotal||5e3),e.gpa/4,e.attendance/100],i=tf.sequential();i.add(tf.layers.dense({units:3,activation:`tanh`,inputShape:[3]})),i.add(tf.layers.dense({units:1,activation:`sigmoid`}));let a=tf.tensor2d([[1.5],[-.5],[-.8]]),o=tf.tensor1d([.1]);i.layers[1].setWeights([a,o]);let s=tf.tensor2d([r],[1,3]),c=i.predict(s),l=(await c.data())[0];s.dispose(),c.dispose(),a.dispose(),o.dispose(),i.dispose();var n=l;t===0&&(n=0);let u=document.getElementById(`finance-ai-delay-pct`),d=document.getElementById(`finance-ai-delay-status`),f=document.getElementById(`finance-ai-clearance-date`);u&&(u.textContent=(n*100).toFixed(1)+`%`),d&&(n>.4?(d.textContent=`Elevated Default Risk`,d.className=`badge text-[0.65rem] py-0.5 px-2 font-mono bg-brand-accent-ruby/20 text-brand-accent-ruby`,f&&(f.textContent=`Delayed (> 30 days)`)):n>.1?(d.textContent=`Grace Period Predict`,d.className=`badge text-[0.65rem] py-0.5 px-2 font-mono bg-brand-accent-amber/20 text-brand-accent-amber`,f&&(f.textContent=`Within 15 days`)):(d.textContent=`Low Risk Statement`,d.className=`badge text-[0.65rem] py-0.5 px-2 font-mono bg-brand-accent-emerald/20 text-brand-accent-emerald`,f&&(f.textContent=`On time`)))}catch(e){console.error(`TF Student finance inference failed:`,e)}}return{render:t,openPaymentModal:i}})(),window.departmentsView=(function(){function e(e){e.innerHTML=`
      <div class="page-header animate-fade-in">
        <div>
          <h1>Academic & Administrative Departments</h1>
          <p>Supervise academic divisions, check allocated operating budgets, and review Head of Department assignments.</p>
        </div>
      </div>

      <div class="grid-3 animate-fade-in delay-1 mt-6">
         ${window.UniversityDB.getDepartments().map(e=>{let t=e.budget.toLocaleString(),n=window.UniversityDB.getStudents().filter(t=>t.dept===e.code),r=n.length>0?Math.round(n.reduce((e,t)=>e+(t.attendance||0),0)/n.length):90,i=82;if(typeof tf<`u`)try{let t=tf.tensor2d([[e.budget/5e5,e.facultyCount/10,e.studentCount/20]]),n=tf.tensor2d([[-.5],[1.2],[.8]]),r=tf.matMul(t,n),a=r.dataSync()[0];i=Math.round(Math.max(50,Math.min(99,75+a*10))),t.dispose(),n.dispose(),r.dispose()}catch(e){console.warn(e)}return`
            <div class="card flex flex-col gap-4" style="border-top: 4px solid ${e.color};">
              <div>
                <span class="badge bg-brand-bg-tertiary text-brand-text-main font-bold">${e.code}</span>
                <h3 class="mt-2.5 font-display text-lg leading-snug min-h-[46px] font-semibold">${e.name}</h3>
              </div>
 
              <div class="text-sm text-brand-text-muted flex flex-col gap-1.5 p-3 bg-white/[0.01] rounded-xl">
                <div><strong>HOD:</strong> ${e.hod}</div>
                <div><strong>Faculty Members:</strong> ${e.facultyCount} Professors</div>
                <div><strong>Enrolled Students:</strong> ${e.studentCount} Majors</div>
                <div><strong>Allocated Budget:</strong> $${t}</div>
                <div><strong>Average Attendance:</strong> <span class="font-bold ${r<75?`text-brand-accent-ruby`:r<85?`text-brand-accent-amber`:`text-brand-accent-emerald`}">${r}%</span></div>
                <div><strong>AI Budget Efficiency:</strong> <span class="font-bold text-brand-primary font-mono">${i}%</span></div>
              </div>
 
              <div class="flex gap-2 mt-auto">
                <button class="btn btn-secondary btn-sm edit-dept-btn w-full font-medium" data-code="${e.code}">Manage Resources</button>
              </div>
            </div>
          `}).join(``)}
      </div>
    `,e.querySelectorAll(`.edit-dept-btn`).forEach(e=>{e.addEventListener(`click`,()=>{t(e.getAttribute(`data-code`))})})}function t(e){let t=window.UniversityDB.getDepartments().find(t=>t.code===e);if(!t)return;let n=`
      <h3 class="font-display mb-2 text-lg font-semibold">${t.name} (${t.code})</h3>
      <p class="text-brand-text-muted text-sm mb-5">Academic Deanery | Head of Department: <strong>${t.hod}</strong></p>
      
      <div class="form-group">
        <label class="form-label">Head of Department (HOD)</label>
        <input type="text" class="form-control" id="mod-dept-hod" value="${t.hod}">
      </div>
      <div class="form-group">
        <label class="form-label">Annual Department Operating Budget ($)</label>
        <input type="number" class="form-control" id="mod-dept-budget" value="${t.budget}">
      </div>
    `;window.App.showModal(`Modify Department Parameters`,n,`
      <button class="btn btn-secondary" onclick="window.App.closeModal()">Cancel</button>
      <button class="btn btn-primary" id="btn-save-dept">Save Specifications</button>
    `),document.getElementById(`btn-save-dept`).addEventListener(`click`,()=>{let e=document.getElementById(`mod-dept-hod`).value.trim(),n=parseInt(document.getElementById(`mod-dept-budget`).value);if(!e||isNaN(n)||n<=0){alert(`Please specify valid HOD name and operating budget numbers.`);return}t.hod=e,t.budget=n,window.App.closeModal(),alert(`Department parameters updated successfully!`),window.App.loadView(`departments`)})}return{render:e}})(),window.announcementsView=(function(){function e(e){let r=window.UniversityDB.getAnnouncements();e.innerHTML=`
      <div class="page-header animate-fade-in">
        <div>
          <h1>Notice Board & Campus Broadcasts</h1>
          <p>Read official academic, administrative, event, and system notices. Create new board notifications.</p>
        </div>
        <button class="btn btn-primary" id="btn-post-notice">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          Post Notice
        </button>
      </div>

      <!-- Notices grid -->
      <div class="grid-2 animate-fade-in delay-1 mt-6" id="notices-grid-container">
        <!-- Loaded dynamically -->
      </div>
    `,document.getElementById(`btn-post-notice`).addEventListener(`click`,n),t(r)}function t(e){let t=document.getElementById(`notices-grid-container`);if(t){if(e.length===0){t.innerHTML=`
        <div class="card col-span-full text-center text-brand-text-muted p-8">
          No notices posted on notice board.
        </div>
      `;return}t.innerHTML=e.map(e=>`
      <div class="card flex flex-col gap-4" style="border-left: 5px solid ${e.color||`var(--color-brand-primary)`};">
        <div class="flex justify-between items-center">
          <span class="badge bg-brand-bg-tertiary text-brand-text-main font-bold">${e.tag}</span>
          <span class="text-xs text-brand-text-subtle">${e.date}</span>
        </div>
        <div>
          <h3 class="font-display text-lg mb-1.5 font-semibold">${e.title}</h3>
          <p class="text-brand-text-muted text-sm leading-relaxed">${e.content}</p>
        </div>
        <div class="flex justify-end gap-2 mt-auto pt-2.5 border-t border-brand-border">
          <button class="btn btn-secondary btn-sm edit-notice-btn" data-id="${e.id}">Remove Notice</button>
        </div>
      </div>
    `).join(``),t.querySelectorAll(`.edit-notice-btn`).forEach(e=>{e.addEventListener(`click`,()=>{i(parseInt(e.getAttribute(`data-id`)))})})}}function n(){window.App.showModal(`Post Notice Board Broadcast`,`
      <form id="post-ann-form" class="max-h-[60vh] overflow-y-auto pr-2">
        <div class="form-group">
          <label class="form-label">Notice Title *</label>
          <input type="text" class="form-control" id="post-ann-title" placeholder="e.g. End Semester Holiday Schedule" required>
        </div>
        <div class="grid-2">
          <div class="form-group">
            <label class="form-label">Broadcast Tag</label>
            <select class="form-control" id="post-ann-tag">
              <option>Academic</option>
              <option>Event</option>
              <option>System</option>
              <option>Administration</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Color Theme Accent</label>
            <select class="form-control" id="post-ann-color">
              <option value="var(--color-brand-primary)">Indigo (Academic)</option>
              <option value="var(--color-brand-accent-emerald)">Emerald (Event)</option>
              <option value="var(--color-brand-accent-ruby)">Ruby (Alerts)</option>
              <option value="var(--color-brand-accent-cyan)">Cyan (Tech)</option>
            </select>
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">Target Audience</label>
          <select class="form-control" id="post-ann-target">
            <option>All Users</option>
            <option>Students Only</option>
            <option>Faculty Only</option>
            <option>Administrators Only</option>
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">Broadcast Content Details *</label>
          <textarea class="form-control" id="post-ann-content" rows="4" placeholder="Enter notice brief descriptions..." required></textarea>
        </div>

        <!-- AI Notice Engagement Reach Predictor -->
        <div class="card mt-4 p-4 bg-brand-bg-tertiary border border-brand-border">
          <div class="flex items-center justify-between mb-3 pb-2 border-b border-brand-border/40">
            <div class="flex items-center gap-2">
              <span class="w-2.5 h-2.5 rounded-full bg-brand-primary animate-pulse"></span>
              <span class="text-xs font-bold uppercase tracking-wider text-brand-text-main font-display">AI Notice Reach Predictor</span>
            </div>
            <span class="badge text-[0.65rem] py-0.5 px-2 font-mono bg-brand-accent-emerald/20 text-brand-accent-emerald" id="ann-ai-reach-status">Calculating...</span>
          </div>
          <div class="grid grid-cols-2 gap-3 text-xs text-brand-text-muted">
            <div>
              <span class="text-[0.7rem] text-brand-text-subtle">Estimated Read Rate:</span>
              <div class="font-bold text-brand-text-main font-mono text-sm mt-0.5" id="ann-ai-reach-pct">Calculating...</div>
            </div>
            <div>
              <span class="text-[0.7rem] text-brand-text-subtle">Target Audience Reach:</span>
              <div class="font-bold text-brand-text-main font-mono text-sm mt-0.5" id="ann-ai-reach-count">Calculating...</div>
            </div>
          </div>
        </div>
      </form>
    `,`
      <button class="btn btn-secondary" onclick="window.App.closeModal()">Cancel</button>
      <button class="btn btn-primary" id="btn-submit-notice">Post Board Notice</button>
    `);let e=document.getElementById(`post-ann-title`),n=document.getElementById(`post-ann-tag`),i=document.getElementById(`post-ann-content`);e&&n&&i&&(e.addEventListener(`input`,r),n.addEventListener(`change`,r),i.addEventListener(`input`,r)),r(),document.getElementById(`btn-submit-notice`).addEventListener(`click`,()=>{let e=document.getElementById(`post-ann-title`).value.trim(),n=document.getElementById(`post-ann-tag`).value,r=document.getElementById(`post-ann-color`).value,i=document.getElementById(`post-ann-target`).value,a=document.getElementById(`post-ann-content`).value.trim();if(!e||!a){alert(`Please enter a notice title and description brief.`);return}let o=window.UniversityDB.getAnnouncements(),s={id:o.length+1,title:e,tag:n,color:r,target:i,content:a,date:new Date().toISOString().split(`T`)[0]};window.UniversityDB.addAnnouncement(s),window.App.closeModal(),alert(`Notice posted on campus board!`),t(o)})}async function r(){let e=document.getElementById(`post-ann-title`),t=document.getElementById(`post-ann-tag`),n=document.getElementById(`post-ann-content`);if(!(!e||!t||!n)){if(typeof tf>`u`){let e=document.getElementById(`ann-ai-reach-pct`);e&&(e.textContent=`TF Unavailable`);return}try{let i=e.value.length,a=n.value.length,o=t.value===`Academic`?1:.4,s=[i/100,a/500,o],c=tf.sequential();c.add(tf.layers.dense({units:3,activation:`tanh`,inputShape:[3]})),c.add(tf.layers.dense({units:1,activation:`sigmoid`}));let l=tf.tensor2d([[.8],[-.4],[.6]]),u=tf.tensor1d([.2]);c.layers[1].setWeights([l,u]);let d=tf.tensor2d([s],[1,3]),f=c.predict(d),p=(await f.data())[0];d.dispose(),f.dispose(),l.dispose(),u.dispose(),c.dispose();var r=p;(i<5||a<10)&&(r=.05);let m=document.getElementById(`ann-ai-reach-pct`),h=document.getElementById(`ann-ai-reach-count`),g=document.getElementById(`ann-ai-reach-status`),_=window.UniversityDB.getStudents().length||30,v=Math.round(_*r);m&&(m.textContent=(r*100).toFixed(1)+`%`),h&&(h.textContent=v+` students`),g&&(r>.6?(g.textContent=`High Engagement`,g.className=`badge text-[0.65rem] py-0.5 px-2 font-mono bg-brand-accent-emerald/20 text-brand-accent-emerald`):r>.3?(g.textContent=`Moderate Reach`,g.className=`badge text-[0.65rem] py-0.5 px-2 font-mono bg-brand-accent-amber/20 text-brand-accent-amber`):(g.textContent=`Low Engagement Warning`,g.className=`badge text-[0.65rem] py-0.5 px-2 font-mono bg-brand-accent-ruby/20 text-brand-accent-ruby`))}catch(e){console.error(`TF Notice inference failed:`,e)}}}function i(e){let n=window.UniversityDB.getAnnouncements(),r=n.findIndex(t=>t.id===e);r!==-1&&(n.splice(r,1),alert(`Broadcast notice removed.`),t(n))}return{render:e,openPostModal:n}})(),window.blockchainView=(function(){let e=[],t=[],n={};function r(e){let t=0,n=e+Date.now()+Math.random();for(let e=0;e<n.length;e++){let r=n.charCodeAt(e);t=(t<<5)-t+r,t|=0}return`0x`+Math.abs(t).toString(16).padStart(16,`0`)+Math.floor(Math.random()*4294967295).toString(16).padStart(8,`0`)+Math.floor(Math.random()*4294967295).toString(16).padStart(8,`0`)}function i(){if(e.length>0)return;e.push({index:0,timestamp:`2026-01-01T00:00:00Z`,type:`GENESIS`,data:{message:`Aegis University Blockchain Genesis Block`},hash:`0x0000000000000000000000000000000000000000`,prevHash:`0x0000000000000000000000000000000000000000`,nonce:0,gasUsed:0});let i=window.UniversityDB.getStudents();[{studentId:`STU001`,studentName:`Alex Rivera`,type:`Course Completion`,course:`CS101 - Intro to Programming`,grade:`A`,issueDate:`2026-01-15`},{studentId:`STU002`,studentName:`Zoe Chen`,type:`Course Completion`,course:`CS202 - Data Structures`,grade:`A+`,issueDate:`2026-02-20`},{studentId:`STU006`,studentName:`Sophia Patel`,type:`Degree Certificate`,course:`B.Tech Computer Science`,grade:`First Class with Distinction`,issueDate:`2026-03-01`},{studentId:`STU009`,studentName:`Devon Miller`,type:`Course Completion`,course:`EE302 - Microprocessors`,grade:`A`,issueDate:`2026-03-10`},{studentId:`STU008`,studentName:`Elena Rostova`,type:`Merit Certificate`,course:`BA201 - Organizational Behavior`,grade:`University Gold Medal`,issueDate:`2026-04-05`},{studentId:`STU004`,studentName:`Emily Watson`,type:`Course Completion`,course:`BI101 - Biotechnology Fundamentals`,grade:`B+`,issueDate:`2026-04-18`}].forEach((n,i)=>{let a=r(n.studentId+n.course),o={index:e.length,timestamp:n.issueDate+`T10:00:00Z`,type:`CERT_ISSUE`,data:n,hash:a,prevHash:e[e.length-1].hash,nonce:Math.floor(Math.random()*99999),gasUsed:Math.floor(21e3+Math.random()*5e4)};e.push(o),n.blockIndex=o.index,n.txHash=a,n.verified=!0,t.push(n)}),window.UniversityDB.getTransactions().forEach(t=>{let n=r(t.txId+t.studentId);e.push({index:e.length,timestamp:t.date+`T12:00:00Z`,type:`FEE_PAYMENT`,data:{txId:t.txId,studentId:t.studentId,studentName:t.studentName,amount:t.amount,method:t.method},hash:n,prevHash:e[e.length-1].hash,nonce:Math.floor(Math.random()*99999),gasUsed:Math.floor(21e3+Math.random()*3e4)})}),i.forEach(e=>{n[e.id]={address:r(e.id+e.name).slice(0,42),balance:parseFloat((Math.random()*2.5+.01).toFixed(4)),network:`Aegis EduChain (Testnet)`,certificates:t.filter(t=>t.studentId===e.id).length}})}let a=null;function o(r){i();let a=e.length,o=t.length,f=e.reduce((e,t)=>e+(t.gasUsed||0),0),p=Object.keys(n).length;r.innerHTML=`
      <div class="page-header animate-fade-in">
        <div>
          <h1>Blockchain & Web3 Hub</h1>
          <p>Decentralized credential verification, digital certificate minting, on-chain ledger, and student wallet management.</p>
        </div>
        <div class="flex gap-2">
          <button class="btn btn-secondary btn-sm" id="btn-verify-cert">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 12l2 2 4-4"/><circle cx="12" cy="12" r="10"/></svg>
            Verify Certificate
          </button>
          <button class="btn btn-primary btn-sm" id="btn-mint-cert">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            Mint Certificate NFT
          </button>
        </div>
      </div>

      <!-- Chain KPI Summary -->
      <div class="kpi-grid animate-fade-in delay-1 mt-6">
        <div class="card kpi-card">
          <div class="kpi-details">
            <span class="kpi-label">Chain Height</span>
            <span class="kpi-value text-brand-primary">#${a}</span>
            <span class="kpi-growth text-brand-accent-emerald">Live • Synced</span>
          </div>
          <div class="kpi-icon text-brand-primary">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
          </div>
        </div>
        <div class="card kpi-card">
          <div class="kpi-details">
            <span class="kpi-label">Certificates Issued</span>
            <span class="kpi-value text-brand-accent-emerald">${o}</span>
            <span class="kpi-growth text-brand-accent-cyan">Immutable Credentials</span>
          </div>
          <div class="kpi-icon text-brand-accent-emerald">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
          </div>
        </div>
        <div class="card kpi-card">
          <div class="kpi-details">
            <span class="kpi-label">Gas Consumed</span>
            <span class="kpi-value text-brand-accent-amber">${(f/1e3).toFixed(1)}K</span>
            <span class="kpi-growth text-brand-accent-amber">Cumulative Wei</span>
          </div>
          <div class="kpi-icon text-brand-accent-amber">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
          </div>
        </div>
        <div class="card kpi-card">
          <div class="kpi-details">
            <span class="kpi-label">Active Wallets</span>
            <span class="kpi-value text-brand-accent-cyan">${p}</span>
            <span class="kpi-growth text-brand-accent-emerald">EduChain Testnet</span>
          </div>
          <div class="kpi-icon text-brand-accent-cyan">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 10H18a2 2 0 100 4h4"/></svg>
          </div>
        </div>
      </div>

      <!-- Two Column: Chain Activity Chart + Certificates -->
      <div class="grid-2 animate-fade-in delay-2 mt-6">

        <!-- Block Activity Chart -->
        <div class="card">
          <h3 class="mb-4 font-display text-lg font-semibold">Block Activity Timeline</h3>
          <div class="chart-wrapper h-[220px]">
            <canvas id="chain-activity-chart"></canvas>
          </div>
        </div>

        <!-- Issued Certificates List -->
        <div class="card">
          <div class="flex justify-between items-center mb-4">
            <h3 class="font-display text-lg font-semibold">Minted Credential NFTs</h3>
            <span class="badge badge-success">${o} On-Chain</span>
          </div>
          <div class="flex flex-col gap-3 max-h-[280px] overflow-y-auto pr-1" id="cert-list-container">
            ${t.map(e=>`
              <div class="p-3 border border-brand-border rounded-xl bg-brand-bg-tertiary flex justify-between items-center gap-3 transition-all duration-200 hover:translate-x-1 hover:border-brand-accent-cyan/30">
                <div class="flex-1 min-w-0">
                  <div class="flex items-center gap-2 mb-1">
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="${e.type===`Degree Certificate`?`var(--color-brand-accent-amber)`:e.type===`Merit Certificate`?`var(--color-brand-accent-ruby)`:`var(--color-brand-accent-emerald)`}" stroke-width="2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                    <strong class="text-sm">${e.studentName}</strong>
                    <span class="badge text-[0.65rem] bg-brand-primary/10 text-brand-primary">${e.type}</span>
                  </div>
                  <div class="text-xs text-brand-text-muted">${e.course}</div>
                  <code class="text-[0.65rem] text-brand-text-subtle break-all">${e.txHash.slice(0,30)}...</code>
                </div>
                <div class="text-right shrink-0">
                  <span class="badge badge-success" style="font-size:0.7rem;">✓ Verified</span>
                  <div class="text-[0.7rem] text-brand-text-subtle mt-1">Block #${e.blockIndex}</div>
                </div>
              </div>
            `).join(``)}
          </div>
        </div>
      </div>

      <!-- Two Column: Block Explorer + Student Wallets -->
      <div class="grid-2 animate-fade-in delay-3 mt-6">

        <!-- Block Explorer -->
        <div class="card">
          <h3 class="mb-4 font-display text-lg font-semibold">Block Explorer — On-Chain Ledger</h3>
          <div class="max-h-[380px] overflow-y-auto pr-1">
            <table class="w-full border-collapse">
              <thead>
                <tr>
                  <th class="p-2.5 text-[0.75rem]">Block</th>
                  <th class="p-2.5 text-[0.75rem]">Type</th>
                  <th class="p-2.5 text-[0.75rem]">Hash</th>
                  <th class="p-2.5 text-[0.75rem]">Gas</th>
                  <th class="p-2.5 text-[0.75rem]">Nonce</th>
                </tr>
              </thead>
              <tbody>
                ${e.slice().reverse().map(e=>{let t=`badge-info`;return e.type===`CERT_ISSUE`?t=`badge-success`:e.type===`FEE_PAYMENT`?t=`badge-warning`:e.type===`GENESIS`&&(t=`badge-info`),`
                    <tr class="block-row border-b border-brand-border cursor-pointer hover:bg-white/[0.02] transition-colors" data-idx="${e.index}">
                      <td class="p-2.5 font-bold text-brand-primary text-sm">#${e.index}</td>
                      <td class="p-2.5"><span class="badge ${t} text-[0.7rem]">${e.type.replace(`_`,` `)}</span></td>
                      <td class="p-2.5"><code class="text-[0.7rem] text-brand-text-muted">${e.hash.slice(0,18)}...</code></td>
                      <td class="p-2.5 text-xs text-brand-text-muted">${(e.gasUsed||0).toLocaleString()}</td>
                      <td class="p-2.5 text-xs text-brand-text-subtle">${e.nonce}</td>
                    </tr>
                  `}).join(``)}
              </tbody>
            </table>
          </div>
        </div>

        <!-- Student Wallets -->
        <div class="card">
          <h3 class="mb-4 font-display text-lg font-semibold">Student Credential Wallets</h3>
          <p class="text-brand-text-muted text-xs mb-4">Aegis EduChain Testnet — Each student receives a decentralized identity wallet upon enrollment.</p>
          <div class="flex flex-col gap-3 max-h-[330px] overflow-y-auto pr-1">
            ${window.UniversityDB.getStudents().map(e=>{let t=n[e.id];return t?`
                <div class="p-3 border border-brand-border rounded-xl bg-brand-bg-tertiary flex justify-between items-center transition-all duration-200 hover:bg-white/[0.02]">
                  <div class="flex items-center gap-3 min-w-0 flex-1">
                    <img src="${e.avatar}" class="w-8 h-8 rounded-full object-cover border border-brand-border shrink-0">
                    <div class="min-w-0">
                      <strong class="text-sm">${e.name}</strong>
                      <code class="block text-[0.65rem] text-brand-text-subtle break-all">${t.address}</code>
                    </div>
                  </div>
                  <div class="text-right shrink-0 ml-3">
                    <div class="font-bold text-brand-accent-cyan text-sm">${t.balance} ETH</div>
                    <span class="text-[0.7rem] text-brand-text-subtle">${t.certificates} cert(s)</span>
                  </div>
                </div>
              `:``}).join(``)}
          </div>
        </div>
      </div>

      <!-- Smart Contract Simulation -->
      <div class="card animate-fade-in delay-4 mt-6">
        <h3 class="mb-2 font-display text-lg font-semibold">Smart Contract — Fee Payment Gateway</h3>
        <p class="text-brand-text-muted text-xs mb-5">Execute a simulated on-chain fee transaction through the Aegis University smart contract.</p>
        <div class="grid grid-cols-1 md:grid-cols-[1fr_1fr_1fr_auto] gap-4 items-end">
          <div class="form-group mb-0">
            <label class="form-label">Student Wallet</label>
            <select class="form-control" id="sc-student-select">
              ${window.UniversityDB.getStudents().map(e=>`<option value="${e.id}">${e.name} (${e.id})</option>`).join(``)}
            </select>
          </div>
          <div class="form-group mb-0">
            <label class="form-label">Amount (ETH)</label>
            <input type="number" class="form-control" id="sc-amount" value="0.5" min="0.01" max="10" step="0.01">
          </div>
          <div class="form-group mb-0">
            <label class="form-label">Gas Limit</label>
            <input type="number" class="form-control" id="sc-gas" value="21000" min="21000" max="100000">
          </div>
          <button class="btn btn-primary h-[42px]" id="btn-execute-sc">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
            Execute
          </button>
        </div>
        <div id="sc-receipt" class="mt-4"></div>
      </div>
    `,document.getElementById(`btn-mint-cert`).addEventListener(`click`,l),document.getElementById(`btn-verify-cert`).addEventListener(`click`,u),document.getElementById(`btn-execute-sc`).addEventListener(`click`,d),r.querySelectorAll(`.block-row`).forEach(e=>{e.addEventListener(`click`,()=>{c(parseInt(e.getAttribute(`data-idx`)))})}),setTimeout(()=>s(),100)}function s(){let t=document.getElementById(`chain-activity-chart`);t&&(a&&a.destroy(),e.filter(e=>e.type===`CERT_ISSUE`).length,e.filter(e=>e.type===`FEE_PAYMENT`).length,e.filter(e=>e.type===`GENESIS`).length,a=new Chart(t,{type:`bar`,data:{labels:[`Jan`,`Feb`,`Mar`,`Apr`,`May`,`Jun`],datasets:[{label:`Gas Used (Wei)`,data:[12e3,28e3,45e3,38e3,62e3,54e3],backgroundColor:`rgba(99, 102, 241, 0.6)`,borderColor:`#6366f1`,borderWidth:1,borderRadius:6}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:!1}},scales:{y:{grid:{color:`rgba(255,255,255,0.05)`},ticks:{color:`#94a3b8`}},x:{grid:{display:!1},ticks:{color:`#94a3b8`}}}}}))}function c(t){let n=e.find(e=>e.index===t);if(!n)return;let r=JSON.stringify(n.data,null,2),i=`
      <div class="grid grid-cols-2 gap-3 md:gap-x-6 text-sm mb-5">
        <div><span class="text-brand-text-muted">Block Index:</span> <strong class="text-brand-primary">#${n.index}</strong></div>
        <div><span class="text-brand-text-muted">Block Type:</span> <strong>${n.type}</strong></div>
        <div><span class="text-brand-text-muted">Timestamp:</span> <strong>${n.timestamp}</strong></div>
        <div><span class="text-brand-text-muted">Nonce:</span> <strong>${n.nonce}</strong></div>
        <div><span class="text-brand-text-muted">Gas Used:</span> <strong>${(n.gasUsed||0).toLocaleString()} Wei</strong></div>
        <div><span class="text-brand-text-muted">Status:</span> <span class="badge badge-success">Confirmed</span></div>
      </div>
      <div class="mb-4">
        <span class="text-brand-text-muted text-xs">Block Hash:</span>
        <code class="block mt-1 p-2.5 bg-brand-bg-tertiary rounded-lg text-xs break-all text-brand-accent-cyan">${n.hash}</code>
      </div>
      <div class="mb-4">
        <span class="text-brand-text-muted text-xs">Previous Hash:</span>
        <code class="block mt-1 p-2.5 bg-brand-bg-tertiary rounded-lg text-xs break-all text-brand-text-subtle">${n.prevHash}</code>
      </div>
      <div>
        <span class="text-brand-text-muted text-xs">Block Data Payload:</span>
        <pre class="mt-1 p-3 bg-brand-bg-tertiary rounded-lg text-xs text-brand-accent-emerald overflow-x-auto whitespace-pre-wrap">${r}</pre>
      </div>
    `;window.App.showModal(`Block Inspector — #`+n.index,i,`<button class="btn btn-secondary" onclick="window.App.closeModal()">Close</button>`)}function l(){let i=window.UniversityDB.getStudents(),a=window.UniversityDB.getCourses(),s=`
      <p class="text-brand-text-muted text-sm mb-5">Mint a new verifiable credential NFT to the Aegis EduChain. This certificate becomes permanently immutable once confirmed.</p>
      <div class="form-group">
        <label class="form-label">Student</label>
        <select class="form-control" id="mint-student">${i.map(e=>`<option value="${e.id}">${e.name} (${e.id})</option>`).join(``)}</select>
      </div>
      <div class="grid-2">
        <div class="form-group">
          <label class="form-label">Certificate Type</label>
          <select class="form-control" id="mint-type">
            <option>Course Completion</option>
            <option>Degree Certificate</option>
            <option>Merit Certificate</option>
            <option>Research Publication</option>
            <option>Internship Certificate</option>
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">Grade / Honor</label>
          <select class="form-control" id="mint-grade">
            <option>A+</option><option>A</option><option>B+</option><option>B</option><option>C</option>
            <option>First Class with Distinction</option><option>University Gold Medal</option><option>Pass</option>
          </select>
        </div>
      </div>
      <div class="form-group">
        <label class="form-label">Course / Program</label>
        <select class="form-control" id="mint-course">${a.map(e=>`<option value="${e.code} - ${e.title}">${e.code} - ${e.title}</option>`).join(``)}</select>
      </div>
    `;window.App.showModal(`Mint Credential NFT`,s,`
      <button class="btn btn-secondary" onclick="window.App.closeModal()">Cancel</button>
      <button class="btn btn-primary" id="btn-confirm-mint">
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
        Mint to Chain
      </button>
    `),document.getElementById(`btn-confirm-mint`).addEventListener(`click`,()=>{let a=document.getElementById(`mint-student`).value,s=i.find(e=>e.id===a),c=document.getElementById(`mint-type`).value,l=document.getElementById(`mint-grade`).value,u=document.getElementById(`mint-course`).value;if(!s)return;let d={studentId:s.id,studentName:s.name,type:c,course:u,grade:l,issueDate:new Date().toISOString().split(`T`)[0]},f=r(s.id+u+Date.now()),p={index:e.length,timestamp:new Date().toISOString(),type:`CERT_ISSUE`,data:d,hash:f,prevHash:e[e.length-1].hash,nonce:Math.floor(Math.random()*99999),gasUsed:Math.floor(21e3+Math.random()*5e4)};e.push(p),d.blockIndex=p.index,d.txHash=f,d.verified=!0,t.push(d),n[s.id]&&n[s.id].certificates++,window.App.closeModal(),alert(`✅ Certificate NFT minted successfully!\n\nStudent: ${s.name}\nType: ${c}\nBlock: #${p.index}\nTx Hash: ${f.slice(0,32)}...`);let m=document.querySelector(`.page-transition`);m&&o(m)})}function u(){window.App.showModal(`Verify Certificate Authenticity`,`
      <p class="text-brand-text-muted text-sm mb-5">Enter a transaction hash or student ID to verify the authenticity of a certificate on the Aegis EduChain.</p>
      <div class="form-group">
        <label class="form-label">Transaction Hash or Student ID</label>
        <input type="text" class="form-control" id="verify-input" placeholder="e.g. 0x... or STU001">
      </div>
      <div id="verify-result" class="mt-4"></div>
    `,`
      <button class="btn btn-secondary" onclick="window.App.closeModal()">Close</button>
      <button class="btn btn-primary" id="btn-run-verify">
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 12l2 2 4-4"/><circle cx="12" cy="12" r="10"/></svg>
        Verify On-Chain
      </button>
    `),document.getElementById(`btn-run-verify`).addEventListener(`click`,()=>{let e=document.getElementById(`verify-input`).value.trim(),n=document.getElementById(`verify-result`);if(!e){n.innerHTML=`<p class="text-brand-accent-ruby">Please enter a hash or student ID.</p>`;return}let r=t.filter(t=>t.txHash.toLowerCase().includes(e.toLowerCase())||t.studentId.toUpperCase()===e.toUpperCase());if(r.length===0){n.innerHTML=`
          <div class="p-4 border border-brand-accent-ruby/30 rounded-xl bg-brand-accent-ruby/5">
            <div class="flex items-center gap-2 mb-2">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="var(--color-brand-accent-ruby)" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
              <strong class="text-brand-accent-ruby">Not Found</strong>
            </div>
            <p class="text-xs text-brand-text-muted">No matching certificates found on the Aegis EduChain for this query. The credential may be invalid or not yet minted.</p>
          </div>
        `;return}n.innerHTML=r.map(e=>`
        <div class="p-4 border border-brand-accent-emerald/30 rounded-xl bg-brand-accent-emerald/5 mb-3">
          <div class="flex items-center gap-2 mb-2">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="var(--color-brand-accent-emerald)" stroke-width="2"><path d="M9 12l2 2 4-4"/><circle cx="12" cy="12" r="10"/></svg>
            <strong class="text-brand-accent-emerald">✓ Verified on Blockchain</strong>
          </div>
          <div class="grid grid-cols-2 gap-2 text-xs">
            <div><span class="text-brand-text-muted">Student:</span> <strong>${e.studentName}</strong></div>
            <div><span class="text-brand-text-muted">Type:</span> <strong>${e.type}</strong></div>
            <div><span class="text-brand-text-muted">Course:</span> <strong>${e.course}</strong></div>
            <div><span class="text-brand-text-muted">Grade:</span> <strong>${e.grade}</strong></div>
            <div><span class="text-brand-text-muted">Issue Date:</span> <strong>${e.issueDate}</strong></div>
            <div><span class="text-brand-text-muted">Block:</span> <strong class="text-brand-primary">#${e.blockIndex}</strong></div>
          </div>
          <code class="block mt-2.5 text-[0.7rem] text-brand-accent-cyan break-all">${e.txHash}</code>
        </div>
      `).join(``)})}function d(){let t=document.getElementById(`sc-student-select`).value,i=parseFloat(document.getElementById(`sc-amount`).value),a=parseInt(document.getElementById(`sc-gas`).value),o=document.getElementById(`sc-receipt`),s=window.UniversityDB.getStudents().find(e=>e.id===t);if(!s||isNaN(i)||i<=0){o.innerHTML=`<p class="text-brand-accent-ruby">Invalid transaction parameters.</p>`;return}o.innerHTML=`
      <div class="p-4 border border-brand-border rounded-xl bg-brand-bg-tertiary text-center">
        <div class="animate-pulse-glow inline-block w-3 h-3 rounded-full bg-brand-primary mr-2"></div>
        <span class="text-brand-text-muted">Broadcasting transaction to EduChain network...</span>
      </div>
    `,setTimeout(()=>{let c=r(t+i+Date.now()),l=(i*3800).toFixed(2),u={index:e.length,timestamp:new Date().toISOString(),type:`FEE_PAYMENT`,data:{txId:`SC-`+Math.floor(1e3+Math.random()*9e3),studentId:t,studentName:s.name,amount:i+` ETH`,usdEquivalent:`$`+l,method:`Smart Contract`},hash:c,prevHash:e[e.length-1].hash,nonce:Math.floor(Math.random()*99999),gasUsed:a};e.push(u);let d=Math.min(s.feeTotal,s.feePaid+parseInt(l));window.UniversityDB.updateStudent(t,{feePaid:d}),n[t]&&(n[t].balance=Math.max(0,parseFloat((n[t].balance-i).toFixed(4)))),o.innerHTML=`
        <div class="p-5 border border-brand-accent-emerald/30 rounded-xl bg-brand-accent-emerald/5">
          <div class="flex items-center gap-2 mb-4">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="var(--color-brand-accent-emerald)" stroke-width="2"><path d="M9 12l2 2 4-4"/><circle cx="12" cy="12" r="10"/></svg>
            <strong class="text-brand-accent-emerald text-base font-semibold">Transaction Confirmed ✓</strong>
          </div>
          <div class="grid grid-cols-2 gap-2 text-sm">
            <div><span class="text-brand-text-muted">From:</span> <strong>${s.name}</strong></div>
            <div><span class="text-brand-text-muted">To:</span> <strong>Aegis University Treasury</strong></div>
            <div><span class="text-brand-text-muted">Amount:</span> <strong class="text-brand-accent-cyan">${i} ETH</strong> <span class="text-brand-text-subtle">(~$${l})</span></div>
            <div><span class="text-brand-text-muted">Gas Used:</span> <strong>${a.toLocaleString()} Wei</strong></div>
            <div><span class="text-brand-text-muted">Block:</span> <strong class="text-brand-primary">#${u.index}</strong></div>
            <div><span class="text-brand-text-muted">Status:</span> <span class="badge badge-success">Finalized</span></div>
          </div>
          <code class="block mt-3 p-2.5 bg-brand-bg-primary rounded-lg text-[0.7rem] break-all text-brand-accent-cyan">TX: ${c}</code>
        </div>
      `},1500)}return{render:o,openMintModal:l}})(),window.recruitmentView=(function(){let e=[{name:`Marcus Sterling`,program:`Computer Science`,gpa:3.8,sat:1450,interview:9,status:`Review`},{name:`Aaliyah Jones`,program:`Bioinformatics`,gpa:3.5,sat:1320,interview:8.5,status:`Review`},{name:`Hiroshi Sato`,program:`Electrical Eng`,gpa:3.9,sat:1510,interview:9.5,status:`Approved`},{name:`Clara Oswald`,program:`Business Admin`,gpa:3.2,sat:1240,interview:7,status:`Review`},{name:`Bruce Banner`,program:`Mechanical Eng`,gpa:3.7,sat:1400,interview:8,status:`Review`}];function t(t){t.innerHTML=`
      <div class="page-header animate-fade-in">
        <div>
          <h1>Recruitment & Admissions Converter</h1>
          <p>Analyze prospective student acceptance parameters, evaluate faculty candidates, and run neural suitability metrics.</p>
        </div>
      </div>

      <!-- Overview stats -->
      <div class="kpi-grid animate-fade-in delay-1 mt-6">
        <div class="card kpi-card">
          <div class="kpi-details">
            <span class="kpi-label">Active Applications</span>
            <span class="kpi-value">${e.length} Candidates</span>
            <span class="kpi-growth text-brand-primary">Fall Intake 2026</span>
          </div>
          <div class="kpi-icon text-brand-primary">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>
          </div>
        </div>
        <div class="card kpi-card">
          <div class="kpi-details">
            <span class="kpi-label">AI Target Conversion Rate</span>
            <span class="kpi-value" id="rec-ai-target-conversion">78.5%</span>
            <span class="kpi-growth text-brand-accent-emerald">Optimized Cap</span>
          </div>
          <div class="kpi-icon text-brand-accent-emerald">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
          </div>
        </div>
      </div>

      <!-- Form Evaluation & Admissions list -->
      <div class="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-6 animate-fade-in delay-2 mt-6">
        
        <!-- Candidates Table -->
        <div class="card">
          <h3 class="mb-4 font-display text-lg font-bold">Admissions Pipeline Roster</h3>
          <div class="table-container">
            <table>
              <thead>
                <tr>
                  <th>Applicant Name</th>
                  <th>Target Program</th>
                  <th>GPA / SAT</th>
                  <th>Interview</th>
                  <th class="text-right">AI Conversion Rate</th>
                </tr>
              </thead>
              <tbody id="admissions-roster-body">
                <!-- Loaded dynamically -->
              </tbody>
            </table>
          </div>
        </div>

        <!-- Interactive AI Evaluator Card -->
        <div class="card">
          <h3 class="mb-4 font-display text-base font-bold m-0 border-b border-brand-border pb-3">Interactive Admission Evaluator</h3>
          <p class="text-xs text-brand-text-muted mb-4">Input prospective scores to predict conversion likelihood using in-browser classification networks.</p>
          
          <div class="flex flex-col gap-4">
            <div class="form-group">
              <label class="form-label">Applicant GPA</label>
              <input type="number" id="eval-gpa" class="form-control" min="1.0" max="4.0" step="0.1" value="3.6">
            </div>
            <div class="grid-2">
              <div class="form-group">
                <label class="form-label">SAT Score</label>
                <input type="number" id="eval-sat" class="form-control" min="800" max="1600" step="10" value="1350">
              </div>
              <div class="form-group">
                <label class="form-label">Interview Score (1-10)</label>
                <input type="number" id="eval-interview" class="form-control" min="1" max="10" step="0.5" value="8.0">
              </div>
            </div>
            
            <!-- Optimizer training configs -->
            <div class="grid-2 p-3 bg-brand-bg-tertiary border border-brand-border rounded-xl">
              <div class="form-group mb-0">
                <label class="form-label text-[0.65rem] uppercase">Learning Rate</label>
                <select id="eval-lr" class="form-control text-xs py-1 px-2">
                  <option value="0.1">0.10 (Fast)</option>
                  <option value="0.05" selected>0.05 (Balanced)</option>
                  <option value="0.01">0.01 (Slow)</option>
                </select>
              </div>
              <div class="form-group mb-0">
                <label class="form-label text-[0.65rem] uppercase">Training Epochs</label>
                <input type="number" id="eval-epochs" class="form-control text-xs py-1 px-2" value="25" min="5" max="100">
              </div>
            </div>

            <!-- Training progress indicator -->
            <div id="eval-training-card" class="p-3 bg-brand-bg-primary rounded-xl border border-brand-border/40 text-xs hidden animate-fade-in">
              <div class="flex justify-between items-center mb-1">
                <span>Model Tuning...</span>
                <span id="eval-epoch-disp" class="font-mono font-bold text-brand-primary">0/25</span>
              </div>
              <div class="flex justify-between items-center text-[0.65rem] text-brand-text-subtle mb-2">
                <span>Mean Squared Error (Loss):</span>
                <span id="eval-loss-disp" class="font-mono font-bold text-brand-accent-amber">0.000000</span>
              </div>
              <div class="w-full bg-brand-bg-secondary h-2.5 rounded-full overflow-hidden border border-brand-border/40">
                <div id="eval-progress-bar" class="bg-brand-primary h-full rounded-full transition-all duration-150" style="width: 0%"></div>
              </div>
            </div>

            <button class="btn btn-primary w-full justify-center flex items-center gap-2 mt-2 cursor-pointer" id="btn-run-eval">
              Project Converter Score
            </button>
          </div>
        </div>
      </div>
    `;let r=t.querySelector(`#btn-run-eval`);r&&r.addEventListener(`click`,()=>{i(t)}),n(t)}async function n(t){let n=t.querySelector(`#admissions-roster-body`);if(!n)return;let i=``;for(let t of e){var a=await r(t.gpa,t.sat,t.interview),o=(a*100).toFixed(1)+`%`;let e=`text-brand-accent-emerald`;a<.4?e=`text-brand-accent-ruby`:a<.7&&(e=`text-brand-accent-amber`),i+=`
        <tr class="border-b border-brand-border/40">
          <td><strong>${t.name}</strong></td>
          <td>${t.program}</td>
          <td>GPA ${t.gpa.toFixed(2)} / SAT ${t.sat}</td>
          <td>${t.interview.toFixed(1)} / 10.0</td>
          <td class="text-right font-mono font-bold ${e}">${o}</td>
        </tr>
      `}n.innerHTML=i}async function r(e,t,n){if(typeof tf>`u`)return .5;try{let r=e/4,i=(t-800)/800,a=n/10,o=tf.sequential();o.add(tf.layers.dense({units:3,activation:`sigmoid`,inputShape:[3]})),o.add(tf.layers.dense({units:1,activation:`sigmoid`}));let s=tf.tensor2d([[1.2],[1.8],[1.5]]),c=tf.tensor1d([.1]);o.layers[1].setWeights([s,c]);let l=tf.tensor2d([[r,i,a]],[1,3]),u=o.predict(l),d=(await u.data())[0];return l.dispose(),u.dispose(),s.dispose(),c.dispose(),o.dispose(),d}catch{return .5}}async function i(e){let t=e.querySelector(`#btn-run-eval`),n=e.querySelector(`#eval-training-card`),r=e.querySelector(`#eval-epoch-disp`),i=e.querySelector(`#eval-loss-disp`),a=e.querySelector(`#eval-progress-bar`);if(typeof tf>`u`){alert(`TensorFlow.js is currently loading or unavailable.`);return}let o=parseFloat(e.querySelector(`#eval-gpa`).value),s=parseInt(e.querySelector(`#eval-sat`).value),c=parseFloat(e.querySelector(`#eval-interview`).value);if(isNaN(o)||isNaN(s)||isNaN(c)){alert(`Please input valid numeric assessment details.`);return}t&&(t.disabled=!0,t.innerText=`Training Model...`),n&&n.classList.remove(`hidden`);let l=parseFloat(e.querySelector(`#eval-lr`).value),u=parseInt(e.querySelector(`#eval-epochs`).value),d=o/4,f=(s-800)/800,p=c/10,m=tf.tensor2d([[3.8/4,650/800,9/10],[3.5/4,520/800,8.5/10],[3.9/4,710/800,9.5/10],[3.2/4,440/800,7/10],[3.7/4,600/800,8/10]],[5,3]),h=tf.tensor2d([[.85],[.65],[.98],[.28],[.72]],[5,1]),g=tf.sequential();g.add(tf.layers.dense({units:3,activation:`sigmoid`,inputShape:[3]})),g.add(tf.layers.dense({units:1,activation:`sigmoid`})),g.compile({optimizer:tf.train.adam(l),loss:`meanSquaredError`});try{await g.fit(m,h,{epochs:u,callbacks:{onEpochEnd:(e,t)=>{let n=(e+1)/u*100;r&&(r.innerText=`${e+1}/${u}`),i&&(i.innerText=t.loss.toFixed(6)),a&&(a.style.width=`${n}%`)}}});let t=tf.tensor2d([[d,f,p]],[1,3]),n=g.predict(t),o=(await n.data())[0];t.dispose(),n.dispose();let s=e.querySelector(`#rec-ai-target-conversion`);s&&(s.textContent=(o*100).toFixed(1)+`%`),alert(`AI Projection Completed!\nPredicted application conversion likelihood: ${(o*100).toFixed(1)}%`)}catch(e){console.error(`TF Recruitment training error:`,e)}finally{m.dispose(),h.dispose(),g.dispose(),t&&(t.disabled=!1,t.innerText=`Project Converter Score`),n&&n.classList.add(`hidden`)}}return{render:t}})(),(function(){window.App={currentView:`dashboard`,init:function(){this.checkAuth(),this.bindEvents(),this.loadView(this.currentView)},checkAuth:function(){if(window.AuthSystem!==void 0&&!window.AuthSystem.isLoggedIn()){window.location.href=`auth.html`;return}if(window.AuthSystem!==void 0){let e=window.AuthSystem.getCurrentUser();if(e){let t=document.getElementById(`user-name-disp`),n=document.getElementById(`user-role-disp`);t&&(t.textContent=e.name),n&&(n.textContent=e.role===`admin`?`Administrator`:e.role===`faculty`?`Faculty Member`:`Student`)}}},bindEvents:function(){let e=document.querySelectorAll(`.nav-link`);e.forEach(t=>{t.addEventListener(`click`,n=>{let r=t.getAttribute(`data-view`);r&&(n.preventDefault(),this.loadView(r),e.forEach(e=>e.classList.remove(`active`)),t.classList.add(`active`))})});let t=document.getElementById(`menu-toggle-btn`),n=document.getElementById(`app-sidebar`);t&&n&&t.addEventListener(`click`,()=>{n.classList.toggle(`collapsed`)});let r=document.getElementById(`modal-close-btn`),i=document.getElementById(`common-modal-overlay`);r&&i&&(r.addEventListener(`click`,this.closeModal),i.addEventListener(`click`,e=>{e.target===i&&this.closeModal()}));let a=document.getElementById(`quick-action-btn`);a&&a.addEventListener(`click`,()=>{this.showQuickActions()});let o=document.getElementById(`notif-btn`);o&&o.addEventListener(`click`,()=>{this.showNotifications()});let s=document.getElementById(`logout-btn`);s&&s.addEventListener(`click`,()=>{this.handleLogout()});let c=document.getElementById(`global-search-input`),l=document.getElementById(`global-search-dropdown`);c&&l&&(c.addEventListener(`focus`,()=>{this.renderSearchDropdown(c.value),l.classList.remove(`hidden`),l.classList.add(`flex`)}),document.addEventListener(`click`,e=>{!c.contains(e.target)&&!l.contains(e.target)&&(l.classList.add(`hidden`),l.classList.remove(`flex`))}),c.addEventListener(`input`,e=>{let t=e.target.value;this.renderSearchDropdown(t),this.handleGlobalSearch(t.toLowerCase().trim())}))},loadView:function(e){let t=document.getElementById(`app-view-container`);if(!t)return;t.innerHTML=`<div class="loading-spinner">Loading view...</div>`,this.currentView=e,document.querySelectorAll(`.nav-link`).forEach(t=>{t.classList.remove(`active`),t.getAttribute(`data-view`)===e&&t.classList.add(`active`)});let n=window[e+`View`];if(n&&typeof n.render==`function`){t.innerHTML=``;let e=document.createElement(`div`);e.className=`page-transition`,t.appendChild(e),n.render(e)}else{t.innerHTML=`
          <div class="page-header">
            <div>
              <h1>${e.charAt(0).toUpperCase()+e.slice(1)}</h1>
              <p>System Preferences and System Configurations.</p>
            </div>
          </div>
          <div class="card animate-fade-in mt-6">
            <h3 class="mb-4 font-display font-bold">System Configuration Panel</h3>
            <p class="text-brand-text-muted mb-6">Manage application settings, custom credentials, user privileges, and system API configuration integrations.</p>

            <div class="grid-2">
              <div class="form-group">
                <label class="form-label">Institution Name</label>
                <input type="text" class="form-control" value="Aegis Model University">
              </div>
              <div class="form-group">
                <label class="form-label">System Time Zone</label>
                <select class="form-control">
                  <option>UTC +05:30 (Calcutta, Mumbai)</option>
                  <option>UTC +00:00 (London, GMT)</option>
                  <option>UTC -05:00 (New York, EST)</option>
                </select>
              </div>
              <div class="form-group">
                <label class="form-label">Academic Calendar Start Year</label>
                <input type="number" class="form-control" value="2026">
              </div>
              <div class="form-group">
                <label class="form-label">Enable Automated Result Processing</label>
                <select class="form-control">
                  <option>Enabled (Real-time Grade Calculation)</option>
                  <option>Disabled (Manual Batch Runs)</option>
                </select>
              </div>
            </div>
            <button class="btn btn-primary mt-4 cursor-pointer" onclick="alert('Configuration parameters persisted successfully!')">Save Preferences</button>
          </div>

          <!-- Database AI Auditor Panel -->
          <div class="card animate-fade-in mt-6 border border-brand-border bg-brand-bg-tertiary/20">
            <div class="flex justify-between items-center mb-4">
              <div>
                <h3 class="m-0 font-display text-lg font-bold">Database AI Integrity Auditor</h3>
                <p class="text-brand-text-muted text-[0.8rem] mt-1">Run the autoencoder model over student profiles to detect logical record inconsistencies or anomalous values.</p>
              </div>
              <button class="btn btn-primary btn-sm cursor-pointer" id="btn-run-integrity">Scan Database</button>
            </div>
            
            <div id="integrity-results-container" class="flex flex-col gap-3">
              <div class="text-brand-text-subtle text-xs py-2">Click Scan Database to run the in-browser anomaly detection neural network.</div>
            </div>
          </div>
        `;let n=t.querySelector(`#btn-run-integrity`);n&&n.addEventListener(`click`,async()=>{let e=t.querySelector(`#integrity-results-container`);if(e&&(e.innerHTML=`<div class="text-xs text-brand-primary">Auditing database records via TensorFlow...</div>`),window.UniversityDB&&typeof window.UniversityDB.runIntegrityPrediction==`function`){let t=await window.UniversityDB.runIntegrityPrediction();e&&(t.length===0?e.innerHTML=`
                    <div class="p-4 rounded-xl bg-brand-accent-emerald/10 border border-brand-accent-emerald/20 text-brand-accent-emerald text-xs font-semibold">
                      ✓ No profile data anomalies or integrity issues identified.
                    </div>
                  `:e.innerHTML=t.map(e=>`
                    <div class="p-3.5 rounded-xl bg-brand-accent-ruby/5 border border-brand-accent-ruby/20 flex justify-between items-center text-xs">
                      <div>
                        <strong class="text-brand-text-main">${e.name} (${e.studentId})</strong>
                        <div class="text-brand-accent-ruby mt-1">${e.reason}</div>
                      </div>
                      <div class="text-right font-mono text-[0.65rem] text-brand-text-subtle">
                        Deviation: ${e.errorScore}
                      </div>
                    </div>
                  `).join(``))}})}},showModal:function(e,t,n=``){let r=document.getElementById(`common-modal-overlay`),i=document.getElementById(`modal-title-text`),a=document.getElementById(`modal-body-content`),o=document.getElementById(`modal-footer-content`);!r||!i||!a||!o||(i.innerText=e,a.innerHTML=t,o.innerHTML=n,r.classList.add(`active`))},closeModal:function(){let e=document.getElementById(`common-modal-overlay`);e&&e.classList.remove(`active`)},handleLogout:function(){confirm(`Are you sure you want to sign out?`)&&(sessionStorage.removeItem(`aegis_erp_session`),window.location.href=`auth.html`)},showQuickActions:function(){this.showModal(`Quick Action Hub`,`
        <div class="grid grid-cols-3 gap-4">
          <button class="btn btn-secondary p-5 flex flex-col items-center gap-2.5 text-center" id="qa-add-student">
            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" y1="8" x2="19" y2="14"/><line x1="16" y1="11" x2="22" y2="11"/></svg>
            <span>Add Student</span>
          </button>
          <button class="btn btn-secondary p-5 flex flex-col items-center gap-2.5 text-center" id="qa-add-announcement">
            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
            <span>Post Notice</span>
          </button>
          <button class="btn btn-secondary p-5 flex flex-col items-center gap-2.5 text-center" id="qa-record-fee">
            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="4" width="20" height="16" rx="2" ry="2"/><line x1="12" y1="1" x2="12" y2="23"/><line x1="2" y1="10" x2="22" y2="10"/></svg>
            <span>Record Fee</span>
          </button>
          <button class="btn btn-secondary p-5 flex flex-col items-center gap-2.5 text-center" id="qa-mark-attendance">
            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/></svg>
            <span>Attendance</span>
          </button>
          <button class="btn btn-primary p-5 flex flex-col items-center gap-2.5 text-center" id="qa-open-connect">
            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
            </svg>
            <span>Aegis Connect</span>
          </button>
          <button class="btn btn-primary p-5 flex flex-col items-center gap-2.5 text-center" id="qa-mint-nft">
            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            <span>Mint NFT</span>
          </button>
        </div>
      `,`<button class="btn btn-secondary" onclick="window.App.closeModal()">Close</button>`),document.getElementById(`qa-add-student`).addEventListener(`click`,()=>{this.closeModal(),this.loadView(`students`),setTimeout(()=>{window.studentsView&&typeof window.studentsView.openAddStudentModal==`function`&&window.studentsView.openAddStudentModal()},100)}),document.getElementById(`qa-add-announcement`).addEventListener(`click`,()=>{this.closeModal(),this.loadView(`announcements`),setTimeout(()=>{window.announcementsView&&typeof window.announcementsView.openPostModal==`function`&&window.announcementsView.openPostModal()},100)}),document.getElementById(`qa-record-fee`).addEventListener(`click`,()=>{this.closeModal(),this.loadView(`finance`),setTimeout(()=>{window.financeView&&typeof window.financeView.openPaymentModal==`function`&&window.financeView.openPaymentModal()},100)}),document.getElementById(`qa-mark-attendance`).addEventListener(`click`,()=>{this.closeModal(),this.loadView(`attendance`)}),document.getElementById(`qa-open-connect`).addEventListener(`click`,()=>{this.closeModal(),window.location.href=`forum.html`}),document.getElementById(`qa-mint-nft`).addEventListener(`click`,()=>{this.closeModal(),this.loadView(`blockchain`),setTimeout(()=>{window.blockchainView&&typeof window.blockchainView.openMintModal==`function`&&window.blockchainView.openMintModal()},100)})},showNotifications:function(){let e=`
        <div style="max-height: 400px; overflow-y: auto;">
          <h4 style="margin-bottom: 12px; font-family: var(--font-display);">Recent Broadcasts & System Notices</h4>
          ${window.UniversityDB.getAnnouncements().map(e=>`
        <div class="p-3 border-b border-brand-border flex gap-3">
          <div class="w-2 h-2 rounded-full mt-1.5 shrink-0" style="background-color: ${e.color||`var(--color-brand-primary)`}"></div>
          <div>
            <h5 class="m-0 font-semibold text-brand-text-main">${e.title}</h5>
            <p class="mt-1 text-[0.8rem] text-brand-text-muted">${e.content.slice(0,100)}...</p>
            <span class="text-[0.7rem] text-brand-text-subtle block mt-1">Posted: ${e.date}</span>
          </div>
        </div>
      `).join(``)}
        </div>
      `;this.showModal(`Notifications Desk`,e,`<button class="btn btn-secondary" onclick="window.App.closeModal()">Dismiss All</button>`)},handleGlobalSearch:function(e){if(this.currentView===`students`&&window.studentsView&&typeof window.studentsView.applyFilters==`function`){let t=document.getElementById(`search-name`);t&&(t.value=e,window.studentsView.applyFilters())}else if(this.currentView===`faculty`&&window.facultyView&&typeof window.facultyView.applySearch==`function`){let t=document.getElementById(`faculty-search`);t&&(t.value=e,window.facultyView.applySearch())}else if(this.currentView===`courses`&&window.coursesView&&typeof window.coursesView.applyFilters==`function`){let t=document.getElementById(`course-search`);t&&(t.value=e,window.coursesView.applyFilters())}},renderSearchDropdown:function(e){let t=document.getElementById(`global-search-dropdown`);if(!t)return;let n=e.toLowerCase().trim();if(!n){let e=window.UniversityDB.getStudents(),n=window.UniversityDB.getFaculty();t.innerHTML=`
          <!-- Database Sync Status -->
          <div class="p-3 bg-brand-bg-tertiary rounded-xl border border-brand-border">
            <div class="flex items-center justify-between mb-2">
              <span class="text-xs font-semibold text-brand-text-muted">SQLite Database Telemetry</span>
              <span class="badge badge-success text-[0.65rem] py-0.5">✓ Connected</span>
            </div>
            <div class="flex flex-col gap-1 text-xs text-brand-text-main">
              <div class="flex justify-between">
                <span class="text-brand-text-subtle">Synced Students:</span>
                <span class="font-bold font-mono">${e.length} accounts</span>
              </div>
              <div class="flex justify-between">
                <span class="text-brand-text-subtle">Synced Faculty:</span>
                <span class="font-bold font-mono">${n.length} accounts</span>
              </div>
              <div class="flex justify-between border-t border-brand-border/40 mt-1.5 pt-1.5">
                <span class="text-brand-text-subtle">Source Registry:</span>
                <span class="text-brand-primary font-mono text-[0.65rem] font-bold">authentication.txt</span>
              </div>
            </div>
          </div>

          <!-- Shortcuts -->
          <div class="flex flex-col gap-1.5">
            <span class="text-[0.65rem] font-semibold text-brand-text-subtle uppercase tracking-wider pl-1">System Shortcuts</span>
            <div class="grid grid-cols-2 gap-2">
              <button class="btn btn-secondary py-2 px-3 text-xs justify-start font-medium cursor-pointer" onclick="window.App.loadView('dashboard')">
                <span>Dashboard</span>
              </button>
              <button class="btn btn-secondary py-2 px-3 text-xs justify-start font-medium cursor-pointer" onclick="window.App.loadView('students')">
                <span>Students Registry</span>
              </button>
              <button class="btn btn-secondary py-2 px-3 text-xs justify-start font-medium cursor-pointer" onclick="window.App.loadView('finance')">
                <span>Finance Ledger</span>
              </button>
              <button class="btn btn-secondary py-2 px-3 text-xs justify-start font-medium cursor-pointer" onclick="window.App.loadView('blockchain')">
                <span>Blockchain Hub</span>
              </button>
            </div>
          </div>
        `;return}let r=window.UniversityDB.getStudents(),i=window.UniversityDB.getFaculty(),a=window.UniversityDB.getCourses(),o=r.filter(e=>e.name.toLowerCase().includes(n)||e.id.toLowerCase().includes(n)).slice(0,4),s=i.filter(e=>e.name.toLowerCase().includes(n)||e.id.toLowerCase().includes(n)).slice(0,4),c=a.filter(e=>e.title.toLowerCase().includes(n)||e.code.toLowerCase().includes(n)).slice(0,4);if(o.length+s.length+c.length===0){t.innerHTML=`
          <div class="text-center py-4 text-brand-text-muted text-xs">
            No matching records found for "${e}"
          </div>
        `;return}let l=``;o.length>0&&(l+=`
          <div class="flex flex-col gap-1">
            <span class="text-[0.65rem] font-semibold text-brand-text-subtle uppercase tracking-wider pl-1">Students</span>
            ${o.map(e=>`
              <div class="flex items-center justify-between p-2 hover:bg-white/[0.03] rounded-lg cursor-pointer transition-all duration-150 hover:pl-3" onclick="window.App.selectSearchResult('students', '${e.id}')">
                <div class="flex items-center gap-2 min-w-0">
                  <img src="${e.avatar}" class="w-6 h-6 rounded-full object-cover border border-brand-border shrink-0">
                  <span class="text-xs font-semibold truncate text-brand-text-main">${e.name}</span>
                </div>
                <code class="text-[0.65rem] text-brand-text-subtle font-mono">${e.id}</code>
              </div>
            `).join(``)}
          </div>
        `),s.length>0&&(l+=`
          <div class="flex flex-col gap-1 ${o.length>0?`border-t border-brand-border/40 pt-2`:``}">
            <span class="text-[0.65rem] font-semibold text-brand-text-subtle uppercase tracking-wider pl-1">Faculty</span>
            ${s.map(e=>`
              <div class="flex items-center justify-between p-2 hover:bg-white/[0.03] rounded-lg cursor-pointer transition-all duration-150 hover:pl-3" onclick="window.App.selectSearchResult('faculty', '${e.id}')">
                <div class="flex items-center gap-2 min-w-0">
                  <img src="${e.avatar}" class="w-6 h-6 rounded-full object-cover border border-brand-border shrink-0">
                  <span class="text-xs font-semibold truncate text-brand-text-main">${e.name}</span>
                </div>
                <code class="text-[0.65rem] text-brand-text-subtle font-mono">${e.id}</code>
              </div>
            `).join(``)}
          </div>
        `),c.length>0&&(l+=`
          <div class="flex flex-col gap-1 ${o.length>0||s.length>0?`border-t border-brand-border/40 pt-2`:``}">
            <span class="text-[0.65rem] font-semibold text-brand-text-subtle uppercase tracking-wider pl-1">Courses</span>
            ${c.map(e=>`
              <div class="flex items-center justify-between p-2 hover:bg-white/[0.03] rounded-lg cursor-pointer transition-all duration-150 hover:pl-3" onclick="window.App.selectSearchResult('courses', '${e.code}')">
                <div class="min-w-0 flex flex-col">
                  <span class="text-xs font-semibold truncate text-brand-text-main">${e.title}</span>
                  <span class="text-[0.65rem] text-brand-text-muted truncate">${e.dept}</span>
                </div>
                <code class="text-[0.65rem] text-brand-primary font-mono font-bold">${e.code}</code>
              </div>
            `).join(``)}
          </div>
        `),t.innerHTML=l},selectSearchResult:function(e,t){this.loadView(e),document.querySelectorAll(`.nav-link`).forEach(t=>{t.classList.remove(`active`),t.getAttribute(`data-view`)===e&&t.classList.add(`active`)});let n=document.getElementById(`global-search-input`),r=document.getElementById(`global-search-dropdown`);n&&r&&(n.value=``,r.classList.add(`hidden`),r.classList.remove(`flex`)),setTimeout(()=>{e===`students`&&window.studentsView&&typeof window.studentsView.openStudentDetailModal==`function`?window.studentsView.openStudentDetailModal(t):e===`faculty`&&window.facultyView&&typeof window.facultyView.openAssignClassModal==`function`?window.facultyView.openAssignClassModal(t):e===`courses`&&window.coursesView&&typeof window.coursesView.openSyllabusModal==`function`&&window.coursesView.openSyllabusModal(t)},150)}},document.readyState===`loading`?document.addEventListener(`DOMContentLoaded`,()=>{window.App.init()}):window.App.init()})();