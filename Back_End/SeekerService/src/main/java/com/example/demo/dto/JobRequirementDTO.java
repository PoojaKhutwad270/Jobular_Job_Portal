package com.example.demo.dto;

import java.util.Date;

import com.example.demo.entities.JobRequirement;

public class JobRequirementDTO {

	 private int jobId;
	 private String jobTitle;
	 private int experience;
	 private Date deadline;
	 private String description;
	 private String companyName;
	 private String companyAddress;
	 private String companyEmail;
	 private String location;
	 private float salary;

	    private String hrEmail;
	    private String hrMobile;
	    
	    public JobRequirementDTO(JobRequirement job) {
	    	this.jobId=job.getReqid();
	    	this.jobTitle=job.getJobTitle();
	    	this.experience=job.getExperience();
	    	this.deadline=job.getDeadline();
	    	this.companyName=job.getCompany().getCompanyName();
	    	this.companyAddress=job.getCompany().getCompanyAddress();
	    	this.companyEmail=job.getCompany().getCompanyEmail();
	    	this.location=job.getCompany().getLocation();
	    	this.hrEmail=job.getCompany().getUser().getEmail();
	    	this.hrMobile=job.getCompany().getUser().getPhoneNo();
	    	this.description=job.getDescription();
	    	this.setSalary(job.getSalary());
	    	
	    	
	    }

		public String getDescription() {
			return description;
		}

		public void setDescription(String description) {
			this.description = description;
		}

		public int getJobId() {
			return jobId;
		}

		public void setJobId(int jobId) {
			this.jobId = jobId;
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

		public String getCompanyName() {
			return companyName;
		}

		public void setCompanyName(String companyName) {
			this.companyName = companyName;
		}

		public String getCompanyAddress() {
			return companyAddress;
		}

		public void setCompanyAddress(String companyAddress) {
			this.companyAddress = companyAddress;
		}

		public String getCompanyEmail() {
			return companyEmail;
		}

		public void setCompanyEmail(String companyEmail) {
			this.companyEmail = companyEmail;
		}

		public String getLocation() {
			return location;
		}

		public void setLocation(String location) {
			this.location = location;
		}

		public String getHrEmail() {
			return hrEmail;
		}

		public void setHrEmail(String hrEmail) {
			this.hrEmail = hrEmail;
		}

		public String getHrMobile() {
			return hrMobile;
		}

		public void setHrMobile(String hrMobile) {
			this.hrMobile = hrMobile;
		}

		public float getSalary() {
			return salary;
		}

		public void setSalary(float salary) {
			this.salary = salary;
		}
	    
}
