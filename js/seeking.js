const searchPhone = () => {
    const searcField = document.getElementById("search-box");
    const searchText = searcField.value;
    // clear data
    searcField.value = "";

    // load data
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    fetch(url)
        .then(res => res.json())
        .then(data => {
            if (searchText == "") {
                document.getElementById("empty").style.display = "block";
            }
            else {
                displaySearchResult(data.data.slice(0, 20));
                document.getElementById("empty").style.display = "none";
            }
        });
};
// console.log(searchText);

const displaySearchResult = phones => {
    const searchResult = document.getElementById("phone-container");
    // clear previous result
    searchResult.textContent = "";
    phones.forEach(phone => {
        // create detail 
        const div = document.createElement("div");
        div.classList.add("col");

        div.innerHTML = `
        <div class="card shadow-lg h-100 p-3 text-center border border-secondary rounded-3 mb-3">
          <img class="w-50 p-3" src="${phone.image}" class="card-img-top" alt="...">
          <div class="card-body">
            <h4 class="card-title"> ${phone.phone_name}</h4>
            <p class="card-text">${phone.brand}</p>
            <button onclick="phoneDetail('${phone.slug}')" type="button" class="btn btn-secondary">Details</button>
          </div>
        </div>
    
        `;
        searchResult.appendChild(div);
    })
}

const phoneDetail = phoneId => {
    // console.log(phoneId);
    const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`;
    // console.log(url);
    fetch(url)
        .then(res => res.json())
        .then(data => showDetails(data.data));
}

const showDetails = phone => {
    console.log(phone);
    const details = document.getElementById("details");
    // clear previous details
    details.textContent = "";

    const div = document.createElement("div");
    div.innerHTML = `
    <div class="card shadow-lg text-center border border-secondary rounded-3 m-3 w-100">
    <div class="row g-0">
        <div class="col-md-4">
            <img src="${phone.image}" class="w-100 rounded-start p-5 " alt="...">
        </div>
        <div class="col-md-8">
            <div class="card-body">
                <h2 class="card-title"><span class="fw-bold">${phone.name}</span></h2>
                <h4><span class="text-secondary">Brand:</span> ${phone.brand}</h4>
                <h4><span class="text-secondary">Release Date:</span> ${phone.releaseDate ? phone.releaseDate : 'Comming soon'}</h4>
                <h4><span class="text-secondary">Chip:</span>${phone.mainFeatures.chipSet}</h4>
                <h4><span class="text-secondary">Display:</span>${phone.mainFeatures.displaySize}</h4>
                <h4><span class="text-secondary">Memory:</span>${phone.mainFeatures.memory}</h4>
                <h4><span class="text-secondary"></span>${phone.mainFeatures.sensors[0]}</h4>
                <h4><span class="text-secondary"></span>${phone.mainFeatures.sensors[1] ? phone.mainFeatures.sensors[1] : 'Not found'}</h4>
                <h4><span class="text-secondary"></span>${phone.mainFeatures.sensors[2] ? phone.mainFeatures.sensors[2] : 'Not found'}</h4>
                <h4><span class="text-secondary"></span>${phone.mainFeatures.sensors[3] ? phone.mainFeatures.sensors[3] : 'Not found'}</h4>
                <h4><span class="text-secondary"></span>${phone.mainFeatures.sensors[4] ? phone.mainFeatures.sensors[4] : 'Not found'}</h4>
                <h4><span class="text-secondary"></span>${phone.mainFeatures.sensors[5] ? phone.mainFeatures.sensors[5] : 'Not found'}</h4>
                <h4><span class="text-secondary">Bluetooth:</span>${phone.others.Bluetooth}</h4>
                <h4></h4>
                <h4><span class="text-secondary">GPS:</span>${phone.others.GPS}</h4>
                <h4></h4>
                <h4><span class="text-secondary">NFC:</span>${phone.others.NFC}</h4>
                <h4></h4>
                <h4><span class="text-secondary">Radio:</span>${phone.others.Radio}</h4>
                <h4></h4>
                <h4><span class="text-secondary">USB:</span>${phone.others.USB}</h4>
                <h4></h4>
                <h4><span class="text-secondary">WLAN:</span>${phone.others.WLAN}</h4>
                <h4></h4>
            </div>
        </div>
    </div>
</div>
    `;
    details.appendChild(div);
}