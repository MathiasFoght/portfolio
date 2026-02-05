import { Project } from "@/types/project.types";

const PROJECTS: Project[] = [
  {
    id: "1",
    title: "Business Website",
    description:
      "Website and digital solution for Brandt Jord & Kloak ApS with focus on clear service presentation and contact flow.",
    technologies: ["Next.js", "TypeScript", "CSS", "Prismic CMS"],
    demo: "https://brandt-jord-kloak-website-five.vercel.app",
  },
  {
    id: "2",
    title: "Unified Scanning and Store Operations Platform",
    description:
      "Bachelor project developed in collaboration with Amero ApS. Mobile app for product scanning, price checks, inventory lookup, and simple store operations.",
    technologies: [
      "React Native",
      "Expo Go",
      "TypeScript",
      ".Net",
      "C#",
      "Docker",
      "Azure",
      "PostgreSQL",
    ],
  },
  {
    id: "3",
    title: "Portfolio",
    description:
      "Personal developer portfolio showcasing projects, skills, and experience. The site you are currently viewing.",
    technologies: ["Next.js", "TypeScript", "CSS"],
  },
  {
    id: "4",
    title: "AI-Powered Tourist Guide",
    description:
      "AI-powered mobile app that analyzes images of attractions and provides detailed descriptions in Danish/English. Includes a follow-up chat allowing users to ask additional questions and explore the attraction in more depth.",
    technologies: ["React Native", "TypeScript", "Expo Go", "OpenAI API"],
  },
];

export default PROJECTS;
