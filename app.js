document.addEventListener('DOMContentLoaded', function () {
    const checkbox = document.getElementById('checkbox');
    const tablesSection = document.querySelector('.tablesSection');
    const inventoryItems = [];

    function checkIfExists(item, inventoryItems) {
        return inventoryItems.includes(item);
    }

    function modifyQuantity(e) {
        const clickedCell = e.target;
        const currentQuantity = clickedCell.textContent;
        const inputField = document.createElement('input');
        inputField.type = 'number';
        inputField.value = currentQuantity;

        // Replace the text content with the input field
        clickedCell.textContent = '';
        clickedCell.appendChild(inputField);

        // Focus on the input field
        inputField.focus();

        inputField.addEventListener('blur', function () {
            const newQuantity = inputField.value.trim();
            if (newQuantity !== '') {
                clickedCell.textContent = newQuantity;
            } else {
                clickedCell.textContent = currentQuantity; // Revert to the original quantity if input is empty
            }
        });
    }

    const inputForm = document.getElementById('inputForm');
    inputForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const itemInput = document.getElementById('item');
        const quantityInput = document.getElementById('quantity');

        const item = itemInput.value.trim();
        const quantity = quantityInput.value.trim();

        if (!item || !quantity) {
            alert('Fill out the form first');
            return;
        }

        if (checkIfExists(item, inventoryItems)) {
            alert('Item already exists');
            return;
        }

        inventoryItems.push(item);

        const table = document.querySelector('table');
        const newRow = table.insertRow();
        const cell1 = newRow.insertCell();
        const cell2 = newRow.insertCell();

        cell1.textContent = item;
        cell2.textContent = quantity;
        cell2.addEventListener('click', modifyQuantity);

        itemInput.value = '';
        quantityInput.value = '';
    });

    checkbox.addEventListener('change', function () {
        tablesSection.style.display = this.checked ? 'block' : 'none';
    });
});
