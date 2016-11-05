// State Modification Functions
var state = {
	items: []
}

// generates psuedo GUID ... since it uses Math.random
// but should be enough for our purposes
function generateID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
    return v.toString(16);
  });
}

function findItem(state, id) {
  var foundID = -1;
  state.items.forEach(function(item, index){
    if (item.id === id) {
      foundID = index;
    }
  });
  return foundID;
}

function addItem(state, name) {
	// add the item container
	var id = generateID();
	var item = {
		name: name,
		checked: false,
		id: id
	};
	state.items.push(item);
}

function toggleChecked(state, id) {
	// toggle selected item  line-through state 
	var foundID = findItem(state, id);
	if (foundID > -1) {
		if(state.items[foundID].checked) {
			state.items[foundID].checked = false;
		} else {
			state.items[foundID].checked = true;
		}
	}
}

function deleteItem(state, id) {
	// find item_num within state.items
	// remove found item from state.items
	var foundID = findItem(state, id);
	if (foundID > -1) {
		state.items.splice(foundID, 1);
	}
}


// Render Functions

function renderItems(state, element) {
  var itemsHTML = state.items.map(function(item){
    var shoppingItemChecked = '';
    if(item.checked) {shoppingItemChecked = ' shopping-item__checked'}
    
    return '<li >' +
              '<span class="shopping-item' + shoppingItemChecked + ' "data-id="' + item.id + '">' + item.name + '</span>' +
              '<div class="shopping-item-controls">' +
                '<button class="shopping-item-toggle">' +
                  '<span class="button-label">check</span>' +
                '</button>' +
                '<button class="shopping-item-delete">' +
                  '<span class="button-label">delete</span>' +
                '</button>' +
              '</div>' +
            '</li>';
  });
  element.html(itemsHTML);
};

// Event Listeners
$(function(){
  // add an item
  $('#js-shopping-list-form :submit').on('click', function(event){
    event.preventDefault();
    addItem(state, $("#shopping-list-entry").val());
    renderItems(state, $('.shopping-list'));
    $('#shopping-list-entry').val('');
  });
  
  // check an item
  $(".shopping-list").on('click', '.shopping-item-toggle', function(event){
    event.preventDefault();
    var id = $(event.target).closest("li").find("[data-id]").data("id");
    toggleChecked(state, id);
    renderItems(state, $('.shopping-list'));
  });
  
  // delete an item
  $(".shopping-list").on('click', '.shopping-item-delete', function(event){
    event.preventDefault();
    var id = $(event.target).closest("li").find("[data-id]").data("id");
    deleteItem(state, id)
    renderItems(state, $('.shopping-list'));
  });
});