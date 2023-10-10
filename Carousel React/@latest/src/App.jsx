import './App.css'
import Carousel from './components/Carousel';
import { useEffect, useState } from 'react';


function App() {
  const API_URL = "https://jsonplaceholder.typicode.com/photos";
  const [carouselImages, setCarouselImages] = useState([]);

  useEffect(() => {
    const fetchImages = async() => {
      const imageJson = await fetch(API_URL);
      const images = await imageJson.json();
      setCarouselImages(images.map(image => image.thumbnailUrl));
    }
    fetchImages()
  },[])

  return (
    <div className='main'>
      <h1>Welcome to Machine Coding!!</h1>
      <Carousel images={carouselImages.slice(0,10)} currentSlideIndex={0}/>
    </div>
  )
}

export default App
