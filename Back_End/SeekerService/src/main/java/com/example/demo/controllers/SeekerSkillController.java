package com.example.demo.controllers;

import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entities.SeekerSkill;
import com.example.demo.services.SeekerSkillService;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class SeekerSkillController {

	@Autowired
	SeekerSkillService ssservice;
	@GetMapping("/seekerskill/{sid}")
	public Set<SeekerSkill> getSeekerSkill(@PathVariable int  sid){
		return ssservice.getSkills(sid);		
	}
	@PostMapping("/save/{sid}")
	public List<SeekerSkill> saveSkills(@PathVariable int sid, @RequestBody List<Integer> skillIds) {
	    return ssservice.insertMultipleSkills(sid, skillIds);
	}
	
	@DeleteMapping("/delete/{sid}/{skillId}")
	public String deleteSeekerSkill(@PathVariable int sid, @PathVariable int skillId) {
	    ssservice.deleteBySeekerAndSkill(sid, skillId);
	    return "Skill removed successfully.";
	}

	


}
