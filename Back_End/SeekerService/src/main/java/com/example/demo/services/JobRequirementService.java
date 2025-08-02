package com.example.demo.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.dto.JobRequirementDTO;
import com.example.demo.entities.JobRequirement;
import com.example.demo.repositories.JobRequirementRepository;

@Service
public class JobRequirementService {

	@Autowired
	private JobRequirementRepository jrepo;
	
	public  List<JobRequirementDTO> getAllJobs(){
		List<JobRequirement> jobList = jrepo.findAll();  
		List<JobRequirementDTO> jobdtOList = new ArrayList<>();
		for(JobRequirement job :jobList) {
			jobdtOList.add(new JobRequirementDTO(job));
			
		}
		return jobdtOList;
	}
	 // Get jobs by company ID
//    public List<JobRequirementDTO> getJobsByCompanyId(int companyId) {
//    	 List<JobRequirement> jobs = jrepo.findByCompanyId(companyId);
//        List<JobRequirementDTO> jobDTOs = new ArrayList<>();
//
//        for (JobRequirement job : jobs) {
//            jobDTOs.add(new JobRequirementDTO(job));
//        }
//
//        return jobDTOs;
//    }
	
}
