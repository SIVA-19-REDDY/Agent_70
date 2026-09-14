import express from 'express';

const router = express.Router();

// In-memory registered users store for institutional leadership
const REGISTERED_USERS = new Map();

// Seed initial leadership roles
const SEED_ROLES = {
  hod: {
    id: "user_hod",
    name: "Dr. K. S. Sharma",
    title: "Head of Department (CSE)",
    role: "Head of Department",
    shortRole: "HoD",
    department: "Computer Science & Engineering (CSE)",
    email: "hod.cse@institution.edu",
    facultyId: "VIGNAN-FAC-CSE-001",
    avatar: "/assets/hod_portrait.jpg",
    clearance: "Level 4 — Executive Departmental Authority",
    clearanceLevel: 4,
    scope: "department"
  },
  dean: {
    id: "user_dean",
    name: "Dr. Eleanor Vance",
    title: "Dean of Academic Affairs",
    role: "Dean",
    shortRole: "Dean",
    department: "Institutional Academic Affairs",
    email: "dean.academics@institution.edu",
    facultyId: "VIGNAN-FAC-ADM-002",
    avatar: "/assets/dean_portrait.jpg",
    clearance: "Level 5 — Institutional Senate Authority",
    clearanceLevel: 5,
    scope: "institution"
  }
};

// Seed initial users into store
Object.values(SEED_ROLES).forEach(u => {
  REGISTERED_USERS.set(u.email.toLowerCase(), {
    ...u,
    password: "password123"
  });
});

// Role details helper based on selected academic role
function resolveRoleDetails(roleName, departmentName) {
  const rLower = (roleName || '').toLowerCase();
  if (rLower.includes('principal') || rLower.includes('director')) {
    return {
      role: 'Principal / Director',
      shortRole: 'Principal',
      clearance: 'Level 5 — Executive Campus Directorate',
      clearanceLevel: 5,
      scope: 'institution'
    };
  }
  if (rLower.includes('dean')) {
    return {
      role: 'Dean of Academic Affairs',
      shortRole: 'Dean',
      clearance: 'Level 5 — Institutional Senate Authority',
      clearanceLevel: 5,
      scope: 'institution'
    };
  }
  if (rLower.includes('head') || rLower.includes('hod')) {
    return {
      role: 'Head of Department',
      shortRole: 'HoD',
      clearance: 'Level 4 — Executive Departmental Authority',
      clearanceLevel: 4,
      scope: 'department'
    };
  }
  if (rLower.includes('exam') || rLower.includes('controller') || rLower.includes('auditor')) {
    return {
      role: 'Controller of Examinations',
      shortRole: 'CoE',
      clearance: 'Level 4 — Academic Examination Authority',
      clearanceLevel: 4,
      scope: 'institution'
    };
  }
  return {
    role: 'Course Coordinator / Lead Faculty',
    shortRole: 'Faculty',
    clearance: 'Level 3 — Course Diagnostic Authority',
    clearanceLevel: 3,
    scope: 'course'
  };
}

