import { ScenarioId } from '../types.js';

/**
 * ============================================================================
 * PREPARED SAMPLE ANSWERS FOR QUICK DEMO TESTING & BENCHMARKING
 * ============================================================================
 * You can copy/paste any of these answers into the chat box or use the
 * "Sample Answers" interactive helper inside the ChatScreen.
 *
 * 1. JOB INTERVIEW (Software Engineer / Entry-Level)
 * --------------------------------------------------
 * - Answer #1 (Intro & Foundation):
 *   "I recently graduated with a BS in Computer Science from FAST-NUCES. During my final year, I built an end-to-end MERN stack e-commerce web application with role-based authentication and unit tests in Jest. I am eager to apply my technical problem-solving skills to your engineering team as an Associate Software Engineer."
 *
 * - Answer #2 (Handling Work Pressure & Deadlines):
 *   "When our final semester demo deadline was unexpectedly moved up by two weeks, I broke our team backlog into critical path tickets, initiated daily 15-minute standups, and personally solved the Redis session bottleneck so our team delivered on time without compromising code quality."
 *
 * - Answer #3 (Teamwork & Technical Disagreements):
 *   "In our database course project, a teammate and I differed on whether to use MongoDB or PostgreSQL. Instead of debating abstractly, I benchmarked our write vs read workloads and demonstrated PostgreSQL's relational schema and ACID guarantees fit our financial module better, which won team agreement."
 *
 * - Answer #4 (Career Vision & Growth):
 *   "Over the next 2-3 years, I want to master scalable system design, contribute to high-concurrency microservices, and mentor incoming engineering interns."
 *
 * - Answer #5 (Salary & Closing):
 *   "Based on market benchmarks for fresh CS graduates in Lahore and my hands-on full-stack projects, I am targeting PKR 100,000 to 120,000 per month, though I am enthusiastic about the overall growth opportunity and mentorship here."
 *
 *
 * 2. INTERNSHIP INTERVIEW (Students & Early Grads)
 * -------------------------------------------------
 * - Answer #1 (Motivation & Coursework):
 *   "I am currently in my 6th semester studying Software Engineering at NUST. I have closely followed your company's logistics software products and want this summer internship to apply my React and TypeScript skills to real production features."
 *
 * - Answer #2 (Independent Learning & Practical Projects):
 *   "Outside coursework, I built an expense tracking mobile app using React Native and SQLite, which helped me understand offline state synchronization, responsive UI design, and debugging third-party libraries."
 *
 * - Answer #3 (Availability & Learning Goals):
 *   "I am available full-time for 8 to 10 weeks over the summer. My main goal is to learn your CI/CD deployment pipelines and receive direct code review feedback from senior engineers."
 *
 *
 * 3. SALARY / OFFER NEGOTIATION (HR Discussion)
 * ----------------------------------------------
 * - Answer #1 (Validating Offer & Countering Constructively):
 *   "Thank you so much for the offer letter of PKR 110,000. I am thrilled about the opportunity to join the engineering team. Given my hands-on production experience during my final year project and market rates for full-stack developers in Karachi, I was hoping for PKR 135,000. Is there flexibility within your compensation band?"
 *
 * - Answer #2 (Collaborative Compromise & Non-Monetary Perks):
 *   "I understand company budget constraints. If a base of 135,000 isn't feasible right now, could we agree on PKR 125,000 with a performance review in six months, or include health coverage and flexible hybrid work days?"
 *
 *
 * 4. SCHOLARSHIP INTERVIEW (Academic & Panel Review)
 * ---------------------------------------------------
 * - Answer #1 (Academic Background & Research Intent):
 *   "I completed my Bachelor's in Environmental Sciences with a 3.85 CGPA. My research focused on groundwater contamination in rural Sindh. This scholarship will enable me to pursue a Master's in Water Resource Management to design affordable solar-powered filtration units."
 *
 * - Answer #2 (Leadership & Giveback to Pakistan):
 *   "During college, I founded a clean-water student drive that installed five community filtration units serving 1,200 households. Upon completing my master's degree, I intend to return to Pakistan to work with the Ministry of Climate Change and local NGOs on scalable water conservation systems."
 *
 *
 * 5. VISA INTERVIEW (Consular Officer)
 * ------------------------------------
 * - Answer #1 (Direct Purpose of Travel):
 *   "I am traveling to the United States on an F-1 student visa to pursue a Master of Science in Computer Science at Purdue University starting Fall 2026."
 *
 * - Answer #2 (Proof of Funding & Ties to Home Country):
 *   "My program is funded through a combination of a 50% departmental graduate research assistantship and my parents' savings, as documented in my I-20 and bank statements. My family lives in Lahore, where my father runs an engineering consultancy, and I will return to Pakistan to join our university faculty and local industry upon completing my degree."
 *
 *
 * 6. ROMAN URDU DEMO ANSWERS (For testing Roman Urdu & voice mode)
 * -----------------------------------------------------------------
 * - Roman Urdu Answer #1:
 *   "Mera naam Ali hai aur maine FAST university se Computer Science mein degree complete ki hai. Mujhe aapki company ke software solutions bohot pasand aye aur main Junior Developer role ke liye apply kar raha hoon."
 *
 * - Roman Urdu Answer #2:
 *   "Job pressure ke waqt main kaam ko priorities mein divide karta hoon aur team ke sath clear communication rakhta hoon taake deadlines time par meet ho sakein."
 * ============================================================================
 */

export interface SampleAnswerItem {
  label: string;
  answer: string;
}

