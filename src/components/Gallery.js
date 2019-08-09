import React, {Component} from 'react';
//import gallaryImg from ".././resources/logo.png";
import Slideshow from '../components/Slideshow';
import image1 from './Slideshow/GalleryPhotos/Winners_2017-1.JPG';
import image2 from './Slideshow/GalleryPhotos/Winners_2017-2.JPG';
import image3 from './Slideshow/GalleryPhotos/Winners_2017-3.JPG';
import image4 from './Slideshow/GalleryPhotos/Winners_2017-4.JPG';
import image5 from './Slideshow/GalleryPhotos/Winners_2017-5.JPG';
import image6 from './Slideshow/GalleryPhotos/Winners_2017-6.JPG';
import image7 from './Slideshow/GalleryPhotos/RunnersUp_2017-1.JPG';
import image8 from './Slideshow/GalleryPhotos/RunnersUp_2017-2.JPG';
import image9 from './Slideshow/GalleryPhotos/BadminionsTeam-1.JPG';
import image10 from './Slideshow/GalleryPhotos/BadminionsTeam-3.JPG';
import image11 from './Slideshow/GalleryPhotos/BadminionsTeam-2.JPG';
import {Modal, Image} from 'semantic-ui-react';

export default class Gallery extends React.Component{

  constructor(props) {
    super(props);
    this.state= {
      images:[
        {id:1, src: image1}, {id:2, src: image2}, {id:3, src: image3}, {id:4, src: image4}, 
        {id:5, src: image5}, {id:6, src: image6}, {id:7, src: image7}, {id:8, src: image8}, 
        {id:9, src: image9}, {id:10, src: image10}, {id:11, src: image11}, 
      ]
    }
  }

  render(){
   /*  let imag = this.props.slides.map((slide) => {
      return <Image key={slide.id} url = {slide.src} />
    });
 */
console.log(this.state);
    return(
        //<Slideshow slides = {this.state.images} />
        <div>
          {this.state.images.map(function(ind, key){
            return (<Modal trigger={<Image src= {ind.src} size='tiny'/>}>
            <Modal.Content image>
              <Image wrapped src={ind.src} />
            </Modal.Content>
          </Modal>);
          })}
        </div>
    )
  }
}



// import {Image, Card} from 'semantic-ui-react'
// import {Carousel, Item } from 'react-elastic-carousel'

// import teamSrc from ".././resources/badmintonLogo.jpg";

// //const src = "D:/projects/mern-stack-projects/strand-sports-app/src/resources/badmintonLogo.jpg"
// //./resources/badmintonLogo.jpg
// export default class Gallery extends React.Component{
//   constructor(props){
//     super(props);
//     this.state = {
//       a : [],
//       b : [],
//     }
//   }
//   componentWillMount(){
//     {
//       this.setState({
//       a: [teamSrc, teamSrc, teamSrc, teamSrc, teamSrc],
//       b: [teamSrc, teamSrc, teamSrc, teamSrc],
//       });
      
//     }
//   }
//   render(){
//     return(
//       <Carousel itemsToShow={1}>
//       <Item>1</Item>
//       <Item>2</Item>
//       <Item>3</Item>
//       <Item>4</Item>
//       <Item>5</Item>
//       <Item>6</Item>
//     </Carousel>
//     );
//   }
// }