document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.querySelector('.search-bar button');
    const inputField = document.querySelector('.search-bar input');
    const resultsContainer = document.getElementById('results');
    const tlds = ['com','in','io','ink'];

    searchButton.addEventListener('click', async () => {
        const domain = inputField.value.trim();

        if (!domain) {
            alert('Please enter a domain name.');
            return;
        }

        // Clear previous results
        resultsContainer.innerHTML = '';

        try {
            const response = await fetch(`https://dns.google/resolve?name=${domain}`);
            const data = await response.json();

            if (data.Status === 0) {
                // Domain exists
                const listItem = document.createElement('li');
                listItem.className = 'success';
                listItem.textContent = `Domain "${domain}" is available.`;
                resultsContainer.appendChild(listItem);
            } else {
                // Domain not found
                const listItem = document.createElement('li');
                listItem.className = 'failure';
                listItem.textContent = `Domain "${domain}" does not  available.`;
                resultsContainer.appendChild(listItem);
            }
        } catch (error) {
            const listItem = document.createElement('li');
            listItem.className = 'failure';
            listItem.textContent = `Error: Could not available domain information.`;
            resultsContainer.appendChild(listItem);
        }
    });
});
