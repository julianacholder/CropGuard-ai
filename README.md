# CropGuard AI - Intelligent Crop Disease Detection System

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-18.0+-blue.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-4.0+-646CFF.svg)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.0+-38B2AC.svg)](https://tailwindcss.com/)

> **Advanced AI-powered crop disease detection to protect your harvest and ensure healthy crops. Identify, diagnose, and treat plant diseases before they spread.**

## Overview

CropGuard AI is a comprehensive web application that leverages cutting-edge artificial intelligence to detect crop diseases in real-time. Using computer vision and machine learning, farmers and agricultural professionals can quickly identify plant diseases, receive AI-generated treatment recommendations, and access a comprehensive disease library.

### Key Features

- **Real-time Disease Detection** - Upload or capture images for instant AI analysis
- **AI-Powered Recommendations** - Get personalized treatment and prevention advice
- **Comprehensive Disease Library** - Browse detailed information on 100+ crop diseases
- **Analytics Dashboard** - Track farm health scores and detection history
- **Mobile-Friendly** - Responsive design for field use
- **High Accuracy** - 99.5% detection accuracy using Roboflow's PlantVillage model

## Technology Stack

### Frontend
- **React 18** - Modern UI framework
- **Vite** - Fast build tool and dev server
- **TailwindCSS** - Utility-first CSS framework
- **Shadcn/UI** - Beautiful component library
- **Lucide React** - Icon library

### AI & APIs
- **Roboflow** - Computer vision for disease detection
- **Groq** - Fast LLM inference for AI recommendations
- **PlantVillage Dataset** - Pre-trained disease detection model

### Development
- **TypeScript** - Type safety (optional)
- **ESLint** - Code linting
- **Prettier** - Code formatting

## Quick Start

### Prerequisites
- Node.js 16.0 or higher
- npm, yarn, or pnpm
- Roboflow API key
- Groq API key

### **Installation**

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/cropguard-ai.git
   cd cropguard-ai
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   # Create .env.local file in the project root
   cp .env.example .env.local
   ```

4. **Add your API keys to `.env.local`**
   ```env
   VITE_ROBOFLOW_API_KEY=your_roboflow_api_key_here
   VITE_GROQ_API_KEY=your_groq_api_key_here
   ```

5. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

6. **Open your browser**
   ```
   http://localhost:5173
   ```

##  **API Configuration**

### Getting Roboflow API Key
1. Visit [app.roboflow.com](https://app.roboflow.com)
2. Create a free account
3. Navigate to your workspace settings
4. Copy your API key from the "API" section

### Getting Groq API Key
1. Visit [console.groq.com](https://console.groq.com)
2. Sign up for a free account
3. Go to "API Keys" section
4. Generate a new API key

### Environment Variables
```env
# Required API Keys
VITE_ROBOFLOW_API_KEY=your_roboflow_key_here
VITE_GROQ_API_KEY=your_groq_key_here

# Optional Configuration
VITE_APP_TITLE=CropGuard AI
VITE_API_TIMEOUT=30000
```

## Project Structure

```
cropguard-ai/
├── public/                     # Static assets
├── src/
│   ├── components/            # Reusable UI components
│   │   ├── ui/               # Shadcn/UI components
│   │   ├── dashboard/        # Dashboard-specific components
│   │   └── detection/        # Detection page components
│   ├── pages/                # Main application pages
│   │   ├── Dashboard.jsx     # Farm overview dashboard
│   │   ├── Detection.jsx     # Disease detection interface
│   │   ├── DiseaseLibrary.jsx # Disease information library
│   │   └── History.jsx       # Detection history
│   ├── services/             # API integration services
│   │   └── EnhancedPlantAnalysis.js # Disease detection service
│   ├── assets/               # Images and static files
│   ├── utils/                # Utility functions
│   ├── App.jsx              # Main app component
│   └── main.jsx             # Application entry point
├── .env.local               # Environment variables (create this)
├── package.json            # Dependencies and scripts
├── tailwind.config.js      # TailwindCSS configuration
├── vite.config.js         # Vite configuration
└── README.md              # This file
```

## Usage Guide

### 1. Disease Detection
1. Navigate to the "Detection" page
2. Choose between camera capture or file upload
3. Select a clear image of the affected plant
4. Click "Analyze with AI"
5. Review detection results and AI recommendations

### 2. Disease Library
1. Visit the "Disease Library" page
2. Browse diseases by type (Fungal, Bacterial, Viral)
3. Filter by severity level
4. Search by disease name or affected crops
5. Click "View Full Details" for comprehensive information

### 3. Dashboard Overview
1. Monitor overall crop health score
2. Track active diseases and treatments
3. View recent detection history
4. Access weather alerts and quick actions

## How It Works

### Disease Detection Pipeline
1. **Image Upload** - User provides crop image via camera or file upload
2. **Roboflow Analysis** - Image sent to PlantVillage model for disease detection
3. **Confidence Scoring** - AI returns disease name with confidence percentage
4. **Groq Recommendations** - LLM generates personalized treatment advice
5. **Result Display** - Comprehensive results with actionable recommendations

### Supported Diseases
- **Tomato**: Early Blight, Late Blight, Leaf Mold, Septoria Leaf Spot
- **Potato**: Late Blight, Early Blight, Common Scab
- **Corn**: Northern Leaf Blight, Common Rust, Gray Leaf Spot
- **Apple**: Apple Scab, Fire Blight, Cedar Apple Rust
- **And many more...**

## Development

### Available Scripts
```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run format       # Format code with Prettier

# Testing
npm run test         # Run tests
npm run test:watch   # Run tests in watch mode
npm run test:coverage # Generate coverage report
```

### Code Style
- **ESLint** configuration for React and modern JavaScript
- **Prettier** for consistent code formatting
- **Conventional Commits** for commit messages
- **Component-first** architecture

### Adding New Features
1. Create feature branch: `git checkout -b feature/new-feature`
2. Implement changes with proper testing
3. Follow existing code patterns and conventions
4. Update documentation if needed
5. Submit pull request

## Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Vercel
1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Deploy to Netlify
1. Build the project: `npm run build`
2. Upload `dist` folder to Netlify
3. Configure environment variables in Netlify dashboard

### Environment Variables for Production
```env
VITE_ROBOFLOW_API_KEY=your_production_roboflow_key
VITE_GROQ_API_KEY=your_production_groq_key
```

## Performance

- **Disease Detection**: 2-3 seconds average response time
- **Image Processing**: Supports JPEG, PNG, WebP formats
- **Accuracy**: 99.5% detection accuracy on PlantVillage dataset
- **Mobile Optimized**: Works on iOS and Android devices

## Contributing

We welcome contributions from the community! Here's how you can help:

### Ways to Contribute
- Report bugs and issues
- Suggest new features
- Improve documentation
- Add test coverage
- Translate to other languages

### Development Setup
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass
6. Submit a pull request

### Commit Guidelines
```bash
feat: add new disease detection feature
fix: resolve camera capture issue
docs: update installation instructions
style: format code with prettier
test: add unit tests for disease service
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- **PlantVillage** - For the comprehensive plant disease dataset
- **Roboflow** - For the computer vision platform and APIs
- **Groq** - For fast LLM inference capabilities
- **Shadcn/UI** - For the beautiful component library
- **TailwindCSS** - For the utility-first CSS framework

## Support

- **Email**: support@cropguard-ai.com
- **Issues**: [GitHub Issues](https://github.com/yourusername/cropguard-ai/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/cropguard-ai/discussions)
- **Documentation**: [Project Wiki](https://github.com/yourusername/cropguard-ai/wiki)

## Roadmap

### Version 2.0 (Q2 2024)
- [ ] Multi-language support
- [ ] Offline detection capabilities
- [ ] Advanced analytics and reporting
- [ ] Integration with farm management systems

### Version 2.1 (Q3 2024)
- [ ] GPS location tracking for detections
- [ ] Weather integration for risk assessment
- [ ] Collaborative farmer network features
- [ ] Mobile app for iOS and Android

### Future Enhancements
- [ ] Drone integration for large-scale monitoring
- [ ] IoT sensor data integration
- [ ] Machine learning model training interface
- [ ] API for third-party integrations

---

**Made with ❤️ for farmers and agricultural professionals worldwide**

*Protecting crops, one detection at a time.*
