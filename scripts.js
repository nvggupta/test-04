const input = document.getElementById("input");
const search = document.getElementById("search");
const product = document.getElementById("product");
const cardDetails = document.getElementById("card-details");
console.log(product);
 async function searching(inputs) {
    try {
        let response = await fetch(`https://openapi.programming-hero.com/api/phones?search=${inputs}`);
        console.log(response);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        let data = await response.json();
        removeAllNodes();
        console.log(data);
       data.data.forEach(element => 
        {
            let newElement =   createElements(element.brand , element.image , element.phone_name , element.slug);
            product.innerHTML += newElement;
       });
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
 }
search.addEventListener("click" , ()=>{

     searching(input.value);
})
document.addEventListener("DOMContentLoaded", () => {
    searching('iPhone');
});
function removeAllNodes() {
    while (product.firstChild) {
        product.removeChild(product.firstChild);
    }
}
function createElements(brand , image , phone_name , slug)
{
    return `<div class="card">
    <img
      src=${image}
      alt=""
    />
    <h1>${phone_name}</h1>
    <p>
     ${slug}
    </p>
    <button class="search card-Search">Show Details</button>
  </div>
`
}