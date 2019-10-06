package com.skilldistillery.tracker.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.tracker.entities.Borrow;

public interface BorrowRepository extends JpaRepository<Borrow, Integer> {
	
}
