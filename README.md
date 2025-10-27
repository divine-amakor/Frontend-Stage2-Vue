# TicketFlow - Vue.js Ticket Management Application

A modern, responsive ticket management web application built with Vue.js 3, TypeScript, and Pinia. This application provides a complete solution for managing support tickets with authentication, dashboard analytics, and full CRUD operations.

## 🚀 Features

### Core Functionality
- **Landing Page** - Welcoming hero section with wavy SVG background and decorative elements
- **Authentication System** - Login/Signup with form validation and localStorage session management
- **Dashboard** - Overview with ticket statistics and quick actions
- **Ticket Management** - Complete CRUD operations (Create, Read, Update, Delete)
- **Responsive Design** - Mobile-first approach with tablet and desktop optimizations

### Technical Features
- **Vue 3 Composition API** - Modern reactive framework
- **TypeScript** - Type-safe development
- **Pinia State Management** - Centralized state for auth and tickets
- **Vue Router** - Client-side routing with navigation guards
- **Form Validation** - Real-time validation with error messages
- **Toast Notifications** - User feedback for actions
- **Protected Routes** - Authentication-based access control

## 🛠️ Technologies Used

### Frontend Framework & Tools
- **Vue.js 3.5.22** - Progressive JavaScript framework
- **TypeScript 5.9** - Static type checking
- **Vite 7.1** - Fast build tool and dev server
- **Pinia 3.0** - State management library
- **Vue Router 4.6** - Official router for Vue.js

### Development Tools
- **ESLint** - Code linting and formatting
- **Prettier** - Code formatting
- **Vitest** - Unit testing framework
- **Playwright** - End-to-end testing

## 📦 Installation & Setup

### Prerequisites
- Node.js (^20.19.0 || >=22.12.0)
- npm or yarn package manager

### Installation Steps

1. **Clone or navigate to the project directory**
   ```bash
   cd "c:\Users\Divine\Desktop\HNG\Frontend Stage2 Vue\vue-project"
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` (or the port shown in terminal)

### Build for Production

```bash
# Type-check and build
npm run build

# Preview production build
npm run preview
```

## 🎯 Usage Instructions

### Demo Authentication
The application uses simulated authentication for demonstration purposes:

**Login Credentials:**
- Email: Any valid email format (e.g., `demo@example.com`)
- Password: Any password (minimum 6 characters)

**Signup:**
- Fill in all required fields with valid data
- Password confirmation must match

### Navigation Flow
1. **Landing Page** (`/`) - Start here to explore the application
2. **Authentication** (`/auth/login` or `/auth/signup`) - Sign in or create account
3. **Dashboard** (`/dashboard`) - View ticket statistics and quick actions
4. **Ticket Management** (`/tickets`) - Manage all tickets with full CRUD operations

### Ticket Management
- **Create**: Click "Create New Ticket" button
- **View**: All tickets displayed in card format with status badges
- **Edit**: Click "Edit" button on any ticket card
- **Delete**: Click "Delete" button with confirmation dialog

## 🎨 Design System

### Layout Specifications
- **Max Width**: 1440px centered container on large screens
- **Responsive Breakpoints**: Mobile-first design with tablet/desktop adaptations
- **Hero Section**: Wavy SVG background with decorative circles
- **Card Components**: Rounded corners with subtle shadows
- **Color Scheme**: Modern blue gradient with semantic status colors

### Status Color Coding
- **Open**: Green (`#10b981`) - New tickets requiring attention
- **In Progress**: Amber (`#f59e0b`) - Tickets being worked on
- **Closed**: Gray (`#6b7280`) - Completed tickets

### Accessibility Features
- Semantic HTML structure
- Keyboard navigation support
- Focus indicators for interactive elements
- Color contrast compliance
- Screen reader friendly labels

## 🏗️ Project Structure

```
src/
├── components/          # Reusable Vue components
├── stores/             # Pinia state management
│   ├── auth.ts        # Authentication store
│   └── tickets.ts     # Ticket management store
├── views/             # Page components
│   ├── LandingView.vue    # Landing page
│   ├── LoginView.vue      # Login page
│   ├── SignupView.vue     # Signup page
│   ├── DashboardView.vue  # Dashboard
│   └── TicketsView.vue    # Ticket management
├── router/            # Vue Router configuration
│   └── index.ts       # Routes and navigation guards
├── App.vue           # Root component
└── main.ts          # Application entry point
```

## 🔒 Security Implementation

### Authentication & Authorization
- **Session Management**: localStorage with key `ticketapp_session`
- **Route Protection**: Navigation guards prevent unauthorized access
- **Auto-redirect**: Authenticated users redirected from auth pages
- **Session Persistence**: Login state maintained across browser sessions

### Data Validation
- **Client-side Validation**: Real-time form validation
- **Required Fields**: Title and status are mandatory for tickets
- **Status Validation**: Only accepts `open`, `in_progress`, `closed`
- **Input Sanitization**: Trim whitespace and validate lengths

## 🧪 Testing

### Run Unit Tests
```bash
npm run test:unit
```

### Run E2E Tests
```bash
npm run test:e2e
```

### Linting & Formatting
```bash
# Lint code
npm run lint

# Format code
npm run format
```

## 🚀 Development Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |
| `npm run test:unit` | Run unit tests with Vitest |
| `npm run test:e2e` | Run end-to-end tests with Playwright |
| `npm run lint` | Lint and fix code with ESLint |
| `npm run format` | Format code with Prettier |
| `npm run type-check` | Type-check with Vue TSC |

## 🐛 Known Issues & Limitations

1. **Mock Authentication**: Uses localStorage simulation instead of real backend
2. **Data Persistence**: Tickets reset on page refresh (no backend storage)
3. **File Uploads**: Not implemented in current version
4. **Real-time Updates**: No WebSocket implementation for live updates

## 🔮 Future Enhancements

- Backend API integration
- Real-time notifications
- File attachment support
- Advanced filtering and search
- User role management
- Ticket assignment system
- Email notifications
- Export functionality

## 📝 License

This project is created for demonstration purposes as part of the HNG Frontend Stage 2 challenge.

## 🤝 Contributing

This is a demonstration project. For improvements or suggestions, please follow standard Git workflow practices.

---

**Built with ❤️ using Vue.js 3 and TypeScript**