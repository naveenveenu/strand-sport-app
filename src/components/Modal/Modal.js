import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { relative } from 'path';
import { Icon } from 'semantic-ui-react';

const backdropStyle={
    position: 'fixed',
    top: '0',
    bottom: '0',
    right:'0',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    padding: 50
};

const modalStyle={
    backgroundColor: '#fff',
    borderRadius: 10,
    maxWidth: 600,
    minHeight: 300,
    padding: 10,
    position: 'relative',
    marginLeft: 250
};

const footerStyle= {
    position: 'relative',
    bottom: '0'
};

const closeButton ={
    position: 'relative',
    backgroundColor: 'rgb(255,0,0)',
    marginTop : 200,
    marginLeft : 700
}



export default class Modal extends React.Component{
    onClose = (e) => {
        e.stopPropagation();
        this.props.onClose && this.props.onClose(e);
    }

    onKeyUp = (e) => {
        if(e.which === 27 && this.props.show){
            this.onClose(e);
        }
    }

    render(){
        if(!this.props.show){
            return null;
        }
        return(
        <div style={backdropStyle}>
            <div style={modalStyle} closeIcon>
                {this.props.children}
                <div style={footerStyle}>
                    <button style={closeButton} onClick={(e) => { this.onClose(e)}}>
                        Close
                    </button> 
                </div>
            </div>
        </div>
        )
    }
}
Modal.propTypes = {
    onClose: PropTypes.func.isRequired   
}