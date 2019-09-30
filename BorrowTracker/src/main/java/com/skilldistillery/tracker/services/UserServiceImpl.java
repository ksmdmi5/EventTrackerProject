package com.skilldistillery.tracker.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.tracker.entities.User;
import com.skilldistillery.tracker.repositories.UserRepository;

@Service
public class UserServiceImpl implements UserService {

	@Autowired
	private UserRepository repo;

	@Override
	public List<User> findAll() {
		return repo.findAll();
	}

	@Override
	public User findById(int id) {
		Optional<User> opt = repo.findById(id);
		User user = null;
		if (opt.isPresent()) {
			user = opt.get();
		}
		return user;
	}

	@Override
	public User create(User user) {
		try {
			repo.saveAndFlush(user);
		} catch (Exception e) {
			user = null;
			e.printStackTrace();
		}
		return user;
	}

//title, rental_duration, rental_rate, replacement_cost, and language_id
	@Override
	public User update(int id, User user) {
		Optional<User> opt = repo.findById(id);
		User managedUser = null;
		if (opt.isPresent()) {
			managedUser = opt.get();
			managedUser.setUsername(user.getUsername());
			managedUser.setUsername(user.getPassword());
			repo.saveAndFlush(managedUser);
		}
		return managedUser;
	}


	@Override
	public Boolean deleteUser(int id) {
		Boolean deleted = false;
		if (repo.existsById(id)) {
		repo.deleteById(id);
		deleted = true;
		}
		return deleted;
	}


}
