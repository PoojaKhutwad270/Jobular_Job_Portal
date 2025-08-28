package com.example.demo.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entities.AdditionalQualification;
@Repository
public interface AdditionalQualificationRepository extends JpaRepository<AdditionalQualification, Integer> {
	

	List<AdditionalQualification> findBySeekerSid(int seekerId);
	

}
