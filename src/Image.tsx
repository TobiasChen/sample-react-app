import React from "react";
import "./App.css"
interface imageState {loaded: Boolean}
interface imageProps {src: string}
export class LoadingImage extends React.Component<imageProps,imageState> {
    constructor(props){
        super(props);
        this.state = {loaded: false};
    }

    render(){
        return (
            <div className="imageDiv">
                {this.state.loaded ? null :
                    <div className="image"
                        style={{
                            background: 'red',
                            height: '400px',
                            width: '400px',
                        }}
                    />
                }
                <img className="image"
                    style={this.state.loaded ? {} : {display: 'none'}}
                    src={this.props.src}
                    onLoad={() => this.setState({loaded: true})}
                />
            </div>
        );
    }
}