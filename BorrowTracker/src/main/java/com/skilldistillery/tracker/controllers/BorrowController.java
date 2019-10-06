package com.skilldistillery.tracker.controllers;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.skilldistillery.tracker.entities.Borrow;
import com.skilldistillery.tracker.services.BorrowService;

@RestController
@RequestMapping("api")
public class BorrowController {

	@Autowired
	private BorrowService svc;

	@GetMapping(path="borrows")
	public List<Borrow> index(){
	  return svc.findAll();
	}
	
	@GetMapping("borrows/{id}")
	public Borrow getBorrow(@PathVariable("id") Integer borrowId, HttpServletResponse resp) {
		Borrow borrow = svc.findById(borrowId);
		if (borrow == null) {
			resp.setStatus(404);
		}
		return borrow;
	}
	@PostMapping("borrows")
	public Borrow addBorrow(@RequestBody Borrow borrow, HttpServletResponse resp,
			HttpServletRequest req) {
		borrow = svc.create(borrow);
		if (borrow == null) {
			resp.setStatus(400);
		}else {
			resp.setStatus(200);
			StringBuffer url = req.getRequestURL();
			url.append("/");
			url.append(borrow.getId());
			resp.setHeader("Location", url.toString());
		}
//		try {
//			resp.setStatus(201);
//			StringBuffer url = req.getRequestURL();
//			url.append("/");
//			url.append(borrow.getId());
//			resp.setHeader("Location", url.toString());
//		} catch (Exception e) {
//			resp.setStatus(400);
//			borrow = null;
//			e.printStackTrace();
//		}
		return borrow;
	}
	
	@PutMapping("borrows/{id}")
	public Borrow replaceBorrow(@PathVariable("id") Integer borrowId,@RequestBody Borrow borrow,
			HttpServletResponse resp) {
		try {
			borrow = svc.update(borrowId, borrow);
			if (borrow == null) {
				resp.setStatus(404);
			}
		} catch (Exception e) {
			e.printStackTrace();
			resp.setStatus(400);
		}
		return borrow;
	}
	
	@DeleteMapping("borrows/{id}")
	public void destroyBorrow(@PathVariable("id") Integer id, HttpServletResponse resp) {
		try {
			Boolean deleted = svc.deleteBorrow(id);
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
