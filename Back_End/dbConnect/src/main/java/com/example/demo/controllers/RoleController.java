package com.example.demo.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entities.Role;
import com.example.demo.entities.User;
import com.example.demo.services.RoleService;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/role")
public class RoleController {

	@Autowired
	RoleService rserv;

	@GetMapping("/all")
	public List<Role> FetchRolesRecord() {
		return rserv.ViewRole();
	}

}
