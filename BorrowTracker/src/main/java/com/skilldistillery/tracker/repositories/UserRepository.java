package com.skilldistillery.tracker.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.tracker.entities.User;

public interface UserRepository extends JpaRepository<User, Integer> {

}
