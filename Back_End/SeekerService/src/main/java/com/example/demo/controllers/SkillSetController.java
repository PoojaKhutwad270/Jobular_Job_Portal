package com.example.demo.controllers;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entities.SkillSet;
import com.example.demo.services.SkillSetService;

@RestController
@RequestMapping("/skills")
@CrossOrigin(origins = "http://localhost:5173")
public class SkillSetController {
	@Autowired
	SkillSetService skillservice;
	
	@GetMapping("/all")
	public List<SkillSet> getAllSkills(){
		return skillservice.getSkills();
	}
	
	

}