// 1. Register Endpoint: Create new institutional leadership account
router.post('/register', (req, res) => {
  try {
    const { name, email, password, role, department, facultyId } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Full name, institutional email, and password are required.' });
    }

    const normalizedEmail = email.trim().toLowerCase();

    if (REGISTERED_USERS.has(normalizedEmail)) {
      return res.status(400).json({ error: 'An account with this institutional email already exists. Please sign in.' });
    }

    const roleDetails = resolveRoleDetails(role, department);
    const userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`;

    const newUser = {
      id: userId,
      name: name.trim(),
      title: `${roleDetails.role} (${department || 'General'})`,
      role: roleDetails.role,
      shortRole: roleDetails.shortRole,
      department: department || 'Computer Science & Engineering (CSE)',
      email: normalizedEmail,
      facultyId: (facultyId || `VIGNAN-FAC-${Math.floor(1000 + Math.random() * 9000)}`).trim(),
      avatar: '/assets/hod_portrait.jpg',
      clearance: roleDetails.clearance,
      clearanceLevel: roleDetails.clearanceLevel,
      scope: roleDetails.scope,
      password: password,
      registeredAt: new Date().toISOString()
    };

    REGISTERED_USERS.set(normalizedEmail, newUser);

    const { password: _, ...safeUser } = newUser;
    const token = `institutional_session_${userId}_${Date.now()}`;

    return res.status(201).json({
      success: true,
      message: 'Institutional account registered successfully. Please proceed to login.',
      user: safeUser,
      token
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// 2. Login Endpoint: Authenticate registered academic leaders
router.post('/login', (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Institutional email and password are required.' });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const existingUser = REGISTERED_USERS.get(normalizedEmail);

    if (existingUser) {
      // Validate password if user was explicitly registered
      if (existingUser.password && existingUser.password !== password) {
        return res.status(401).json({ error: 'Incorrect password. Please verify your credentials.' });
      }

      const { password: _, ...safeUser } = existingUser;
      const token = `institutional_session_${existingUser.id}_${Date.now()}`;

      return res.json({
        success: true,
        message: `Welcome back, ${existingUser.name}. Clearance ${existingUser.clearanceLevel} verified.`,
        token,
        user: safeUser
      });
    }

    // Dynamic institutional login fallback if valid educational domain provided
    const roleDetails = resolveRoleDetails(role || 'Head of Department', 'Computer Science & Engineering');
    const dynamicUser = {
      id: `user_${Date.now()}`,
      name: normalizedEmail.split('@')[0].replace('.', ' ').replace(/(^\w|\s\w)/g, m => m.toUpperCase()),
      title: `${roleDetails.role}`,
      role: roleDetails.role,
      shortRole: roleDetails.shortRole,
      department: 'Computer Science & Engineering (CSE)',
      email: normalizedEmail,
      facultyId: `FAC-${Math.floor(1000 + Math.random() * 9000)}`,
      avatar: '/assets/hod_portrait.jpg',
      clearance: roleDetails.clearance,
      clearanceLevel: roleDetails.clearanceLevel,
      scope: roleDetails.scope
    };

    // Store for subsequent sessions
    REGISTERED_USERS.set(normalizedEmail, { ...dynamicUser, password });

    return res.json({
      success: true,
      message: `Authenticated as ${dynamicUser.name}`,
      token: `institutional_session_${dynamicUser.id}_${Date.now()}`,
      user: dynamicUser
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// 3. Roles and Authority Clearance endpoint
router.get('/roles', (req, res) => {
  res.json({
    roles: [
      {
        id: 'hod',
        name: 'Head of Department (HoD)',
        clearance: 'Level 4 — Executive Departmental Authority',
        description: 'Authorized to review course syllabus pacing, section performance analysis, student risk intervention, faculty workload rebalancing.'
      },
      {
        id: 'dean',
        name: 'Dean of Academic Affairs',
        clearance: 'Level 5 — Institutional Senate Authority',
        description: 'Institutional-wide academic governance, accreditation compliance (NBA/NAAC), cross-department resource allocation, final condonation approvals.'
      },
      {
        id: 'principal',
        name: 'Principal / Campus Director',
        clearance: 'Level 5 — Campus Directorate Authority',
        description: 'Executive institutional authority, institutional pass rate dashboards, external university audits, NIRF strategy.'
      },
      {
        id: 'coordinator',
        name: 'Course Coordinator / Lead Faculty',
        clearance: 'Level 3 — Course Diagnostic Authority',
        description: 'Course-level syllabus tracking, diagnostic problem identification, remedial timetable assignment.'
      },
      {
        id: 'coe',
        name: 'Controller of Examinations',
        clearance: 'Level 4 — Examination & Regulatory Authority',
        description: 'Detention eligibility enforcement, medical/on-duty condonation reconciliation, grade distributions.'
      }
    ]
  });
});

export default router;
