const searchPhone = () => {
    const searcField = document.getElementById("search-box");
    const searchText = searcField.value;
    // clear data
    searcField.value = "";
    if (searchText == "") {
        document.getElementById("empty").style.display = "block";
    }
    else {
        // load data
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
        fetch(url)
            .then(res => res.json())
            .then(data => displaySearchResult(data.data));
        document.getElementById("empty").style.display = "none";
    }
    console.log(searchText);
}
const displaySearchResult = phones => {
    const searchResult = document.getElementById("phone-container");
    // clear previous result
    searchResult.textContent = "";
    phones.forEach(phone => {
        // create detail 
        const div = document.createElement("div");
        div.classList.add("col");

        div.innerHTML = `
        <div class="card h-100 p-3 text-center border border-secondary rounded-3 m-3">
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
    const div = document.createElement("div");
    div.innerHTML = `
    <div class="card text-center border border-secondary rounded-3 m-3 w-100">
    <div class="row g-0">
        <div class="col-md-4">
            <img src="${phone.image}" class="img-fluid rounded-start " alt="...">
        </div>
        <div class="col-md-8">
            <div class="card-body">
                <h2 class="card-title"><span class="fw-bold">${phone.name}</span></h2>
                <h4>${phone.slug}</h4>
                <h4><span class="text-secondary">Release Date:</span> ${phone.releaseDate}</h4>
                <h4><span class="text-secondary">Feature:</span>${phone.mainFeatures.chipSet}</h4>
                <h4><span class="text-secondary">Sensor:</span>${phone.mainFeatures.sensors[0]}</h4>
                <h4>${phone.others.USB}</h4>
            </div>
        </div>
    </div>
</div>
    `;
    details.appendChild(div);
}