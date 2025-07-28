package com.example.demo.services;

public class InvalidCredentialsException extends RuntimeException {
    public InvalidCredentialsException(String msg) { super(msg); }
}
