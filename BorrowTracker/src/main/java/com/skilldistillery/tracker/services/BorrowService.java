package com.skilldistillery.tracker.services;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.tracker.entities.Borrow;

public interface BorrowService extends JpaRepository<Borrow, Integer> {

}
