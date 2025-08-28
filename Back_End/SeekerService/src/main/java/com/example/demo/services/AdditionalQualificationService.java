package com.example.demo.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entities.AdditionalQualification;
import com.example.demo.entities.JobSeeker;
import com.example.demo.repositories.AdditionalQualificationRepository;
import com.example.demo.repositories.SeekerRepository;

@Service
public class AdditionalQualificationService {
	@Autowired
	AdditionalQualificationRepository qrepo;
	@Autowired
	SeekerRepository seekerrepo;

	 public AdditionalQualification addQualification(int seekerId, AdditionalQualification qualification) {
	        JobSeeker seeker = seekerrepo.findById(seekerId)
	            .orElseThrow(() -> new RuntimeException("JobSeeker not found with id: " + seekerId));

	        qualification.setSeeker(seeker);
	        return qrepo.save(qualification);
	    }

	 public List<AdditionalQualification> getQualificationsBySeeker(int seekerId) {
		    return qrepo.findBySeekerSid(seekerId);
		}

}

