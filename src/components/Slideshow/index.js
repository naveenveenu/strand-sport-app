import React from 'react';
import Slide from './slide';
import './slideshow.css';
import withModal from '../HOC/withModal';
import { Image, Card} from 'semantic-ui-react';


export default class Slideshow extends React.Component{
    render(){
        // let SlideWithModal = withModal(Slide);
            let slides = this.props.slides.map((slide) => {
            return <Slide key={slide.id} url = {slide.src} />
        })
        console.log(this.props.slides)
        return(
            <div className="slide-container">
                {slides}
               {/* <Card color='red'>{slides}</Card> */}
            </div>
        )         
    }
}