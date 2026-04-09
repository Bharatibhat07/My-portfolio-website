import { ExternalLink, Github, Languages, Bot, Volume2, Image, LayoutDashboard, Zap } from "lucide-react";

const features = [
  { icon: Languages, label: "Smart translation & transliteration" },
  { icon: Bot, label: "AI-based complaint categorization" },
  { icon: Volume2, label: "Audio output for accessibility" },
  { icon: Image, label: "Image/video evidence upload" },
  { icon: LayoutDashboard, label: "Dual dashboards (User & Admin)" },
  { icon: Zap, label: "Real-time updates with Firebase" },
];

const techStack = ["React.js", "Node.js", "Express.js", "MongoDB", "Firebase", "Postman"];

const ProjectsSection = () => (
  <section id="projects" className="py-24 relative">
    <div className="container mx-auto px-4">
      <h2 className="text-3xl md:text-4xl font-heading font-bold text-center mb-4 neon-text">Projects</h2>
      <p className="text-muted-foreground text-center mb-12 max-w-md mx-auto">What I've built</p>

      <div className="glass-card-hover max-w-4xl mx-auto p-8 md:p-10">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
          <div>
            <h3 className="text-2xl font-heading font-bold mb-2">Campus Grievance Redressal Portal</h3>
            <p className="text-muted-foreground text-sm max-w-lg">
              A full-stack web application designed to provide an accessible and transparent
              platform for reporting campus issues.
            </p>
          </div>
          <div className="flex gap-3 shrink-0">
            <button className="btn-neon text-xs flex items-center gap-1.5">
              <ExternalLink size={14} /> View Project
            </button>
            <button className="btn-outline-neon text-xs flex items-center gap-1.5">
              <Github size={14} /> View Code
            </button>
          </div>
        </div>

        {/* Tech Stack */}
        <div className="mb-6">
          <h4 className="text-xs uppercase tracking-widest text-muted-foreground mb-3 font-heading">Tech Stack</h4>
          <div className="flex flex-wrap gap-2">
            {techStack.map((t) => (
              <span key={t} className="text-xs px-3 py-1.5 rounded-full bg-neon-purple/10 border border-neon-purple/20 text-neon-purple font-heading">
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Features */}
        <h4 className="text-xs uppercase tracking-widest text-muted-foreground mb-3 font-heading">Key Features</h4>
        <div className="grid sm:grid-cols-2 gap-3">
          {features.map((f) => (
            <div key={f.label} className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
              <f.icon size={16} className="text-neon-blue shrink-0" />
              <span className="text-sm text-foreground/80">{f.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default ProjectsSection;
