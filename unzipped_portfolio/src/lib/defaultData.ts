import { Profile, Project, PhotoEntry } from '../types';

export const DEFAULT_PROFILE: Profile = {
  name: "Vaibhav Goyal",
  title: "Travel Operations & AI Integration Specialist",
  age: 24,
  location: "Morena, M.P. (India)",
  email: "vaibhavgoyal026@gmail.com",
  phone: "+91 8989913869",
  linkedin: "linkedin.com/in/vaibhav-goyal-1b8a101ba",
  instagram: "live_in_travel_zone_",
  about: "Dynamic and results-oriented travel professional with deep firsthand destination expertise in Kashmir and Goa, enabling the creation of authentic and affordable travel packages. My background as an Operations Executive at Thrillophilia honed my skills in seamless travel planning and execution for discerning international clients in the US and UAE markets. I further strengthened my operational and sales acumen during a key internship with Trip String Goa DMC, where I played an integral role in operations, sales support, and digital transformation by building the company website and implementing CRM software. This hands-on experience, combined with my proficiency in leveraging AI-powered tools, allows me to merge practical travel knowledge with technological innovation to design unique itineraries and foster unforgettable client journeys."
};

export const SKILL_DATA = [
  { name: 'Ops Efficiency', value: 95 },
  { name: 'AI & Automation', value: 90 },
  { name: 'Travel Strategy', value: 88 },
  { name: 'CRM & Tooling', value: 85 },
  { name: 'Vendor Rel.', value: 82 },
  { name: 'Customer Service', value: 93 },
  { name: 'Web Dev', value: 72 }
];

export const RADAR_DATA = [
  { subject: 'Innovation', A: 98, fullMark: 100 },
  { subject: 'Operations', A: 95, fullMark: 100 },
  { subject: 'Tech Stack', A: 85, fullMark: 100 },
  { subject: 'Adaptability', A: 100, fullMark: 100 },
  { subject: 'Leadership', A: 80, fullMark: 100 },
  { subject: 'Comm.', A: 88, fullMark: 100 },
];

export const EXPERIENCE = [
  {
    role: "Sales & Operations Intern",
    company: "Trip String",
    location: "Goa",
    period: "June 2025 – Aug 2025",
    type: "Internship",
    bullets: [
      "Led telesales initiatives and sales operations, generating qualified leads.",
      "Spearheaded development of internal software, streamlining workflows.",
      "Managed vendor relationships in Chennai and onboarded key vendors in Tamil Nadu.",
      "Supported business development through process automation."
    ]
  },
  {
    role: "Operations Executive",
    company: "Thrillophilia",
    location: "Jaipur",
    period: "May 2023 – Oct 2023",
    type: "Full-time",
    bullets: [
      "Managed tour operations for US and UAE regions, handling direct bookings.",
      "Coordinated end-to-end tour allotments ensuring seamless experiences.",
      "Created attraction tickets and vouchers with high accuracy.",
      "Liaised with service providers to manage logistics."
    ]
  },
  {
    role: "Travel Operations Intern",
    company: "MSTRAVEL EXPERIENCE",
    location: "Morena",
    period: "Aug 2022 – Dec 2022",
    type: "Internship",
    bullets: [
      "Learned fundamentals of air ticket reservations and tour package design.",
      "Assisted in handling customer queries and travel planning coordination."
    ]
  }
];

export const EDUCATION = [
  {
    degree: "MBA in Tourism",
    institution: "IITTM Gwalior",
    period: "2024 - 2026",
    status: "Pursuing"
  },
  {
    degree: "Bachelor of Tourism",
    institution: "Prestige Institute of Management Gwalior",
    period: "2020 - 2023"
  },
  {
    degree: "Class 12th",
    institution: "Victor Convent H.S School Morena",
    period: "2019 - 2020"
  },
  {
    degree: "Class 10th",
    institution: "Victor Convent H.S School Morena",
    period: "2017 - 2018"
  }
];

export const SKILLS = [
  { category: "Professional", labels: ["Vendor Relations", "Customer Service", "Operations Oversight", "Scheduling"] },
  { category: "Tech & AI", labels: ["AI Expert", "Canva", "Adobe Illustrator", "MS Office", "CRM Software"] },
  { category: "Operations", labels: ["Operational Efficiency", "Digital Transformation", "Logistics Management"] }
];

