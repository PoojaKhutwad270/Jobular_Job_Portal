package com.example.demo.entities;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;

import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name="seeker")
public class JobSeeker {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="sid")
private int sid;
	@Column(name="school_name_10th")
	private  String schoolNameSSC;
	@Column(name="marks_10th")
	private  float marksSSC;
	@Column(name="school_name_12th")
	private String schoolNameHSC;
	@Column(name="marks_12th")
	private float marksHSC;
	@Column(name="graduation_degree")
	private String graduationDegree;
	@Column(name="grad_university")
	private String university;
	@Column(name="graduation_marks")
	private float graduationMarks;
	@Column(name="passout_year")
	private Date passout_year;
	@Column(name="experience")
	private int experience;
	@Column(name="DOB")
	private Date dob;
	@Column(name="gender")
	private String gender;
	@Column(name="resume")
	private String resume;
	
	 @OneToOne(cascade = CascadeType.ALL)
	 @JsonIgnoreProperties("seeker")
	 @JoinColumn(name = "uid")

	  private User user;

	public int getSid() {
		return sid;
	}

	public void setSid(int sid) {
		this.sid = sid;
	}

	public String getSchoolNameSSC() {
		return schoolNameSSC;
	}

	public void setSchoolNameSSC(String schoolNameSSC) {
		this.schoolNameSSC = schoolNameSSC;
	}

	public float getMarksSSC() {
		return marksSSC;
	}

	public void setMarksSSC(float marksSSC) {
		this.marksSSC = marksSSC;
	}

	public String getSchoolNameHSC() {
		return schoolNameHSC;
	}

	public void setSchoolNameHSC(String schoolNameHSC) {
		this.schoolNameHSC = schoolNameHSC;
	}

	public float getMarksHSC() {
		return marksHSC;
	}

	public void setMarksHSC(float marksHSC) {
		this.marksHSC = marksHSC;
	}

	public String getGraduationDegree() {
		return graduationDegree;
	}

	public void setGraduationDegree(String graduationDegree) {
		this.graduationDegree = graduationDegree;
	}

	public String getUniversity() {
		return university;
	}

	public void setUniversity(String university) {
		this.university = university;
	}

	public float getGraduationMarks() {
		return graduationMarks;
	}

	public void setGraduationMarks(float graduationMarks) {
		this.graduationMarks = graduationMarks;
	}

	public Date getPassout_year() {
		return passout_year;
	}

	public void setPassout_year(Date passout_year) {
		this.passout_year = passout_year;
	}

	public int getExperience() {
		return experience;
	}

	public void setExperience(int experience) {
		this.experience = experience;
	}

	public Date getDob() {
		return dob;
	}

	public void setDob(Date dob) {
		this.dob = dob;
	}

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public String getResume() {
		return resume;
	}

	public void setResume(String resume) {
		this.resume = resume;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public JobSeeker() {
		super();
		// TODO Auto-generated constructor stub
	}

	public JobSeeker(int sid, String schoolNameSSC, float marksSSC, String schoolNameHSC, float marksHSC,
			String graduationDegree, String university, float graduationMarks, Date passout_year, int experience,
			Date dob, String gender, String resume, User user) {
		super();
		this.sid = sid;
		this.schoolNameSSC = schoolNameSSC;
		this.marksSSC = marksSSC;
		this.schoolNameHSC = schoolNameHSC;
		this.marksHSC = marksHSC;
		this.graduationDegree = graduationDegree;
		this.university = university;
		this.graduationMarks = graduationMarks;
		this.passout_year = passout_year;
		this.experience = experience;
		this.dob = dob;
		this.gender = gender;
		this.resume = resume;
		this.user = user;
	}

	


}
