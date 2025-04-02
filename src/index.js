console.log('%c HI', 'color: firebrick')
// URLs for API requests
const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
const breedUrl = "https://dog.ceo/api/breeds/list/all";

// DOM elements
const dogImagesContainer = document.getElementById('dog-images');
const breedListContainer = document.getElementById('breed-list');
const breedFilter = document.getElementById('breed-filter');

// Function to fetch dog images
function fetchDogImages() {
  fetch(imgUrl)
    .then(response => response.json())
    .then(data => {
      data.message.forEach(imageUrl => {
        const imgElement = document.createElement('img');
        imgElement.src = imageUrl;
        dogImagesContainer.appendChild(imgElement);
      });
    })
    .catch(error => console.error("Error fetching dog images:", error));
}

// Function to fetch dog breeds
function fetchDogBreeds() {
  fetch(breedUrl)
    .then(response => response.json())
    .then(data => {
      const breeds = data.message;
      Object.keys(breeds).forEach(breed => {
        const breedItem = document.createElement('li');
        breedItem.textContent = breed;
        breedItem.addEventListener('click', () => {
          breedItem.classList.toggle('selected');
        });
        breedListContainer.appendChild(breedItem);
      });
    })
    .catch(error => console.error("Error fetching dog breeds:", error));
}

// Function to filter breeds based on selected letter
function filterBreedsByLetter(letter) {
  const breedItems = document.querySelectorAll('#breed-list li');
  breedItems.forEach(item => {
    const breedName = item.textContent.toLowerCase();
    if (letter === "" || breedName.startsWith(letter)) {
      item.style.display = "list-item";  // Show item
    } else {
      item.style.display = "none";  // Hide item
    }
  });
}

// Event listener for breed filter
breedFilter.addEventListener('change', (event) => {
  const letter = event.target.value;
  filterBreedsByLetter(letter);
});

// Initialize the app on page load
window.addEventListener('load', () => {
  fetchDogImages();
  fetchDogBreeds();
});
