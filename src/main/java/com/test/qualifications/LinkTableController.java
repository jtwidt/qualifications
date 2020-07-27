package com.test.qualifications;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("task-complete")
public class LinkTableController {

    @Autowired
    private LinkTableRepository linkTableRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TaskRepository taskRepository;

    // CREATE
    @PostMapping("")
    public LinkTable createLinkTable(@RequestBody LinkTable linkTable) {
        Optional<User> user = userRepository.findById(linkTable.getUser().getId());
        Optional<Task> task = taskRepository.findById(linkTable.getTask().getId());
        if (task.isPresent() && user.isPresent()) {
            return linkTableRepository.save(linkTable);
        } else {
            return null;
        }
    }

    // READ
    @GetMapping("{id}")
    public LinkTable getTableById(@PathVariable Long id) {
        Optional<LinkTable> table =  linkTableRepository.findById(id);
        return table.orElse(null);
    }

    // UPDATE
    @PatchMapping("/{id}")
    public LinkTable updateTable(@PathVariable Long id, @RequestBody LinkTable table) {
        Optional<LinkTable> oldTable = linkTableRepository.findById(id);
        if (oldTable.isPresent()) {
            // User
            if (table.getUser() != null) {
                Optional<User> user = userRepository.findById(table.getUser().getId());
                user.ifPresent(user1 -> oldTable.get().setUser(user1));
            }

            // Task
            if (table.getTask() != null) {
                Optional<Task> task = taskRepository.findById(table.getTask().getId());
                task.ifPresent(task1 -> oldTable.get().setTask(task1));
            }

            // Completion Date
            if (table.getCompletionDate() != null) {
                oldTable.get().setCompletionDate(table.getCompletionDate());
            }
            return linkTableRepository.save(oldTable.get());
        } else {
            return null;
        }
    }

    // DELETE
    @DeleteMapping("{id}")
    public Map<String, Long> deleteTable(@PathVariable Long id) {
        Optional<LinkTable> table = linkTableRepository.findById(id);
        table.ifPresent(linkTableRepository::delete);
        Map<String, Long> count = new HashMap<>();
        count.put("count", linkTableRepository.count());
        return count;
    }

    // LIST
    @GetMapping("")
    public Iterable<LinkTable> getAll() {
        return linkTableRepository.findAll();
    }
}
