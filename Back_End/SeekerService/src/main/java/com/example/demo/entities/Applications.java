package com.example.demo.entities;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name="application")
public class Applications {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="appid")
	int appid;
	@Column(name="status")
	int status;
	@Column(name="date")
	Date date;
	
	@ManyToOne
	@JoinColumn(name = "req_id")
	@JsonIgnoreProperties("applications")
	private JobRequirement job;
	
	@ManyToOne
	@JoinColumn(name="sid")
	@JsonIgnoreProperties("applications")
	private JobSeeker seeker;
	

	public JobSeeker getSeeker() {
		return seeker;
	}

	public void setSeeker(JobSeeker seeker) {
		this.seeker = seeker;
	}

	public Applications() {
		super();
		// TODO Auto-generated constructor stub
	}

	public int getAppid() {
		return appid;
	}

	public void setAppid(int appid) {
		this.appid = appid;
	}

	public int getStatus() {
		return status;
	}

	public void setStatus(int status) {
		this.status = status;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	public JobRequirement getJob() {
		return job;
	}

	public void setJob(JobRequirement job) {
		this.job = job;
	}
	
	


}
