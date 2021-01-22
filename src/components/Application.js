import React, { useState, useEffect } from "react";

import axios from "axios";
import DayList from "components/DayList";
import Appointment from "components/Appointment"
import "components/Application.scss";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";



export default function Application(props) {
  
  
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  })
  
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    setState({
      ...state,
      appointments
    });
    return axios.put(
      `/api/appointments/${id}`,
      { interview }
      )
      .then(response => {
      console.log(response)
    })
    .catch((err) => {
      console.log(err)
    });
  }

  function cancelInterview(a) {
    console.log("yeLOW")
  }
  
  const setDay = day => setState({ ...state, day });
  const setDays = days => setState(prev => ({ ...prev, days }));
  const setInterviewers = interviewers => setState(prev => ({...prev, interviewers}));
  const setAppointments = appointments => setState(prev => ({...prev, appointments}));
  
  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      setDays(all[0].data);
      setAppointments(all[1].data); 
      setInterviewers(all[2].data)
    })
  }, []);

  const appointments = getAppointmentsForDay(state, state.day);
  const schedule = appointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);
    const dailyInterviewers = getInterviewersForDay(state, state.day);
    return (
      <Appointment
        key={ appointment.id }
        id={ appointment.id }
        time={ appointment.time} 
        interview={ interview }
        interviewers={ dailyInterviewers }
        bookInterview={bookInterview}
        cancelInterview={ cancelInterview }
      />
    );
  });
  
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
          days={ state.days }
          day={ state.day }
          setDay={ setDay }
        />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        { schedule }
        <Appointment 
        key="last" 
        time="5pm"
        />
      </section>
    </main>
  );
}


