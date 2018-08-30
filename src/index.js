import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'


class App extends React.Component{
    constructor(props){
        super(props);
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
                        <Timer />
                    </div>
                    <div className="interaction">
                        <Interaction />
                    </div>
                </div>
            </div>
        );
    }
}

class Timer extends React.Component{
    constructor(props){
        super(props);
        this.state = {
           timeNow: new Date() 
        };
    }
    render(){
        return null;
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
                <button>Start</button>
                <button>Stop</button>
                <button>Reset</button>
            </div>
        );
    }

}
    






ReactDOM.render(
    <App />,
    document.getElementById('root')
);
