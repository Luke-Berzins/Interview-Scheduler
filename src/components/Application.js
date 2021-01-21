import React, { useState, useEffect } from "react";

import axios from "axios";
import DayList from "components/DayList";
import Appointment from "components/Appointment"
import "components/Application.scss";


const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 3,
    time: "2pm",
  },
  {
    id: 4,
    time: "3pm",
    interview: {
      student: "Anakin",
      interviewer: {
        id: 2,
        name: "Mace Windu",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 5,
    time: "4pm",
  }
];


export default function Application(props) {
  const [days, setDays] = useState([])
  const [selectDay, setDay] = useState("Monday");


  useEffect(() => {
    const daysURL = "/api/days";
    axios.get(daysURL)
    .then(response =>
      setDays(response.data), [days])
  })

  return (
    <main className="layout">
      <section className="sidebar">
      <img
  className="sidebar--centered"
  src="images/logo.png"
  alt="Interview Scheduler"
/>
<hr className="sidebar__separator sidebar--centered" />
<nav className="sidebar__menu">
<DayList
  days={days}
  day={ selectDay }
  setDay={setDay}
/>
</nav>
<img
  className="sidebar__lhl sidebar--centered"
  src="images/lhl.png"
  alt="Lighthouse Labs"
/>
      </section>
      <section className="schedule">
        {appointments.map(appointment => {
         return (  
          <Appointment key={appointment.id} {...appointment} />
  )
  }) }
          <Appointment key="last" time="5pm" />
      </section>
      
    </main>
  );
}


