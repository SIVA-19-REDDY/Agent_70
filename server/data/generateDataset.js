/**
 * Canonical 100-Entry Academic Dataset Generator for Agent 70 Architecture
 * Accurately models all 31 columns extracted from the user's dataset spreadsheet
 * plus canonical higher-education mappings (Courses, Sections, Faculty, Interventions)
 */

import fs from 'fs';
import path from 'path';

// Seeded pseudorandom generator for reproducible, realistic academic distributions
function createRandom(seed = 42) {
  let s = seed;
  return function() {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

const rng = createRandom(70);

const GENDERS = ['Female', 'Male'];
const ETHNICITIES = ['Group A', 'Group B', 'Group C', 'Group D', 'Group E'];
const PARENT_EDUCATIONS = ["Bachelor's", "Some College", "Master's", "High School", "Associate's"];
const LUNCH_TYPES = ['Standard', 'Free/Reduced'];
const TEST_PREP = ['Completed', 'None'];
const DEPARTMENTS = ['CSE', 'ECE', 'AI & DS'];
const SECTIONS = {
  'CSE': ['CSE-A', 'CSE-B', 'CSE-C'],
  'ECE': ['ECE-A', 'ECE-B'],
  'AI & DS': ['AIDS-A']
};

const COURSES = [
  { code: 'CS201', name: 'Data Structures & Algorithms', department: 'CSE', faculty: 'Prof. Sunita Deshmukh', planned_coverage: 85, actual_coverage: 67 },
  { code: 'CS202', name: 'Discrete Mathematics', department: 'CSE', faculty: 'Dr. Arvind Ramanathan', planned_coverage: 82, actual_coverage: 80 },
  { code: 'CS203', name: 'Digital Electronics & Logic', department: 'ECE', faculty: 'Dr. Meenakshi Sundaram', planned_coverage: 80, actual_coverage: 64 },
  { code: 'CS204', name: 'Database Management Systems', department: 'CSE', faculty: 'Prof. Rajesh Khanna', planned_coverage: 82, actual_coverage: 76 }
];

const students = [];

for (let i = 1; i <= 100; i++) {
  const padId = String(i).padStart(3, '0');
  const studentId = `Stud_${padId}`;

  const gender = GENDERS[Math.floor(rng() * GENDERS.length)];
  const age = 16 + Math.floor(rng() * 4); // 16 to 19
  const race_ethnicity = ETHNICITIES[Math.floor(rng() * ETHNICITIES.length)];
  const parental_education = PARENT_EDUCATIONS[Math.floor(rng() * PARENT_EDUCATIONS.length)];
  const lunch_type = rng() > 0.35 ? 'Standard' : 'Free/Reduced';
  const test_prep = rng() > 0.55 ? 'Completed' : 'None';
  
  // Study hours: 1 to 10
  const weekly_study_hours = Math.round((1 + rng() * 9) * 10) / 10;
  
  // Absences: 0 to 18
  const absences = Math.floor(rng() * 16);
  
  const tutoring = rng() > 0.6 ? 'Yes' : 'No';
  const parental_involvement = rng() > 0.65 ? 'High' : (rng() > 0.3 ? 'Medium' : 'Low');
  const extracurricular_activities = rng() > 0.5 ? 'Yes' : 'No';
  const sports_participation = rng() > 0.55 ? 'Yes' : 'No';
  const music_participation = rng() > 0.65 ? 'Yes' : 'No';
  const volunteering = rng() > 0.7 ? 'Yes' : 'No';
  const internet_access = rng() > 0.1 ? 'Yes' : 'No';
  const school_support = rng() > 0.75 ? 'Yes' : 'No';
  const family_support = rng() > 0.3 ? 'Yes' : 'No';
  const paid_classes = rng() > 0.5 ? 'Yes' : 'No';
  const romantic_relationship = rng() > 0.7 ? 'Yes' : 'No';
  
  const family_relationship_quality = 1 + Math.floor(rng() * 5); // 1 to 5
  const free_time_after_school = 1 + Math.floor(rng() * 5);
  const going_out_with_friends = 1 + Math.floor(rng() * 5);
  const workday_alcohol_consumption = rng() > 0.85 ? 2 + Math.floor(rng() * 3) : 1;
  const weekend_alcohol_consumption = rng() > 0.7 ? 2 + Math.floor(rng() * 4) : 1;
  const current_health_status = 2 + Math.floor(rng() * 4); // 2 to 5

  // Department & Section assignment
  const department = i <= 60 ? 'CSE' : (i <= 85 ? 'ECE' : 'AI & DS');
  const deptSections = SECTIONS[department];
  const section = deptSections[(i - 1) % deptSections.length];

  // Core academic scores (correlated with study hours, absences, tutoring, and test prep)
  let baseScore = 55 + (weekly_study_hours * 3.5) - (absences * 1.8);
  if (test_prep === 'Completed') baseScore += 8;
  if (tutoring === 'Yes') baseScore += 6;
  if (parental_involvement === 'High') baseScore += 5;
  if (parental_involvement === 'Low') baseScore -= 6;
  if (lunch_type === 'Free/Reduced') baseScore -= 3;
  if (weekend_alcohol_consumption > 3) baseScore -= 7;

  // Add slight noise per subject
  const math_score = Math.min(99, Math.max(32, Math.round(baseScore + (rng() * 12 - 6))));
  const reading_score = Math.min(98, Math.max(35, Math.round(baseScore + (rng() * 10 - 4))));
  const writing_score = Math.min(99, Math.max(34, Math.round(baseScore + (rng() * 10 - 5))));
  
  const avgMarks = (math_score + reading_score + writing_score) / 3;
  const gpa = Math.min(4.0, Math.max(1.2, Math.round((avgMarks / 25) * 100) / 100));

  let grade_class = 'C';
  if (gpa >= 3.6) grade_class = 'A';
  else if (gpa >= 3.0) grade_class = 'B';
  else if (gpa >= 2.4) grade_class = 'C';
  else if (gpa >= 1.8) grade_class = 'D';
  else grade_class = 'F';

  // Primary enrolled course for decision support deep-dive
  const primaryCourse = COURSES[i % COURSES.length];
  
  // Attendance percentage: 100 - (absences / 45 total classes * 100)
  const attendance_pct = Math.max(42, Math.min(98, Math.round(100 - (absences / 45) * 100)));

  // Backlogs: Higher chance if math < 50 or GPA < 2.2
  let backlogs = 0;
  if (gpa < 2.0 || math_score < 45) backlogs = Math.floor(rng() * 3) + 2;
  else if (gpa < 2.5 || math_score < 55) backlogs = Math.floor(rng() * 2) + 1;

  // Grievances: 10% of students filed an assessment grievance
  const grievance_filed = (i % 11 === 0) ? {
    category: i % 2 === 0 ? "Laboratory Evaluation Rigor" : "Continuous Assessment Grading Pace",
    status: i % 3 === 0 ? "Pending Resolution" : "Investigated",
    filed_date: "2026-09-02"
  } : null;

  // Early warning status: composite risk
  const isEarlyWarning = (attendance_pct < 70 && gpa < 2.6) || absences > 10 || (math_score < 50 && weekly_study_hours < 3);

  students.push({
    student_id: studentId,
    gender,
    age,
    race_ethnicity,
    parental_education,
    lunch_type,
    test_preparation_course: test_prep,
    weekly_study_hours,
    absences,
    tutoring,
    parental_involvement,
    extracurricular_activities,
    sports_participation,
    music_participation,
    volunteering,
    internet_access,
    school_support,
    family_support,
    paid_classes,
    romantic_relationship,
    family_relationship_quality,
    free_time_after_school,
    going_out_with_friends,
    workday_alcohol_consumption,
    weekend_alcohol_consumption,
    current_health_status,
    math_score,
    reading_score,
    writing_score,
    gpa,
    grade_class,
    
    // Canonical Academic Context
    department,
    section,
    enrolled_course_code: primaryCourse.code,
    enrolled_course_name: primaryCourse.name,
    course_lead_faculty: primaryCourse.faculty,
    attendance_pct,
    internal_assessment_score: Math.round(math_score * 0.4), // 40 max marks
    backlog_count: backlogs,
    grievance: grievance_filed,
    early_warning_flag: isEarlyWarning,
    historical_intervention: i <= 15 ? {
      intervention_type: "Remedial Problem Solving Lab",
      applied_semester: "Previous Semester (Sem 2)",
      before_pass_rate: 58,
      after_pass_rate: 76,
      measured_gain_pct: 18,
      effectiveness: "High",
      outcome: "Resolved"
    } : null
  });
}

// Write the dataset to JSON
const outputPath = path.resolve('server/data/academicDataset100.json');
fs.writeFileSync(outputPath, JSON.stringify(students, null, 2), 'utf-8');

console.log(`Successfully generated canonical 100-entry dataset at: ${outputPath}`);
console.log(`Total students: ${students.length}`);
console.log(`Departments: ${[...new Set(students.map(s => s.department))].join(', ')}`);
console.log(`At Risk / Early Warning Count: ${students.filter(s => s.early_warning_flag).length}`);
