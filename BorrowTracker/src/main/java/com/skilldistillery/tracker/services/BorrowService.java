package com.skilldistillery.tracker.services;

import java.util.List;

import com.skilldistillery.tracker.entities.Borrow;

public interface BorrowService {

	public List<Borrow> findAll();
	Borrow create(Borrow borrow);
	Borrow update(int id, Borrow borrow);
	Borrow findById(int id);
	Boolean deleteBorrow (int id);
}
