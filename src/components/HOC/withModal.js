import React from 'react';
import Modal from '../Modal/Modal';
import { truncateSync } from 'fs';

const withModal =(WrappedComponent) => {
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
                <div onClick={(e) => {this.onShow(e)}}>
                    <WrappedComponent {...this.props} />
                    <Modal show={this.state.isOpen} onClose={this.onClose} >
                        <WrappedComponent  {...this.props}/>
                    </Modal>
                </div>
            );
        }
    }
    _WithModal.displayName = "WithModal";
    return _WithModal;
}
export default withModal;