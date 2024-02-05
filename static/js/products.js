import { httpClient } from './httpClient.js';
// Retrieve the payload data from the data attribute

const productsPage = document.querySelector('.products-page')
const productListEl = document.createElement('div');
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

    response.payload.forEach(product => {
        let li = null
        const ul = document.createElement('ul');
        ul.classList.add('product');
    
        Object.entries(product).forEach(([key,val])=>{
            const paragraph = document.createElement('p');
            paragraph.classList.add('product__item');
            paragraph.textContent = `${val}`;
            li = document.createElement('li');
            li.appendChild(paragraph);
            ul.appendChild(li)
        })
        productListEl.appendChild(ul);
    });
    
    productsPage.appendChild(productListEl)
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
  



