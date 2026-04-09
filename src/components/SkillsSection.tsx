import { Code2, Globe, Database, Cpu } from "lucide-react";

const categories = [
  {
    title: "Programming",
    icon: Code2,
    skills: ["C (Basics)", "Java (Learning)", "Python", "HTML", "CSS", "JavaScript"],
  },
  {
    title: "Frameworks & Tools",
    icon: Globe,
    skills: ["React", "Git", "GitHub", "VS Code", "Postman", "Firebase"],
  },
  {
    title: "Databases",
    icon: Database,
    skills: ["MongoDB"],
  },
  {
    title: "Core Concepts",
    icon: Cpu,
    skills: ["Data Structures & Algorithms", "OOP", "Operating Systems", "DBMS", "Computer Networks"],
  },
];

const SkillsSection = () => (
  <section id="skills" className="py-24 relative section-gradient">
    <div className="container mx-auto px-4">
      <h2 className="text-3xl md:text-4xl font-heading font-bold mb-16 neon-text">Skills</h2>

      <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {categories.map((cat) => (
          <div key={cat.title} className="glass-card-hover p-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-lg bg-neon-purple/20 flex items-center justify-center">
                <cat.icon size={20} className="text-neon-purple" />
              </div>
              <h3 className="font-heading font-semibold text-lg">{cat.title}</h3>
            </div>
            <ul className="space-y-2.5">
              {cat.skills.map((skill) => (
                <li key={skill} className="flex items-center gap-3 text-sm text-foreground/80">
                  <span className="w-2 h-2 rounded-full bg-neon-purple shrink-0" />
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default SkillsSection;
