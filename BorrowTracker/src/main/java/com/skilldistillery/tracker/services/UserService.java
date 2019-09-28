package com.skilldistillery.tracker.services;

import java.util.List;

import com.skilldistillery.tracker.entities.User;

public interface UserService {

	public List<User> findAll();
	User create(User user);
	User update(int id, User user);
	User findById(int id);
	Boolean deleteUser (int id);
}
