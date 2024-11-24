//mcB34NlxviuecBpQnM1zAzconmHesBoO0wDZGvoypIGYfAbz4hAbkPcq


const auth = "mcB34NlxviuecBpQnM1zAzconmHesBoO0wDZGvoypIGYfAbz4hAbkPcq";

const gallery = document.querySelector(".gallery");
const searchInput = document.querySelector(".search-input");
const form = document.querySelector(".search-form");
let fetchLink;
let searchValue;
let page = 1;
const more = document.querySelector(".more");
let currentSearch;

searchInput.addEventListener("input", updateInput);
form.addEventListener("submit", (e) => {
    e.preventDefault();
    currentSearch = searchValue;
    searchPhotos(searchValue)

});

more.addEventListener('click', loadMore);

function updateInput(e) {
    searchValue = e.target.value;
}


async function fetchApi(url) {
    const dataFetch = await fetch(url, {
        method: "GET",
        headers: {
            Accept: "application/json",
            Authorrizaton: auth,

        },
    });

    const data = await dataFetch.json();
    return data;
}

// Genera

function generatePictures(data) {
    data.photos.forEach(photo => {
      const galleryImg = document.createElement("div");
      galleryImg.classList.add("galler-img");
      galleryImg.innerHTML = `
      <div class="gallery-info">
        <p>${photo.photographer}</p>
        <a href="${photo.src.large}" target="_blank">Download</a>
      </div>
      <img src="${photo.src.large}"></img>
      `;
      gallery.appendChild(galleryImg);
    });

}


async function curatedPhotos() {
    fetchLink = "https://api.pexels.com/v1/curated?per_page=15&page=1";
    const data = await fetchApi(fetchLink);
    generatePictures(data);
}

curatedPhotos();


function clear() {
    gallery.innerHTML = "";
    searchInput.innerHTML = "";
}

    async function searchPhotos(query) {
        clear();
        fetchLink = `https://api.pexels.com/v1/curated?per_page=15&page=1`;
        const data = await fetchApi(fetchLink);
        generatePictures(data);
    }

    async function loadMore() {
        page++;
        if (currentSearch) {
            fetchLink = `https://api.pexels.com/v1/curated?per_page=15&page=1`;
        } else {
            fetchLink = `https://api.pexels.com/v1/curated?per_page=15&page=1`;
        }
        const data = await fetchApi(fetchLink);
        generatePictures(data);
    }