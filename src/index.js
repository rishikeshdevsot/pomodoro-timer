import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'

const MIL_SEC_25MIN = 25*60*1000;


class App extends React.Component{
    constructor(props){
        super(props);
        this.startTime = new Date();
        this.curTime = new Date();
        this.state = {ctTime : this.startTime.getTime() + MIL_SEC_25MIN  - this.curTime.getTime()};
        this.handleReset = this.handleReset.bind(this);
        this.handleStart = this.handleStart.bind(this);
        this.handleStop = this.handleStop.bind(this);
        this.updateTime = this.updateTime.bind(this);
    }
    handleStart(){
        console.log("clicked Start");
    }
    handleStop(){
        console.log("clicked Stop");
    }
    handleReset(){
        console.log("clicked Reset");
    }
    updateTime(){
        this.curTime = new Date();
        this.setState({ctTime : this.startTime.getTime() + MIL_SEC_25MIN  - this.curTime.getTime()});
    }

    componentDidMount(){
        this.setState({ctTime : this.startTime.getTime() + MIL_SEC_25MIN  - this.curTime.getTime()});
        setInterval(this.updateTime, 1000);
    }

    render()
    {
        return(
            <div>
                <div className = "Heading">
                <h1 >POMODORO TIMER</h1>
                </div>
                <div className="Body">
                    <div>
                        <Timer curTimez={this.state.ctTime}/>
                    </div>
                    <div className="interaction">
                        <Interaction startClick={this.handleStart} 
                        stopClick={this.handleStop} 
                        resetClick={this.handleReset} />
                    </div>
                </div>
            </div>
        );
    }
}

class Timer extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        this.minutes = Math.floor(this.props.curTimez/(1000*60))
        this.seconds = Math.floor((this.props.curTimez/1000)%60);
        return(
        <p className="displayTime">{String("0"+this.minutes).slice(-2)+":"+String("0"+this.seconds).slice(-2)}</p>
        );
    }

}

class Interaction extends React.Component{
    constructor(props){
        super(props);
    }

    render()    {
        return(
            <div>
                <button onClick = {this.props.startClick}>Start</button>
                <button onClick = {this.props.stopClick}>Stop</button>
                <button onClick = {this.props.resetClick}>Reset</button>
            </div>
        );
    }

}
    






ReactDOM.render(
    <App />,
    document.getElementById('root')
);
