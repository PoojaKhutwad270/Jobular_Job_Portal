package com.example.demo.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entities.Applications;
import com.example.demo.entities.JobRequirement;
import com.example.demo.entities.JobSeeker;
import com.example.demo.repositories.ApplicationRepository;
import com.example.demo.repositories.JobRequirementRepository;
import com.example.demo.repositories.SeekerRepository;

@Service
public class ApplicationsService {

//	@Autowired
//	ApplicationRepository apprepo;
//	public Object InsertApp(Applications app) {
//		return apprepo.save(app);
//	}
	
	@Autowired
    private ApplicationRepository apprepo;

    @Autowired
    private JobRequirementRepository jobrepo;

    @Autowired
    private SeekerRepository seekerrepo;
    
   

    public Object insertOrUpdateApplication(Applications app) {
        JobSeeker seeker = seekerrepo.findById(app.getSeeker().getSid()).orElse(null);
        JobRequirement job = jobrepo.findById(app.getJob().getReqid()).orElse(null);

        if (seeker == null || job == null) {
            throw new RuntimeException("Invalid seeker or job ID");
        }

        Applications existingApp = apprepo.findBySeekerAndJob(seeker, job);

        if (existingApp != null) {
            existingApp.setStatus(app.getStatus());
            existingApp.setDate(app.getDate());
            return apprepo.save(existingApp);
        } else {
            app.setSeeker(seeker); // set full object
            app.setJob(job);       // set full object
            return apprepo.save(app);
        }
    }



    public List<Applications> getAllAppliedJobs(int sid) {
        return apprepo.findBySeekerSid(sid);
    }

}
