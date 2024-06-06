import React, { useState } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import './ImageCarousel.css';


const ImageCarousel = () => {
    const [query, setQuery] = useState('');
    const [images, setImages] = useState([]);
    const [index, setIndex] = useState(0);
    const [direction, setDirection] = useState('slide-right');

    const runQuery = () => {
        fetch(`https://pixabay.com/api/?key=38984459-5c3246b89bb04dc2f7852dbcf&q=${query}`)
            .then((response) => response.json())
            .then(({ hits }) => hits.map(({ webformatURL }) => webformatURL))
            .then(setImages);
    }
    const slideLeft = () => {
        const nextIndex = index - 1;
        if (nextIndex < 0) {
            setIndex(images.length - 1);
        } else {
            setIndex(nextIndex);
        }
        setDirection('slide-left');
    }
    const slideRight = () => {
        setIndex((index + 1) % images.length);
        setDirection('slide-right');
    }
    const childFactory = (direction) => (child) => React.cloneElement(child, {
        classNames: direction,
    })
    return (
        <div className='image-container'>
            <div>
                <h2>Please enter the item you want to find in the image slider.</h2>
                <input className='input-box' onChange={(e) => setQuery(e.target.value)}></input>
                <button className='btn' onClick={runQuery}>Search</button>
            </div>
            {images.length > 0 && (
                <div className='image-slider'>
                    <button onClick={slideLeft}>{'<'}</button>
                    <div className='image-wrapper'>
                        <TransitionGroup childFactory={childFactory(direction)}>
                            <CSSTransition
                                key={images[index]}
                                timeout={1000}
                                classNames={direction}
                            >
                                <img src={images[index]} />
                            </CSSTransition>
                        </TransitionGroup>
                    </div>
                    <button onClick={slideRight}>{'>'}</button>

                </div>
            )}
        </div>
    );
};

export default ImageCarousel;
