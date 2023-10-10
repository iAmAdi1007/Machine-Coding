import PropTypes from 'prop-types'
import { useState } from 'react';
import './Carousel.css';

const Carousel = ({ images, currentSlideIndex }) => {

    const [slideIndex, setSlideIndex] = useState(currentSlideIndex);

    return (
        <div className='carouselBody'>
            {images.length === 0 && <h1>Loading....</h1>}
            {images?.map((image, index) => {
                return <img
                    src={image}
                    alt={`image-thumbnail-${index}`}
                    key={index}
                    className={`imageSlide ${slideIndex === index ? 'focused' : ''}`}
                />
            })}
            <button
                onClick={() => {
                    if (slideIndex === 0) return;
                    setSlideIndex(prev => prev - 1)
                }}>Previous</button>
            <button onClick={() => {
                if (slideIndex === images.length - 1) return;
                setSlideIndex(prev => prev + 1)
            }}>Next</button>
        </div>
    )
}

Carousel.propTypes = {
    images: PropTypes.array,
    currentSlideIndex: PropTypes.number
}

export default Carousel