package com.skilldistillery.tracker.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.tracker.entities.Borrow;
import com.skilldistillery.tracker.repositories.BorrowRepository;

@Service
public class BorrowServiceImpl implements BorrowService {

	@Autowired
	private BorrowRepository repo;

	@Override
	public List<Borrow> findAll() {
		return repo.findAll();
	}

	@Override
	public Borrow findById(int id) {
		Optional<Borrow> opt = repo.findById(id);
		Borrow borrow = null;
		if (opt.isPresent()) {
			borrow = opt.get();
		}
		return borrow;
	}

	@Override
	public Borrow create(Borrow borrow) {
		try {
			repo.saveAndFlush(borrow);
		} catch (Exception e) {
			borrow = null;
			e.printStackTrace();
		}
		return borrow;
	}

	@Override
	public Borrow update(int id, Borrow borrow) {
		Optional<Borrow> opt = repo.findById(id);
		Borrow managedBorrow = null;
		if (opt.isPresent()) {
			managedBorrow = opt.get();
			managedBorrow.setName(borrow.getName());
			managedBorrow.setValue(borrow.getValue());
			managedBorrow.setDescription(borrow.getDescription());
			managedBorrow.setReturned(borrow.isReturned());
			managedBorrow.setDateBorrowed(borrow.getDateBorrowed());
			managedBorrow.setDateReturned(borrow.getDateReturned());
			managedBorrow.setBorrowedFrom(borrow.getBorrowedFrom());
			managedBorrow.setBorrowed(borrow.isBorrowed());
			managedBorrow.setLent(borrow.isLent());
			repo.saveAndFlush(managedBorrow);
		}
		return managedBorrow;
	}


	@Override
	public Boolean deleteBorrow(int id) {
		Boolean deleted = false;
		if (repo.existsById(id)) {
		repo.deleteById(id);
		deleted = true;
		}
		return deleted;
	}

}
