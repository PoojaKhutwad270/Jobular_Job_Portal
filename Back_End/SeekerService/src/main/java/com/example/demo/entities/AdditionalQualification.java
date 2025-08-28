package com.example.demo.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.annotation.Generated;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name="additional_qualification")
public class AdditionalQualification {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	int qid;
	
	@Column(name="qname")
String qname;
	@Column(name="marks")
float marks;
	@Column(name="specialization")
String specialization;
	@Column(name="university")
String university;
	@Column(name="grade")
String grade;


@ManyToOne(fetch = FetchType.LAZY)
@JoinColumn(name = "sid")
@JsonIgnoreProperties(" additionalQualifications")
private JobSeeker seeker;


public AdditionalQualification() {
	super();
	// TODO Auto-generated constructor stub
}


public int getQid() {
	return qid;
}


public void setQid(int qid) {
	this.qid = qid;
}


public String getQname() {
	return qname;
}


public void setQname(String qname) {
	this.qname = qname;
}


public float getMarks() {
	return marks;
}


public void setMarks(float marks) {
	this.marks = marks;
}


public String getSpecialization() {
	return specialization;
}


public void setSpecialization(String specialization) {
	this.specialization = specialization;
}


public String getUniversity() {
	return university;
}


public void setUniversity(String university) {
	this.university = university;
}


public String getGrade() {
	return grade;
}


public void setGrade(String grade) {
	this.grade = grade;
}


public JobSeeker getSeeker() {
	return seeker;
}


public void setSeeker(JobSeeker seeker) {
	this.seeker = seeker;
}


}
