# 🧭 Exam Compass - AI-Powered Exam Preparation Platform

An intelligent, personalized exam preparation platform designed for aspirants of Indian competitive exams (JEE Mains, NEET, CLAT, UPSC, UCEED, NDA). Exam Compass combines AI-driven learning with real-time progress tracking, community engagement, and adaptive scheduling to help students achieve their goals.

## ✨ Key Features

### 📚 Comprehensive Dashboard
- **Exam Discovery**: Browse and filter major Indian competitive exams
- **Exam Deep-Dive**: Detailed exam-specific information including:
  - Official syllabus breakdown by subject
  - Top colleges achievable with exam scores
  - Career outcomes and opportunities
  - Critical timeline with color-coded status (Upcoming, Ongoing, Completed)
  - Days remaining counters for registration, admit cards, and results

### 📝 Question Bank & Mock Tests
- **Past Paper Vault**: Access to year-wise past papers (2020-2025)
- **High-Fidelity Exam Simulations**: 
  - 30-question practice tests with real-time timer
  - Subject and topic filtering
  - Answer locking mechanism
  - Performance analytics and benchmarking against peers
  - Mock test history saved locally

### 🎯 Personalized Learning
- **AI-Powered Study Recommendations**: Intelligent course suggestions based on performance
- **Adaptive Schedule**: Dynamic study plans that adjust to your pace and progress
- **Pomodoro Timer**: Built-in productivity timer for focused study sessions
- **Digital Portfolio**: Track and showcase your learning journey with:
  - Study session logs
  - Achievement milestones
  - Study streak tracking
  - Community engagement metrics

### 🤖 AI Tutor
- **Gemini AI Integration**: Real-time assistance and explanations
- **Interactive Q&A**: Ask questions and get instant, detailed responses
- **Context-Aware Responses**: AI understands exam context and difficulty levels

### 👥 Community Features
- **Community Feed**: Engage with other aspirants
- **Achievement Wall**: Share milestones and study progress
- **Study Group Collaboration**: Connect with peers preparing for the same exams
- **Discussion Forum**: Ask questions and share knowledge

### 🛡️ Security & Privacy
- **Secure Authentication**: Sign-up and login with OTP verification
- **Data Privacy**: Comprehensive privacy policy and security measures
- **Session Management**: Automatic session expiration for security

## 🏗️ Project Structure

```
exam-compass/
├── pages/                          # React page components
│   ├── LandingPage.tsx            # Homepage with exam browsing
│   ├── Dashboard.tsx               # Exam-specific dashboard
│   ├── QuestionBank.tsx            # Past papers and mock tests
│   ├── MockTests.tsx               # Mock test management
│   ├── DigitalPortfolio.tsx        # Achievement wall and portfolio
│   ├── Community.tsx               # Community feed
│   ├── AIChat.tsx                  # AI tutor interface
│   ├── PersonalizedSchedule.tsx    # Adaptive study schedule
│   ├── StudyRecommendations.tsx    # AI-powered course suggestions
│   ├── Pomodoro.tsx                # Focus timer
│   ├── Profile.tsx                 # User profile management
│   ├── Auth.tsx                    # Authentication (Sign-up/Login)
│   ├── About.tsx                   # About page
│   ├── Privacy.tsx                 # Privacy policy
│   ├── Security.tsx                # Security information
│   └── Support.tsx                 # Support & help
├── services/
│   └── geminiService.ts            # Gemini AI integration
├── App.tsx                         # Main app component & routing
├── index.tsx                       # React entry point
├── constants.ts                    # Application constants
├── types.ts                        # TypeScript type definitions
├── vite.config.ts                  # Vite configuration
├── tsconfig.json                   # TypeScript configuration
└── package.json                    # Project dependencies
```

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v18 or higher)
- **npm** or **yarn** package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/exam-compass.git
   cd exam-compass
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```
   VITE_GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

This generates optimized files in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## 🛠️ Tech Stack

- **Frontend Framework**: React 19.2.3 with TypeScript 5.8
- **Build Tool**: Vite 6.2
- **Routing**: React Router DOM 7.12
- **UI Components**: Lucide React (icons)
- **Data Visualization**: Recharts 3.6
- **AI Integration**: Google Generative AI (Gemini)
- **Styling**: Tailwind CSS

## 📖 Key Functionalities

### User Authentication
- Multi-step registration form with email validation
- Password strength requirements
- OTP verification (6-digit)
- Login with email and password
- Session management with automatic expiration

### Exam Information System
- Comprehensive exam database with:
  - Difficulty levels
  - Number of applicants
  - Number of seats
  - Official descriptions
- Searchable and filterable exam listings
- Detailed exam pages with syllabus, timeline, and career outcomes

### Practice & Assessment
- High-fidelity mock tests matching actual exam patterns
- Real-time performance tracking and analytics
- Topic-wise performance analysis
- Penalty tracking for wrong answers
- Peer benchmarking

### Learning Features
- Adaptive study schedule recommendations
- AI-powered concept explanations
- Focus timer with Pomodoro technique
- Study streak tracking
- Progress visualization and analytics

### Community & Social
- Share learning achievements
- Engage with community posts
- Like, comment, and reply functionality
- Study group formation
- Aspirant testimonials

## 🔐 Security Features

- Secure password hashing and validation
- OTP-based email verification
- Session timeout protection
- HTTPS-ready architecture
- Data encryption for sensitive information

## 📱 Responsive Design

- Mobile-first approach
- Optimized for all device sizes
- Touch-friendly UI components
- Progressive enhancement for older browsers

## 🎓 Features in Detail

### Personalized Recommendations
The platform analyzes user performance across mock tests and practice sessions to recommend:
- Topics needing more focus
- Study materials aligned with learning style
- Optimal study schedule based on available time
- Target colleges matching your score predictions

### Adaptive Schedule
- Automatically adjusts based on:
  - Your completion rates
  - Performance metrics
  - Time availability
  - Exam proximity
- Real-time notifications for upcoming milestones

### AI Tutor Capabilities
- Concept clarification with examples
- Question-specific explanations
- Strategy tips for exam-specific question types
- Performance analysis and improvement suggestions


## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss proposed changes.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.


## 👥 Support

For issues, feature requests, or general inquiries:
- Visit the [Support Page](./pages/Support.tsx)
- Check our [FAQ](./pages/LandingPage.tsx)
- Read our [Privacy Policy](./pages/Privacy.tsx)
- Review [Security Information](./pages/Security.tsx)

## 🎯 Roadmap

- [ ] Mobile app (React Native)
- [ ] Video lecture integration
- [ ] Live classes and webinars
- [ ] Advanced analytics dashboard
- [ ] Gamification features
- [ ] Mentorship program
- [ ] Offline mode support

## ⚡ Performance

- Optimized bundle size with tree-shaking
- Lazy-loaded route components
- Efficient state management
- Cached API responses
- Progressive image loading

## 🙏 Acknowledgments

- Google Generative AI (Gemini) for AI capabilities
- React and Vite communities for excellent tooling
- All contributors and testers

---

**Made with ❤️ for exam aspirants worldwide**
