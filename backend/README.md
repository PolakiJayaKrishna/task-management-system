# Task Management System - Backend API

A scalable REST API with JWT authentication and role-based access control built with Spring Boot.

## 🚀 Features

- **User Authentication**: JWT-based authentication with access and refresh tokens
- **Role-Based Access Control**: USER and ADMIN roles with different permissions
- **CRUD Operations**: Complete task management with create, read, update, delete
- **Input Validation**: Comprehensive validation with detailed error messages
- **API Documentation**: Swagger/OpenAPI 3.0 interactive documentation
- **Database Support**: H2 (development) and MySQL (production)
- **Error Handling**: Centralized exception handling with standardized error responses
- **Security**: Password hashing with BCrypt, JWT token validation
- **Pagination**: Support for paginated task listing
- **Data Loader**: Auto-populated demo data for testing

## 🛠️ Technology Stack

- **Framework**: Spring Boot 3.2.0
- **Language**: Java 17
- **Build Tool**: Maven
- **Database**: 
  - H2 (In-memory, Development)
  - MySQL (Production)
- **Security**: Spring Security + JWT
- **Documentation**: SpringDoc OpenAPI (Swagger)
- **Validation**: Jakarta Validation
- **ORM**: Spring Data JPA / Hibernate

## 📋 Prerequisites

Before running this application, ensure you have:

- Java 17 or higher installed
- Maven 3.6+ installed
- MySQL 8.0+ (for production mode)
- Git (for cloning the repository)

## 🔧 Installation & Setup

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd TaskManagementSystem/backend
```

### 2. Configure Database (For Production)

For development, the application uses H2 in-memory database by default. For production with MySQL:

1. Create a MySQL database:
```sql
CREATE DATABASE taskmanagement_db;
```

2. Update `src/main/resources/application-prod.yml`:
```yaml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/taskmanagement_db
    username: your_mysql_username
    password: your_mysql_password
```

### 3. Build the Project

```bash
mvn clean install
```

### 4. Run the Application

**Development mode (H2 database)**:
```bash
mvn spring-boot:run
```

**Production mode (MySQL database)**:
```bash
mvn spring-boot:run -Dspring-boot.run.profiles=prod
```

Or run the JAR file:
```bash
java -jar target/task-management-1.0.0.jar
```

The API will be available at: `http://localhost:8080`

## 📚 API Documentation

Once the application is running, access the interactive API documentation:

- **Swagger UI**: http://localhost:8080/swagger-ui.html
- **API Docs (JSON)**: http://localhost:8080/api-docs

## 🔐 Demo Credentials

The application comes with pre-loaded demo users:

### Admin User
- **Email**: `admin@example.com`
- **Password**: `Admin@123`
- **Role**: ADMIN
- **Permissions**: Full access (view all tasks, delete tasks)

### Regular Users
- **Email**: `user@example.com`
- **Password**: `User@123`
- **Role**: USER

- **Email**: `user2@example.com`
- **Password**: `User@123`
- **Role**: USER

## 📖 API Endpoints

### Authentication APIs

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/v1/auth/register` | Register new user | No |
| POST | `/api/v1/auth/login` | Login and get JWT token | No |

### Task Management APIs

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/v1/tasks` | Create a new task | Yes |
| GET | `/api/v1/tasks` | Get all tasks (paginated) | Yes |
| GET | `/api/v1/tasks/{id}` | Get task by ID | Yes |
| PUT | `/api/v1/tasks/{id}` | Update task | Yes (Owner/Admin) |
| DELETE | `/api/v1/tasks/{id}` | Delete task | Yes (Admin only) |
| GET | `/api/v1/tasks/my-tasks` | Get current user's tasks | Yes |

## 🔑 Authentication Flow

1. **Register** a new user via `/api/v1/auth/register`:
```json
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "SecurePass@123"
}
```

2. **Login** via `/api/v1/auth/login`:
```json
{
  "email": "john@example.com",
  "password": "SecurePass@123"
}
```

3. **Response** includes JWT token:
```json
{
  "token": "eyJhbGciOiJIUzUxMiJ9...",
  "refreshToken": "eyJhbGciOiJIUzUxMiJ9...",
  "type": "Bearer",
  "id": 1,
  "username": "john_doe",
  "email": "john@example.com",
  "role": "USER"
}
```

4. **Use the token** in subsequent requests:
```
Authorization: Bearer <your-jwt-token>
```

## 📝 Example API Requests

### Create a Task

