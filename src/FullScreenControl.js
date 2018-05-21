import React, { Component } from 'react';
import Fullscreen from './icon/fullscreen.svg';
import Offscreen from './icon/offfullscreen.svg';

class FullScreenControl extends Component{
	constructor(props){
		super(props);

		this.fullScreen=this.fullScreen.bind(this);
	}

	fullScreen(){
		this.props.fullScreenHandler();
	}

	render(){
		let btn=null,
				btnStyle=null;
		if(this.props.fullscreenStutus){
			btnStyle = {
  			backgroundImage: 'url(' + Offscreen + ')',
  			backgroundRepeat: 'no-repeat',
			}
		}else {
			btnStyle = {
  			backgroundImage: 'url(' + Fullscreen + ')',
  			backgroundRepeat: 'no-repeat',
			}
		}
		btn=(<span className="video-control-fullscreen-btn" style={btnStyle}></span>);

		return (
			<div className="video-control-fullscreen" onClick={this.fullScreen}>
				{btn}
      </div>
			);
	}
}

export default FullScreenControl;