/* ========================================================================
   Aegis University ERP — Authentication System
   Handles registration, login, session management, and validation
   ======================================================================== */

window.AuthSystem = (function () {
  'use strict';

  // ── Storage Keys ──
  const USERS_KEY = 'aegis_erp_users';
  const SESSION_KEY = 'aegis_erp_session';

  // ── Default Accounts ──
  const DEFAULT_ACCOUNTS = [
    {
      "id": "usr_001",
      "name": "Dr. Evelyn Sterling",
      "email": "admin@aegis.edu",
      "password": "h$g10hvh",
      "role": "admin",
      "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
      "createdAt": "2024-01-01T00:00:00.000Z"
    },
    {
      "id": "usr_002",
      "name": "Prof. Marcus Chen",
      "email": "faculty@aegis.edu",
      "password": "h$rwy182",
      "role": "faculty",
      "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
      "createdAt": "2024-01-15T00:00:00.000Z"
    },
    {
      "id": "usr_003",
      "name": "Aria Nakamura",
      "email": "student@aegis.edu",
      "password": "h$h2pckp",
      "role": "student",
      "avatar": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
      "createdAt": "2024-02-01T00:00:00.000Z"
    },
    {
      "id": "usr_fac001",
      "name": "Dr. Evelyn Sterling",
      "email": "evelyn.sterling@modeluni.edu",
      "password": "h$g0vmzp",
      "role": "faculty",
      "avatar": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
      "createdAt": "2026-06-08T10:38:14.513Z"
    },
    {
      "id": "usr_fac002",
      "name": "Dr. Marcus Vance",
      "email": "marcus.vance@modeluni.edu",
      "password": "h$az3qz",
      "role": "faculty",
      "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
      "createdAt": "2026-06-08T10:38:14.513Z"
    },
    {
      "id": "usr_fac003",
      "name": "Dr. Sarah Connor",
      "email": "sarah.connor@modeluni.edu",
      "password": "h$33we4k",
      "role": "faculty",
      "avatar": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150",
      "createdAt": "2026-06-08T10:38:14.513Z"
    },
    {
      "id": "usr_fac004",
      "name": "Dr. Raymond Park",
      "email": "raymond.park@modeluni.edu",
      "password": "h$h38w1u",
      "role": "faculty",
      "avatar": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
      "createdAt": "2026-06-08T10:38:14.513Z"
    },
    {
      "id": "usr_fac005",
      "name": "Dr. Helena Rostova",
      "email": "helena.rostova@modeluni.edu",
      "password": "h$1axyb5",
      "role": "faculty",
      "avatar": "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150",
      "createdAt": "2026-06-08T10:38:14.513Z"
    },
    {
      "id": "usr_fac006",
      "name": "Prof. Alan Turing",
      "email": "alan.turing@modeluni.edu",
      "password": "h$yn678d",
      "role": "faculty",
      "avatar": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
      "createdAt": "2026-06-08T10:38:14.513Z"
    },
    {
      "id": "usr_fac007",
      "name": "Dr. Ada Lovelace",
      "email": "ada.lovelace@modeluni.edu",
      "password": "h$swf5m",
      "role": "faculty",
      "avatar": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150",
      "createdAt": "2026-06-08T10:38:14.513Z"
    },
    {
      "id": "usr_fac008",
      "name": "Prof. Nikola Tesla",
      "email": "nikola.tesla@modeluni.edu",
      "password": "h$qstn47",
      "role": "faculty",
      "avatar": "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150",
      "createdAt": "2026-06-08T10:38:14.513Z"
    },
    {
      "id": "usr_fac009",
      "name": "Dr. Richard Feynman",
      "email": "richard.feynman@modeluni.edu",
      "password": "h$mbzmz",
      "role": "faculty",
      "avatar": "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150",
      "createdAt": "2026-06-08T10:38:14.513Z"
    },
    {
      "id": "usr_fac010",
      "name": "Dr. Grace Hopper",
      "email": "gracehopper@modeluni.edu",
      "password": "h$7h9aul",
      "role": "faculty",
      "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
      "createdAt": "2026-06-08T10:38:14.513Z"
    },
    {
      "id": "usr_fac011",
      "name": "Dr. Claude Shannon",
      "email": "claudeshannon@modeluni.edu",
      "password": "h$rcsqn7",
      "role": "faculty",
      "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
      "createdAt": "2026-06-08T10:38:14.513Z"
    },
    {
      "id": "usr_fac012",
      "name": "Dr. Barbara Liskov",
      "email": "barbaraliskov@modeluni.edu",
      "password": "h$c3v0ab",
      "role": "faculty",
      "avatar": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
      "createdAt": "2026-06-08T10:38:14.513Z"
    },
    {
      "id": "usr_fac013",
      "name": "Dr. Donald Knuth",
      "email": "donaldknuth@modeluni.edu",
      "password": "h$276icc",
      "role": "faculty",
      "avatar": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
      "createdAt": "2026-06-08T10:38:14.513Z"
    },
    {
      "id": "usr_fac014",
      "name": "Dr. Tim Berners-Lee",
      "email": "timbernerslee@modeluni.edu",
      "password": "h$1lkkm2",
      "role": "faculty",
      "avatar": "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150",
      "createdAt": "2026-06-08T10:38:14.513Z"
    },
    {
      "id": "usr_fac015",
      "name": "Dr. Margaret Hamilton",
      "email": "margarethamilton@modeluni.edu",
      "password": "h$la760g",
      "role": "faculty",
      "avatar": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150",
      "createdAt": "2026-06-08T10:38:14.513Z"
    },
    {
      "id": "usr_fac016",
      "name": "Dr. Linus Torvalds",
      "email": "linustorvalds@modeluni.edu",
      "password": "h$49lclo",
      "role": "faculty",
      "avatar": "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150",
      "createdAt": "2026-06-08T10:38:14.513Z"
    },
    {
      "id": "usr_fac017",
      "name": "Dr. Katherine Johnson",
      "email": "katherinejohnson@modeluni.edu",
      "password": "h$cmcmrr",
      "role": "faculty",
      "avatar": "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150",
      "createdAt": "2026-06-08T10:38:14.513Z"
    },
    {
      "id": "usr_fac018",
      "name": "Dr. Dorothy Vaughan",
      "email": "dorothyvaughan@modeluni.edu",
      "password": "h$uylwbb",
      "role": "faculty",
      "avatar": "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
      "createdAt": "2026-06-08T10:38:14.513Z"
    },
    {
      "id": "usr_fac019",
      "name": "Dr. Mary Jackson",
      "email": "maryjackson@modeluni.edu",
      "password": "h$gz0t25",
      "role": "faculty",
      "avatar": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150",
      "createdAt": "2026-06-08T10:38:14.513Z"
    },
    {
      "id": "usr_fac020",
      "name": "Dr. Wernher von Braun",
      "email": "wernhervon@modeluni.edu",
      "password": "h$39s8uc",
      "role": "faculty",
      "avatar": "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150",
      "createdAt": "2026-06-08T10:38:14.513Z"
    },
    {
      "id": "usr_fac021",
      "name": "Dr. Robert Oppenheimer",
      "email": "robertoppenheimer@modeluni.edu",
      "password": "h$rd0x4v",
      "role": "faculty",
      "avatar": "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150",
      "createdAt": "2026-06-08T10:38:14.513Z"
    },
    {
      "id": "usr_fac022",
      "name": "Dr. Marie Curie",
      "email": "mariecurie@modeluni.edu",
      "password": "h$osccuk",
      "role": "faculty",
      "avatar": "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=150",
      "createdAt": "2026-06-08T10:38:14.513Z"
    },
    {
      "id": "usr_fac023",
      "name": "Dr. Albert Einstein",
      "email": "alberteinstein@modeluni.edu",
      "password": "h$e1zlva",
      "role": "faculty",
      "avatar": "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150",
      "createdAt": "2026-06-08T10:38:14.513Z"
    },
    {
      "id": "usr_fac024",
      "name": "Dr. Niels Bohr",
      "email": "nielsbohr@modeluni.edu",
      "password": "h$z2p5ql",
      "role": "faculty",
      "avatar": "https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?w=150",
      "createdAt": "2026-06-08T10:38:14.513Z"
    },
    {
      "id": "usr_fac025",
      "name": "Dr. Stephen Hawking",
      "email": "stephenhawking@modeluni.edu",
      "password": "h$81wsnq",
      "role": "faculty",
      "avatar": "https://images.unsplash.com/photo-1527983359383-4758693f760c?w=150",
      "createdAt": "2026-06-08T10:38:14.513Z"
    },
    {
      "id": "usr_fac026",
      "name": "Dr. Rosalind Franklin",
      "email": "rosalindfranklin@modeluni.edu",
      "password": "h$jnmpl9",
      "role": "faculty",
      "avatar": "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=150",
      "createdAt": "2026-06-08T10:38:14.513Z"
    },
    {
      "id": "usr_fac027",
      "name": "Dr. Rachel Carson",
      "email": "rachelcarson@modeluni.edu",
      "password": "h$potdb",
      "role": "faculty",
      "avatar": "https://images.unsplash.com/photo-1554151228-14d9def656e4?w=150",
      "createdAt": "2026-06-08T10:38:14.513Z"
    },
    {
      "id": "usr_stu001",
      "name": "Alex Rivera",
      "email": "alex.rivera@modeluni.edu",
      "password": "h$anuzvl",
      "role": "student",
      "avatar": "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150",
      "createdAt": "2026-06-08T10:38:14.514Z"
    },
    {
      "id": "usr_stu002",
      "name": "Zoe Chen",
      "email": "zoe.chen@modeluni.edu",
      "password": "h$3iuy1e",
      "role": "student",
      "avatar": "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150",
      "createdAt": "2026-06-08T10:38:14.514Z"
    },
    {
      "id": "usr_stu003",
      "name": "Liam Sterling",
      "email": "liam.sterling@modeluni.edu",
      "password": "h$s2xs5m",
      "role": "student",
      "avatar": "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150",
      "createdAt": "2026-06-08T10:38:14.514Z"
    },
    {
      "id": "usr_stu004",
      "name": "Emily Watson",
      "email": "emily.watson@modeluni.edu",
      "password": "h$7y659u",
      "role": "student",
      "avatar": "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
      "createdAt": "2026-06-08T10:38:14.514Z"
    },
    {
      "id": "usr_stu005",
      "name": "Carlos Mendez",
      "email": "carlos.mendez@modeluni.edu",
      "password": "h$vyxidh",
      "role": "student",
      "avatar": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
      "createdAt": "2026-06-08T10:38:14.514Z"
    },
    {
      "id": "usr_stu006",
      "name": "Sophia Patel",
      "email": "sophia.patel@modeluni.edu",
      "password": "h$1bicwm",
      "role": "student",
      "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
      "createdAt": "2026-06-08T10:38:14.514Z"
    },
    {
      "id": "usr_stu007",
      "name": "Marcus Brody",
      "email": "marcus.brody@modeluni.edu",
      "password": "h$old9ds",
      "role": "student",
      "avatar": "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150",
      "createdAt": "2026-06-08T10:38:14.514Z"
    },
    {
      "id": "usr_stu008",
      "name": "Elena Rostova",
      "email": "elena.rost@modeluni.edu",
      "password": "h$9fy1oz",
      "role": "student",
      "avatar": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150",
      "createdAt": "2026-06-08T10:38:14.514Z"
    },
    {
      "id": "usr_stu009",
      "name": "Devon Miller",
      "email": "devon.miller@modeluni.edu",
      "password": "h$7oc0cx",
      "role": "student",
      "avatar": "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150",
      "createdAt": "2026-06-08T10:38:14.514Z"
    },
    {
      "id": "usr_stu010",
      "name": "Nadia Petrova",
      "email": "nadia.petrova@modeluni.edu",
      "password": "h$b1twcy",
      "role": "student",
      "avatar": "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150",
      "createdAt": "2026-06-08T10:38:14.514Z"
    },
    {
      "id": "usr_stu011",
      "name": "Jackson Cole",
      "email": "jackson.cole@modeluni.edu",
      "password": "h$nfdh7t",
      "role": "student",
      "avatar": "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150",
      "createdAt": "2026-06-08T10:38:14.514Z"
    },
    {
      "id": "usr_stu012",
      "name": "Ravi Kumar",
      "email": "ravi.kumar@modeluni.edu",
      "password": "h$h479",
      "role": "student",
      "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
      "createdAt": "2026-06-08T10:38:14.514Z"
    },
    {
      "id": "usr_stu013",
      "name": "Maya Lin",
      "email": "mayalin@modeluni.edu",
      "password": "h$tmace6",
      "role": "student",
      "avatar": "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150",
      "createdAt": "2026-06-08T10:38:14.514Z"
    },
    {
      "id": "usr_stu014",
      "name": "Ryan Patterson",
      "email": "ryanpatterson@modeluni.edu",
      "password": "h$gh411x",
      "role": "student",
      "avatar": "https://images.unsplash.com/photo-1504257404764-b2b1d311277a?w=150",
      "createdAt": "2026-06-08T10:38:14.514Z"
    },
    {
      "id": "usr_stu015",
      "name": "Chloe Henderson",
      "email": "chloehenderson@modeluni.edu",
      "password": "h$qe9rul",
      "role": "student",
      "avatar": "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=150",
      "createdAt": "2026-06-08T10:38:14.514Z"
    },
    {
      "id": "usr_stu016",
      "name": "Jordan Brooks",
      "email": "jordanbrooks@modeluni.edu",
      "password": "h$qw1xs3",
      "role": "student",
      "avatar": "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=150",
      "createdAt": "2026-06-08T10:38:14.514Z"
    },
    {
      "id": "usr_stu017",
      "name": "Hannah Abbott",
      "email": "hannahabbott@modeluni.edu",
      "password": "h$8fawea",
      "role": "student",
      "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
      "createdAt": "2026-06-08T10:38:14.514Z"
    },
    {
      "id": "usr_stu018",
      "name": "Cedric Diggory",
      "email": "cedricdiggory@modeluni.edu",
      "password": "h$d6tkih",
      "role": "student",
      "avatar": "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=150",
      "createdAt": "2026-06-08T10:38:14.514Z"
    },
    {
      "id": "usr_stu019",
      "name": "Luna Lovegood",
      "email": "lunalovegood@modeluni.edu",
      "password": "h$k7mqvs",
      "role": "student",
      "avatar": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
      "createdAt": "2026-06-08T10:38:14.514Z"
    },
    {
      "id": "usr_stu020",
      "name": "Harry Potter",
      "email": "harrypotter@modeluni.edu",
      "password": "h$kb54m2",
      "role": "student",
      "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
      "createdAt": "2026-06-08T10:38:14.514Z"
    },
    {
      "id": "usr_stu021",
      "name": "Hermione Granger",
      "email": "hermionegranger@modeluni.edu",
      "password": "h$ozk07a",
      "role": "student",
      "avatar": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150",
      "createdAt": "2026-06-08T10:38:14.514Z"
    },
    {
      "id": "usr_stu022",
      "name": "Ron Weasley",
      "email": "ronweasley@modeluni.edu",
      "password": "h$28p60l",
      "role": "student",
      "avatar": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
      "createdAt": "2026-06-08T10:38:14.514Z"
    },
    {
      "id": "usr_stu023",
      "name": "Neville Longbottom",
      "email": "nevillelongbottom@modeluni.edu",
      "password": "h$5dm1we",
      "role": "student",
      "avatar": "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150",
      "createdAt": "2026-06-08T10:38:14.514Z"
    },
    {
      "id": "usr_stu024",
      "name": "Ginny Weasley",
      "email": "ginnyweasley@modeluni.edu",
      "password": "h$fz0sah",
      "role": "student",
      "avatar": "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150",
      "createdAt": "2026-06-08T10:38:14.514Z"
    },
    {
      "id": "usr_stu025",
      "name": "Draco Malfoy",
      "email": "dracomalfoy@modeluni.edu",
      "password": "h$6308io",
      "role": "student",
      "avatar": "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150",
      "createdAt": "2026-06-08T10:38:14.514Z"
    },
    {
      "id": "usr_stu026",
      "name": "Cho Chang",
      "email": "chochang@modeluni.edu",
      "password": "h$g8qja",
      "role": "student",
      "avatar": "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
      "createdAt": "2026-06-08T10:38:14.514Z"
    },
    {
      "id": "usr_stu027",
      "name": "Fleur Delacour",
      "email": "fleurdelacour@modeluni.edu",
      "password": "h$876f7p",
      "role": "student",
      "avatar": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150",
      "createdAt": "2026-06-08T10:38:14.514Z"
    },
    {
      "id": "usr_stu028",
      "name": "Viktor Krum",
      "email": "viktorkrum@modeluni.edu",
      "password": "h$w0376l",
      "role": "student",
      "avatar": "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150",
      "createdAt": "2026-06-08T10:38:14.514Z"
    },
    {
      "id": "usr_stu029",
      "name": "Peter Parker",
      "email": "peterparker@modeluni.edu",
      "password": "h$rti0mv",
      "role": "student",
      "avatar": "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150",
      "createdAt": "2026-06-08T10:38:14.514Z"
    },
    {
      "id": "usr_stu030",
      "name": "Gwen Stacy",
      "email": "gwenstacy@modeluni.edu",
      "password": "h$fqgejk",
      "role": "student",
      "avatar": "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=150",
      "createdAt": "2026-06-08T10:38:14.514Z"
    },
    {
      "id": "usr_stu031",
      "name": "Miles Morales",
      "email": "milesmorales@modeluni.edu",
      "password": "h$se8l98",
      "role": "student",
      "avatar": "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150",
      "createdAt": "2026-06-08T10:38:14.514Z"
    },
    {
      "id": "usr_stu032",
      "name": "Clark Kent",
      "email": "clarkkent@modeluni.edu",
      "password": "h$q9az9y",
      "role": "student",
      "avatar": "https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?w=150",
      "createdAt": "2026-06-08T10:38:14.514Z"
    },
    {
      "id": "usr_stu033",
      "name": "Bruce Wayne",
      "email": "brucewayne@modeluni.edu",
      "password": "h$3qn29h",
      "role": "student",
      "avatar": "https://images.unsplash.com/photo-1527983359383-4758693f760c?w=150",
      "createdAt": "2026-06-08T10:38:14.514Z"
    },
    {
      "id": "usr_stu034",
      "name": "Diana Prince",
      "email": "dianaprince@modeluni.edu",
      "password": "h$wlk69e",
      "role": "student",
      "avatar": "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=150",
      "createdAt": "2026-06-08T10:38:14.514Z"
    },
    {
      "id": "usr_stu035",
      "name": "Tony Stark",
      "email": "tonystark@modeluni.edu",
      "password": "h$r3sv6g",
      "role": "student",
      "avatar": "https://images.unsplash.com/photo-1504257404764-b2b1d311277a?w=150",
      "createdAt": "2026-06-08T10:38:14.514Z"
    },
    {
      "id": "usr_stu036",
      "name": "Steve Rogers",
      "email": "steverogers@modeluni.edu",
      "password": "h$ww6hbg",
      "role": "student",
      "avatar": "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=150",
      "createdAt": "2026-06-08T10:38:14.514Z"
    },
    {
      "id": "usr_stu037",
      "name": "Natasha Romanoff",
      "email": "natasharomanoff@modeluni.edu",
      "password": "h$fxwn10",
      "role": "student",
      "avatar": "https://images.unsplash.com/photo-1554151228-14d9def656e4?w=150",
      "createdAt": "2026-06-08T10:38:14.514Z"
    }
  ];

  // ── Initialize default users if not present ──
  function _initDefaults() {
    const existing = localStorage.getItem(USERS_KEY);
    if (!existing) {
      localStorage.setItem(USERS_KEY, JSON.stringify(DEFAULT_ACCOUNTS));
    } else {
      // Ensure default accounts always exist (in case storage was partially cleared)
      const users = JSON.parse(existing);
      let modified = false;
      DEFAULT_ACCOUNTS.forEach(function (def) {
        if (!users.find(function (u) { return u.email === def.email; })) {
          users.push(def);
          modified = true;
        }
      });
      if (modified) {
        localStorage.setItem(USERS_KEY, JSON.stringify(users));
      }
    }
  }

  // ── Internal Helpers ──

  /** Simple deterministic hash (NOT cryptographic – demo only) */
  function _hashPassword(plain) {
    var hash = 0;
    for (var i = 0; i < plain.length; i++) {
      var ch = plain.charCodeAt(i);
      hash = ((hash << 5) - hash) + ch;
      hash |= 0; // Convert to 32-bit integer
    }
    return 'h$' + Math.abs(hash).toString(36);
  }

  function _getUsers() {
    try {
      return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
    } catch (e) {
      return [];
    }
  }

  function _saveUsers(users) {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  }

  function _generateId() {
    return 'usr_' + Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
  }

  // ── Validation Helpers ──

  function validateEmail(email) {
    if (!email || typeof email !== 'string') return { valid: false, message: 'Email is required.' };
    email = email.trim();
    var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!re.test(email)) return { valid: false, message: 'Please enter a valid email address.' };
    return { valid: true, message: '' };
  }

  function validateRequired(value, fieldName) {
    if (!value || (typeof value === 'string' && value.trim().length === 0)) {
      return { valid: false, message: (fieldName || 'This field') + ' is required.' };
    }
    return { valid: true, message: '' };
  }

  function validatePasswordMatch(password, confirm) {
    if (password !== confirm) {
      return { valid: false, message: 'Passwords do not match.' };
    }
    return { valid: true, message: '' };
  }

  /**
   * Password strength checker.
   * Returns { level: 'weak' | 'medium' | 'strong', score: 0-5 }
   */
  function checkPasswordStrength(password) {
    if (!password) return { level: 'weak', score: 0 };

    var score = 0;
    if (password.length >= 6)  score++;
    if (password.length >= 10) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    var level = 'weak';
    if (score >= 4) level = 'strong';
    else if (score >= 2) level = 'medium';

    return { level: level, score: score };
  }

  // ── Core Auth Functions ──

  /**
   * Register a new user.
   * @returns {{ success: boolean, message: string, user?: object }}
   */
  function register(name, email, password, role) {
    // Validate required
    var nameCheck = validateRequired(name, 'Full name');
    if (!nameCheck.valid) return { success: false, message: nameCheck.message };

    var emailCheck = validateEmail(email);
    if (!emailCheck.valid) return { success: false, message: emailCheck.message };

    if (!password || password.length < 6) {
      return { success: false, message: 'Password must be at least 6 characters.' };
    }

    var validRoles = ['student', 'faculty', 'admin'];
    if (validRoles.indexOf(role) === -1) {
      return { success: false, message: 'Please select a valid role.' };
    }

    var users = _getUsers();
    var emailLower = email.trim().toLowerCase();

    // Check uniqueness
    var exists = users.find(function (u) { return u.email.toLowerCase() === emailLower; });
    if (exists) {
      return { success: false, message: 'An account with this email already exists.' };
    }

    var newUser = {
      id: _generateId(),
      name: name.trim(),
      email: emailLower,
      password: _hashPassword(password),
      role: role,
      avatar: '',
      createdAt: new Date().toISOString()
    };

    users.push(newUser);
    _saveUsers(users);

    // Return user without password
    var safeUser = Object.assign({}, newUser);
    delete safeUser.password;
    return { success: true, message: 'Account created successfully!', user: safeUser };
  }

  /**
   * Login with email and password.
   * @returns {{ success: boolean, message: string, user?: object }}
   */
  function login(email, password) {
    var emailCheck = validateEmail(email);
    if (!emailCheck.valid) return { success: false, message: emailCheck.message };

    if (!password) return { success: false, message: 'Password is required.' };

    var users = _getUsers();
    var emailLower = email.trim().toLowerCase();
    var hashedInput = _hashPassword(password);

    var user = users.find(function (u) {
      return u.email.toLowerCase() === emailLower && u.password === hashedInput;
    });

    if (!user) {
      return { success: false, message: 'Invalid email or password. Please try again.' };
    }

    // Create session
    var sessionData = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
      loginAt: new Date().toISOString()
    };

    sessionStorage.setItem(SESSION_KEY, JSON.stringify(sessionData));
    resetFailure();

    return { success: true, message: 'Login successful!', user: sessionData };
  }

  /**
   * Logout the current user.
   */
  function logout() {
    sessionStorage.removeItem(SESSION_KEY);
    window.location.href = 'auth.html';
  }

  /**
   * Check if a user is currently logged in.
   */
  function isLoggedIn() {
    try {
      var session = sessionStorage.getItem(SESSION_KEY);
      if (!session) return false;
      var data = JSON.parse(session);
      return !!(data && data.id && data.email);
    } catch (e) {
      return false;
    }
  }

  /**
   * Get the currently logged-in user's data.
   * @returns {object|null}
   */
  function getCurrentUser() {
    try {
      var session = sessionStorage.getItem(SESSION_KEY);
      if (!session) return null;
      return JSON.parse(session);
    } catch (e) {
      return null;
    }
  }

  // ── TensorFlow Anomaly Detection Logic ──
  var failureCount = 0;
  var tfModel = null;

  async function initTfModel() {
    if (typeof tf === 'undefined') return;
    try {
      tfModel = tf.sequential();
      tfModel.add(tf.layers.dense({ units: 4, activation: 'relu', inputShape: [4] }));
      tfModel.add(tf.layers.dense({ units: 1, activation: 'sigmoid' }));
      tfModel.compile({
        optimizer: tf.train.adam(0.1),
        loss: 'binaryCrossentropy'
      });
    } catch (err) {
      console.warn('TF.js init failed or was bypassed:', err);
    }
  }

  async function trainAnomalyModel() {
    if (typeof tf === 'undefined' || !tfModel) return;
    try {
      var hour = new Date().getHours();
      // Mock inputs: [emailLen, passLen, failStreak, hourOfDay]
      var trainX = tf.tensor2d([
        [15/50, 10/50, 0, 10/24],
        [18/50, 12/50, 0, 14/24],
        [20/50, 8/50, 0, 16/24],
        [5/50, 2/50, 3/5, 3/24],
        [8/50, 3/50, 4/5, 1/24],
        [10/50, 4/50, Math.min(failureCount/5, 1), hour/24]
      ], [6, 4]);
      var trainY = tf.tensor2d([
        [0], [0], [0], [1], [1], [failureCount >= 2 ? 1 : 0]
      ], [6, 1]);
      await tfModel.fit(trainX, trainY, { epochs: 10, verbose: 0 });
      trainX.dispose();
      trainY.dispose();
    } catch (err) {
      console.error('TF Anomaly training failed:', err);
    }
  }

  async function calculateLoginThreat(email, password) {
    if (typeof tf === 'undefined') return 0.01;
    try {
      if (!tfModel) {
        await initTfModel();
      }
      var emailLen = (email || '').length;
      var passLen = (password || '').length;
      var hour = new Date().getHours();

      var inputTensor = tf.tensor2d([
        [Math.min(emailLen / 50, 1), Math.min(passLen / 50, 1), Math.min(failureCount / 5, 1), hour / 24]
      ], [1, 4]);

      var output = tfModel.predict(inputTensor);
      var prob = (await output.data())[0];
      inputTensor.dispose();
      output.dispose();
      return prob;
    } catch (err) {
      return 0.01;
    }
  }

  function recordFailure() {
    failureCount++;
    if (tfModel) {
      trainAnomalyModel();
    }
  }

  function resetFailure() {
    failureCount = 0;
  }

  function getFailureCount() {
    return failureCount;
  }

  // ── Initialize on load ──
  _initDefaults();
  setTimeout(initTfModel, 500);

  // ── Public API ──
  return {
    register: register,
    login: function(email, password) {
      var res = login(email, password);
      if (!res.success) {
        recordFailure();
      }
      return res;
    },
    logout: logout,
    isLoggedIn: isLoggedIn,
    getCurrentUser: getCurrentUser,
    checkPasswordStrength: checkPasswordStrength,
    validateEmail: validateEmail,
    validateRequired: validateRequired,
    validatePasswordMatch: validatePasswordMatch,
    calculateLoginThreat: calculateLoginThreat,
    getFailureCount: getFailureCount
  };

})();
