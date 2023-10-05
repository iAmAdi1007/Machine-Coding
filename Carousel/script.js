const API_URL = "https://jsonplaceholder.typicode.com/photos";

const fetchAndAppendImages = async () => {
    const imageJSON = await fetch(API_URL);
    let imageArray = await imageJSON.json();
    let carouselBody = document.querySelector('.carousel__body');
    imageArray.slice(0, 10).forEach((image, index) => {
        let carouselImage = document.createElement('img')
        carouselImage.src = image?.thumbnailUrl
        carouselImage.className = 'image'
        carouselBody.appendChild(carouselImage)
    })
    
}
const onMount = async() => {
    await fetchAndAppendImages();
    let counter = 0;
    const imageSlides = document.querySelectorAll('.image');
    imageSlides.forEach((slide, index) => {
        slide.style.left = `${index * 100}%`
    })

    const prevButton = document.querySelector('#previous');
    const nextButton = document.querySelector('#next');

    function moveSlide(){
        console.log('Move Slide Called with counter value:', counter);
        imageSlides.forEach((slide, index) => {
            slide.style.transform = `translateX(-${counter * 100}%)`
        })
    }

    prevButton.addEventListener('click', () => {
        console.log('Button Pressed');
        if(counter === 0) {
            return;
        }
        counter--;
        moveSlide();
    })

    nextButton.addEventListener('click', () => {
        if(counter === imageSlides.length - 1){
            return;
        }
        counter++;
        moveSlide();
    })
}

//performance

onMount();


