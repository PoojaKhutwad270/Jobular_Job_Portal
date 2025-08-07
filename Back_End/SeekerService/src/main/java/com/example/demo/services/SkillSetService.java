package com.example.demo.services;

import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entities.JobSeeker;
import com.example.demo.entities.SkillSet;
import com.example.demo.repositories.SeekerRepository;
import com.example.demo.repositories.SkillSetRepository;

@Service
public class SkillSetService {
	@Autowired
	SkillSetRepository skillrepo;
	
	public List<SkillSet> getSkills() {
		return skillrepo.findAll();
	}
	
}
