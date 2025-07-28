//package com.example.demo.entities;
//
//import java.util.HashSet;
//import java.util.Set;
//
//import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
//
//import jakarta.persistence.Column;
//import jakarta.persistence.Entity;
//import jakarta.persistence.FetchType;
//import jakarta.persistence.GeneratedValue;
//import jakarta.persistence.GenerationType;
//import jakarta.persistence.Id;
//import jakarta.persistence.JoinColumn;
//import jakarta.persistence.JoinTable;
//import jakarta.persistence.ManyToMany;
//import jakarta.persistence.Table;
//
//@Entity
//@Table(name="skillset")
//public class SkillSet {
//	@Id
//	@GeneratedValue(strategy = GenerationType.IDENTITY)
//	@Column(name = "ss_id")
//int skillId;
//	@Column(name="skillname")
//String skillName;
//	@JsonIgnoreProperties("")
//	@ManyToMany(fetch=FetchType.EAGER)
//	joinColumns = @JoinColumn(name=""), inverseJoinColumns = @JoinColumn(name="")
//	 Set<JobSeeker> users = new HashSet<>();
//		
//	public SkillSet() {
//		super();
//		// TODO Auto-generated constructor stub
//	}
//	
//}
