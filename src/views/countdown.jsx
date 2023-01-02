import React, { useEffect, useState } from "react";
import "../css/countdown.css";
let days = 0, hours =0, minutes =0, seconds=0, name = 'No Name';
function Countdown() {
  const [dateState, setDateState] = useState(new Date());
  const [timeState, setTimeState] = useState(null);
  const [nameState, setNameState] = useState('No Name');
  return (<center>
    <main>
      <article id="container">
        <section id="tool">
          <br />
          <input type="text" placeholder="Event Name"
            onChange={(event) => setNameState(event.target.value)}
          
          /> <br /> 
          <input
            type="date"
            id="date"
            onChange={(event) => setDateState(event.target.value)}
          />{" "}
          <br />
          <input type="time" name="" id="hour" 
            onChange={(event) => setTimeState(event.target.value)}
          
           />
          <br />
          <button
            onClick={ 
              useCountdown(dateState,timeState, nameState)
            }
          
          
          >
            Set Event
          </button>
        </section>
        <center><h2>{name}</h2></center>

        <section id="time">
          <div className="time-value">{ days > 0 ? days : 0 } <br /> <span>Days</span></div>
          <div className="time-value"> {hours > 0 ? hours: 0} <br /> <span>Hours</span></div>
          <div className="time-value">{minutes > 0? minutes:0} <br /> <span>Minutes</span></div>
          <div className="time-value">{seconds>0 ? seconds:0} <br /> <span>Seconds</span></div>
        </section>
      </article>
    </main>
  </center>

  );
}

const useCountdown = (targetDate, targetTime, targetName ) => {
  name = targetName
  let date = new Date(targetDate);
  if(targetTime !==null){
     let splitTime = targetTime.split(':')
     let hour = splitTime[0];
     let minute= splitTime[1]
     date.setHours(hour)
     date.setMinutes(minute)
  }

  let countDownDate = date.getTime();
  const [countDown, setCountDown] = useState(
    countDownDate - new Date().getTime()
  );
  useEffect(() => {
    const interval = setInterval(() => {
      setCountDown(countDownDate - new Date().getTime());
    }, 1000);
    return () => clearInterval(interval);
  }, [countDownDate]);
  getReturnValues(countDown)
};
const getReturnValues = (countDown) => {
  days = Math.floor(countDown / (1000 * 60 * 60 * 24));
 hours = Math.floor(
    (countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
   seconds = Math.floor((countDown % (1000 * 60)) / 1000);

  return [days, hours, minutes, seconds];
};

// changeDataHandle(event){
//     console.log(event.target.value)
//     this.setState({
//         [event.target.name]:''
//     })
// }
export default Countdown;
