package com.example.demo.services;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entities.Company;
import com.example.demo.entities.Complaint;
import com.example.demo.entities.User;
import com.example.demo.repositories.CompanyRepository;
import com.example.demo.repositories.ComplaintRepository;
import com.example.demo.repositories.UserRepository;

@Service
public class ComplaintService {
	@Autowired
    private ComplaintRepository complaintRepository;

	public Complaint addComplaint(Complaint complaint) {
        if (complaint.getDate() == null) {
            complaint.setDate(LocalDateTime.now());
        }
       
        return complaintRepository.save(complaint);
    }}
