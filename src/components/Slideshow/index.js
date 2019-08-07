import React from 'react';
import Slide from './slide';
import './slideshow.css';
import withModal from '../HOC/withModal';
import { Image, Card} from 'semantic-ui-react';


export default class Slideshow extends React.Component{
    render(){
        let SlideWithModal = withModal(Slide);
        let slides = this.props.slides.map((slide) => {
            return <SlideWithModal key={slide.id} url = {slide.url} />
        })
        return(
            <div className="slide-container">
                <Card.Group itemsPerRow={4}>
                    <Card color='red'>{slides}</Card>
                </Card.Group>     
            </div>
        )         
    }
}