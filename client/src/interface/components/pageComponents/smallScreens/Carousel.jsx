import React, { useState, useRef } from 'react';
// import './Slider.css'; // Import CSS for styling

const Carousel = ({ images }) => {
  const [startX, setStartX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragTranslate, setDragTranslate] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const sliderRef = useRef(null);

  const handleTouchStart = (e) => {
    setStartX(e.touches[0].clientX);
    setIsDragging(true);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const x = e.touches[0].clientX;
    const dragDistance = x - startX;
    setDragTranslate(dragDistance);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    const threshold = Math.abs(dragTranslate / sliderRef.current.offsetWidth);
    if (threshold > 0.2) {
      if (dragTranslate > 0) {
        setCurrentImageIndex((prevIndex) =>
          prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
      } else {
        setCurrentImageIndex((prevIndex) =>
          prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
      }
    }
    setDragTranslate(0);
  };

  return (
    <div
      className="slider"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      ref={sliderRef}
    >
      <div className="slides" style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}>
        {images.map((image, index) => (
          <div key={index} className="slide">
            <img src={image} alt={`Slide ${index}`} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
