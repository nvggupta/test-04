const input = document.getElementById("input");
const product = document.getElementById("product");
const detailsCard = document.getElementById("details-card");
const section1 = document.getElementById("section-1");
const body = document.getElementById("body");
async function details(input) {
    try {
        let res = await fetch(`https://openapi.programming-hero.com/api/phone/${input}`);
        if (!res.ok) {
            throw new Error('Network response was not ok');
        }
        let data = await res.json();
        console.log(data);

        const img = document.getElementById("img");
        const phone_name = document.getElementById("Phone_name");
        const model = document.getElementById("model");
        const storage = document.getElementById("storage");
        const chipset = document.getElementById("chipSet");
        const memory = document.getElementById("memory");
        const sensors = document.getElementById("sensors");
        body.style.overflowY= "hidden";
        detailsCard.style.display = "block";
        
        img.setAttribute("src", `${data.data.image}`);
        phone_name.innerHTML = data.data.brand;
        model.innerHTML = data.data.name;
        storage.innerHTML = data.data.mainFeatures.storage;
        chipset.innerHTML = data.data.mainFeatures.chipSet;
        memory.innerHTML = data.data.mainFeatures.memory;
        sensors.innerHTML = data.data.mainFeatures.sensors.join(', ');

        document.getElementById("close").addEventListener('click', () => 
            {
                body.style.overflowY= "scroll";
            detailsCard.style.display = "none";
        });
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
}

async function searching(inputs) {
    try {
        let response = await fetch(`https://openapi.programming-hero.com/api/phones?search=${inputs}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        let data = await response.json();
        console.log(data);
        removeAllNodes();

        data.data.forEach(element => {
            let newElement = createElements(element.brand, element.image, element.phone_name, element.slug);
            product.innerHTML += newElement;
        });

        const cardSearch = document.querySelectorAll(".card-Search");
        cardSearch.forEach(card => {
            card.addEventListener('click', () => {
                
                let slug = card.previousElementSibling.textContent.trim();
                console.log("clicked", slug);
                details(slug);
            });
        });
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
}

document.getElementById("search").addEventListener("click", () => {
    searching(input.value);
});

document.addEventListener("DOMContentLoaded", () => {
    searching('iPhone');
});

function removeAllNodes() {
    while (product.firstChild) {
        product.removeChild(product.firstChild);
    }
}

function createElements(brand, image, phone_name, slug) {
    return `
        <div class="card">
            <img src="${image}" alt=""/>
            <h1>${phone_name}</h1>
            <p>${slug}</p>
            <button class="search card-Search">Show Details</button>
        </div>
    `;
}
