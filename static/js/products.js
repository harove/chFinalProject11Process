import { httpClient } from './httpClient.js';
// Retrieve the payload data from the data attribute

const productListEl = document.getElementById('productListEl');
const prevLinkEl = document.getElementById('prevLink');
const nextLinkEl = document.getElementById('nextLink');
productListEl.classList.add('product-list');
const pageLinkEl = document.getElementById('page');
const totalPagesLinkEl = document.getElementById('totalPages');

const freshResponse = async (page)=>{
    const responseStream = await httpClient(`/api/products?page=${page}`)
    const response = await responseStream.json()
    return response
}

const renderAgain = (response)=>{
    prevLinkEl.href = response.prevLink;
    nextLinkEl.href = response.nextLink;
    
    pageLinkEl.href=`/products?page=${response.page}`
    pageLinkEl.innerHTML=response.page
    
    totalPagesLinkEl.href=`/products?page=${response.totalPages}`
    totalPagesLinkEl.innerHTML=response.totalPages

    const productDiv = document.createElement('div');
    productDiv.classList.add('product');

    console.log(Object.entries(response.payload[0]))

    Object.entries(response.payload[0]).forEach(([key,val])=>{
        const paragraph = document.createElement('p');
        paragraph.classList.add('product__item');
        paragraph.classList.add('col');
        paragraph.textContent = `${key}`;
        productDiv.appendChild(paragraph);
    })
    productListEl.appendChild(productDiv);


    response.payload.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');
    
        Object.entries(product).forEach(([key,val])=>{
            const paragraph = document.createElement('p');
            paragraph.classList.add('product__item');
            paragraph.classList.add('col');
            paragraph.textContent = `${val}`;
            productDiv.appendChild(paragraph);
        })

        const paragraph = document.createElement('p');
        paragraph.classList.add('product__item');
        paragraph.classList.add('col');
        paragraph.innerHTML = `<a href="/products/${product._id}">View</a>`;
        productDiv.appendChild(paragraph);

        productListEl.appendChild(productDiv);
    });
    
}





// Function to handle URL changes
async function handleUrlChange() {
    // Get the current URL
    var currentUrl = window.location.href;
  
    // Check if the URL contains the specified URI
    if (currentUrl.includes('http://localhost:8080/products')) {
      // Extract the page number from the URL
      var page = new URLSearchParams(window.location.search).get('page');
  
      // Do something with the page number

      const response = await freshResponse(page)
      renderAgain(response)
    }
  }
  
  // Attach the handleUrlChange function to the hashchange event
  window.addEventListener('hashchange', handleUrlChange);
  
  // Initial check when the page loads
  handleUrlChange();
  



