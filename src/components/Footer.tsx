const Footer = () => (
  <footer className="py-8 border-t border-glass-border text-center">
    <p className="text-sm text-muted-foreground">
      © {new Date().getFullYear()}{" "}
      <span className="neon-text font-heading font-semibold">Bharati S Bhat</span>
      . All rights reserved.
    </p>
  </footer>
);

export default Footer;
