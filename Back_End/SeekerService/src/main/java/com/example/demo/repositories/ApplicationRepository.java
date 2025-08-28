package com.example.demo.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entities.Applications;
import com.example.demo.entities.JobRequirement;
import com.example.demo.entities.JobSeeker;

@Repository
public interface ApplicationRepository extends JpaRepository<Applications, Integer> {
	Applications findBySeekerAndJob(JobSeeker seeker, JobRequirement job);

	List<Applications> findBySeekerSid(int sid);

	

}
