package com.example.demo.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
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

	@ManyToOne
	@JoinColumn(name = "rid")
	@JsonIgnoreProperties("user")
	private Role role;

	@ManyToOne
	@JoinColumn(name = "cityid")
	@JsonIgnoreProperties("user")
	private City city;

	public User() {
		super();
		// TODO Auto-generated constructor stub
	}

	public User(int uid, String uname, String email, String phone_no, String address, String password, Role role,
			City city) {
		super();
		this.uid = uid;
		this.uname = uname;
		this.email = email;
		this.phoneNo = phone_no;
		this.address = address;
		this.password = password;
		this.role = role;
		this.city = city;
	}

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

	public String getPhone_no() {
		return phoneNo;
	}

	public void setPhone_no(String phone_no) {
		this.phoneNo = phone_no;
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

	public Role getRole() {
		return role;
	}

	public void setRole(Role role) {
		this.role = role;
	}

	public City getCity() {
		return city;
	}

	public void setCity(City city) {
		this.city = city;
	}

}
