import React from "react";
import "components/Appointment/styles.scss"
import Header from "components/Appointment/Header"
import Show from "components/Appointment/Show"
import Empty from "components/Appointment/Empty"


export default function Appointment(props) {

  return  (
    
    <article className="appointment">
    <Header time={props.time} />  
    { 
    props.interview ? 
    props.interview.interviewer ?
    <Show interviewer={props.interview.interviewer} student={props.interview.student} /> 
    : <Empty />
    : <Empty />
    }
    </article>
  )
}