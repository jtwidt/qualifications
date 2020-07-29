package com.test.qualifications;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600)
@RestController
@RequestMapping("/tasks")
public class TaskController {

    @Autowired
    private TaskRepository taskRepository;

    // CREATE
    @PostMapping("")
    public Task createTask(@RequestBody Task task) {
        return taskRepository.save(task);
    }

    // READ
    @GetMapping("/{id}")
    public Task getTask(@PathVariable Long id) {
        Optional<Task> task = taskRepository.findById(id);
        return task.orElse(null);
    }

    // UPDATE
    @PatchMapping("/{id}")
    public Task updateTask(@PathVariable Long id, @RequestBody Task task) {
        Optional<Task> oldTask = taskRepository.findById(id);
        if (oldTask.isPresent()) {
            // Task name
            if (task.getTaskName() != null) {
                oldTask.get().setTaskName(task.getTaskName());
            }

            // Task description
            if (task.getDescription() != null) {
                oldTask.get().setDescription(task.getDescription());
            }

            // Valid duration
            if (task.getValidDuration() != null) {
                oldTask.get().setValidDuration(task.getValidDuration());
            }
            return taskRepository.save(oldTask.get());
        } else {
            return null;
        }
    }


    // DELETE
    @DeleteMapping("/{id}")
    public Map<String, Long> deleteTask(@PathVariable Long id) {
        Optional<Task> task = taskRepository.findById(id);
        task.ifPresent(taskRepository::delete);
        Map<String, Long> count = new HashMap<>();
        count.put("count", taskRepository.count());
        return count;
    }

    // LIST
    @GetMapping("")
    public Iterable<Task> getAll() {
        return taskRepository.findAll();
    }
}
