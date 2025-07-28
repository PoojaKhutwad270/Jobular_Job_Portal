package com.example.demo.entities;

import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.databind.exc.IgnoredPropertyException;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "role")
public class Role {
	@Id
	@Column
	private int rid;
	@Column
	private String rname;

	@OneToMany(mappedBy = "role")
	@JsonIgnoreProperties("role")
	Set<User> user;

	public Role() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Role(int rid, String rname, Set<User> user) {
		super();
		this.rid = rid;
		this.rname = rname;
		this.user = user;
	}

	public int getRid() {
		return rid;
	}

	public void setRid(int rid) {
		this.rid = rid;
	}

	public String getRname() {
		return rname;
	}

	public void setRname(String rname) {
		this.rname = rname;
	}

	public Set<User> getUser() {
		return user;
	}

	public void setUser(Set<User> user) {
		this.user = user;
	}

}
