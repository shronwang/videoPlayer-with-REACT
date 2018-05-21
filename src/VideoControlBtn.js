import React, { Component } from 'react';


class VideoControlBtn extends Component {
	constructor(props) {
    	super(props);

    	this.handleClick=this.handleClick.bind(this);	
  	}

  	handleClick(){
  		this.props.changeStutus();
  	}

	render(){
		let btn=null;

		if(this.props.videoStutus){
			btn=(<span className="to-pause"></span>);
		}else {
			btn=(<span className="to-play"></span>);
		}

		return (
			<div className="video-control-btn" onClick={this.handleClick}>
	           {btn}
	        </div>
			);
	}
}

export default VideoControlBtn;