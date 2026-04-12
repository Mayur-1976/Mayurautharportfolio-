export interface Skill {
  name: string;
  learning?: boolean;
}

export interface SkillGroup {
  title: string;
  color: string;
  icon: string;
  skills: Skill[];
}

export const skillGroups: SkillGroup[] = [
  {
    title: "Backend & Dev",
    color: "#836ef9",
    icon: "code",
    skills: [
      { name: "JavaScript" },
      { name: "HTML & CSS" },
      { name: "REST APIs" },
      { name: "API Integration" },
      { name: "Git & GitHub" },
      { name: "Node.js", learning: true },
    ],
  },
  {
    title: "AI / ML",
    color: "#f472b6",
    icon: "brain",
    skills: [
      { name: "AI Tools & Prompting" },
      { name: "Text-to-Image AI" },
      { name: "ML Basics" },
      { name: "Python", learning: true },
    ],
  },
  {
    title: "DevOps — Currently Learning",
    color: "#22d3ee",
    icon: "server",
    skills: [
      { name: "Linux Basics" },
      { name: "Git & Version Control" },
      { name: "CI/CD Concepts", learning: true },
      { name: "Cloud Basics" },
      { name: "Docker", learning: true },
    ],
  },
];

export const softSkills: Skill[] = [
  { name: "Problem-Solving" },
  { name: "Analytical Thinking" },
  { name: "Communication" },
  { name: "Collaboration" },
  { name: "Continuous Learning" },
  { name: "Time Management" },
];

export const softSkillsColor = "#a3e635";
