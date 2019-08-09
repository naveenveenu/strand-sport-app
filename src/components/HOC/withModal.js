import React from 'react';
//import Modal from '../Modal/Modal';
import { truncateSync } from 'fs';
import { Modal, Image} from 'semantic-ui-react';


const withModal =(WrappedComponent, url) => {
    class _WithModal extends React.Component{
        state = {
            isOpen: false
        }

        onShow = (e) => {
            this.setState({
                isOpen: true
            });
        }

       onClose = (e) => {
           this.setState({
               isOpen: false
           })
       } 

        render(){
            return(
                // {/* <div onClick={(e) => {this.onShow(e)}}>
                //     <WrappedComponent style={{ width:200, height:200}} {...this.props} />
                //     <Modal show={this.state.isOpen} onClose={this.onClose} >
                //         <WrappedComponent  {...this.props}/>
                //     </Modal>
                // </div> */}
                <div></div>
            );
        }
    }
    _WithModal.displayName = "WithModal";
    return _WithModal;
}
export default withModal;