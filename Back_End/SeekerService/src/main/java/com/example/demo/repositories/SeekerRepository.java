package com.example.demo.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entities.JobSeeker;
import com.example.demo.entities.SkillSet;
@Repository
public interface SeekerRepository extends JpaRepository<JobSeeker, Integer> {
	 JobSeeker findByUserUid(int uid);

	
}
