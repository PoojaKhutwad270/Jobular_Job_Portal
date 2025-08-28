package com.example.demo.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.demo.entities.JobRequirement;

@Repository
public interface JobRequirementRepository extends JpaRepository<JobRequirement, Integer> {
	  @Query("SELECT j FROM JobRequirement j WHERE " +
	           "LOWER(j.jobTitle) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
	           "OR LOWER(j.company.companyName) LIKE LOWER(CONCAT('%', :keyword, '%'))")
	    List<JobRequirement> searchJobs(@Param("keyword") String keyword);

	 

	//List<JobRequirement> findByCompanyId(int companyId);


}
