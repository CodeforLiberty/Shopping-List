// State Modification Functions
var state = {
	items: []  // {name: "apples", checked: false}
}

function addItem(state, name) {
	// add the item container
	// creates new object
	// adds/pushes item into state
}

function toggleChecked(state, item_num) {
	// toggle selected item  line-through state 
}

function deleteItem(state, item_num) {
	// remove item from state item arr
}

function findItem(state, item_num) {
	// find the item in the state item arr
	// return found item's ID
}

// Render Functions

function renderItems(state, element) {
	// render the new DOM
	// loops over array of shopping list items
	// creates a new html element and inserts it
}

// Event Listeners

$(function(){
	// delete item lisener
	$("#additem").on('click', function() {
		event.preventDefault();
		// call addItem function passing the selected element/container
		// render the new DOM via renderItem()
	});

	// check item listener
	$("#checkItem").on('click', function() {
		event.preventDefault();
		// call toggledChecked pasing the state & found element
		// render via renderItem()
	});

	// add item listener
	#("#deleteItem").on('click', function() {
		event.preventDefault();
		// calling deleteItem() passing the state & clicked element
		// render via renderItem
	});


});