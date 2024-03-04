
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const searchResults = document.getElementById('searchResults');

    searchButton.addEventListener('click', function() {

        const name = searchInput.value;
        // Perform fetch request
        fetch(`https://dummyjson.com/products/search?q=${name}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                // Display search results
                displaySearchResults(data);
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
                searchResults.innerHTML = 'An error occurred while fetching data.';
            });
    });


    function displaySearchResults(data) {
        // Clear previous search results
        searchResults.innerHTML = '';

        // Display each result
        data.products.forEach(products => {
            const resultItem = document.createElement('div');
            resultItem.classList.add('result-item');
            resultItem.innerHTML = `
                <div class="rounded p-4 shadow-md bg-white md:h-96 w-full md:w-96 truncate hover:scale-110 transition-all text-balance">
                   <img src="${products.thumbnail}" class="w-full h-1/2" alt="">
                   <h3 class="text-xl font-bold">${products.title}</h3>
                   <h5 class="text-sm">Rating: ${products.rating}</h5>
                   <h5 class="text-sm text-red-500">Price: ${products.price}</h5>
                   <button class="btn btn-block mt-4 bg-black text-white hover:text-black">Buy Now</button>
               </div>
            `;
            searchResults.appendChild(resultItem);
        });

        if (data.length === 0) {
            searchResults.innerHTML = 'No results found.';
        }
    }
});
