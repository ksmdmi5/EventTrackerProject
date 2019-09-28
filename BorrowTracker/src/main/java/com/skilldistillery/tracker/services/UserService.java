package com.skilldistillery.tracker.services;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.tracker.entities.User;

public interface UserService extends JpaRepository<User, Integer> {

}