export const SAMPLE_ANSWERS_BY_SCENARIO: Record<ScenarioId, SampleAnswerItem[]> = {
  job_interview: [
    {
      label: '1. Self-Intro & Technical Foundation',
      answer:
        'I recently graduated with a BS in Computer Science from FAST-NUCES. During my final year, I built an end-to-end MERN stack e-commerce web application with role-based authentication and unit tests in Jest. I am eager to apply my technical problem-solving skills to your engineering team as an Associate Software Engineer.',
    },
    {
      label: '2. Handling Pressure & Deadlines',
      answer:
        'When our final semester demo deadline was unexpectedly moved up by two weeks, I broke our team backlog into critical path tickets, initiated daily 15-minute standups, and personally solved the Redis session bottleneck so our team delivered on time without compromising code quality.',
    },
    {
      label: '3. Teamwork & Conflict Resolution',
      answer:
        'In our database course project, a teammate and I differed on whether to use MongoDB or PostgreSQL. Instead of debating abstractly, I benchmarked our write vs read workloads and demonstrated PostgreSQL ACID guarantees fit our financial module better, which won team agreement.',
    },
    {
      label: '4. Career Goals (2-3 Years)',
      answer:
        'Over the next 2-3 years, I want to master scalable system design, contribute to high-concurrency microservices, and mentor incoming engineering interns.',
    },
    {
      label: '5. Salary Expectation',
      answer:
        'Based on market benchmarks for fresh CS graduates in Lahore and my hands-on full-stack projects, I am targeting PKR 100,000 to 120,000 per month, though I am enthusiastic about the overall growth opportunity and mentorship here.',
    },
    {
      label: 'Roman Urdu: Intro (Demo)',
      answer:
        'Mera naam Ali hai aur maine FAST university se Computer Science mein degree complete ki hai. Mujhe aapki company ke software solutions bohot pasand aye aur main Junior Developer role ke liye apply kar raha hoon.',
    },
  ],

  internship_interview: [
    {
      label: '1. Why This Internship',
      answer:
        'I am currently in my 6th semester studying Software Engineering at NUST. I have closely followed your company logistics software products and want this summer internship to apply my React and TypeScript skills to real production features.',
    },
    {
      label: '2. Project Experience & Independent Learning',
      answer:
        'Outside coursework, I built an expense tracking mobile app using React Native and SQLite, which helped me understand offline state synchronization, responsive UI design, and debugging third-party libraries.',
    },
    {
      label: '3. Availability & Learning Goals',
      answer:
        'I am available full-time for 8 to 10 weeks over the summer. My main goal is to learn your CI/CD deployment pipelines and receive direct code review feedback from senior engineers.',
    },
    {
      label: 'Roman Urdu: Internship Motivation',
      answer:
        'Main abhi NUST se Software Engineering parh raha hoon aur mujhe frontend development ka bohot shoq hai. Main is internship mein React aur modern web tools seekhna chahta hoon.',
    },
  ],

  salary_negotiation: [
    {
      label: '1. Constructive Counter-Offer',
      answer:
        'Thank you so much for the offer letter of PKR 110,000. I am thrilled about the opportunity to join the engineering team. Given my hands-on production experience during my final year project and market rates for full-stack developers in Karachi, I was hoping for PKR 135,000. Is there flexibility within your compensation band?',
    },
    {
      label: '2. Collaborative Compromise (Perks & Review)',
      answer:
        'I understand company budget constraints. If a base of 135,000 is not feasible right now, could we agree on PKR 125,000 with a performance review in six months, or include health coverage and flexible hybrid work days?',
    },
    {
      label: 'Roman Urdu: Negotiation Response',
      answer:
        'Offer letter ke liye bohot shukriya. Meri practical experience aur current market standards ke mutabiq main PKR 130,000 expect kar raha tha. Kya compensation band mein flexibility hai?',
    },
  ],

  scholarship_interview: [
    {
      label: '1. Academic Vision & Research Goal',
      answer:
        'I completed my Bachelor in Environmental Sciences with a 3.85 CGPA. My research focused on groundwater contamination in rural Sindh. This scholarship will enable me to pursue a Master in Water Resource Management to design affordable solar-powered filtration units.',
    },
    {
      label: '2. Leadership & Contribution to Pakistan',
      answer:
        'During college, I founded a clean-water student drive that installed five community filtration units serving 1,200 households. Upon completing my master degree, I intend to return to Pakistan to work with the Ministry of Climate Change and local NGOs on scalable water conservation systems.',
    },
    {
      label: 'Roman Urdu: Scholarship Motivation',
      answer:
        'Maine apni Bachelor degree 3.85 CGPA ke sath complete ki hai aur mera maqsad Pakistan ke rural ilaqon mein saaf paani ki supply par kaam karna hai.',
    },
  ],

  visa_interview: [
    {
      label: '1. Travel Purpose (Direct & Concise)',
      answer:
        'I am traveling to the United States on an F-1 student visa to pursue a Master of Science in Computer Science at Purdue University starting Fall 2026.',
    },
    {
      label: '2. Funding & Return Ties to Pakistan',
      answer:
        'My program is funded through a combination of a 50% departmental graduate research assistantship and my parents savings, as documented in my I-20 and bank statements. My family lives in Lahore, where my father runs an engineering consultancy, and I will return to Pakistan to join our university faculty and local industry upon completing my degree.',
    },
    {
      label: 'Roman Urdu: Visa Purpose & Ties',
      answer:
        'Main Purdue University mein Master of Science in Computer Science parhne ja raha hoon. Mere parents Lahore mein rehte hain aur degree mukammal karne ke baad main Pakistan wapas aa kar university faculty join karoon ga.',
    },
  ],
};
