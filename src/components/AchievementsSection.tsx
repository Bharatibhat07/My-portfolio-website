import { Award, Lightbulb, Brain, BookCheck, Loader, Clock } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

const achievements = [
  {
    icon: Award,
    title: "Academic Excellence",
    desc: "CGPA: 9.0/10 in Computer Science Engineering",
  },
  {
    icon: Lightbulb,
    title: "Project-Based Learning",
    desc: "Built a Campus Grievance Redressal Portal with full-stack architecture",
  },
  {
    icon: Brain,
    title: "Problem Solving",
    desc: "Actively practicing DSA on LeetCode to improve logical skills",
  },
];

const AchievementsSection = () => {
  const { data: certifications = [], isLoading, error } = useQuery({
    queryKey: ['certificates'],
    queryFn: async () => {
      const response = await fetch('http://localhost:5000/api/certificates');
      if (!response.ok) throw new Error('Failed to fetch certificates');
      return response.json();
    },
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'In Progress':
        return Loader;
      case 'Planned':
        return Clock;
      default:
        return BookCheck;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'In Progress':
        return 'bg-accent/20 text-accent';
      case 'Completed':
        return 'bg-green-500/20 text-green-400';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <section id="achievements" className="py-24 relative">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-center mb-4 neon-text">
          Achievements & Certifications
        </h2>
        <p className="text-muted-foreground text-center mb-12 max-w-md mx-auto">Milestones on my journey</p>

        {/* Achievements */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-16">
          {achievements.map((a) => (
            <div key={a.title} className="glass-card-hover p-6 text-center">
              <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-neon-purple/20 flex items-center justify-center">
                <a.icon size={24} className="text-neon-purple" />
              </div>
              <h3 className="font-heading font-semibold text-lg mb-2">{a.title}</h3>
              <p className="text-sm text-muted-foreground">{a.desc}</p>
            </div>
          ))}
        </div>

        {/* Certifications */}
        <h3 className="text-xl font-heading font-semibold text-center mb-6 text-foreground/80">Certifications</h3>
        {isLoading ? (
          <div className="text-center text-muted-foreground">Loading certifications...</div>
        ) : error ? (
          <div className="text-center text-red-400">Failed to load certifications</div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {certifications.map((c: any) => {
              const StatusIcon = getStatusIcon(c.status);
              return (
                <div key={c._id} className="glass-card-hover p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <BookCheck size={18} className="text-neon-blue" />
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full font-heading ${getStatusColor(c.status)}`}
                    >
                      {c.status}
                    </span>
                  </div>
                  <h4 className="font-heading font-medium mb-3">{c.title}</h4>
                  {c.issuer && (
                    <p className="text-sm text-muted-foreground mb-2">Issuer: {c.issuer}</p>
                  )}
                  {c.credentialUrl ? (
                    <a
                      href={c.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-neon-purple border border-glass-border rounded-lg px-3 py-1.5 hover:border-neon-purple/40 transition-colors"
                    >
                      View Certificate
                    </a>
                  ) : (
                    <button className="text-xs text-muted-foreground border border-glass-border rounded-lg px-3 py-1.5 hover:border-neon-purple/40 transition-colors cursor-not-allowed opacity-50">
                      View Certificate
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default AchievementsSection;
