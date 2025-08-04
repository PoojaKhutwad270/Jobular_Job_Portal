package com.example.demo.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entities.JobSeeker;
import com.example.demo.entities.SeekerSkill;
import com.example.demo.entities.SkillSet;
@Repository
public interface SeekerSkillRepository extends JpaRepository<SeekerSkill, Integer> {
	boolean existsBySeekerAndSkill(JobSeeker seeker, SkillSet skill);
	void deleteBySeekerSidAndSkillSkillId(int sid, int skillId);

}
