import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

const backdropStyle={
    position: 'fixed',
    top: '0',
    bottom: '0',
    left:'0',
    right:'0',
    backgroundColor: 'rgb(255, 255, 255, 0.1)',
    padding: 50
};

const modalStyle={
    backgroundColor: '#fff',
    borderRadius: 5,
    maxWidth: 500,
    minHeight: 300,
    margin: '0, auto',
    padding: 30,
    position: 'relative'
};

const footerStyle= {
    position: 'absolute',
    bottom:20
};


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
            <div style={modalStyle}>
                {this.props.children}
                <div style={footerStyle}>
                    <button onClick={(e) => { this.onClose(e)}}>
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