package com.teamBangan.demo.controller;

import com.teamBangan.demo.model.ecotrackModel;
import com.teamBangan.demo.repository.ecotrackRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/ecotrack")
@CrossOrigin(origins = "*") 
public class ecotrackController {

    @Autowired
    private ecotrackRepository repository;

    // Get all eco-tracking logs
    @GetMapping("/all")
    public List<ecotrackModel> getAll() {
        return repository.findAll();
    }

    // Add a new log
    @PostMapping("/add")
    public ecotrackModel add(@RequestBody ecotrackModel data) {
        return repository.save(data);
    }
}