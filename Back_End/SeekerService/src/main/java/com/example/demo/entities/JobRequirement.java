package com.example.demo.entities;

import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name="job_requirement")
public class JobRequirement {
	 @Id
	  @GeneratedValue(strategy = GenerationType.IDENTITY)
	 @Column(name="req_id")
	private int reqid;
	 @Column(name="job_title")
	private String jobTitle;
	private int experience;
	private float salary;
	
	@OneToMany(mappedBy = "job")
	@JsonIgnoreProperties
	private List<Applications> applications;

	public List<Applications> getApplications() {
		return applications;
	}

	public void setApplications(List<Applications> applications) {
		this.applications = applications;
	}

	public float getSalary() {
		return salary;
	}

	public void setSalary(float salary) {
		this.salary = salary;
	}

	private Date deadline;
	@Column(name="role_description")
	private String description;
	
	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "cid")
	@JsonBackReference
	private Company company;


	public JobRequirement() {
		super();
		// TODO Auto-generated constructor stub
	}

	public int getReqid() {
		return reqid;
	}

	public void setReqid(int reqid) {
		this.reqid = reqid;
	}

	public String getJobTitle() {
		return jobTitle;
	}

	public void setJobTitle(String jobTitle) {
		this.jobTitle = jobTitle;
	}

	public int getExperience() {
		return experience;
	}

	public void setExperience(int experience) {
		this.experience = experience;
	}

	public Date getDeadline() {
		return deadline;
	}

	public void setDeadline(Date deadline) {
		this.deadline = deadline;
	}

	public Company getCompany() {
		return company;
	}

	public void setCompany(Company company) {
		this.company = company;
	}
	

}
