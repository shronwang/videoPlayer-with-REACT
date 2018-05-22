import React, { Component } from 'react';
import Volume from './icon/volume.svg';
import VolumeHover from './icon/volume-hover.svg';
import VolumeControlBox from './VolumeControlBox.js';

class VideoControlVolume extends Component{
	constructor(props){
		super(props);
		this.state={
			hover:false
		};
		this.handleIcon=this.handleIcon.bind(this);
		this.handleIconOut=this.handleIconOut.bind(this);
	}

	handleIcon(){
		this.setState({hover:true});
	}
	handleIconOut(){
		this.setState({hover:false});
	}
	render(){
		let iconStyle=null,
				volumeBox=null;
		if(this.state.hover){
			iconStyle={
				backgroundImage:'url('+VolumeHover+')',
				backgroundRepeat:'no-repeat',
			};
		}else{
			iconStyle={
				backgroundImage:'url('+Volume+')',
				backgroundRepeat:'no-repeat',
			};
		}
		volumeBox=(<div className="volume-icon" style={iconStyle}></div>);

		return (
			<div className="video-control-volume" 
					 onMouseOver={this.handleIcon}
					 onMouseOut={this.handleIconOut}>
        {volumeBox}
        <VolumeControlBox videoVolume={this.props.videoVolume}
        									updateVolume={this.props.updateVolume}
        									volumeInitFlag={this.props.volumeInitFlag}
        									changeVolumeInitFlag={this.props.changeVolumeInitFlag}/>
      </div>
			);
	}
}

export default VideoControlVolume;