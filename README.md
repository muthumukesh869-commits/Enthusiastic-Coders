<<<<<<< HEAD
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
=======
# CareerPath AI - Frontend

A production-ready, premium frontend for an AI-powered career guidance platform built with Next.js, Three.js, and modern web technologies.

## 🚀 Features

### ✨ Core Features
- **3D Landing Page** - Interactive Three.js scene with floating career domain cards
- **AI Chatbot** - Floating chat interface with context-aware career guidance responses
- **Multi-Step Onboarding** - Wizard-style onboarding for interests, skills, and background
- **Dashboard** - Personalized stats, recommended career paths, and quick actions
- **Resume Analyzer** - ATS score calculation with keyword suggestions
- **Learning Roadmap** - Timeline-based roadmap with expandable modules and resources
- **Company Explorer** - Filterable company cards with hiring trends
- **Skill Benchmarking** - Gauge meters comparing your skills with peer averages

### 🎨 Design Features
- **Glassmorphism UI** - Modern glass-effect cards and components
- **Neon Gradients** - Vibrant color schemes with smooth gradients
- **Smooth Animations** - Framer Motion for buttery-smooth transitions
- **Dark Mode** - Default dark theme optimized for reduced eye strain
- **Responsive Design** - Mobile-first, works beautifully on all devices

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion
- **3D Graphics**: Three.js + React Three Fiber
- **UI Components**: Custom components with Shadcn/UI patterns
- **State Management**: Zustand (ready to integrate)
- **Icons**: Lucide React

## 📦 Installation

```bash
# Install dependencies
npm install --legacy-peer-deps

# Or if you encounter issues
npm install next react react-dom --legacy-peer-deps
npm install framer-motion three @react-three/fiber @react-three/drei --legacy-peer-deps
npm install lucide-react clsx tailwind-merge class-variance-authority --legacy-peer-deps
npm install zustand recharts ai --legacy-peer-deps
```

## 🚀 Getting Started

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## 📁 Project Structure

```
careerpath-ai/
├── app/                          # Next.js App Router pages
│   ├── page.tsx                  # Landing page with 3D scene
│   ├── layout.tsx                # Root layout
│   ├── globals.css               # Global styles
│   ├── onboarding/               # Onboarding wizard
│   ├── dashboard/                # Main dashboard
│   ├── roadmap/[domain]/         # Dynamic roadmap pages
│   ├── resume-analyzer/          # Resume analysis tool
│   ├── companies/                # Company explorer
│   └── benchmarking/             # Skill benchmarking
├── components/
│   ├── ui/                       # Reusable UI components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── progress.tsx
│   │   └── badge.tsx
│   ├── three/                    # 3D components
│   │   └── CareerDomainCards.tsx
│   └── shared/                   # Shared components
│       └── AIChat.tsx            # AI chatbot
├── lib/
│   └── utils.ts                  # Utility functions
├── tailwind.config.ts            # Tailwind configuration
└── package.json
```

## 🎨 Key Components

### Landing Page
- 3D floating career domain cards with hover effects
- Animated hero section with gradient text
- Scroll-based animations
- Feature showcase section

### AI Chatbot
- Floating chat button
- Animated chat interface
- Context-aware responses
- Suggested questions
- Typing indicators

### Dashboard
- Stats grid (skills learned, progress, streak)
- Recommended career paths with match scores
- Quick action cards

### Resume Analyzer
- File upload interface
- Animated ATS score gauge (SVG-based)
- Strengths and improvement suggestions
- Missing keywords display

### Roadmap
- Timeline-style module cards
- Expandable resource lists
- Progress tracking per module
- Week-based navigation

### Company Explorer
- Filterable company cards
- Hiring status indicators
- Package and trend information
- Location display

### Skill Benchmarking
- Custom gauge meters
- Peer comparison charts
- Skill level indicators
- Progress bars

## 🎯 Customization

### Colors
Edit `tailwind.config.ts` to customize the neon color palette:

```typescript
neon: {
  blue: "#00d4ff",
  purple: "#a855f7",
  pink: "#ec4899",
  green: "#10b981",
}
```

### Animations
Modify animation durations in `tailwind.config.ts`:

```typescript
animation: {
  float: "float 3s ease-in-out infinite",
  glow: "glow 2s ease-in-out infinite",
}
```

## 🔮 Future Enhancements

- [ ] Connect AI chatbot to real LLM API (OpenAI/Gemini)
- [ ] Add 3D radar chart for skill visualization
- [ ] Implement actual resume parsing
- [ ] Add user authentication
- [ ] Connect to backend API
- [ ] Add more interactive 3D elements
- [ ] Implement adaptive learning feedback
- [ ] Add notification system

## 📝 Notes

- The project uses `--legacy-peer-deps` due to React 19 compatibility with some packages
- 3D components require WebGL support in the browser
- Mock data is used for demonstrations (replace with real API calls)
- AI chatbot uses rule-based responses (integrate with LLM for production)

## 🤝 Contributing

This is a production-ready template. Feel free to customize and extend it for your needs!

## 📄 License

MIT License - feel free to use this project for your own purposes.

---

Built with ❤️ using Next.js, Three.js, and Framer Motion
>>>>>>> ff19ecfedec9c3595135ab143c7a0aa74f481975
