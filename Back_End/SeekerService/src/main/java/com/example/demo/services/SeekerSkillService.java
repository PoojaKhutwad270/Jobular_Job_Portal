package com.example.demo.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entities.JobSeeker;
import com.example.demo.entities.SeekerSkill;
import com.example.demo.entities.SkillSet;
import com.example.demo.repositories.SeekerRepository;
import com.example.demo.repositories.SeekerSkillRepository;
import com.example.demo.repositories.SkillSetRepository;

import jakarta.transaction.Transactional;

@Service
public class SeekerSkillService {
	@Autowired
	SeekerSkillRepository ssrepo;
	@Autowired
	SeekerRepository seekerrepo;
@Autowired
SkillSetRepository skillRepo;
	public Set<SeekerSkill> getSkills(int sid) {
		Optional<JobSeeker> seekerOpt = seekerrepo.findById(sid);
		JobSeeker seeker = seekerOpt.get();
		Set<SeekerSkill> seekerSkilles = seeker.getSeekerSkills();
		return seekerSkilles;
	}

	
	public List<SeekerSkill> insertMultipleSkills(int sid, List<Integer> skillIds) {
	    JobSeeker seeker = seekerrepo.findById(sid)
	                        .orElseThrow(() -> new RuntimeException("Seeker not found"));

	    List<SeekerSkill> saved = new ArrayList<>();

	    for (Integer skillId : skillIds) {
	        SkillSet skill = skillRepo.findById(skillId)
	                        .orElseThrow(() -> new RuntimeException("Skill not found"));

	        if (ssrepo.existsBySeekerAndSkill(seeker, skill)) {
	            continue; 
	        }

	        SeekerSkill ss = new SeekerSkill();
	        ss.setSeeker(seeker);
	        ss.setSkill(skill);
	        saved.add(ssrepo.save(ss));
	    }

	    return saved;
	}

	 @Transactional
	public void deleteBySeekerAndSkill(int sid, int skillId) {
	    ssrepo.deleteBySeekerSidAndSkillSkillId(sid, skillId);
	}

	

	

}