```bash
curl -X POST http://localhost:8080/api/v1/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <your-jwt-token>" \
  -d '{
    "title": "Complete Project Documentation",
    "description": "Write comprehensive README and API docs",
    "status": "TODO",
    "priority": "HIGH"
  }'
```

### Get All Tasks

```bash
curl -X GET "http://localhost:8080/api/v1/tasks?page=0&size=10&sortBy=createdAt" \
  -H "Authorization: Bearer <your-jwt-token>"
```

### Update a Task

```bash
curl -X PUT http://localhost:8080/api/v1/tasks/1 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <your-jwt-token>" \
  -d '{
    "title": "Complete Project Documentation",
    "description": "Write comprehensive README and API docs",
    "status": "IN_PROGRESS",
    "priority": "HIGH"
  }'
```

## 🗄️ Database Schema

### Users Table
| Field | Type | Description |
|-------|------|-------------|
| id | BIGINT | Primary key |
| username | VARCHAR(50) | Unique username |
| email | VARCHAR(100) | Unique email |
| password | VARCHAR(255) | BCrypt hashed password |
| role | VARCHAR(20) | USER or ADMIN |
| active | BOOLEAN | Account status |
| created_at | TIMESTAMP | Creation timestamp |
| updated_at | TIMESTAMP | Last update timestamp |

### Tasks Table
| Field | Type | Description |
|-------|------|-------------|
| id | BIGINT | Primary key |
| title | VARCHAR(200) | Task title |
| description | TEXT | Task description |
| status | VARCHAR(20) | TODO, IN_PROGRESS, DONE |
| priority | VARCHAR(20) | LOW, MEDIUM, HIGH |
| assigned_to_id | BIGINT | Foreign key to users |
| created_by_id | BIGINT | Foreign key to users |
| created_at | TIMESTAMP | Creation timestamp |
| updated_at | TIMESTAMP | Last update timestamp |

## 🔒 Security Features

- **Password Hashing**: BCrypt with salt
- **JWT Authentication**: Stateless authentication with tokens
- **Token Expiration**: Access tokens expire in 24 hours, refresh tokens in 7 days
- **CORS Configuration**: Configured for frontend integration
- **Input Validation**: All inputs validated with Jakarta Validation
- **SQL Injection Prevention**: JPA/Hibernate parameterized queries
- **Role-Based Authorization**: Method-level security based on user roles

## 🌐 H2 Database Console (Development Only)

When running in development mode, you can access the H2 database console:

- URL: http://localhost:8080/h2-console
- JDBC URL: `jdbc:h2:mem:taskdb`
- Username: `sa`
- Password: (leave empty)

## ⚙️ Configuration

### Environment Variables

For production, use environment variables for sensitive data:

```bash
export JWT_SECRET=your-very-secure-secret-key-here
export JWT_EXPIRATION=86400000
export MYSQL_USERNAME=your_mysql_username
export MYSQL_PASSWORD=your_mysql_password
```

### Application Profiles

- **default** (development): Uses H2 in-memory database
- **prod** (production): Uses MySQL database

Switch profiles using:
```bash
java -jar task-management-1.0.0.jar --spring.profiles.active=prod
```

## 🧪 Testing

Run unit tests:
```bash
mvn test
```

Run with coverage:
```bash
mvn clean test jacoco:report
```

## 📦 Building for Production

1. Build the JAR file:
```bash
mvn clean package -DskipTests
```

2. Run the JAR:
```bash
java -jar target/task-management-1.0.0.jar --spring.profiles.active=prod
```

## 🐛 Troubleshooting

### Common Issues

1. **Port 8080 already in use**:
   - Change port in `application.yml`: `server.port=8081`

2. **MySQL connection refused**:
   - Ensure MySQL is running
   - Verify credentials in `application-prod.yml`
   - Check if database exists

3. **JWT token invalid**:
   - Token may have expired (24 hours)
   - Ensure correct Authorization header format: `Bearer <token>`

## 📄 License

This project is created for educational purposes as part of a backend developer internship assignment.

## 👤 Author

**Jaya Krishna** - polakijayakrishna@gmail.com

*Note: This project was developed with assistance from AI tools (ChatGPT/Gemini) for generating boilerplate code, documentation, and best practices.*

## 🔗 Additional Resources

- [Spring Boot Documentation](https://spring.io/projects/spring-boot)
- [Spring Security Documentation](https://spring.io/projects/spring-security)
- [JWT Introduction](https://jwt.io/introduction)
- [Swagger/OpenAPI Specification](https://swagger.io/specification/)
