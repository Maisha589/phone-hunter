const searchPhone = () => {
    const searcField = document.getElementById("search-box");
    const searchText = searcField.value;
    // clear data
    searcField.value = "";
    if (searchText == "") {
        console.log("error");
    }
    else {
        // load data
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
        fetch(url)
            .then(res => res.json())
            .then(data => displaySearchResult(data.data));
    }
    console.log(searchText);
}
const displaySearchResult = phones => {
    const searchResult = document.getElementById("phone-container");
    // clear previous result
    searchResult.textContent = "";
    phones.forEach(phone => {
        // console.log(phone);
        // creat detail div
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
    details.textContent = "";
    const div = document.createElement("div");
    div.innerHTML = `
    <div class="card p-4 border border-secondary border-4 rounded-3">
  <div>
  <img src="${phone.image}" class="card-img-top img-fluid w-50 w-lg-60" alt="...">
  </div>
  <div class="card-body text-center">
    <h3><span class="fw-bold">${phone.name}</span></h3>
    <h4>${phone.slug}</h4>
    <h4>${phone.releaseDate}</h4>
    <h4>${phone.mainFeatures.memory}</h4>
    <h4>${phone.mainFeatures.sensors[0]}</h4>
    <h4>${phone.others.USB}</h4>
    <P></p>
  </div>
</div>
    `;
    details.appendChild(div);
}