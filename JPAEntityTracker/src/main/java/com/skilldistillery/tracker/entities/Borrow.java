package com.skilldistillery.tracker.entities;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

@Entity
public class Borrow {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	private String name;
	private double value;
	private String description;
	private boolean returned;
	
	@Column(name="date_borrowed")
	@CreationTimestamp
	private Date dateBorrowed;

	@Column(name="date_returned")
	@UpdateTimestamp
	private Date dateReturned;
	
	@Column(name="borrowed_from")
	private String borrowedFrom;
	
	private boolean borrowed;
	private boolean lent;
	
	@ManyToOne
	@JoinColumn(name="user_id")
	private User user;
	
	public Borrow() {}

	public Borrow(int id, String name, double value, String description, boolean returned, Date dateBorrowed,
			Date dateReturned, String borrowedFrom, boolean borrowed, boolean lent, User user) {
		super();
		this.id = id;
		this.name = name;
		this.value = value;
		this.description = description;
		this.returned = returned;
		this.dateBorrowed = dateBorrowed;
		this.dateReturned = dateReturned;
		this.borrowedFrom = borrowedFrom;
		this.borrowed = borrowed;
		this.lent = lent;
		this.user = user;
	}


	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public double getValue() {
		return value;
	}

	public void setValue(double value) {
		this.value = value;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public boolean isReturned() {
		return returned;
	}

	public void setReturned(boolean returned) {
		this.returned = returned;
	}

	public Date getDateBorrowed() {
		return dateBorrowed;
	}

	public void setDateBorrowed(Date dateBorrowed) {
		this.dateBorrowed = dateBorrowed;
	}

	public Date getDateReturned() {
		return dateReturned;
	}

	public void setDateReturned(Date dateReturned) {
		this.dateReturned = dateReturned;
	}

	public String getBorrowedFrom() {
		return borrowedFrom;
	}

	public void setBorrowedFrom(String borrowedFrom) {
		this.borrowedFrom = borrowedFrom;
	}

	public boolean isBorrowed() {
		return borrowed;
	}

	public void setBorrowed(boolean borrowed) {
		this.borrowed = borrowed;
	}

	public boolean isLent() {
		return lent;
	}

	public void setLent(boolean lent) {
		this.lent = lent;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}


	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + (borrowed ? 1231 : 1237);
		result = prime * result + ((borrowedFrom == null) ? 0 : borrowedFrom.hashCode());
		result = prime * result + ((dateBorrowed == null) ? 0 : dateBorrowed.hashCode());
		result = prime * result + ((dateReturned == null) ? 0 : dateReturned.hashCode());
		result = prime * result + ((description == null) ? 0 : description.hashCode());
		result = prime * result + id;
		result = prime * result + (lent ? 1231 : 1237);
		result = prime * result + ((name == null) ? 0 : name.hashCode());
		result = prime * result + (returned ? 1231 : 1237);
		result = prime * result + ((user == null) ? 0 : user.hashCode());
		long temp;
		temp = Double.doubleToLongBits(value);
		result = prime * result + (int) (temp ^ (temp >>> 32));
		return result;
	}


	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Borrow other = (Borrow) obj;
		if (borrowed != other.borrowed)
			return false;
		if (borrowedFrom == null) {
			if (other.borrowedFrom != null)
				return false;
		} else if (!borrowedFrom.equals(other.borrowedFrom))
			return false;
		if (dateBorrowed == null) {
			if (other.dateBorrowed != null)
				return false;
		} else if (!dateBorrowed.equals(other.dateBorrowed))
			return false;
		if (dateReturned == null) {
			if (other.dateReturned != null)
				return false;
		} else if (!dateReturned.equals(other.dateReturned))
			return false;
		if (description == null) {
			if (other.description != null)
				return false;
		} else if (!description.equals(other.description))
			return false;
		if (id != other.id)
			return false;
		if (lent != other.lent)
			return false;
		if (name == null) {
			if (other.name != null)
				return false;
		} else if (!name.equals(other.name))
			return false;
		if (returned != other.returned)
			return false;
		if (user == null) {
			if (other.user != null)
				return false;
		} else if (!user.equals(other.user))
			return false;
		if (Double.doubleToLongBits(value) != Double.doubleToLongBits(other.value))
			return false;
		return true;
	}


	@Override
	public String toString() {
		return "Borrow [id=" + id + ", name=" + name + ", value=" + value + ", description=" + description
				+ ", returned=" + returned + ", dateBorrowed=" + dateBorrowed + ", dateReturned=" + dateReturned
				+ ", borrowedFrom=" + borrowedFrom + ", borrowed=" + borrowed + ", lent=" + lent + "]";
	}
}
