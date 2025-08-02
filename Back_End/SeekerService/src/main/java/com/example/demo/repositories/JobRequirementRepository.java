package com.example.demo.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entities.JobRequirement;

@Repository
public interface JobRequirementRepository extends JpaRepository<JobRequirement, Integer> {
	
	 
	 

	//List<JobRequirement> findByCompanyId(int companyId);


}
