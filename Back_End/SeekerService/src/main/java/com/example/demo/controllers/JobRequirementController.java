package com.example.demo.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.JobRequirementDTO;
import com.example.demo.entities.JobRequirement;
import com.example.demo.services.JobRequirementService;

@RestController
@RequestMapping("/jobs")
@CrossOrigin(origins = "http://localhost:5173") 
public class JobRequirementController {

	@Autowired
	JobRequirementService jservice;
	@GetMapping("/getAllJobs")
	@CrossOrigin(origins = "http://localhost:5174")
	public List<JobRequirementDTO> getJobs(){
		return jservice.getAllJobs();
		
	}
	@GetMapping("/getJob/{reqid}")
	public Optional<JobRequirementDTO> getJobById(@PathVariable int  reqid){
		return jservice.getJobById(reqid);
		
	}
	@GetMapping("/search")
	public ResponseEntity<List<JobRequirement>> searchJobs(@RequestParam String keyword) {
	    return ResponseEntity.ok(jservice.searchJobs(keyword));
	}

	
}
