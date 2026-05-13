# HireFlow - Job Search Platform

HireFlow is a full-stack job search and hiring web application built with React, TypeScript, Vite, Node.js, Express, and SQLite. It helps users browse jobs, search for jobs, filter jobs by category, view job details, save jobs, and manage job applications.

## Table of Contents
- [Project Overview](#project-overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Setup Instructions](#setup-instructions)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [Authentication Flow](#authentication-flow)
- [CRUD Operations](#crud-operations)
- [How to Run Frontend/Bankend](#how-to-run-frontendbackend)
- [Example API Requests](#example-api-requests)
- [Future Improvements](#future-improvements)

## Project Overview

HireFlow addresses the challenges of modern job searching by providing a centralized platform where job seekers can discover opportunities, save interesting listings, and manage their application process. Employers can post job listings and manage their postings through secure authentication.

The platform consists of:
- **Frontend**: React + TypeScript + Vite application with responsive design
- **Backend**: Node.js + Express REST API with SQLite database
- **Authentication**: JWT-based secure authentication with role-based access control

## Features

### For Job Seekers
- Browse and search job listings from multiple sources
- Filter jobs by category, type, location, and keywords
- View detailed job information including full descriptions
- Save jobs for later reference
- Apply to jobs directly through external links
- User authentication and profile management

### For Employers/Recruiters
- Post new job listings
- Edit and manage their own job postings
- View analytics on job applications (future feature)
- Secure authentication and authorization

### General
- Responsive design for mobile and desktop
- Loading states and error handling
- Demo data fallback when external APIs are unavailable
- RESTful API design with proper HTTP status codes
- Role-based access control (Job Seeker, Employer, Admin)

## Tech Stack

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and development server
- **CSS3** - Styling
- **React Router** - Client-side routing

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **SQLite** - Database
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing

### Development Tools
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **GitHub Actions** - CI/CD (planned)
- **gh-pages** - Deployment

## Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/HireFlow2.git
   cd HireFlow2
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   # Server Configuration
   PORT=5000
   NODE_ENV=development

   # JWT Configuration
   ACCESS_TOKEN_SECRET=your-super-secret-key-change-in-production

   # API Configuration (optional)
   VITE_API_BASE_URL=http://localhost:5000
   REMOTIVE_API_URL=https://remotive.com/api/remote-jobs

   # Database (SQLite - automatic)
   ```

4. **Initialize the database**
   The database will be automatically created on first startup:
   ```bash
   npm run dev
   ```

5. **Seed initial data (optional)**
   Run the database seed script to create sample data:
   ```bash
   npm run seed
   ```

## Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `PORT` | Server port | No | 5000 |
| `NODE_ENV` | Environment mode | No | development |
| `ACCESS_TOKEN_SECRET` | JWT secret key | Yes | (must be set) |
| `VITE_API_BASE_URL` | Base API URL for frontend | No | (empty - uses relative) |
| `REMOTIVE_API_URL` | External job API URL | No | https://remotive.com/api/remote-jobs |

## API Endpoints

### Authentication Routes
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register` | Register new user | No |
| POST | `/api/auth/login` | Login user | No |
| GET | `/api/auth/me` | Get current user profile | Yes |

### Job Routes
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/jobs` | Get all jobs (with filtering) | No |
| GET | `/api/jobs/:id` | Get job by ID | No |
| POST | `/api/jobs` | Create new job | Yes (Employer/Admin) |
| PUT | `/api/jobs/:id` | Update job | Yes (Owner/Admin/Employer) |
| DELETE | `/api/jobs/:id` | Delete job | Yes (Owner/Admin/Employer) |
| GET | `/api/jobs/my/jobs` | Get user's posted jobs | Yes |

### Query Parameters for GET `/api/jobs`
- `search`: Search term for title, company, description
- `category`: Filter by job category
- `limit`: Number of results to return (default: 40)
- `offset`: Number of results to skip (for pagination)

## Authentication Flow

1. **Registration**
   - User submits registration form with username, email, password, and optional role
   - Backend validates input, checks for existing user, hashes password
   - New user record created in database
   - JWT token generated and returned to client
   - Client stores token in localStorage or cookie

2. **Login**
   - User submits login credentials
   - Backend validates email/password combination
   - On success, JWT token generated and returned
   - Client stores token for subsequent requests

3. **Protected Routes**
   - Client includes JWT in Authorization header: `Bearer <token>`
   - Backend verifies token validity and extracts user info
   - Route-specific role checks performed if required
   - Invalid/missing tokens return 401 Unauthorized
   - Insufficient permissions return 403 Forbidden

4. **Token Expiry**
   - Tokens expire after 1 hour for security
   - Client must refresh token by re-login
   - Refresh token implementation planned for future

## CRUD Operations

### Users
- **Create**: POST `/api/auth/register` (public)
- **Read**: GET `/api/auth/me` (protected), GET `/api/users/:id` (protected/admin)
- **Update**: PUT `/api/users/:id` (protected/owner/admin)
- **Delete**: DELETE `/api/users/:id` (protected/admin)

### Jobs
- **Create**: POST `/api/jobs` (protected - Employer/Admin only)
- **Read**: GET `/api/jobs` (public), GET `/api/jobs/:id` (public)
- **Update**: PUT `/api/jobs/:id` (protected - Owner/Admin/Employer)
- **Delete**: DELETE `/api/jobs/:id` (protected - Owner/Admin/Employer)

### Saved Jobs
- **Create**: POST `/api/saved-jobs` (protected)
- **Read**: GET `/api/saved-jobs` (protected)
- **Delete**: DELETE `/api/saved-jobs/:jobId` (protected)

## How to Run Frontend/Backend

### Development Mode (Recommended)
```bash
# Start both frontend and backend concurrently
npm run dev
```
This starts:
- Backend server on http://localhost:5000
- Frontend dev server on http://localhost:5173
- Automatic proxying of /api requests to backend

### Backend Only
```bash
npm run dev:server
# or
npm run server
```
Starts backend server on http://localhost:5000

### Frontend Only
```bash
npm run dev:client
```
Starts frontend dev server on http://localhost:5173
(Requires backend running separately or VITE_API_BASE_URL set)

### Production Build
```bash
# Build frontend for production
npm run build

# Preview production build locally
npm run preview
```

### Deployment to GitHub Pages
```bash
# Build and deploy to GitHub Pages
npm run deploy
```
Note: GitHub Pages only hosts static frontend. Backend must be hosted separately.

## Example API Requests

### Register New User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "johndoe",
    "email": "john@example.com",
    "password": "securepassword123",
    "role": "job_seeker"
  }'
```

### Login User
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "securepassword123"
  }'
```

### Get All Jobs
```bash
curl -X GET http://localhost:5000/api/jobs?search=developer&category=engineering&limit=10
```

### Create Job (Employer)
```bash
curl -X POST http://localhost:5000/api/jobs \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <jwt-token>" \
  -d '{
    "title": "Senior React Developer",
    "company": "TechCorp",
    "category": "engineering",
    "jobType": "full-time",
    "location": "Remote",
    "description": "We are looking for an experienced React developer...",
    "salary": "$80k-$120k"
  }'
```

### Update Job
```bash
curl -X PUT http://localhost:5000/api/jobs/1 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <jwt-token>" \
  -d '{
    "title": "Senior React Developer (Remote)",
    "salary": "$90k-$130k"
  }'
```

## Future Improvements

### Phase 1 (Immediate)
- [ ] Add password reset functionality
- [ ] Implement email verification for new accounts
- [ ] Add resume upload and profile completion for job seekers
- [ ] Implement job application tracking system
- [ ] Add company profiles and employer dashboards

### Phase 2 (Short-term)
- [ ] Add real-time notifications using WebSockets
- [ ] Implement advanced search with faceted filtering
- [ ] Add bookmark collections and job recommendations
- [ ] Integrate with LinkedIn/GitHub for profile import
- [ ] Add analytics dashboard for employers

### Phase 3 (Long-term)
- [ ] Implement multi-language support (i18n)
- [ ] Add video interview scheduling functionality
- [ ] Implement AI-powered job matching and resume scoring
- [ ] Add employer branding and premium job listings
- [ ] Implement mobile application (React Native)

### Technical Improvements
- [ ] Migrate to PostgreSQL for better scalability
- [ ] Implement GraphQL API alongside REST
- [ ] Add comprehensive test suite (unit, integration, e2e)
- [ ] Implement caching layer with Redis
- [ ] Add rate limiting and API throttling
- [ ] Containerize with Docker and Kubernetes deployment
- [ ] Implement CI/CD pipeline with automated testing

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please make sure to follow the existing code style and add tests for new functionality.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Remotive API](https://remotive.com/) for providing job listing data
- The open-source community for various libraries and tools
- Bootcamp instructors and mentors for guidance and support