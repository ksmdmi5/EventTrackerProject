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
			name: document.addBorrowForm.name.value,
			value:  document.addBorrowForm.value.value,
			description: document.addBorrowForm.description.value,
			borrowedFrom: document.addBorrowForm.borrowedFrom.value,
			returned: document.addBorrowForm.returned.value === "on",
			borrowed: document.addBorrowForm.borrowed.value === "on",
			lent: document.addBorrowForm.lent.value === "on"
	} 
	console.log(borrowObject);
	xhr.send(JSON.stringify(borrowObject));
}
	
function clearPage(){
    let div = document.getElementById('borrowedItem');
    while(div.firstElementChild){
        div.removeChild(div.firstElementChild);
    }
    location.reload();
}

function deleteBorrowed(borrowId) {
	var xhr = new XMLHttpRequest();
	xhr.open('DELETE', 'api/borrows/' + borrowId, true);
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
	let th4 = document.createElement('th');
	let th5 = document.createElement('th');
	let th6 = document.createElement('th');
	let th7 = document.createElement('th');
	let th8 = document.createElement('th');
	th.textContent = "ID";
	table.appendChild(th);
	th1.textContent = "Item";
	table.appendChild(th1);
	th2.textContent = "Value";
	table.appendChild(th2);
	th3.textContent = "Borrowed From:";
	table.appendChild(th3);
	th4.textContent = "Returned?";
	table.appendChild(th4);
	th5.textContent = "Borrowed?";
	table.appendChild(th5);
	th6.textContent = "Lent?";
	table.appendChild(th6);
	th7.textContent = "Date Borrowed";
	table.appendChild(th7);
	th8.textContent = "Date Returned";
	table.appendChild(th8);
	allBorrowed.forEach(function(borrow, index) {
		let tr = document.createElement('tr');
		let td = document.createElement('td');
		td.textContent = borrow.id;
		tr.appendChild(td);
		td = document.createElement('td');
		td.textContent = borrow.name;
		tr.appendChild(td);
		td = document.createElement('td');
		td.textContent = borrow.value;
		tr.appendChild(td);
		td = document.createElement('td');
		td.textContent = borrow.borrowedFrom;
		tr.appendChild(td);
		td = document.createElement('td');
		td.textContent = borrow.borrowed;
		tr.appendChild(td);
		td = document.createElement('td');
		td.textContent = borrow.lent;
		tr.appendChild(td);
		td = document.createElement('td');
		td.textContent = borrow.returned;
		tr.appendChild(td);
		table.appendChild(tr);
		td = document.createElement('td');
		td.textContent = borrow.dateBorrowed;
		tr.appendChild(td);
		table.appendChild(tr);
		td = document.createElement('td');
		td.textContent = borrow.dateReturned;
		tr.appendChild(td);
		table.appendChild(tr);
		tr.addEventListener('click', function(evt) {
			editBorrow(borrow.id);
			console.log(borrow.id);
			getBorrowed(borrow.id);
		});
	})
}

function displayOneBorrow(borrowId) {
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
		oneBorrowLi.textContent = "Borrowed: " + oneBorrow.borrowed;
		oneBorrowUl.appendChild(oneBorrowLi);
		oneBorrowDiv.appendChild(oneBorrowUl);
		oneBorrowLi.textContent = "Lent: " + oneBorrow.returned;
		oneBorrowUl.appendChild(oneBorrowLi);
		oneBorrowDiv.appendChild(oneBorrowUl);
		oneBorrowLi = document.createElement('li');
		oneBorrowLi.textContent = "Date Borrowed: " + oneBorrow.dateBorrowed;
		oneBorrowUl.appendChild(oneBorrowLi);
		oneBorrowLi = document.createElement('li');
		oneBorrowLi.textContent = "Date Returned: " + oneBorrow.dateReturned;
		oneBorrowUl.appendChild(oneBorrowLi);
		
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
				borrowForm.borrowed.value = oneBorrow.borrowed;
				borrowForm.lent.value = oneBorrow.lent;
				
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
							name: document.addBorrowForm.name.value,
							value:  document.addBorrowForm.value.value,
							description: document.addBorrowForm.description.value,
							borrowedFrom: document.addBorrowForm.borrowedFrom.value,
							returned: document.addBorrowForm.returned.value === "on",
							borrowed: document.addBorrowForm.borrowed.value === "on",
							lent: document.addBorrowForm.lent.value === "on"
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
				console.log(allBorrowed);
			}	
			else {
				console.error(xhr.status + ": '" + xhr.responseText);
			}
		}
	} 
	xhr.send(null);
}

function getBorrowed(borrowId) {
	var xhr = new XMLHttpRequest();
	xhr.open('GET', 'api/borrows/' + borrowId, true);
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status < 400) {
				let borrow = JSON.parse(xhr.responseText);
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
	} 
			xhr.send(null);
};

function metrics() {
	 let xhr = new XMLHttpRequest();
	 xhr.open('GET', 'api/borrows', true);
		xhr.onreadystatechange = function() {
	 if (xhr.readyState === 4) {
		 if (xhr.status < 400) {
			 var totalValue = JSON.parse(xhr.responseText);
			 var itemValue = totalValue.length;
			 var totalItemValue = 0;
			 let itemValueHeader = document.getElementById('itemValue');
			 totalValue.forEach(function(borrow, index) {
				 console.log(totalItemValue);
				 totalItemValue = totalItemValue + parseFloat(borrow.value);
			 });
			 itemValueHeader.textContent = "Total Value: $" + totalItemValue;
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