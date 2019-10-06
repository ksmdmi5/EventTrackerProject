window.addEventListener('load', function() {
  console.log('document loaded');
  getAll(); 
  init();
  metrics();
});

function init() {
	document.getElementById("editBorrow").style.display="none";
	
	document.borrowForm.lookup.addEventListener('click', function(event) {
	    event.preventDefault();
	    let borrowId = document.borrowForm.borrowId.value;
	    console.log(borrowId);
	    if (!isNaN(borrowId) && borrowId > 0) {
	    	getBorrowed(borrowId);
	    }
	  });
	  
	  document.addBorrowForm.addBorrow.addEventListener('click', function(e) {
			e.preventDefault();
			addBorrow();
			clearPage();
		});
	  
	  document.borrowForm.edit.addEventListener('click', function(event) {
		    event.preventDefault();
		    let borrowId = document.borrowForm.borrowId.value;
		    console.log(borrowId);
		    if (!isNaN(borrowId) && borrowId > 0) {
		    	editBorrow(borrowId);
		    }
		  });
	  
	  document.borrowForm.delete.addEventListener('click', function(event) {
		    event.preventDefault();
		    let borrowId = document.borrowForm.borrowId.value;
		    console.log(borrowId);
		    if (!isNaN(borrowId) && borrowId > 0) {
		    	deleteBorrowed(borrowId);
				clearPage();
		    }
		  });
	}

function addBorrow(){
	var xhr = new XMLHttpRequest();
	xhr.open('POST', 'api/borrows', true);
	xhr.setRequestHeader("Content-type",  "application/json");
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4){
			if (xhr.status < 400) {
				let borrowObject = JSON.parse(xhr.responseText);
				console.log(borrowObject);
			}
			else {
				document.getElementById('addBorrow').textContent = "Item Not Found";
			}
		}
	};
	let borrowObject = {
			name	: document.addborrowForm.name.value,
			description	: document.addborrowForm.description.value,
			borrowedFrom		: document.addborrowForm.borrowedFrom.value,
			returned : document.addborrowForm.returned.value
	}
	xhr.send(JSON.stringify(borrowObject));
}
	
function clearPage(){
    let div = document.getElementById('borrowedItem');
    while(div.firstElementChild){
        div.removeChild(div.firstElementChild);
    }
    location.reload();
}

function deleteBorrowed(bid) {
	var xhr = new XMLHttpRequest();
	xhr.open('DELETE', 'api/borrows/' + bid, true);
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status < 400) {
				let oneBorrow = JSON.parse(xhr.responseText);
				console.log('deleted');
			}
			else {
				console.error(xhr.status + ": '" + xhr.responseText);
			}
		} 	
	} 
	xhr.send(null);
};

function displayAll(allBorrowed) {
	let borrowDiv = document.getElementById('allBorrowed');
	let table = document.createElement('table');
	borrowDiv.appendChild(table);
	let th = document.createElement('th');
	let th1 = document.createElement('th');
	let th2 = document.createElement('th');
	let th3 = document.createElement('th');
	th.textContent = "ID";
	table.appendChild(th);
	th1.textContent = "Item";
	table.appendChild(th1);
	th2.textContent = "Value";
	table.appendChild(th2);
	th3.textContent = "Returned";
	table.appendChild(th3);
	allBorrowed.forEach(function(borrow, index) {
		let tr = document.createElement('tr');
		let td = document.createElement('td');
		td.textContent = borrow.id;
		tr.appendChild(td);
		td = document.createElement('td');
		td.textContent = borrow.name;
		tr.appendChild(td);
		td = document.createElement('td');
		td.textContent = borrow.hoursSlept;
		tr.appendChild(td);
		td = document.createElement('td');
		td.textContent = borrow.positiveFeelings;
		tr.appendChild(td);
		table.appendChild(tr);
		tr.addEventListener('click', function(evt) {
			editborrow(borrow.id);
			console.log(borrow.id);
			getBorrowed(borrow.id);
		});
	})
}

function displayOneBorrow(bid) {
	let oneBorrowDiv = document.getElementById('oneBorrow');
	let oneBorrowUl = document.createElement('ul');
	let oneBorrowLi = document.createElement('li');
		oneBorrowLi.textContent = "Item: " + oneBorrow.name;
		oneBorrowUl.appendChild(oneBorrowLi);
		oneBorrowLi = document.createElement('li');
		oneBorrowLi.textContent = "Value: $" + oneBorrow.value;
		oneBorrowUl.appendChild(oneBorrowLi);
		oneBorrowLi = document.createElement('li');
		oneBorrowLi.textContent = "Description: " + oneBorrow.description;
		oneBorrowUl.appendChild(oneBorrowLi);
		oneBorrowLi = document.createElement('li');
		oneBorrowLi.textContent = "Borrowed From: " + oneBorrow.borrowedFrom;
		oneBorrowUl.appendChild(oneBorrowLi);
		oneBorrowLi = document.createElement('li');
		oneBorrowLi.textContent = "Returned: " + oneBorrow.returned;
		oneBorrowUl.appendChild(oneBorrowLi);
		oneBorrowDiv.appendChild(oneBorrowUl);
}

