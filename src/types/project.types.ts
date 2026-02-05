export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  github?: string;
  demo?: string;
}

export interface TechLogo {
  name: string;
  icon: string;
}
