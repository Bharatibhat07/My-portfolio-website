# Bharati S Bhat - Portfolio Website

A modern, interactive portfolio website showcasing Bharati's skills, projects, education, and professional certifications. Built with React, TypeScript, Vite, and Tailwind CSS with a sleek neon-themed design.

## 🌟 Features

### Hero Section
- **Dynamic Welcome Section** with animated taglines
- **View CV Button** – Direct link to download resume.pdf
- **Call-to-Action Buttons** for easy navigation
- **Profile Image** with decorative animations

### Portfolio Assistant Widget
- **AI-Powered Chat Interface** – Ask questions about Bharati's profile
- **Floating Chat Button** – Fixed position at bottom-right of screen
- **Smart Q&A System** – Answers based on portfolio data and resume
- **Third-Person Responses** – Professional tone describing Bharati's qualifications
- **Dialog Modal** – Clean, modern chat UI with message history

### Enhanced Certifications Section
- **7 Professional Certifications** displayed with premium card design:
  1. Java Programming Fundamentals (Infosys Springboard)
  2. Full Stack Development Workshop (Wayspire)
  3. Object-Oriented Programming in Java (Simplilearn)
  4. Soft Skill Development (NPTEL)
  5. Advanced Pointers and Data Structures
  6. BugBash - Debugging Challenge
  7. Hack The Matrix - Vibe Coding Hackathon

- **Unique Features:**
  - Custom icons for each certificate
  - Gradient-filled backgrounds with hover effects
  - Certificate descriptions and issuer information
  - View & Download buttons for each certificate
  - PDF & Image support with modal viewer
  - Completion status badges

### Complete Portfolio Sections
- **About Me** – Bio and introduction
- **Education** – Academic details (B.E. CSE, SDM Institute of Technology)
- **Skills** – Programming languages, frameworks, databases, and core concepts
- **Achievements** – Key milestones and accomplishments
- **Experience** – Professional background
- **Projects** – Showcase of completed projects
- **Contact** – Contact form with EmailJS integration
- **Navbar** – Smooth navigation with mobile menu

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Bharatibhat07/My-portfolio-website.git
cd My-portfolio-website
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables (create `.env.local`):
```env
VITE_EMAILJS_PUBLIC_KEY=your_emailjs_public_key
VITE_EMAILJS_SERVICE_ID=your_emailjs_service_id
VITE_EMAILJS_TEMPLATE_ID=your_emailjs_template_id
```

### Development

Start the development server:
```bash
npm run dev
```

The site will be available at `http://localhost:5173`

### Build

Create a production build:
```bash
npm run build
```

## 🛠️ Tech Stack

- **Frontend Framework:** React 18+ with TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS + Custom CSS
- **UI Components:** Radix UI
- **Icons:** Lucide React
- **Forms:** React Hook Form
- **Email Service:** EmailJS
- **Database:** Supabase (for future extensions)
- **Testing:** Vitest, Playwright

## 📁 Project Structure

```
src/
├── components/
│   ├── AssistantWidget.tsx      # AI chat assistant
│   ├── AchievementsSection.tsx  # Certifications & awards
│   ├── AboutSection.tsx
│   ├── ContactSection.tsx
│   ├── EducationSection.tsx
│   ├── ExperienceSection.tsx
│   ├── Footer.tsx
│   ├── HeroSection.tsx
│   ├── Navbar.tsx
│   ├── ProjectsSection.tsx
│   ├── SkillsSection.tsx
│   └── ui/                      # Reusable UI components
├── pages/
│   ├── Index.tsx               # Main portfolio page
│   └── NotFound.tsx
├── App.tsx
└── main.tsx
public/
├── certificates/               # Certificate PDFs and images
├── resume.pdf                 # CV download file
└── robots.txt
```

## ✨ Key Components

### AssistantWidget
Interactive chatbot that answers questions about Bharati's:
- Education & CGPA
- Skills & technologies
- Experience & projects
- Contact information
- CV/Resume
- Portfolio deployment details

Automatically responds with contextual answers based on keyword matching.

### Certifications Display
Premium card-based layout featuring:
- Gradient backgrounds with glow effects
- Smooth hover animations
- Status indicators (Completed, In Progress)
- Date badges
- Viewable certificates in modal dialog
- PDF & image support

## 🌐 Deployment

### Deploy to Vercel

The portfolio is optimized for Vercel deployment:

1. Push to GitHub
2. Connect repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy with custom domain: `bharatisbhat-portfolio.vercel.app`

```bash
npm run build
```

## 📱 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## 🔧 Customization

### Add New Certificates
Edit `src/components/AchievementsSection.tsx`:
```typescript
{
  _id: '8',
  title: "New Certification Title",
  status: "Completed",
  issuer: "Issuing Organization",
  certificateFile: "/certificates/filename.pdf",
  date: "2024",
  icon: YourIconName,
  desc: "Description of what was learned",
}
```

### Update Assistant Responses
Modify the `responses` array in `src/components/AssistantWidget.tsx` to add new Q&A pairs.

### Customize Colors
Edit `tailwind.config.ts` for theme customization with neon color schemes.

## 📞 Contact

- **Email:** bharatibhat39@gmail.com
- **Phone:** +91 8277333157 / 8431289243
- **GitHub:** github.com/Bharatibhat07
- **LinkedIn:** linkedin.com/in/bharati-bhat-418483329
- **Instagram:** instagram.com/bharati_bhat_07

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- Built with Lovable
- UI Components from Radix UI
- Icons from Lucide React
- Email service by EmailJS

---

**Last Updated:** June 26, 2026
**Current Version:** 1.0.0
