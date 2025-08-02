package com.example.demo.entities;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.CascadeType;
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
@Table(name = "company")
public class Company {
@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private int cid;
@Column(name="cname")
private String companyName;
@Column(name="caddress")
private String companyAddress;
@Column(name="licence")
private  String licence;

private String pancard;

private String documents;
@Column(name="company_phoneno")
private String companyPhonono;
@Column(name="company_email")
private String companyEmail;
private String location;

@ManyToOne(fetch = FetchType.LAZY)
@JoinColumn(name="uid")
@JsonIgnoreProperties("companies")
private User user;


@OneToMany(mappedBy = "company", cascade = CascadeType.ALL)
private List<JobRequirement> jobs = new ArrayList<>();
public int getCid() {
	return cid;
}

public void setCid(int cid) {
	this.cid = cid;
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

public String getLicence() {
	return licence;
}

public void setLicence(String licence) {
	this.licence = licence;
}

public String getPancard() {
	return pancard;
}

public void setPancard(String pancard) {
	this.pancard = pancard;
}

public String getDocuments() {
	return documents;
}

public void setDocuments(String documents) {
	this.documents = documents;
}

public String getCompanyPhonono() {
	return companyPhonono;
}

public void setCompanyPhonono(String companyPhonono) {
	this.companyPhonono = companyPhonono;
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

public User getUser() {
	return user;
}

public void setUser(User user) {
	this.user = user;
}

public Company() {
	super();
	// TODO Auto-generated constructor stub
}


}
