import React, {Component} from 'react';
//import gallaryImg from ".././resources/logo.png";
import Slideshow from '../components/Slideshow';
import image1 from './Slideshow/GalleryPhotos/BadminionsTeam-2.JPG';
import { Image} from 'semantic-ui-react';

export default class Gallery extends React.Component{

  state = {
    images:[
      //{id:1, src: image1}, {id:2, src: image1},
        {id:2, url:"https://picsum.photos/id/238/200/300"},
       {id:3, url:"https://picsum.photos/id/239/200/300"},
       {id:4, url:"https://picsum.photos/id/240/200/300"},
       {id:5, url:"https://picsum.photos/id/241/200/300"},
       {id:6, url:"https://picsum.photos/id/242/200/300"},
       {id:7, url:"https://picsum.photos/id/243/200/300"},
       {id:8, url:"https://picsum.photos/id/244/200/300"},
    ]
  }

  render(){
    return(
        <Slideshow slides = {this.state.images} />
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