import React, { Component } from "react";

export class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hours: 0,
      minutes: 0,
      seconds: 0,
      countdown: null,
      isPaused: false, 
      initialCountdown: null, 
    };
    this.timer = null; 
  }

  /*The below functions are all timer-related functions. From handling the change in the interval, to starting the timer,
    pausing it, reseting and resuming it. Finally we have a function to fix the format of displaying the numbers.
  */
  componentWillUnmount() {
    clearInterval(this.timer);
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: Number(e.target.value) });
  };

  startTimer = () => {
    const { hours, minutes, seconds } = this.state;
    const totalSeconds = hours * 3600 + minutes * 60 + seconds;

    if(totalSeconds === 0) {
        alert("Can't Count Down From Zero!");
        return;
    }

    this.setState({
      countdown: totalSeconds,
      initialCountdown: totalSeconds, 
      isPaused: false,
    });

    this.timer = setInterval(() => {
      this.setState((prevState) => {
        if (prevState.countdown > 0) {
          return { countdown: prevState.countdown - 1 };
        } else {
          clearInterval(this.timer);
          return { countdown: 0 };
        }
      });
    }, 1000);
  };

  pauseTimer = () => {
    clearInterval(this.timer);
    this.setState({ isPaused: true });
  };

  resetTimer = () => {
    clearInterval(this.timer);
    this.setState({
      countdown: null,  
      hours: 0,         
      minutes: 0,       
      seconds: 0,       
      isPaused: true,   
    });
  };

  resumeTimer = () => {
    if (this.state.countdown > 0) {
      this.setState({ isPaused: false });
      this.timer = setInterval(() => {
        this.setState((prevState) => {
          if (prevState.countdown > 0) {
            return { countdown: prevState.countdown - 1 };
          } else {
            clearInterval(this.timer);
            return { countdown: 0 };
          }
        });
      }, 1000);
    }
  };

  formatTime = (time) => {
    const hrs = Math.floor(time / 3600);
    const mins = Math.floor((time % 3600) / 60);
    const secs = time % 60;
    return `${String(hrs).padStart(2, "0")}:${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };


  /*The render for the page starts with a header, then dropdowns for hours, minutes, and seconds, all linked with handling the change
    in the interval for the timer. Below them, a line of buttons for the different functionalities of the timer, start, pause, resume 
    and reset. Finally, the span element for the displaying of the numbers.
  */
  render() {
    const { hours, minutes, seconds, countdown, isPaused } = this.state;
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h3 className='d-flex justify-content-center m-3'>
            Countdown Timer
        </h3>

        <div>
          {/* Dropdown for hours */}
          <label>
            <h6>Hours</h6>
          </label>
          <select name="hours"
                value={hours} 
                onChange={this.handleChange}
                style={{margin: "15px", width: '50px'}}
            >
            {[...Array(24).keys()].map((h) => (
              <option key={h} value={h}>{h}</option>
            ))}
          </select>
          

          {/* Dropdown for minutes */}
          <label>
            <h6>Minutes</h6>
          </label>
          <select name="minutes" 
                value={minutes} 
                onChange={this.handleChange}
                style={{margin: "15px", width: '50px'}}
            >
            {[...Array(60).keys()].map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>

          {/* Dropdown for seconds */}
          <label>
            <h6>Seconds</h6>
          </label>
          <select name="seconds" 
                value={seconds} 
                onChange={this.handleChange}
                style={{margin: "15px", width: '50px'}}
            >
            {[...Array(60).keys()].map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        {/* Buttons */}
        <div style={{ marginTop: "20px" }}>
          <button className="btn btn-success" 
                onClick={this.startTimer} 
                disabled={countdown !== null && !isPaused}
                style={{ marginRight: "20px" }}
            >
            Start 
          </button>
          <button className="btn btn-warning" 
                onClick={this.pauseTimer} 
                disabled={isPaused || countdown === null}
                style={{ marginRight: "20px" }}
            >
            Pause
          </button>
          <button className="btn btn-secondary" 
                onClick={this.resumeTimer} 
                disabled={!isPaused || countdown === null}
                style={{ marginRight: "20px" }}    
            >
            Resume
          </button>
          <button className="btn btn-danger" 
                onClick={this.resetTimer} 
                disabled={countdown === null}
                style={{ marginRight: "20px" }}    
            >
            Reset
          </button>
        </div>

        {/* Countdown Timer Display */}
        <div style={{ fontSize: "5rem", marginTop: "50px" }}>
          <span>{countdown !== null ? this.formatTime(countdown) : "00:00:00"}</span>
        </div>
      </div>
    );
  }
}