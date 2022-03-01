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
    phones.forEach(phone => {
        // console.log(phone);
        const div = document.createElement("div");
        div.classList.add("col");
        // div.classList.add("p-0");
        div.innerHTML = `
    
        <div class="card h-100 p-3 text-center border border-secondary rounded-3 m-3">
          <img class="w-50 p-3" src="${phone.image}" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">Name: ${phone.phone_name}</h5>
            <p class="card-text">Brand: ${phone.brand}</p>
            <button type="button" class="btn btn-secondary">Secondary</button>
          </div>
        </div>
    
        `;
        searchResult.appendChild(div);
    })
}
