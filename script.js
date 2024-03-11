document.addEventListener('DOMContentLoaded', function () {
    const itemList = document.getElementById('item-list');
    const addForm = document.getElementById('add-item-form');
    const inputField = document.getElementById('item-input');

    // Load items from local storage
    function loadItems() {
        itemList.innerHTML = '';
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            const value = localStorage.getItem(key);
            addItemToDOM(key, value);
        }
    }

    // Add item to both local storage and DOM
    function addItem(event) {
        event.preventDefault();
        const itemName = inputField.value;
        if (itemName !== '') {
            const timestamp = new Date().getTime();
            localStorage.setItem(`item_${timestamp}`, itemName);
            addItemToDOM(`item_${timestamp}`, itemName);
            inputField.value = '';
        }
    }

    // Add item to the DOM
    function addItemToDOM(key, value) {
        const listItem = document.createElement('li');
        listItem.textContent = value;
        
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', function() {
            deleteItem(key);
            listItem.remove();
        });
        
        listItem.appendChild(deleteButton);
        itemList.appendChild(listItem);
    }

    // Delete item from both local storage and DOM
    function deleteItem(key) {
        localStorage.removeItem(key);
    }

    // Event listener for form submission
    addForm.addEventListener('submit', addItem);

    // Load items initially
    loadItems();
});
