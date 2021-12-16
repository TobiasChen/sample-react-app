import React from "react";
import { LoadingImage } from "./Image";
import './App.css'
import {Beer} from "./App";

interface entryProps{
    id: number,
    beer:Beer
    setAppStateFunction(id: number): unknown
}
export class Details extends React.Component<entryProps, {}>{
    constructor(props) {
        super(props);
    }

    render(){
        return(
            <div key={this.props.id} className="itemDetails" onClick={event => this.props.setAppStateFunction(null)}>
                <p>{this.props.beer.tagline}</p>
                <p>{this.props.beer.ph}</p>
            </div>
        )
    }
}
