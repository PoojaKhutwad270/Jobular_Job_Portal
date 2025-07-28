package com.example.demo.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.demo.entities.User;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

	// Native SQL query to fetch a single user by ID
	@Query(value = "select * from user where id=?1", nativeQuery = true)
	public User findOneUser(int id);

	//JPQL query to fetch all users based on Role ID
	@Query("SELECT u FROM User u WHERE u.role.rid = :rid")
	public List<User> findByRoleRid(int rid);

	//JPQL query to fetch all users based on City ID
	@Query("SELECT u FROM User u WHERE u.city.cityid = :cid")
	public List<User> findByCityCid(int cid);
	
	//Native SQL query to get log-in info
	@Query(value = "select * from user where email=?1 and password=?2", nativeQuery = true)
	public User LogIn(String email,String password);
	
	
}
