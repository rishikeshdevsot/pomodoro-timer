import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'

const MIL_SEC_25MIN = 25*60*1000;
const MIL_SEC_5MIN = 5*60*1000;
const MIL_SEC_15MIN = 15*60*1000;


class App extends React.Component{
    constructor(props){
        super(props);
        this.startTime = new Date();
        this.curTime = new Date();
        this.startclicked = false;
        this.interval = MIL_SEC_25MIN;
        this.state = {ctTime : this.startTime.getTime() + this.interval  - this.curTime.getTime(),
                       stage: "work",
                       numWorkStages: 0};
        this.handleReset = this.handleReset.bind(this);
        this.handleStart = this.handleStart.bind(this);
        this.updateTime = this.updateTime.bind(this);
        this.updateStage = this.updateStage.bind(this);
    }

    handleStart(){
        if(!this.startclicked){
            this.startclicked = true;
            this.startTime = new Date();
            this.timeID = setInterval(this.updateTime, 1000);
        }
    }

    handleReset(){
        clearInterval(this.timeID);
        this.startTime = new Date();
        this.curTime = new Date();
        this.interval = MIL_SEC_25MIN;
        this.startclicked = false;
        this.setState({ctTime : this.startTime.getTime() + this.interval  - this.curTime.getTime(),
                       stage: "work",
                       numWorkStages: 0});
    }

    updateStage(){
        if((this.state.numWorkStages<4) && (this.state.stage === "work")){
            this.setState({stage : "sBreak", numWorkStages: this.state.numWorkStages + 1});
            this.interval = MIL_SEC_5MIN;
        }
        else if((this.state.stage === "sBreak")||(this.state.stage === "lBreak")){
            this.setState({stage : "work"});
            this.interval = MIL_SEC_25MIN;
        }
        else{
            this.setState({stage : "lBreak", numWorkStages : 0});
            this.interval = MIL_SEC_15MIN;
        }
        this.startTime = new Date();
        this.curTime = new Date();
        this.setState({ctTime : this.startTime.getTime() + this.interval  - this.curTime.getTime()})
    }

    updateTime(){
        this.curTime = new Date();
        this.setState({ctTime : this.startTime.getTime() + this.interval  - this.curTime.getTime()});
        if(this.state.ctTime <= 0){
            this.updateStage;
        }
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
                        <Timer curTimez={this.state.ctTime} stage={this.state.stage}/>
                    </div>
                    <div className="interaction">
                        <Interaction startClick={this.handleStart} 
                        resetClick={this.handleReset} 
                        skipClick={this.updateStage}/>
                    </div>
                </div>
            </div>
        );
    }
}

class Timer extends React.Component{
    
    render(){
        this.minutes = Math.floor(this.props.curTimez/(1000*60))
        this.seconds = Math.floor((this.props.curTimez/1000)%60);
        if(this.props.stage === "lBreak"){
            this.stage = "Take a break for 15min!"
        }
        else if(this.props.stage === "sBreak"){
            this.stage = "Take a 5min break!"
        }
        else{
            this.stage = "Work for 25min"
        }
        return(
        <div>
        <h1>{this.stage}</h1>
        <p className="displayTime">{String("0"+this.minutes).slice(-2)+":"+String("0"+this.seconds).slice(-2)}</p>
        </div>
        );
    }

}

class Interaction extends React.Component{

    render()    {
        return(
            <div>
                <button onClick = {this.props.startClick}>Start</button>
                <button onClick = {this.props.resetClick}>Reset</button>
                <button onClick = {this.props.skipClick}>Skip</button>
            </div>
        );
    }

}
    






ReactDOM.render(
    <App />,
    document.getElementById('root')
);
