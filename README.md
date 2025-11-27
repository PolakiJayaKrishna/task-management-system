# Task Management System

A full-stack task management application built with Spring Boot and React. This project implements JWT authentication, role-based access control, and provides a clean interface for managing tasks.

> **Assignment Project**: Backend Developer Intern Assignment

## Features

### Backend
- User authentication with JWT tokens
- Role-based access (USER and ADMIN)
- Full CRUD operations for tasks
- Input validation and error handling
- API documentation with Swagger
- Support for both H2 (development) and MySQL (production)
- Password encryption with BCrypt

### Frontend
- React-based user interface
- Responsive design that works on different screen sizes
- Real-time form validation
- Dark theme with smooth transitions
- Secure token management

## 🛠️ Technology Stack

### Backend
- Spring Boot 3.2.0
- Java 17
- Spring Security + JWT
- Spring Data JPA / Hibernate
- MySQL / H2 Database
- Swagger/OpenAPI
- Maven

### Frontend
- React 18
- Vite
- React Router
- Axios
- TailwindCSS
- PostCSS

## 🚀 Quick Start

### Prerequisites
- Java 17+
- Maven 3.6+
- Node.js 16+
- MySQL 8.0+ (for production)

### 1. Clone the Repository

```bash
git clone https://github.com/PolakiJayaKrishna/task-management-system.git
cd task-management-system
```

### 2. Start Backend

```bash
cd backend
mvn spring-boot:run
```

Backend will run on: `http://localhost:8080`

**API Documentation**: http://localhost:8080/swagger-ui.html

### 3. Start Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend will run on: `http://localhost:3000`

## 👤 Demo Credentials

### Admin Account
- **Email**: `admin@example.com`
- **Password**: `Admin@123`
- **Permissions**: Full access (view all tasks, delete tasks)

### Regular User Accounts
- **Email**: `user@example.com` or `user2@example.com`
- **Password**: `User@123`
- **Permissions**: Create, view, and edit own tasks

## 📁 Project Structure

```
TaskManagementSystem/
├── backend/                    # Spring Boot backend
│   ├── src/main/java/
│   │   └── com/example/taskmanagement/
│   │       ├── config/        # Security, Swagger configs
│   │       ├── controller/    # REST endpoints
│   │       ├── dto/           # Data Transfer Objects
│   │       ├── entity/        # JPA entities
│   │       ├── exception/     # Custom exceptions
│   │       ├── repository/    # Data repositories
│   │       ├── security/      # JWT utilities
│   │       └── service/       # Business logic
│   ├── pom.xml
│   └── README.md
│
├── frontend/                   # React frontend
│   ├── src/
│   │   ├── components/        # Reusable components
│   │   ├── context/          # Global state
│   │   ├── pages/            # Page components
│   │   └── services/         # API services
│   ├── package.json
│   └── README.md
│
└── README.md                   # This file
```

## 🔐 API Endpoints

### Authentication
- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/login` - Login and get JWT

### Tasks
- `GET /api/v1/tasks` - Get all tasks (paginated)
- `GET /api/v1/tasks/{id}` - Get task by ID
- `POST /api/v1/tasks` - Create new task
- `PUT /api/v1/tasks/{id}` - Update task
- `DELETE /api/v1/tasks/{id}` - Delete task (admin only)
- `GET /api/v1/tasks/my-tasks` - Get current user's tasks

## 📊 Database Schema

### Users Table
- id, username, email, password (hashed), role, active, timestamps

### Tasks Table
- id, title, description, status, priority, assigned_to_id, created_by_id, timestamps

**Status**: TODO, IN_PROGRESS, DONE  
**Priority**: LOW, MEDIUM, HIGH  
**Roles**: USER, ADMIN

## 🎨 UI Screenshots & Features

### Login & Registration
- Beautiful glassmorphism cards
- Form validation
- Demo credentials display

### Dashboard
-Welcome message with user name
- Task statistics (Total, ToDo, In Progress, Done)
- Quick action buttons
- Recent tasks preview

### Task Management
- Grid view of tasks
- Filter by status
- Create/Edit modal with validation
- Role-based edit/delete buttons
- Status and priority badges

## 🔒 Security Features

- **Password Hashing**: BCrypt algorithm
- **JWT Tokens**: HTTP-only, 24-hour expiration
- **CORS Configuration**: Configured for frontend
- **Input Validation**: Both client and server-side
- **SQL Injection Prevention**: JPA parameterized queries
- **Role-Based Authorization**: Method-level security

## 📈 Scalability Notes

See `SCALABILITY.md` for detailed scaling strategies including:
- Microservices architecture
- Caching with Redis
- Load balancing
- Database optimization
- Message queues
- CDN for frontend
- Monitoring and logging

## 🧪 Testing

### Backend
```bash
cd backend
mvn test
```

### Frontend
```bash
cd frontend
npm run lint
npm run build  # Test production build
```

## 🐛 Troubleshooting

### Backend Issues
1. **Port 8080 in use**: Change in `application.yml`
2. **MySQL connection failed**: Check credentials, ensure MySQL is running
3. **JWT errors**: Token may have expired, login again

### Frontend Issues
1. **API connection failed**: Ensure backend is running on port 8080
2. **Build errors**: Delete `node_modules`, run `npm install`
3. **CORS errors**: Check backend CORS configuration

## 📝 Assignment Deliverables Checklist

- ✅ **Backend REST API** with authentication
- ✅ **Role-based access control** (USER, ADMIN)
- ✅ **CRUD operations** on tasks
- ✅ **JWT token handling** with hashing & validation
- ✅ **API documentation** (Swagger)
- ✅ **Frontend UI** connecting to APIs
- ✅ **Error handling** with appropriate status codes
- ✅ **Input validation** & sanitization
- ✅ **Scalability notes** document
- ✅ **Professional README**
- ✅ **Code organization** & modularity
- ✅ **Security best practices**

## 🌟 Highlights

- **Clean Architecture**: Separation of concerns with layered architecture
- **Modern Stack**: Latest versions of Spring Boot 3 and React 18
- **Premium UI**: Glassmorphism design with smooth animations
- **Production-Ready**: MySQL support, environment variables, error handling
- **Well-Documented**: Comprehensive READMEs and Swagger docs
- **Secure**: Industry-standard security practices

## 📄 License

This project was created for educational purposes as part of a backend developer internship assignment.

## � Author

**Jaya Krishna** - polakijayakrishna@gmail.com

*Note: This project was developed with assistance from AI tools (ChatGPT/Gemini) for generating boilerplate code, documentation, and best practices.*

---

## 🤝 Acknowledgments

- Built with guidance from AI assistants (ChatGPT/Gemini) for code structure and best practices
- Assignment requirements provided by the internship program
- Various online resources and documentation

---

## 📝 Notes

This project demonstrates practical knowledge of:
- RESTful API development with Spring Boot
- JWT authentication and authorization
- React frontend development  
- Database design and JPA
- API documentation
- Security implementation

**Feedback and suggestions are welcome!**
