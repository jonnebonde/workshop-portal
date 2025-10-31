# Lumera Workshop Management System

A comprehensive workshop management system built for glass repair and replacement services. This application provides a complete solution for managing insurance claims, tracking repair progress, and handling customer communications.

## 🚀 Features

### Case Management
- **Multi-stage workflow**: Draft → In Progress → Finished
- **Comprehensive case tracking** with license plate search
- **Digital Damage Form (DDF)** management with metadata extraction
- **Image management** with upload requirements and validation
- **Parts & Labor** tracking with automatic calculations
- **Invoice management** with OCR processing and review workflow
- **Calibration tracking** with digital signatures

### Dashboard & Analytics
- **Real-time KPI monitoring** across different case stages
- **Advanced filtering and search** capabilities
- **Progress tracking** with completion indicators
- **Stage-specific views** for better workflow management

### Communication
- **Integrated chat system** for case-specific communications
- **File attachments** and document sharing
- **Real-time notifications** for status updates

### Insurance Integration
- **Insurance coverage verification**
- **Multi-company support** (Gjensidige, If, Tryg, Fremtind, etc.)
- **Automated claim processing** workflows

## 🛠 Technology Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Routing**: React Router DOM
- **UI Components**: Headless UI
- **Build Tool**: Vite
- **Deployment**: Netlify

## 📋 Prerequisites

Before running this project, make sure you have the following installed:

- **Node.js** (version 16 or higher)
- **npm** (comes with Node.js)

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone <repository-url>
cd workshop-management-system
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start the development server
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### 4. Build for production
```bash
npm run build
```

### 5. Preview production build
```bash
npm run preview
```

## 📁 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── common/          # Shared components
│   └── sections/        # Page-specific sections
├── context/             # React context providers
├── data/                # Mock data and data management
├── hooks/               # Custom React hooks
├── pages/               # Main application pages
├── utils/               # Utility functions
└── styles/              # Global styles and CSS
```

## 🎯 Key Components

### Case Management
- **Dashboard**: Overview of all cases with filtering and search
- **Case Detail**: Comprehensive case management interface
- **New Case**: Case creation workflow

### Core Sections
- **DDF Management**: Digital damage form handling
- **Image Section**: Photo upload and management
- **Parts & Labor**: Cost calculation and tracking
- **Invoice Section**: Invoice processing and review
- **Calibration**: Equipment calibration tracking
- **Communication**: Chat and messaging system

## 🔧 Configuration

The application uses mock data for demonstration purposes. In a production environment, you would:

1. Replace mock data with actual API endpoints
2. Configure authentication providers
3. Set up database connections
4. Configure file upload services

## 🎨 Design System

The application follows a consistent design system with:

- **Color Palette**: Professional blue theme with status-based colors
- **Typography**: Inter font family for optimal readability
- **Spacing**: 8px grid system for consistent layouts
- **Components**: Reusable, accessible UI components

## 📱 Responsive Design

The application is fully responsive and optimized for:
- **Desktop**: Full-featured interface with sidebar navigation
- **Tablet**: Adapted layouts with collapsible sections
- **Mobile**: Touch-optimized interface with mobile-first design

## 🚀 Deployment

The application is configured for easy deployment to Netlify:

1. Build the project: `npm run build`
2. Deploy the `dist` folder to your hosting provider
3. Configure redirects for single-page application routing

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit your changes: `git commit -am 'Add new feature'`
4. Push to the branch: `git push origin feature/new-feature`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation for common solutions

## 🔮 Future Enhancements

- Real-time notifications
- Advanced reporting and analytics
- Mobile application
- API integrations with insurance providers
- Automated workflow triggers
- Multi-language support

---

Built with ❤️ for the automotive glass repair industry