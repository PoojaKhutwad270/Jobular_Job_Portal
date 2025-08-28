package com.example.demo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entities.Complaint;
import com.example.demo.services.ComplaintService;

@RestController
@RequestMapping("/complaint")
@CrossOrigin(origins = "http://localhost:5173")
public class ComplaintController {
	  @Autowired
	    private ComplaintService complaintService;

	    @PostMapping("/add")
	    public String addComplaint(@RequestBody Complaint complaint) {
	        complaintService.addComplaint(complaint);
	        return "Complaint submitted successfully";
	    }
}

