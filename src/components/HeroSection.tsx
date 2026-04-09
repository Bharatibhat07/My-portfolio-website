import { useEffect, useState } from "react";
import profileImg from "@/assets/profile.png";

const taglines = [
  "Aspiring Java Full Stack Developer",
  "DSA Enthusiast",
  "Problem Solver",
];

const HeroSection = () => {
  const [tagIndex, setTagIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = taglines[tagIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && text.length < current.length) {
      timeout = setTimeout(() => setText(current.slice(0, text.length + 1)), 80);
    } else if (!deleting && text.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), 1800);
    } else if (deleting && text.length > 0) {
      timeout = setTimeout(() => setText(text.slice(0, -1)), 40);
    } else if (deleting && text.length === 0) {
      setDeleting(false);
      setTagIndex((prev) => (prev + 1) % taglines.length);
    }

    return () => clearTimeout(timeout);
  }, [text, deleting, tagIndex]);

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 gradient-bg" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-neon-purple/5 blur-[120px]" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-neon-blue/5 blur-[120px]" />

      <div className="container mx-auto px-4 relative z-10 flex flex-col-reverse lg:flex-row items-center gap-12 pt-20">
        {/* Text */}
        <div className="flex-1 text-center lg:text-left">
          <p className="text-sm tracking-widest uppercase text-muted-foreground mb-4 animate-fade-up">
            Welcome to my portfolio
          </p>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold mb-4 animate-fade-up animation-delay-200">
            Hi, I'm{" "}
            <span className="neon-text">Bharati S Bhat</span>
          </h1>
          <div className="h-8 md:h-10 mb-6 animate-fade-up animation-delay-400">
            <span className="text-lg md:text-2xl text-accent font-heading">
              {text}
              <span className="animate-pulse ml-0.5">|</span>
            </span>
          </div>
          <p className="text-muted-foreground max-w-lg mx-auto lg:mx-0 mb-8 animate-fade-up animation-delay-600">
            6th semester Computer Science student focused on full stack development
            and problem solving. Building real-world applications one line at a time.
          </p>
          <div className="flex gap-4 justify-center lg:justify-start animate-fade-up animation-delay-800">
            <a href="#projects" className="btn-neon">View Projects</a>
            <a href="#contact" className="btn-outline-neon">Contact Me</a>
          </div>
        </div>

        {/* Profile Image */}
        <div className="flex-shrink-0 animate-fade-up animation-delay-400">
          <div className="relative">
            <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden neon-border profile-glow animate-float">
              <img
                src={profileImg}
                alt="Bharati S Bhat"
                width={512}
                height={512}
                className="w-full h-full object-cover object-top"
              />
            </div>
            {/* Decorative ring */}
            <div className="absolute -inset-3 rounded-full border border-neon-purple/20 animate-[spin_20s_linear_infinite]" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
