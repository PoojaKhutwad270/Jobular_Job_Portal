package com.example.demo.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.JobRequirementDTO;

import com.example.demo.services.JobRequirementService;

@RestController
@RequestMapping("/jobs")
@CrossOrigin(origins = "http://localhost:5173") 
public class JobRequirementController {

	@Autowired
	JobRequirementService jservice;
	@GetMapping("/getAllJobs")
	public List<JobRequirementDTO> getJobs(){
		return jservice.getAllJobs();
		
	}
	@GetMapping("/getJob/{reqid}")
	public Optional<JobRequirementDTO> getJobById(@PathVariable int  reqid){
		return jservice.getJobById(reqid);
		
	}
	
}
