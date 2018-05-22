import React ,{ Component } from 'react';
import getCSS from './getCSS.js';

class VolumeControlBox extends Component {
	constructor(props){
		super(props);

		this.state={
			flag:true,
			firstY:null,
			nowY:null,
			Y:null,
			btnStyle:null,
			barStyle:null
		}
		this.changeVolumeStart=this.changeVolumeStart.bind(this);
		this.changeVolume=this.changeVolume.bind(this);
		this.volumeDone=this.volumeDone.bind(this);
	}

	volumeinit(volumeInitFlag){
		if(volumeInitFlag){
			let volume=this.props.videoVolume*100+10;
			console.log(volume);
			let btnStylei={
				bottom: volume
			},
				barStylei={
					bottom: volume,
					height: 110-volume
			};
			this.setState({btnStyle: btnStylei,
										barStyle: barStylei});	
			this.props.changeVolumeInitFlag();
		}	
	}

	changeVolumeStart(e){
		e.dataTransfer.effectAllowed = "none";
		e.dataTransfer.setData("Node",e.target.id);
		this.setState({firstY: e.clientY,
									Y: getCSS(this.dragBtn,"bottom"),
									flag: true});
	}

	changeVolume(e){
		e.preventDefault();
		this.setState({nowY: e.clientY});
		let btnStylei=null,
				barStylei=null;
		let bottomNum=parseInt(this.state.Y)+this.state.firstY-this.state.nowY;
		if(this.state.flag){
			if(bottomNum>=10&&bottomNum<=110){
				btnStylei={
					bottom:bottomNum
				};
				barStylei={
					bottom:bottomNum,
					height:110-bottomNum
				};
				this.props.updateVolume((bottomNum-10)/100);
			}else if(bottomNum<10){
				btnStylei={
					bottom:10
				};
				barStylei={
					bottom:10,
					height:100
				};
				this.props.updateVolume(0);
			}else if(bottomNum>110){
				btnStylei={
					bottom:110
				};
				barStylei={
					bottom:110,
					height:0
				};
				this.props.updateVolume(1);
			}
			this.setState({btnStyle: btnStylei});
			this.setState({barStyle: barStylei});
		}
	}

	volumeDone(){
		this.setState({
									y: getCSS(this.dragBtn,"bottom"),
									flag: false});
	}
	render(){
		let volumeInitFlag=this.props.volumeInitFlag;
		
		return(
			<div className="volume-control-box"
					 onDragOver={this.changeVolume}
					 onDrop={this.volumeDone}
					 onMouseOver={this.volumeinit(volumeInitFlag)}>
        <div className="volume-control-bar">
        	<div className="volume-control-current" 
        			style={this.state.barStyle}
          		 ref={(dragBar)=>(this.dragBar=dragBar)}></div>
        </div>
        <div draggable="true" 
        		 className="volume-current"
        		 style={this.state.btnStyle}
        		 ref={(dragBtn)=>{this.dragBtn=dragBtn}}
        		 onDragStart={this.changeVolumeStart}
        		 onDragEnter={this.changeVolume}></div>
      </div>
			);
	}
}

export default VolumeControlBox;