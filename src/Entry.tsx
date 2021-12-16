import React from "react";
import { LoadingImage } from "./Image";
import './App.css'
import {Beer} from "./App";
import { Link } from "react-router-dom";

interface entryProps{
    id: number,
    beer: Beer,
    setAppStateFunction(id: number): unknown
}
export class Entry extends React.Component<entryProps, {}>{
    constructor(props) {
        super(props);
    }

    render(){
        return(
            <div key={this.props.id} className="item" onClick={event => this.props.setAppStateFunction(this.props.id)}>
                <Link to={"/beer/" + this.props.beer.id} >{this.props.beer.name}</Link>
                <LoadingImage src={this.props.beer.image_url}></LoadingImage>
            </div>
        )
    }
}
