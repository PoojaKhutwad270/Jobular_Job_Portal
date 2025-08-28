package com.example.demo.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entities.Company;
import com.example.demo.repositories.CompanyRepository;
import com.example.demo.services.CompanyService;

@RestController
@RequestMapping("/company")
@CrossOrigin(origins = "http://localhost:5173")
public class CompanyController {
	@Autowired
    private CompanyService companyService;

    @GetMapping("/getAll")
    public List<Company> getAllCompanies() {
        return companyService.getAllCompanies();
    }

}

