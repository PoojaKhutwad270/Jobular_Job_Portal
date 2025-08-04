package com.example.demo.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.annotation.Generated;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name="seeker_skill")
public class SeekerSkill {
	@Id
	@Column(name="seekerskill_id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
int seekerSkillId;

	 @ManyToOne
	    @JoinColumn(name = "sid")
	 @JsonIgnore
	    private JobSeeker seeker;

	    @ManyToOne
	    @JoinColumn(name = "ss_id")
	    @JsonIgnoreProperties("seekerSkills")
	    private SkillSet skill;

		public SeekerSkill() {
			super();
			// TODO Auto-generated constructor stub
		}

		public int getSeekerSkillId() {
			return seekerSkillId;
		}

		public void setSeekerSkillId(int seekerSkillId) {
			this.seekerSkillId = seekerSkillId;
		}

		public JobSeeker getSeeker() {
			return seeker;
		}

		public void setSeeker(JobSeeker seeker) {
			this.seeker = seeker;
		}

		public SkillSet getSkill() {
			return skill;
		}

		public void setSkill(SkillSet skill) {
			this.skill = skill;
		}
	    
	    
}
