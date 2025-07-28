package com.example.demo.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entities.JobSeeker;
import com.example.demo.entities.User;
import com.example.demo.repositories.SeekerRepository;
import com.example.demo.repositories.UserRepository;

@Service
public class SeekerService {
	@Autowired
SeekerRepository sRepo;
	@Autowired
	UserRepository urepo;
	
	public Optional<JobSeeker> findBySeekerBYId(int uid) {
		
		return sRepo.findById(uid);
	}

	public JobSeeker saveSeeker(int uid,JobSeeker seeker) {
		 User user = urepo.findById(uid)
	                .orElseThrow(() -> new RuntimeException("User not found with id: " + uid));
	        seeker.setUser(user);
		return sRepo.save(seeker);
	}

}
