import React from 'react';
import AdminDialog from './components/AdminDialog';
import { Route } from "react-router-dom";
export default class MainComponent extends React.Component{
  render(){
    return(
      <Route path="/login" exact component={AdminDialog} />
    );
  }
}