export const PROJECTS: Project[] = [
  {
    id: "proj-1",
    title: "Digital Rate Sheet Automation",
    description: "Built a dynamic pricing system for Trip String Goa.",
    details: "### Problem\nSales team used manual spreadsheets with **15% error rate** in quotes and slow turnaround.\n\n### Action\nEngineered a dynamic digital rate sheet with real-time price updates using custom scripts.\n\n### Result\n- **95% reduction** in pricing errors.\n- **50% faster** quote generation time.",
    tags: ["Sales Tech", "Automation"]
  },
  {
    id: "proj-2",
    title: "CRM Vertical Card System",
    description: "Custom internal tool for optimizing client data access.",
    details: "### Problem\nOperational bottlenecks in handling client data meant high response times.\n\n### Action\nDesigned and implemented a CRM vertical card to optimize executive access to client data.\n\n### Result\n- **30% increase** in lead handling capacity.\n- **Streamlined workflow** for US and UAE regions.",
    tags: ["Productivity", "UI/UX"]
  },
  {
    id: "proj-3",
    title: "Company Website Development",
    description: "Developed Trip String's foundational website from the ground up.",
    details: "### Problem\nTrip String had no digital presence, losing potential clients to competitors with online visibility.\n\n### Action\nDeveloped the company's foundational website and enhanced internal operational systems during the internship period.\n\n### Result\n- **Established online presence** for Trip String Goa DMC.\n- **Improved client acquisition** through digital channels.",
    tags: ["Web Development", "Digital Transformation"]
  },
  {
    id: "proj-4",
    title: "AI-Powered Data Workflow Automation",
    description: "Leveraged AI to automate data workflows at Trip String.",
    details: "### Problem\nManual data entry and repetitive tasks consumed significant operational hours.\n\n### Action\nLeveraged AI to automate data workflows, integrating intelligent tools into daily operations.\n\n### Result\n- **Improved efficiency** across data handling processes.\n- **Reduced manual effort** significantly, freeing up team capacity.",
    tags: ["AI", "Automation", "Operations"]
  }
];

export const CERTIFICATES = [
  "Digital Marketing — Simplilearn",
  "Generative AI Studio — Google",
  "Foundations of Project Management — Simplilearn",
  "Salesforce Training Master — Simplilearn",
  "Power BI for Business Analytics — Simplilearn",
  "Finance Management — Simplilearn",
  "AI for Business Professionals — HP",
  "Customer Experience & Business Success — HP",
  "Data Science — HP",
  "Introduction to Operations Management — UPenn",
  "Revenue Management — ESSEC Business School",
  "Successful Negotiation Skills — University of Michigan",
  "Advanced Microsoft Excel — Microsoft",
  "Time Management — University of California, Irvine"
];

export const HOBBIES = [
  { emoji: "📸", name: "Photography" },
  { emoji: "✈️", name: "Travel Blogging" },
  { emoji: "🏔️", name: "Adventure" },
  { emoji: "💻", name: "Technology" },
  { emoji: "🤝", name: "Volunteering" },
  { emoji: "📚", name: "Reading" },
  { emoji: "🎤", name: "Ted Talks" },
  { emoji: "🏐", name: "Sports" },
];

export const PHOTOGRAPHY: PhotoEntry[] = [
  {
    id: "photo-1",
    title: "Kashmir Valleys",
    description: "Capturing the serene beauty of the Himalayas.",
    image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800&h=600&fit=crop",
    date: "2023-05-15"
  },
  {
    id: "photo-2",
    title: "Goa Sunsets",
    description: "Golden hours at the Arabian Sea.",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop",
    date: "2023-06-20"
  },
  {
    id: "photo-3",
    title: "Local Life",
    description: "Portraits and street photography from North India.",
    image: "https://images.unsplash.com/photo-1548013146-72479768bada?w=800&h=600&fit=crop",
    date: "2023-08-10"
  },
  {
    id: "photo-4",
    title: "Adventure Peaks",
    description: "Action shots from mountain treks.",
    image: "https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?w=800&h=600&fit=crop",
    date: "2023-09-05"
  }
];

export const LANGUAGES = [
  { name: "Hindi", level: "Native Speaker" },
  { name: "English", level: "Upper Intermediate (B2)" }
];

export const ACHIEVEMENTS = [
  "Awarded certificate for participation in the National-Level Talent Search Examination",
  "Volunteered in a certified Mass Awareness Campaign, contributing to community outreach initiatives",
  "Participated in Josh 2021, the Annual Sports Fest, as a member of the college volleyball team",
  "Completed a certified 10-day Mountaineering Course at Atal Bihari Vajpayee Institute of Mountaineering & Allied Sports, Dharamshala, Himachal Pradesh",
  "Attended certified webinar on The Role of Technology in the Post-COVID Tourism World",
  "Awarded certificate for participation in the Amartya Sen Gallery Art Exhibition"
];
