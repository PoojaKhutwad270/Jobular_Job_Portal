package com.example.demo.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entities.JobSeeker;
import com.example.demo.repositories.UserRepository;
import com.example.demo.services.SeekerService;

@RestController
@RequestMapping("/seeker")
@CrossOrigin(origins = "http://localhost:5173")
public class SeekerController {
	@Autowired
SeekerService seekService;
	 @Autowired
	    private UserRepository userRepo;
	@GetMapping("/getSeeker/{uid}")
	public Optional<JobSeeker> getSeekerByUser(@PathVariable int uid) {
	    return seekService.findBySeekerBYId(uid);
	}
	@PostMapping("/save/{uid}")
	public JobSeeker saveSeekerByUser(@PathVariable int uid, @RequestBody JobSeeker seeker) {
	    return seekService.saveSeeker(uid,seeker);
	}

}
