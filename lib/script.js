// Select DOM elements for form and list
const addItems = document.querySelector('.add-items');
const itemsList = document.querySelector('.plates');

// Array to store all todo items - load from localStorage or start empty
const items = JSON.parse(localStorage.getItem('items')) || [];   

const addItem = (e) => {
    // Prevent default form submission behavior
    e.preventDefault();
    
    // Get the text value from the input field
    const text = (e.currentTarget.querySelector('[name=item]')).value;
    
    // Create a new item object with text and completion status
    const item = {
        text, 
        done: false
    };

    // Add the new item to the items array
    items.push(item);
    
    // Update the display with the new item
    populateList(items, itemsList);
    
    // Save updated items to localStorage for persistence
    localStorage.setItem('items', JSON.stringify(items));
    
    // Clear the form input for next entry
    e.currentTarget.reset();
}

const populateList = (plates = [], platesList) => {
    // Generate HTML for each item and join them together
    platesList.innerHTML = plates.map((plate, i) => {
        return `
        <li class="border-b border-black/20 py-2.5 font-thin flex"> 
            <input type="checkbox" class="peer" data-index=${i} id="item${i}" ${plate.done ? 'checked' : ''}>
            <label for="item-${i}" class="flex-1 cursor-pointer before:content-[' '] before:mr-2.5 before:w-6 before:inline-block peer-checked:before:content-['🌮']">
                ${plate.text}
            </label>
        </li>
        `
    }).join(''); 
}

const toggleDone = (e) => {
    // Only proceed if the clicked element is an input (checkbox)
    if(!e.target.matches('input')) return;
    
    const el = e.target;
    const index = el.dataset.index;
    
    // Toggle the done status of the item
    items[index].done = !items[index].done;
    
    // Save updated items to localStorage
    localStorage.setItem('items', JSON.stringify(items));
    
    // Update the display to reflect the change
    populateList(items, itemsList);
}

// Add event listener to the form for submission
addItems.addEventListener('submit', addItem);

// Add event listener to the list for checkbox clicks (event delegation)
itemsList.addEventListener('click', toggleDone);

// Initialize the list display on page load
populateList(items, itemsList);


