import { GraduationCap, Target, Crosshair } from "lucide-react";

const AboutSection = () => (
  <section id="about" className="py-24 relative section-gradient">
    <div className="container mx-auto px-4">
      <h2 className="text-3xl md:text-4xl font-heading font-bold mb-16 neon-text">About Me</h2>

      <div className="flex flex-col lg:flex-row gap-10 max-w-6xl mx-auto">
        {/* Left - Bio */}
        <div className="flex-1 space-y-6 text-foreground/80 leading-relaxed text-base">
          <p>
            I'm Bharati S Bhat, a Computer Science student with a strong interest in full stack
            development. I'm passionate about building meaningful applications that solve real-world problems.
          </p>
          <p>
            My journey spans from learning Java and strengthening Data Structures & Algorithms
            through LeetCode to building full-stack web applications. I am currently in my 6th semester
            at SDM Institute of Technology.
          </p>
          <p>
            Continuously learning new technologies and frameworks to become a well-rounded
            full stack developer with strong problem-solving abilities.
          </p>
        </div>

        {/* Right - Info Cards */}
        <div className="flex-1 space-y-4">
          <div className="glass-card-hover p-5">
            <div className="flex items-center gap-3 mb-2">
              <GraduationCap size={20} className="text-neon-purple" />
              <h3 className="font-heading font-semibold">Education</h3>
            </div>
            <p className="text-sm text-foreground/70">B.E. in Computer Science and Engineering</p>
            <p className="text-sm text-muted-foreground">SDM Institute of Technology, Dakshina Kannada</p>
            <p className="text-sm text-muted-foreground">2023 – Ongoing</p>
          </div>

          <div className="glass-card-hover p-5">
            <div className="flex items-center gap-3 mb-2">
              <Target size={20} className="text-neon-purple" />
              <h3 className="font-heading font-semibold">CGPA</h3>
            </div>
            <p className="text-2xl font-heading font-bold neon-text">9.0 / 10</p>
          </div>

          <div className="glass-card-hover p-5">
            <div className="flex items-center gap-3 mb-2">
              <Crosshair size={20} className="text-neon-purple" />
              <h3 className="font-heading font-semibold">Focus</h3>
            </div>
            <p className="text-sm text-foreground/70">Full Stack Development • DSA • Problem Solving</p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default AboutSection;
