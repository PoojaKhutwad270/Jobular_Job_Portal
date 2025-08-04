package com.example.demo.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entities.Applications;
import com.example.demo.services.ApplicationsService;

@RestController
@RequestMapping("/applications")
@CrossOrigin(origins = "http://localhost:5173")
public class ApplicationsController {
	@Autowired
	ApplicationsService appservice;
	
	@PostMapping("/save")
	public Object insertApplication(@RequestBody Applications app) {
	    System.out.println("Received application: " + app);
	    System.out.println("Seeker ID: " + (app.getSeeker() != null ? app.getSeeker().getSid() : "null"));
	    System.out.println("Job ID: " + (app.getJob() != null ? app.getJob().getReqid() : "null"));
	    return appservice.insertOrUpdateApplication(app);
	}
	@GetMapping("getAllAppliedJobs/{sid}")
	public List<Applications> getJobs(@PathVariable int sid){
		return appservice.getAllAppliedJobs(sid);
	}

	

}
