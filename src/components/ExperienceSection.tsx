import { Briefcase } from "lucide-react";

const ExperienceSection = () => (
  <section className="py-24 relative section-gradient">
    <div className="container mx-auto px-4">
      <h2 className="text-3xl md:text-4xl font-heading font-bold text-center mb-4 neon-text">Experience</h2>
      <p className="text-muted-foreground text-center mb-12 max-w-md mx-auto">Where I stand today</p>

      <div className="glass-card-hover max-w-2xl mx-auto p-8 text-center">
        <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-neon-blue/20 flex items-center justify-center">
          <Briefcase size={24} className="text-neon-blue" />
        </div>
        <h3 className="font-heading font-semibold text-xl mb-2">Fresher</h3>
        <p className="text-muted-foreground text-sm max-w-md mx-auto">
          Currently pursuing undergraduate studies with hands-on project experience
          in full-stack development and backend systems.
        </p>
      </div>
    </div>
  </section>
);

export default ExperienceSection;
