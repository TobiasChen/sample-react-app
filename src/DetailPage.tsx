import React from "react";
import { LoadingImage } from "./Image";
import './App.css'
import {Beer} from "./App";
import {Params, useParams} from "react-router";

interface entryProps{
    params: Params
}

class DetailPage extends React.Component<entryProps, {beer: Beer}>{
    state = {
        beer: null
    }
    constructor(props) {
        super(props);
    }
    componentDidMount () {
        const { handle } = this.props.params
        console.log(handle)
        let url = 'https://api.punkapi.com/v2/beers/?'
        let params = {ids: this.props.params.id}
        return fetch(url + new URLSearchParams(params),{
            method: 'GET',
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }})
            // the JSON body is taken from the response
            .then(res => res.json())
            .then(res => {
                // The response has an `any` type, so we need to cast
                // it to the `Beer` type, and return it from the promise
                return res as Beer
            })
    }



    render(){
        return(
            <div className="contentBox">
                <div className="logo">
                </div>
                <div>
                    <p>test {this.props.params.id}</p>
                </div>
            </div>
        )
    }
}

export default function (props){
    let params = useParams();
    return <DetailPage {...props} params={params}></DetailPage>
}
