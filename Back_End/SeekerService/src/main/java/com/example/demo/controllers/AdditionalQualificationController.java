package com.example.demo.controllers;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.entities.AdditionalQualification;
import com.example.demo.services.AdditionalQualificationService;

@RestController
@RequestMapping("/additionalQualifications")
@CrossOrigin(origins = "http://localhost:5173")
public class AdditionalQualificationController {

    private final AdditionalQualificationService qservice;

    // Constructor injection is preferred
    public AdditionalQualificationController(AdditionalQualificationService qservice) {
        this.qservice = qservice;
    }

    @PostMapping("/seeker/{seekerId}")
    public ResponseEntity<AdditionalQualification> addQualification(
            @PathVariable int seekerId,
            @RequestBody AdditionalQualification qualification) {

        AdditionalQualification savedQualification = qservice.addQualification(seekerId, qualification);
        return ResponseEntity.ok(savedQualification);
    }
    @GetMapping("/seeker/{seekerId}")
    public List<AdditionalQualification> getQualificationsBySeeker(@PathVariable int seekerId) {
        List<AdditionalQualification> qualifications = qservice.getQualificationsBySeeker(seekerId);
        return qualifications;
    }

   
}
