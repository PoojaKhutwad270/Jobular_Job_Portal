package com.example.demo.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;

import com.example.demo.entities.User;
import com.example.demo.repositories.UserRepository;

@Service // Marks this class as a Spring service component
public class UserService {

	@Autowired
	UserRepository urepo; // Injecting UserRepository to access DB operations
	
//	@Autowired
//	private PasswordEncoder passwordEncoder;

	// Fetch all users
	public List<User> ViewUser() {
		return urepo.findAll();
	}

	// Fetch users by Role ID
	public List<User> ViewUserByRole(int rid) {
		return urepo.findByRoleRid(rid);
	}

	// Fetch users by City ID
	public List<User> ViewUserByCity(int cid) {
		return urepo.findByCityCid(cid);
	}

	// Fetch a single user by ID
	public User ViewOneUser(int id) {
		Optional<User> op = urepo.findById(id);
		if (op != null) {
			return op.get(); // Return user if found
		} else {
			return null; // Return null if not found
		}
	}

	// Insert a new user
	public User InsertUser(User us) {
//		  if (us.getPassword() != null) {
//		        String encodedPassword = passwordEncoder.encode(us.getPassword());
//		        us.setPassword(encodedPassword);
//		    }
		return urepo.save(us);
	}

	// Delete a user by ID
	public void DeleteUser(int id) {
		urepo.deleteById(id);
	}

	// Update user details by ID, only non-null fields will be updated
	public User UpdateUser(int id, User us) {
		
		    User user = urepo.findById(id)
		        .orElseThrow(() -> new RuntimeException("User not found with ID: " + id));

		    if (us.getUname() != null)
		        user.setUname(us.getUname());

		    if (us.getEmail() != null)
		        user.setEmail(us.getEmail());

		    if (us.getPhone_no() != null)
		        user.setPhone_no(us.getPhone_no());

//		    if (us.getPassword() != null) {
//		        // Encode the password before updating
////		        String encodedPassword = passwordEncoder.encode(us.getPassword());
//		        user.setPassword(encodedPassword);
//		    }
		    
		    if (us.getPassword() != null) {
		        // Directly set plain text password (NOT recommended for production)
		        user.setPassword(us.getPassword());
		    }

		    if (us.getAddress() != null)
		        user.setAddress(us.getAddress());

		    if (us.getCity() != null)
		        user.setCity(us.getCity());

		    if (us.getRole() != null)
		        user.setRole(us.getRole());

		    return urepo.save(user); // Save updated user
		}

		
		
		
		
		
		
		
		
		
		
		
		
		
//		User user = urepo.findById(id).orElseThrow(() -> new RuntimeException("User not found with ID: " + id));
//
//		if (us.getUname() != null)
//			user.setUname(us.getUname());
//		if (us.getEmail() != null)
//			user.setEmail(us.getEmail());
//		if (us.getPhone_no() != null)
//			user.setPhone_no(us.getPhone_no());
//		if (us.getPassword() != null)
//			user.setPassword(us.getPassword());
//		if (us.getAddress() != null)
//			user.setAddress(us.getAddress());
//		if (us.getCity() != null)
//			user.setCity(us.getCity());
//		if (us.getRole() != null)
//			user.setRole(us.getRole());
//
//		return urepo.save(user); // Save updated user
//}	
	
	//Log-in
//   public User LogInUser(String email,String password) {
//	   User user =urepo.LogIn( email, password);
//	   
//	    if (user == null || !passwordEncoder.matches(password, user.getPassword())) {
//	        throw new InvalidCredentialsException("Invalid email or password");
//	    }
//	    return user;
//   }	
	
	 public User LogInUser(String email, String password) {
	        User user = urepo.LogIn(email, password);

	        if (user == null || !password.equals(user.getPassword())) {
	            throw new RuntimeException("Invalid email or password");
	        }
	        return user;
	    }
	
}
