package com.example.demo.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dtos.LoginRequest;
import com.example.demo.entities.User;
import com.example.demo.services.UserService;

@CrossOrigin(origins = "http://localhost:5173")
@RestController // Marks this class as a REST controller to handle HTTP requests
@RequestMapping("/user")
public class UserController {

	@Autowired
	UserService userv; // Injects the UserService to handle business logic

	// Fetch all users from the database
	@GetMapping("/all")
	public List<User> FetchUserRecord() {
		return userv.ViewUser();
	}

	// Fetch users by their role ID
	@GetMapping("/fetchusersbyrole")
	public List<User> FetchUserByRole(@RequestParam("rid") int rid) {
		return userv.ViewUserByRole(rid);
	}

	// Fetch users by their city ID
	@GetMapping("/fetchusersbycity")
	public List<User> FetchUserByCity(@RequestParam("cityid") int cid) {
		return userv.ViewUserByCity(cid);
	}

	// Fetch a single user by user ID
	@GetMapping("/fetchoneuser")
	public User FetchOneUserRecord(@RequestParam("uid") int id) {
		return userv.ViewOneUser(id);
	}

	// Insert a new user into the database
	@PostMapping("/save")
	public User InsertUserRecord(@RequestBody User us) {
		return userv.InsertUser(us);
	}

	// Delete a user by their ID
	@DeleteMapping("/deleteuser")
	public void DeleteUserRecord(@RequestParam("uid") int id) {
		userv.DeleteUser(id);
	}

	// Update an existing user's data by ID
	@PutMapping("/updateuser")
	public User UpdateUserRecord(@RequestBody User us, @RequestParam("uid") int id) {
		return userv.UpdateUser(id, us);
	}
	
	//Login 
	@PostMapping("/loginuser")
	public User InsertUserRecord(@RequestBody LoginRequest loginRequest) {
		
		 
		return userv.LogInUser( loginRequest.getEmail(),loginRequest.getPassword());
		
		 
	}
	
}
