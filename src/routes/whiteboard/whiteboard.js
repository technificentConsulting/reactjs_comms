import React, { Component } from 'react';
import ReactDOM from 'react-dom';
//import { Whiteboard, EventStream, EventStore } from '@ohtomi/react-whiteboard';
import DrawableCanvas from 'react-drawable-canvas'; 
import { CirclePicker } from 'react-color';
import Tooltip from 'rc-tooltip';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';
import '../whiteboard/whiteboard.css';

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);
const Handle = Slider.Handle;

export class TheWhiteboard extends Component {
    constructor(props){
        super(props);

        this.state = {
            brushColor: '#FFFF00',
            lineWidth: 4,
            canvasStyle: {
                backgroundColor: '#00FFDC'
            },
            clear: false,
            isInkChecked: true,
            isBgChecked: false
        }
    }

    componentDidMount(){
       
    }

      handleOnChangeOptInk = () => {
          this.setState({ isInkChecked: true, isBgChecked: false });
        }

    handleOnChangeOptBg = () => {
        this.setState({ isBgChecked: true, isInkChecked: false  });
    }
    // handleOnClickChangeColor = (color) => {
    //     if (this.state.isBgChecked){
    //         this.setState({
    //             canvasStyle: {
    //                 backgroundColor: color.hex
    //             }, clear: false});
    //     }else{
    //         this.setState({ brushColor: color.hex, clear: false});
    //     }
      
    // }s

    handleOnChangeBrushSize = (size) => {
        let canvas = document.querySelector('canvas');
        let ctx = canvas.getContext('2d');

        // ctx.fillStyle = 'rgb(200,0,0)';
        ctx.lineWidth = size;
        this.setState({ lineWidth: size, clear: false });
    }


    handleOnChangeColorOpts = (color)=> {
        let canvas = document.querySelector('canvas');
        let ctx = canvas.getContext('2d');

        if (this.state.isBgChecked) {

            //ctx.fillStyle = color.hex;

            this.setState({
                canvasStyle: {
                    backgroundColor: color.hex
                },
                 clear: false
            });
        } else {
            this.setState({ brushColor: color.hex, clear: false });
        }
    }

    handleOnClickClear() {
        this.setState({
            clear: true,
            isBgChecked: false,
            isInkChecked: false
        });
    }

    render() {
        const ops = {
            brushColor: '#800909',
            lineWidth: 4,
            canvasStyle: {
                backgroundColor: '#00FFDC',
                borderColor: '#786B6B',
                borderStyle: 'solid'
            }
        };
        const ops1 = {
            brushColor: '#0033CC',
            lineWidth: 4,
            canvasStyle: {
                backgroundColor: '#00FF00',
                borderColor: '#786B6B',
                borderStyle: 'solid'
            }
        };
        const ops2 = {
            brushColor: '#00FFFF',
            lineWidth: 4,
            canvasStyle: {
                backgroundColor: '#FFFF00',
                borderColor: '#786B6B',
                borderStyle: 'solid',
                borderRadius: '90px'
            }
        };
        const ops3 = {
            brushColor: '#FFFFFF',
            lineWidth: 4,
            canvasStyle: {
                backgroundColor: '#FF66FF',
                borderColor: '#786B6B',
                borderStyle: 'solid',
                borderRadius: '70px'
            }
        };
        const ops4 = {
            brushColor: '#84ff99',
            lineWidth: 4,
            canvasStyle: {
                backgroundColor: '#ff7d7d',
                borderColor: '#786B6B',
                borderStyle: 'solid'
            }
        };
        const ops5 = {
            brushColor: '#000000',
            lineWidth: 4,
            canvasStyle: {
                backgroundColor: '#FFFFFF',
                borderColor: '#786B6B',
                borderStyle: 'solid'
            }
        };
        const mainCanvas ={
            canvasStyle: {
                backgroundColor: '#FFF',
                borderColor: '#786B6B',
                borderStyle: 'solid',
                height: '400px'
            }
            
        };
        const colorSwatches = ["#000000", "#f44336", "#e91e63", "#9c27b0", "#673ab7", "#3f51b5", "#2196f3", "#03a9f4", "#00bcd4", "#009688", "#4caf50", "#8bc34a", "#ffeb3b", "#ffc107", "#ff9800", "#ff5722", "#795548", "#607d8b"];
        const wrapperStyle = { width: 400, margin: 50 };

        const handle = (props) => {
            const { value, dragging, index, ...restProps } = props;
            return (
                <Tooltip
                    prefixCls="rc-slider-tooltip"
                    overlay={value}
                    visible={dragging}
                    placement="top"
                    key={index}
                >
                    <Handle value={value} {...restProps} />
                </Tooltip>
            );
        };

        return(
            
            <div>
                <div className="lSideBar cWindow">
            <aside>
             
                    <h3>Change Colors</h3>

                    <span><input type="radio" defaultChecked={this.state.isInkChecked} 
                            name="colorOps" onChange={this.handleOnChangeOptInk.bind(this)}/><label>Ink</label></span>
                    <span><input type="radio" defaultChecked={this.state.isBgChecked} 
                            name="colorOps" onChange={this.handleOnChangeOptBg.bind(this)}/><label>Background</label></span>

                    <CirclePicker className="colorPicker" color={this.state.backgroundColor}
                        onChangeComplete={this.handleOnChangeColorOpts.bind(this)} colors={colorSwatches} />
                        <div>
                            <p>Pen size</p>
                            <Slider min={0} max={20} defaultValue={3} 
                            onChange={this.handleOnChangeBrushSize}
                            handle={handle} />
                        </div>
                    <button onClick={() => this.handleOnClickClear()}>Clear all</button> 
         
            </aside>
                </div>
                {/* <section>
                    <h2>Toolbox</h2>
                </section> */}
                <div className="mainBoard cWindow">
                    <DrawableCanvas id="mainCanvas" ref="mainCanvas" className={mainCanvas} {...this.state} />
            </div>
                
                {/* <Whiteboard
                    events={new EventStream()} eventStore={new EventStore()}
                    width={800} height={600}
                    style={{ backgroundColor: 'lightyellow' }}
                /> */}
                
              
            </div>
        );
    }
}