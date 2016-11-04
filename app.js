// State Modification Functions
var state = {
	items: [],
	counter: 0  // {name: "apples", checked: false}
}

function addItem(state, name) {
	// add the item container
	var item_num = state.counter++;
	var item = {
		name: name,
		checked: false,
		id: item_num
	};
	state.items.push(item);
}

function toggleChecked(state, item_num) {
	// toggle selected item  line-through state 
	var foundID = findItem(state, item_num);
	if (foundID > -1) {
		if(state.items[foundID].checked) {
			state.items[foundID].checked = false;
		} else {
			state.items[foundID].checked = true;
		}
	}
}

function deleteItem(state, item_num) {
	// find item_num within state.items
	// remove found item from state.items
	var foundID = findItem(state, item_num);
	if (foundID > -1) {
		state.items.splice(foundID, 1);
	}
}

function findItem(state, item_num) {
  var foundID = -1;
  state.items.forEach(function(item, index){
    if (item.id === item_num) {
      foundID = index;
    }
  });
  return foundID;
}

// Render Functions

function renderItems(state, element) {
  var itemsHTML = state.items.map(function(item){
    var shoppingItemChecked = '';
    if(item.checked) {shoppingItemChecked = ' shopping-item__checked'}
    
    return '<li >'+
              '<span class="shopping-item' + shoppingItemChecked + ' " '+
                'data-id="' + item.id + '">' + item.name + '</span>' +
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