package com.teamBangan.demo.controller;

import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/ecotrack")
@CrossOrigin(origins = "*") // Useful for connecting your frontend during development
public class ecotrackController {

    /* 
       Note: You will eventually need to @Autowired your Service or Repository here.
       Example:
       @Autowired
       private EcoTrackService ecoService;
    */

    // 1. Get all tracking records
    @GetMapping("/records")
    public String getAllRecords() {
        return "List of all eco-tracking data";
    }

    // 2. Add a new tracking entry
    @PostMapping("/add")
    public String addRecord(@RequestBody Object record) {
        // Logic to save the record to your MySQL database
        return "Record added successfully!";
    }

    // 3. Update an existing record
    @PutMapping("/update/{id}")
    public String updateRecord(@PathVariable Long id, @RequestBody Object updatedData) {
        return "Record with ID " + id + " updated.";
    }

    // 4. Delete a record
    @DeleteMapping("/delete/{id}")
    public String deleteRecord(@PathVariable Long id) {
        return "Record with ID " + id + " deleted.";
    }
}