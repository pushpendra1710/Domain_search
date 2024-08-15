function checkDomain() {
    // Make sure 'domainName' is correctly retrieved and defined
    const domainName = document.getElementById('domainInput').value.trim();
    if (!domainName) {
        alert('Please enter a domain name.');
        return;
    }

    const tlds = ['com', 'in', 'io',`ink`];
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = ''; // Clear previous results

    tlds.forEach(tld => {
        const url = `https://dns.google/resolve?name=${domainName}.${tld}`;
        
        fetch(url)
            .then(response => response.json())
            .then(data => {
                const listItem = document.createElement('li');
                
                if (data.Answer) {
                    listItem.classList.add('failure');
                    listItem.textContent = `${domainName}.${tld} is not available.`;
                } else {
                    listItem.classList.add('success');
                    listItem.textContent = `${domainName}.${tld} is available.`;
                }

                resultsContainer.appendChild(listItem);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    });
}
