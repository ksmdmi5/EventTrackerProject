package com.skilldistillery.tracker.controllers;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.tracker.entities.User;
import com.skilldistillery.tracker.services.UserService;

@RestController
@RequestMapping("api")
public class UserController {

	@Autowired
	private UserService svc;

	@GetMapping(path="users")
	public List<User> index(){
	  return svc.findAll();
	}
	
	@GetMapping("users/{uid}")
	public User getUser(@PathVariable("uid") Integer userId, HttpServletResponse resp) {
		User user = svc.findById(userId);
		if (user == null) {
			resp.setStatus(404);
		}
		return user;
	}
	@PostMapping("users")
	public User addUser(@RequestBody User user, HttpServletResponse resp,
			HttpServletRequest req) {
		user = svc.create(user);
		if (user == null) {
			resp.setStatus(400);
		}else {
			resp.setStatus(200);
			StringBuffer url = req.getRequestURL();
			url.append("/");
			url.append(user.getId());
			resp.setHeader("Location", url.toString());
		}
//		try {
//			resp.setStatus(201);
//			StringBuffer url = req.getRequestURL();
//			url.append("/");
//			url.append(user.getId());
//			resp.setHeader("Location", url.toString());
//		} catch (Exception e) {
//			resp.setStatus(400);
//			user = null;
//			e.printStackTrace();
//		}
		return user;
	}
	
	@PutMapping("users/{uid}")
	public User replaceUser(@PathVariable("uid") Integer userId,@RequestBody User user,
			HttpServletResponse resp) {
		try {
			user = svc.update(userId, user);
			if (user == null) {
				resp.setStatus(404);
			}
		} catch (Exception e) {
			e.printStackTrace();
			resp.setStatus(400);
		}
		return user;
	}
	
	@DeleteMapping("users/{uid}")
	public void destroyUser(@PathVariable("uid") Integer uid, HttpServletResponse resp) {
		try {
			Boolean deleted = svc.deleteUser(uid);
			if(deleted) {
				resp.setStatus(204);
			} else {
				resp.setStatus(404);
			}
		} catch (Exception e) {
			e.printStackTrace();
			resp.setStatus(400);
		}
	}
}
