package com.example.taskmanagement;

import com.example.taskmanagement.entity.Task;
import com.example.taskmanagement.entity.User;
import com.example.taskmanagement.repository.TaskRepository;
import com.example.taskmanagement.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Arrays;

@Component
public class DataLoader implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        // Check if data already exists
        if (userRepository.count() > 0) {
            return;
        }

        // Create Admin User
        User admin = new User();
        admin.setUsername("admin");
        admin.setEmail("admin@example.com");
        admin.setPassword(passwordEncoder.encode("Admin@123"));
        admin.setRole(User.Role.ADMIN);
        admin.setActive(true);
        userRepository.save(admin);

        // Create Regular User 1
        User user1 = new User();
        user1.setUsername("user1");
        user1.setEmail("user@example.com");
        user1.setPassword(passwordEncoder.encode("User@123"));
        user1.setRole(User.Role.USER);
        user1.setActive(true);
        userRepository.save(user1);

        // Create Regular User 2
        User user2 = new User();
        user2.setUsername("user2");
        user2.setEmail("user2@example.com");
        user2.setPassword(passwordEncoder.encode("User@123"));
        user2.setRole(User.Role.USER);
        user2.setActive(true);
        userRepository.save(user2);

        // Create Sample Tasks
        Task task1 = new Task();
        task1.setTitle("Setup Project Environment");
        task1.setDescription("Install and configure all necessary development tools and dependencies");
        task1.setStatus(Task.TaskStatus.DONE);
        task1.setPriority(Task.Priority.HIGH);
        task1.setCreatedBy(admin);
        task1.setAssignedTo(user1);
        taskRepository.save(task1);

        Task task2 = new Task();
        task2.setTitle("Implement User Authentication");
        task2.setDescription("Create JWT-based authentication system with login and registration");
        task2.setStatus(Task.TaskStatus.IN_PROGRESS);
        task2.setPriority(Task.Priority.HIGH);
        task2.setCreatedBy(admin);
        task2.setAssignedTo(user1);
        taskRepository.save(task2);

        Task task3 = new Task();
        task3.setTitle("Design Database Schema");
        task3.setDescription("Create ER diagram and design database tables for the application");
        task3.setStatus(Task.TaskStatus.DONE);
        task3.setPriority(Task.Priority.MEDIUM);
        task3.setCreatedBy(user1);
        task3.setAssignedTo(user2);
        taskRepository.save(task3);

        Task task4 = new Task();
        task4.setTitle("Write API Documentation");
        task4.setDescription("Document all REST API endpoints with examples and response formats");
        task4.setStatus(Task.TaskStatus.TODO);
        task4.setPriority(Task.Priority.MEDIUM);
        task4.setCreatedBy(user1);
        task4.setAssignedTo(user2);
        taskRepository.save(task4);

        Task task5 = new Task();
        task5.setTitle("Implement Unit Tests");
        task5.setDescription("Write comprehensive unit tests for all service and controller methods");
        task5.setStatus(Task.TaskStatus.TODO);
        task5.setPriority(Task.Priority.LOW);
        task5.setCreatedBy(user2);
        taskRepository.save(task5);

        System.out.println("=================================");
        System.out.println("Demo data loaded successfully!");
        System.out.println("=================================");
        System.out.println("Admin User:");
        System.out.println("  Email: admin@example.com");
        System.out.println("  Password: Admin@123");
        System.out.println("");
        System.out.println("Regular Users:");
        System.out.println("  Email: user@example.com");
        System.out.println("  Password: User@123");
        System.out.println("");
        System.out.println("  Email: user2@example.com");
        System.out.println("  Password: User@123");
        System.out.println("=================================");
    }
}
