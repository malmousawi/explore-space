
const apiKey = "5RaMN183unU0pwhNH5C2La0vNrsdNWFl3eYcqB9d";
const rover = "Perseverance";
const url = `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/latest_photos?api_key=${apiKey}`;


async function fetchMarsPhotos() {
    try {
        const response = await fetch(url);
        const data = await response.json();
        
        if (!data.latest_photos.length) {
            console.error("No new photos available");
            return;
        }

        const latestPhotos = data.latest_photos.slice(0, 15); 
        displayPhotos(latestPhotos);
    } catch (error) {
        console.error("Error fetching Mars photos:", error);
    }
}

function displayPhotos(photos) {
    const container = document.getElementById("photo-container");
    container.innerHTML = ""; 

    photos.forEach(photo => {
        const img = document.createElement("img");
        img.src = photo.img_src;
        img.alt = `Mars Rover Image - ${photo.earth_date}`;
        container.appendChild(img);
    });
}



function toMarsPage() {
    window.location.href = '../pages/mars.html';
}

function homePage() {
    window.location.href = '../pages/index.html';

}

fetchMarsPhotos();
