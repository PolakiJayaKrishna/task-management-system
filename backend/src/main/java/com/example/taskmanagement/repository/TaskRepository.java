package com.example.taskmanagement.repository;

import com.example.taskmanagement.entity.Task;
import com.example.taskmanagement.entity.Task.Priority;
import com.example.taskmanagement.entity.Task.TaskStatus;
import com.example.taskmanagement.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
    
    Page<Task> findAll(Pageable pageable);
    
    List<Task> findByCreatedBy(User user);
    
    List<Task> findByAssignedTo(User user);
    
    List<Task> findByStatus(TaskStatus status);
    
    List<Task> findByPriority(Priority priority);
    
    Page<Task> findByCreatedBy(User user, Pageable pageable);
    
    Page<Task> findByAssignedTo(User user, Pageable pageable);
    
    Page<Task> findByStatus(TaskStatus status, Pageable pageable);
    
    Page<Task> findByPriority(Priority priority, Pageable pageable);
}