function editBorrow(borrowId){
	console.log(borrowId);
	var xhr = new XMLHttpRequest();
	xhr.open('GET', 'api/borrows/' + borrowId, true);
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status < 400) {
				let oneBorrow = JSON.parse(xhr.responseText);
				console.log(oneBorrow);
				let borrowForm = document.getElementById('editBorrowForm');
				borrowForm.name.value = oneBorrow.name;
				borrowForm.value.value = oneBorrow.value;
				borrowForm.description.value = oneBorrow.description;
				borrowForm.borrowedFrom.value = oneBorrow.borrowedFrom;
				borrowForm.returned.value = oneBorrow.returned;
				
				document.editBorrowForm.submit.addEventListener('click', function(event) {
				    event.preventDefault();
				    let xhr1 = new XMLHttpRequest();
				    xhr1.open('PUT', 'api/borrows/' + borrowId, true);
				    xhr1.setRequestHeader("Content-type",  "application/json");
				    xhr1.onreadystatechange = function() {
				    	let borrowObject = JSON.parse(xhr.responseText);
				    }
				    let borrowObject = {
							id : borrowId,
							name : document.editBorrowForm.name.value,
							value : document.editBorrowForm.value.value,
							description	: document.editBorrowForm.description.value,
							borrowedFrom : document.editBorrowForm.borrowedFrom.value,
							returned : document.editBorrowForm.returned.value
					}
				    console.log(oneBorrow);
				    console.log(borrowObject);
					xhr1.send(JSON.stringify(borrowObject));
					clearPage();
				});
			}
		} 	
	} 
	xhr.send(null);
}	

function getAll() {
	let xhr = new XMLHttpRequest();
	xhr.open('GET', 'api/borrows', true);
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status < 400) {
				var allBorrowed = JSON.parse(xhr.responseText);
				displayAll(allBorrowed);
			}	
			else {
				console.error(xhr.status + ": '" + xhr.responseText);
			}
		}
	} 
	xhr.send(null);
}

function getBorrowed(bid) {
	var xhr = new XMLHttpRequest();
	xhr.open('GET', 'api/borrows/' + bid, true);
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status < 400) {
				let borrow = JSON.parse(xhr.responseText);
				console.log(borrow);
				
				let oneBorrowDiv = document.getElementById('oneBorrow');
				let oneBorrowUl = document.createElement('ul');
				let oneBorrowLi = document.createElement('li');
					oneBorrowLi.textContent = "Value: $" + borrow.value;
					oneBorrowUl.appendChild(oneBorrowLi);
					oneBorrowLi = document.createElement('li');
					oneBorrowLi.textContent = "Description: " + borrow.description;
					oneBorrowUl.appendChild(oneBorrowLi);
					oneBorrowLi = document.createElement('li');
					oneBorrowLi.textContent = "Borrowed From: " + borrow.borrowedFrom;
					oneBorrowUl.appendChild(oneBorrowLi);
					oneBorrowUl.appendChild(oneBorrowLi);
					oneBorrowLi = document.createElement('li');
					oneBorrowLi.textContent = "Returned: " + borrow.returned;
					oneBorrowLi = document.createElement('li');
			}
			else {
				console.error(xhr.status + ": '" + xhr.responseText);
			}
		} 	
		xhr.onreadystatechange = function() {
	} 
	xhr.send(null);
};
function metrics() {
	let xhr = new XMLHttpRequest();
	xhr.open('GET', 'api/dreams', true);
		if (xhr.readyState === 4) {
			if (xhr.status < 400) {
				var allBorrowed = JSON.parse(xhr.responseText);
				var numBorrowed = allBorrowed.length;
				var avgHoursSlept = 0;
				var totalBorrowed = 0;
				let numBorrowedHeader = document.getElementById('numBorrowed');
				numBorrowedHeader.textContent = "Total Number of Borrowed: " + numBorrowed;
				allBorrowed.forEach(function(borrow, index) {
					totalBorrowed = totalBorrowed + parseInt(dream.hoursSlept);	
				});
			}	
			else {
				console.error(xhr.status + ": '" + xhr.responseText);
			}
		}
	} 
	xhr.send(null);
}	

function showEditForm() {
	  var x = document.getElementById("editBorrow");
	  if (x.style.display === "none") {
	    x.style.display = "block";
	  } else {
	    x.style.display = "none";
	  }
	}
