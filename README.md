# RailMind Prototype

An AI-powered railway traffic control and optimization system prototype built with Next.js, featuring real-time train monitoring, conflict detection, and intelligent scheduling recommendations.

## 🚂 Overview

RailMind is a comprehensive railway management system that combines real-time data processing, artificial intelligence, and modern web technologies to optimize railway operations. The system provides traffic controllers with intelligent insights, automated conflict resolution, and predictive analytics to improve efficiency, safety, and passenger satisfaction.

## ✨ Features

### 🎯 Core Functionality
- **Real-time Train Monitoring**: Live tracking of train positions, speeds, and operational status
- **AI-Powered Conflict Detection**: Automated identification of scheduling conflicts with confidence scoring
- **Intelligent Recommendations**: Multi-objective optimization suggestions for conflict resolution
- **Section Traffic Management**: Real-time monitoring of railway section utilization and capacity
- **Predictive Analytics**: Performance trends and optimization insights

### 📊 Dashboard Components
- **Live Control Center**: Real-time train status and operational metrics
- **Conflict Management**: AI-driven conflict detection and resolution recommendations
- **Simulation Environment**: What-if scenario testing without affecting live operations
- **Performance Analytics**: Historical trends and optimization metrics
- **System Health Monitoring**: Infrastructure status and connectivity monitoring

### 🔧 Technical Features
- **Responsive Design**: Optimized for both desktop and mobile interfaces
- **Real-time Updates**: Live data refresh with configurable intervals
- **Interactive Maps**: GPS-based train tracking and route visualization
- **Notification System**: Critical alerts and system notifications
- **Multi-view Support**: Desktop and mobile-optimized layouts

## 🛠️ Technology Stack

### Frontend
- **Next.js 14.2.16** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Radix UI** - Accessible component primitives
- **Lucide React** - Modern icon library
- **Recharts** - Data visualization

### Key Dependencies
- **React 18** - UI library
- **React Hook Form** - Form management
- **Zod** - Schema validation
- **Date-fns** - Date manipulation
- **Sonner** - Toast notifications
- **Next Themes** - Theme management

### Development Tools
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing
- **ESLint** - Code linting

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- pnpm (recommended) or npm

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd railmind-prototype
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   # or
   npm install
   ```

3. **Start the development server**
   ```bash
   pnpm dev
   # or
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

```bash
# Development
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run ESLint

# Package management
pnpm install      # Install dependencies
```

## 📁 Project Structure

```
railmind-prototype/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   ├── loading.tsx        # Loading component
│   └── page.tsx           # Main dashboard page
├── components/            # Reusable components
│   ├── ui/               # UI component library
│   └── theme-provider.tsx # Theme context
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions
├── public/               # Static assets
├── styles/               # Additional stylesheets
└── package.json          # Dependencies and scripts
```

## 🎮 Usage

### Main Dashboard
The RailMind Control Center provides a comprehensive view of railway operations:

1. **Live Control Tab**: Monitor active trains, their status, and real-time metrics
2. **Conflicts Tab**: View and resolve scheduling conflicts with AI recommendations
3. **Simulation Tab**: Test scenarios without affecting live operations
4. **Analytics Tab**: Review performance trends and optimization insights
5. **System Tab**: Monitor system health and configure settings

### Key Features
- **Train Search & Filtering**: Find specific trains by name, ID, or driver
- **Real-time Updates**: Automatic data refresh every 2 seconds
- **Conflict Resolution**: Accept AI recommendations or implement manual overrides
- **Performance Metrics**: Track throughput, delays, efficiency, and safety scores
- **System Monitoring**: Monitor AI engine, connectivity, and database health

## 🔧 Configuration

### System Settings
- **AI Optimization Level**: Conservative, Balanced, or Aggressive
- **Data Update Frequency**: 1, 2, or 5 seconds
- **Alert Thresholds**: Configurable warning levels
- **Auto-resolve**: Enable/disable automatic conflict resolution

### Features
- **Predictive Mode**: Enable AI predictions
- **GPS Tracking**: Real-time location monitoring
- **Weather Integration**: External weather data integration
- **Auto Backup**: Automatic system backups

## 📊 Sample Data

The prototype includes realistic mock data for:
- **4 Active Trains**: Mumbai Rajdhani, Shatabdi Express, Freight Express, Local Passenger
- **3 Conflict Scenarios**: Platform conflicts, speed restrictions, signal failures
- **Performance Metrics**: Throughput, delays, efficiency, safety scores
- **System Status**: AI engine, connectivity, database health

## 🎨 UI Components

Built with a comprehensive component library including:
- **Cards & Layouts**: Information display and organization
- **Forms & Inputs**: Data entry and configuration
- **Navigation**: Tabs, menus, and routing
- **Feedback**: Alerts, notifications, and progress indicators
- **Data Display**: Tables, charts, and metrics visualization

## 🔮 Future Enhancements

- **Real API Integration**: Connect to actual railway data sources
- **Advanced Analytics**: Machine learning models for predictive insights
- **Mobile App**: Native mobile application
- **Multi-language Support**: Internationalization
- **Advanced Simulations**: More complex scenario testing
- **Integration APIs**: Third-party system connectivity


## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [Radix UI](https://www.radix-ui.com/)
- Icons by [Lucide](https://lucide.dev/)
- Styling with [Tailwind CSS](https://tailwindcss.com/)

---

**RailMind Prototype** - Revolutionizing railway operations through AI-powered optimization and real-time monitoring.

