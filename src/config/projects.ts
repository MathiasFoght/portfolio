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
    title: "AI-powered anything scraper",
    description:
      "This project turns web pages into useful data in seconds. Enter a URL, scrape the fully rendered page and ask an AI to extract exactly what you care about using natural-language instructions.",
    technologies: [
      "Python",
      "LangChain",
      "OpenAI API",
      "Bright Data Scraping Browser",
      "Streamlit",
    ],
  },
  {
    id: "5",
    title: "Amazon product intelligence",
    description:
      "Tool for scraping Amazon product data via Oxylabs Web Scraper API, storing products in a database with integrated price history tracking, identifying competitors, and generating AI-based competitor analysis",
    technologies: [
      "Python",
      "LangChain",
      "PostgreSQL",
      "Oxylabs Web Scraper API",
      "OpenAI API",
      "Docker",
    ],
  },
];

export default PROJECTS;
