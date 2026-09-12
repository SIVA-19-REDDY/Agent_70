import express from 'express';

const router = express.Router();

const DEMO_USERS = {
  hod: {
    id: "user_hod",
    name: "Dr. K. S. Sharma",
    title: "Head of Department (CSE)",
    role: "Head of Department",
    shortRole: "HoD",
    department: "Computer Science & Engineering (CSE)",
    email: "hod.cse@institution.edu",
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
    avatar: "/assets/dean_portrait.jpg",
    clearance: "Level 5 — Institutional Senate Authority",
    clearanceLevel: 5,
    scope: "institution"
  }
};

// Login endpoint (strictly HoD & Dean)
router.post('/login', (req, res) => {
  const { email, role = 'hod' } = req.body;
  const roleKey = (role || 'hod').toLowerCase().includes('dean') ? 'dean' : 'hod';
  const user = DEMO_USERS[roleKey] || DEMO_USERS.hod;

  return res.json({
    success: true,
    token: `institutional_session_${user.id}_${Date.now()}`,
    user: {
      ...user,
      email: email || user.email
    }
  });
});

// Roles info endpoint
router.get('/roles', (req, res) => {
  res.json({
    available_roles: Object.values(DEMO_USERS)
  });
});

export default router;
