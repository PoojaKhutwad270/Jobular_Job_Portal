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
		
		 return Optional.ofNullable(sRepo.findByUserUid(uid));
	}
	public JobSeeker saveSeeker(int uid, JobSeeker seeker) {
	    User user = urepo.findById(uid)
	        .orElseThrow(() -> new RuntimeException("User not found with id: " + uid));

	    JobSeeker existing = sRepo.findByUserUid(uid); 

	    if (existing != null) {
	        existing.setSchoolNameSSC(seeker.getSchoolNameSSC());
	        existing.setMarksSSC(seeker.getMarksSSC());
	        existing.setSchoolNameHSC(seeker.getSchoolNameHSC());
	        existing.setMarksHSC(seeker.getMarksHSC());
	        existing.setGraduationDegree(seeker.getGraduationDegree());
	        existing.setUniversity(seeker.getUniversity());
	        existing.setGraduationMarks(seeker.getGraduationMarks());
	        existing.setPassout_year(seeker.getPassout_year());
	        existing.setExperience(seeker.getExperience());
	        existing.setDob(seeker.getDob());
	        existing.setGender(seeker.getGender());
	        existing.setResume(seeker.getResume());
	        return sRepo.save(existing);
	    }

	  
	    seeker.setUser(user);
	    return sRepo.save(seeker);
	}


}
