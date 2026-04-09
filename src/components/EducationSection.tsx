import { GraduationCap } from "lucide-react";

const EducationSection = () => (
  <section id="education" className="py-24 relative">
    <div className="container mx-auto px-4">
      <h2 className="text-3xl md:text-4xl font-heading font-bold text-center mb-4 neon-text">Education</h2>
      <p className="text-muted-foreground text-center mb-12 max-w-md mx-auto">My academic journey</p>

      <div className="max-w-2xl mx-auto">
        {/* Timeline line */}
        <div className="relative pl-8 border-l-2 border-neon-purple/30">
          <div className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-neon-purple flex items-center justify-center">
            <GraduationCap size={14} className="text-primary-foreground" />
          </div>
          <div className="glass-card-hover p-6 ml-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs px-3 py-1 rounded-full bg-neon-purple/20 text-neon-purple font-heading">
                2023 – Present
              </span>
            </div>
            <h3 className="text-xl font-heading font-semibold mb-1">
              B.E in Computer Science & Engineering
            </h3>
            <p className="text-muted-foreground text-sm mb-3">
              SDM Institute of Technology, Ujire, Dakshina Kannada
            </p>
            <div className="flex items-center gap-2">
              <span className="text-accent font-heading font-bold text-lg">CGPA: 9.0/10</span>
              <span className="text-xs text-muted-foreground">• Academic Excellence</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default EducationSection;
