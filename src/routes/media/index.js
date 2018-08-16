import React, { Component } from 'react';
import  Peer from 'simple-peer';

// Possible Bandwidth issue
export class Media extends Component{
    constructor(){
        super();
        this.state = {
            isLoading: false,
            isRecordingVid: false,
            isRecordingAudio: false
        };
        this.handleRecordSubmit = this.handleRecordSubmit.bind(this);
        this.handleStopRecordSubmit = this.handleStopRecordSubmit.bind(this);
    }

    componentDidMount(){


    }

    handleRecordSubmit(){
        this.setState({ isLoading: false, isRecordingVid: true, isRecordingAudio: true });
        
        navigator.getUserMedia({ video: true, 
            audio: this.state.isRecordingAudio }, 
            this.gotMedia, function () { })
        console.log('Video recording state is ' + this.state.isRecordingVid);
    }

    handleStopRecordSubmit() {
        this.setState({ isLoading: false, isRecordingVid: false, isRecordingAudio: false });

        var video = document.querySelector('video');
        video.pause;

        console.log('Video recording state is ' + this.state.isRecordingVid);
    }

    handleRecordAudioCheck(){
        this.setState({ isRecordingAudio: true });
        console.log('Audio recording state is ' + this.state.isRecordingAudio);
    }

    gotMedia(stream) {
        var peer1 = new Peer({ initiator: true, stream: stream });
        var peer2 = new Peer();

        peer1.on('signal', function (data) {
            peer2.signal(data);
        })

        peer2.on('signal', function (data) {
            peer1.signal(data);
        })

        peer2.on('stream', function (stream) {
            // got remote video stream, now let's show it in a video tag
            var video = document.querySelector('video');
            video.src = window.URL.createObjectURL(stream);
            video.play();
        })
    }
    render(){
        return(
            <div className="componentView">
                <div className="cWindow">
                    <div>Check box to record audio</div>

                    <input type="button" value="Record" title="Connect" onClick={this.handleRecordSubmit.bind(this)} />
                    <input type="button" value="Stop" title="Stop" onClick={this.handleStopRecordSubmit.bind(this)} />
                    <input type="checkbox" defaultValue="checked" onChange={this.handleRecordAudioCheck.bind(this)} />
                    <label>Audio?</label>

                </div>
               <div className="cWindow">
                    <video />
               </div>
            </div>
            
        );
    }
}