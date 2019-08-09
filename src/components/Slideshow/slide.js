import React from 'react';
import {Modal, Image, Icon} from 'semantic-ui-react';

export default class Slide extends React.Component{
    render(){
        let url = this.props.url;
        return(
            // <div className="slide" style={{height:'100%', backgroundImage: 'url('+url+')', backgroundSize: 'cover'}}>
            //     {/* <img src={url} /> */}
            // </div>
            <Modal trigger={<Image src={url} size='medium'/>} >
                <Modal.Content image>
                    <Image wrapped src={url}/>
                </Modal.Content>
            </Modal>
            //<Modal closeIcon onClose={this.closeModal} open={showModal} trigger={<Button onClick={() => this.setState({ showModal: true })}><Icon className='plus' />New Challenge</Button>}></Modal>
        )
    }
}