import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'


class App extends React.Component{
    constructor(props){
        super(props);
        this.state = {curTime : new Date()};
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
        this.setState({curTime: new Date()});
    }

    componentDidMount(){
        this.setState({curTime: new Date()});
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
                        <Timer curTimez={this.state.curTime.toLocaleTimeString()}/>
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
        return(
        <p>{this.props.curTimez}</p>
        );
    }

}

class Interaction extends React.Component{
    constructor(props){
        super(props);
        //this.state();
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
