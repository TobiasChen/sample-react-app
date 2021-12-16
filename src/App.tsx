import React from "react";
import useHistory, {NavigateFunction, useNavigate} from "react-router-dom";
import { Entry } from "./Entry"
import './App.css'
import {Details} from "./Detail";
export interface Beer {
    id: number
    name: string
    image_url: string
    tagline: string
    ph: number
}
interface navigationProp{
    navigation: NavigateFunction
}

class App extends React.Component<navigationProp, {beer: Beer[], searchQuery: string, detail: number}> {
    constructor(props) {
        super(props);
        this.state = {beer: [], searchQuery: "", detail : null};
        this.handler = this.handler.bind(this)
    }
    handler(id : number){
        if(this.state.detail === id){
            this.setState({
                detail: null
            })
        }
        else {this.setState({
            detail : id

        })
        }
    }

    async getBeer(name: string): Promise<Beer[]> {
        // For now, consider the data is stored on a static `users.json` file
        let url = 'https://api.punkapi.com/v2/beers/?'
        let params = {beer_name: name}
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
                return res as Beer[]
            })
    }
    resolveBeerPromise(beer: Promise<Beer[]>){
        beer.then(data => {
            console.log(data)
            this.setState({beer: data});
        });
    }
    onSubmitQuery(event){
        event.preventDefault();
        this.resolveBeerPromise(this.getBeer(this.state.searchQuery));
        this.props.navigation(`?s=${this.state.searchQuery}`)
    }

    render(){
        return(
        <div className="contentBox">
            <form action="/" method="get" onSubmit={event => this.onSubmitQuery(event)}>
                <label htmlFor="header-search">
                    <span className="visually-hidden">Search Beer </span>
                </label>
                <input
                    value={this.state.searchQuery}
                    onChange={event => {
                        this.setState({searchQuery: event.target.value})
                    }}
                    type="text"
                    id="header-search"
                    placeholder="Beer Name"
                    name="s"
                />
                <button type="submit">Search</button>
            </form>
            <div className="table">
            {
                this.state.beer.map((post, index) => {
                    if(index == this.state.detail) return (
                        <div>
                            <Entry id={index} beer={post} setAppStateFunction={this.handler}></Entry>
                        </div> )
                    return(<Entry id={index} beer={post} setAppStateFunction={this.handler}></Entry>)
                })
            }
            </div>
        </div>
        )
    }
}

export default function (props){
    const navigation = useNavigate();
    return <App {...props} navigation={navigation}></App>
}

