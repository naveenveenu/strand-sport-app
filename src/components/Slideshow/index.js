import React from 'react';
import Slide from './slide';
import './slideshow.css';
import withModal from '../HOC/withModal';

export default class Slideshow extends React.Component{
    render(){
        let SlideWithModal = withModal(Slide);
        let slides = this.props.slides.map((slide) => {
            return <SlideWithModal key={slide.id} url = {slide.url} />
        })
        return(
            <div className="slide-container">
                {slides}
            </div>
        )         
    }
}