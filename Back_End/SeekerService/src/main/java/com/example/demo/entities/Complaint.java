package com.example.demo.entities;

import java.time.LocalDateTime;
import java.util.Date;

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
@Table(name="complaint")
public class Complaint {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="comid")
int comid;
	@Column(name="date")
	LocalDateTime date;
	public Complaint() {
		super();
		// TODO Auto-generated constructor stub
	}

	public int getComid() {
		return comid;
	}

	public void setComid(int comid) {
		this.comid = comid;
	}

	public LocalDateTime getDate() {
		return date;
	}

	public void setDate(LocalDateTime date) {
		this.date = date;
	}

	public int getStatus() {
		return status;
	}

	public void setStatus(int status) {
		this.status = status;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Company getCompany() {
		return company;
	}

	public void setCompany(Company company) {
		this.company = company;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	@Column(name="status")
int status;
	@Column(name="description")
String description;
	
	 @ManyToOne(fetch = FetchType.LAZY)
	    @JoinColumn(name = "cid")
	    private Company company;

	    @ManyToOne(fetch = FetchType.LAZY)
	    @JoinColumn(name = "uid", nullable = false)
	    private User user;
	

}
