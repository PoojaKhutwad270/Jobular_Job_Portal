package com.example.demo.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entities.Role;
import com.example.demo.entities.User;
import com.example.demo.repositories.RoleRepository;

@Service
public class RoleService {

	@Autowired
	RoleRepository rrepo;

	public List<Role> ViewRole() {
		return rrepo.findAll();
	}
}
