package com.example.demo.entities;



import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "user")
public class User {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column
	private int uid;
	@Column
	private String uname;
	@Column
	private String email;
	@Column(name = "phone_no")
	private String phoneNo;
	@Column(nullable = false)
	private String address;
	@Column
	private String password;

	 @OneToOne(mappedBy = "user", cascade = CascadeType.ALL)

	 @JsonIgnoreProperties("user")
	  private JobSeeker seeker;

	public int getUid() {
		return uid;
	}

	public void setUid(int uid) {
		this.uid = uid;
	}

	public String getUname() {
		return uname;
	}

	public void setUname(String uname) {
		this.uname = uname;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPhoneNo() {
		return phoneNo;
	}

	public void setPhoneNo(String phoneNo) {
		this.phoneNo = phoneNo;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public JobSeeker getSeeker() {
		return seeker;
	}

	public void setSeeker(JobSeeker seeker) {
		this.seeker = seeker;
	}

	public User() {
		super();
		// TODO Auto-generated constructor stub
	}

	public User(int uid, String uname, String email, String phoneNo, String address, String password,
			JobSeeker seeker) {
		super();
		this.uid = uid;
		this.uname = uname;
		this.email = email;
		this.phoneNo = phoneNo;
		this.address = address;
		this.password = password;
		this.seeker = seeker;
	}
	

	

	

}
