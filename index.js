
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

function generateStarfield() {
    const starfield = document.querySelector(".starfield");
    if (!starfield) return;

    const numStars = 100; 
    let boxShadowArray = [];

    for (let i = 0; i < numStars; i++) {
        let x = Math.random() * window.innerWidth;
        let y = Math.random() * window.innerHeight;
        boxShadowArray.push(`${x}px ${y}px white`);
    }

    starfield.style.boxShadow = boxShadowArray.join(", ");
}

let currentSlide = 0;
const slides = document.querySelectorAll(".slide");

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.toggle("active", i === index);
    });
}


setInterval(() => {
    currentSlide = (currentSlide + 1) % slides.length; 
    showSlide(currentSlide);
}, 20000);

// Scroll to navigate (loops slides)
document.addEventListener("wheel", (event) => {
    if (event.deltaY > 0) {
        currentSlide = (currentSlide + 1) % slides.length; // Scroll down loops back
    } else {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length; // Scroll up loops back
    }
    showSlide(currentSlide);
});

generateStarfield();
fetchMarsPhotos();
showSlide(currentSlide);

