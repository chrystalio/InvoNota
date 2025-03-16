// Save Data to LocalStorage
const saveFormData = () => {
    const formData = {
        invoiceNumber: document.getElementById('invoice-number').value,
        currency: document.getElementById('currency').value,
        tax: document.getElementById('tax').value,
        issueDate: document.getElementById('issue-date').value,
        dueDate: document.getElementById('due-date').value,
        businessName: document.getElementById('business-name').value,
        businessAddress: document.getElementById('business-address').value,
        businessEmail: document.getElementById('business-email').value,
        customerName: document.getElementById('customer-name').value,
        customerAddress: document.getElementById('customer-address').value,
        customerEmail: document.getElementById('customer-email').value,
        bankName: document.getElementById('bank-name').value,
        accountName: document.getElementById('account-name').value,
        accountNumber: document.getElementById('account-number').value,
    }

    localStorage.setItem('invoiceData', JSON.stringify(formData));
}

// Attach eventListener to input fields to autoSave
document.querySelectorAll("input, select, textarea").forEach(input => {
    input.addEventListener('input', saveFormData);
});


document.getElementById('generate').addEventListener('click', function () {
    // Get form values
    const invoiceNumber = document.getElementById('invoice-number').value || '-';
    const currency = document.getElementById('currency').value || 'IDR';
    const tax = parseFloat(document.getElementById('tax').value) || 0;
    const issueDate = document.getElementById('issue-date').value || '-';
    const dueDate = document.getElementById('due-date').value || '-';

    const businessName = document.getElementById('business-name').value || '-';
    const businessAddress = document.getElementById('business-address').value || '-';
    const businessEmail = document.getElementById('business-email').value || '-';

    const customerName = document.getElementById('customer-name').value || '-';
    const customerAddress = document.getElementById('customer-address').value || '-';
    const customerEmail = document.getElementById('customer-email').value || '-';

    const bankName = document.getElementById('bank-name').value || '-';
    const accountName = document.getElementById('account-name').value || '-';
    const accountNumber = document.getElementById('account-number').value || '-';

    // Fill invoice details in the template
    document.getElementById("invoice-business-name").textContent = businessName;
    document.getElementById("invoice-business-address").textContent = businessAddress;
    document.getElementById("invoice-business-email").textContent = businessEmail;
    document.getElementById("invoice-business-email-footer").textContent = businessEmail;
    document.getElementById("invoice-customer-name").textContent = customerName;
    document.getElementById("invoice-customer-address").textContent = customerAddress;
    document.getElementById("invoice-customer-email").textContent = customerEmail;
    document.getElementById("invoice-number").textContent = invoiceNumber;
    document.getElementById("invoice-issue-date").textContent = issueDate;
    document.getElementById("invoice-due-date").textContent = dueDate;
    document.getElementById("invoice-bank-name").textContent = bankName;
    document.getElementById("invoice-account-name").textContent = accountName;
    document.getElementById("invoice-account-number").textContent = accountNumber;
    document.getElementById("invoice-tax-percentage").textContent = tax;

    // Process invoice items
    const itemList = document.getElementById('invoice-items');
    itemList.innerHTML = '';

    const items = document.querySelectorAll("[placeholder='Item Name']");
    const quantities = document.querySelectorAll("[placeholder='Quantity']");
    const prices = document.querySelectorAll("[placeholder='Price']");

    let subtotal = 0;

    items.forEach((item, index) => {
        const itemName = item.value.trim();
        const quantity = parseInt(quantities[index].value) || 0;
        const price = parseFloat(prices[index].value) || 0;
        const total = price * quantity;
        subtotal += total;

        if (itemName) {
            itemList.innerHTML += `
                <tr class="border-b border-gray-200">
                    <td class="py-3 px-4">${itemName}</td>
                    <td class="py-3 px-4 text-center">${quantity}</td>
                    <td class="py-3 px-4 text-right">${currency} ${price.toFixed(2)}</td>
                    <td class="py-3 px-4 text-right">${currency} ${total.toFixed(2)}</td>
                </tr>
            `;
        }
    });

    // Calculate tax and total
    const taxAmount = (subtotal * tax) / 100;
    const total = subtotal + taxAmount;

    // Update invoice totals
    document.getElementById('invoice-subtotal').textContent = `${currency} ${subtotal.toFixed(2)}`;
    document.getElementById('invoice-tax').textContent = `${currency} ${taxAmount.toFixed(2)}`;
    document.getElementById('invoice-total').textContent = `${currency} ${total.toFixed(2)}`;

    // Show the invoice template before generating PDF
    document.getElementById("invoice-template").classList.remove("hidden");

    // Generate PDF
    html2pdf().from(document.getElementById("invoice-template")).save(`Invoice_${invoiceNumber}.pdf`);
});
