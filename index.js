const loadPhones = async(searchValue, dataLimit) =>{
    
    
    
    const url =`https://openapi.programming-hero.com/api/phones?search=${searchValue}`
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data, dataLimit);

}

const processLoader = (dataLimit) =>{

    toggleSpinner(true)
 
    const searchField = document.getElementById('input-field')
    searchValue = searchField.value;
    loadPhones (searchValue, dataLimit)
    console.log(searchValue)
    searchField.value = "";
 }


const displayPhones = (phones, dataLimit) =>{
    console.log(phones)
    const phoneContainer = document.getElementById('phone-container')
    phoneContainer.innerText = '';
    // display 20 phones only
    const showAll = document.getElementById('show-all')
    if(dataLimit && phones.length > 12){
        phones = phones.slice(0, 12)
        showAll.classList.remove('d-none')
    }
    else{
        showAll.classList.add('d-none')
    }
    // display No Phone Found
    const noPhone = document.getElementById('no-phone-found');
    if(phones.length === 0){
        noPhone.classList.remove('d-none')
    }
    else{
        noPhone.classList.add('d-none')
    }
    // display phones
    phones.forEach(phone => {
        console.log(phone)
        const {brand, phone_name, image, slug} = phone;
        const phoneDiv = document.createElement('div') 
        phoneDiv.classList.add('col')   
        phoneDiv.innerHTML = `
        <div class="col p-4">
        <div class="card p-4">
        <img src="${image}" class="card-img-top w-75" alt="...">
        <div class="card-body">
        <h3 class="card-title">Brand: ${brand}</h3>
        <h4 class="card-title">Phone Name: ${phone_name}</h4>
        <p class="card-text">Firstly, when anyone wants to buy a device they find out the premium things on the device according to their price.</p>
        <button onclick="loadPhoneDetails('${slug}')" class="btn btn-primary">Show Details</button>
        </div>
        </div>
        </div>
        `;
        phoneContainer.appendChild(phoneDiv);
    });
    // spinner stop 
    toggleSpinner(false)
}

const loadPhoneDetails = (id) =>{
    const url = `https://openapi.programming-hero.com/api/phone/${id}`
    fetch(url)
    .then(res => res.json())
    .then(data => displayPhoneDetails(data.data))
}

const displayPhoneDetails = (phoneId) =>{
    window.scrollTo(0, 40);
    const displayPhoneDetailsContainer = document.getElementById('phone-details');
    displayPhoneDetailsContainer.innerText = ''; 
    const {mainFeatures, name, releaseDate, image   } = phoneId;
    const {storage, displaySize, chipSet, memory   } = mainFeatures;
    const phoneDiv = document.createElement('div');
    phoneDiv.classList.add('card');
    phoneDiv.innerHTML = `
    <div class="card mb-3" style="max-width: 540px;">
        <div class="row g-0">
          <div class="col-md-4">
           <img src="${image}" class="img-fluid d-flex align-items-center " alt="...">
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h4 >Name:${name}</h4>
            <h6 >Release Date:${releaseDate ? releaseDate : 'N/A'}</h>
            <h4 class="text-center">Main Features</h4>
            <h5>Storage:${storage ? storage : "N/A"}}</h5>
            <h5>Display Size:${displaySize ? displaySize : "N/A"}}</h5>
            <h5>Chipset:${chipSet ? chipSet : "N/A"}}</h5>
            <h5>Memory:${memory ? memory : "N/A"}}</h5>
          </div>
        </div>
      </div>
    </div>
    `;
    displayPhoneDetailsContainer.appendChild(phoneDiv);

}


const toggleSpinner = isLoading => {
    const loadSpinner = document.getElementById('loader')
    if(isLoading){
        loadSpinner.classList.remove('d-none')
    }
    else{
        loadSpinner.classList.add('d-none')
    }
}


document.getElementById('search-btn').addEventListener('click', function(){
    const limitedPhone = 12;
    processLoader(limitedPhone);
    
})

document.getElementById('btn-show-all').addEventListener('click', function(){
    loadPhones(searchValue);
})

// loadPhones()