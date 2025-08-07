package com.example.demo.entities;

import java.util.HashSet;
import java.util.Set;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name="skillset")
public class SkillSet {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ss_id")
int skillId;
	@Column(name="skillname")
String skillName;
	
	@OneToMany(mappedBy = "skill", cascade = CascadeType.ALL)
	private Set<SeekerSkill> seekerSkills = new HashSet<>();
		
	public SkillSet() {
		super();
		// TODO Auto-generated constructor stub
	}

	public int getSkillId() {
		return skillId;
	}

	public void setSkillId(int skillId) {
		this.skillId = skillId;
	}

	public String getSkillName() {
		return skillName;
	}

	public void setSkillName(String skillName) {
		this.skillName = skillName;
	}

	public Set<SeekerSkill> getSeekerSkills() {
		return seekerSkills;
	}

	public void setSeekerSkills(Set<SeekerSkill> seekerSkills) {
		this.seekerSkills = seekerSkills;
	}


	
}
