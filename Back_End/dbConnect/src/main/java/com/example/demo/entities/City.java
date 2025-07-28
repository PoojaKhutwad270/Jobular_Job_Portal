package com.example.demo.entities;

import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "city")
public class City {
	@Id
	@Column
	private int cityid;
	@Column
	private String cityname;

	@OneToMany(mappedBy = "city")
	@JsonIgnoreProperties("city")
	Set<User> user;

	public City() {
		super();
		// TODO Auto-generated constructor stub
	}

	public City(int cityid, String cityname, Set<User> user) {
		super();
		this.cityid = cityid;
		this.cityname = cityname;
		this.user = user;
	}

	public int getCityid() {
		return cityid;
	}

	public void setCityid(int cityid) {
		this.cityid = cityid;
	}

	public String getCityname() {
		return cityname;
	}

	public void setCityname(String cityname) {
		this.cityname = cityname;
	}

	public Set<User> getUser() {
		return user;
	}

	public void setUser(Set<User> user) {
		this.user = user;
	}

}
