import React from "react";
import "components/Appointment/styles.scss"
import Header from "components/Appointment/Header"
import Show from "components/Appointment/Show"
import Empty from "components/Appointment/Empty"
import Form from "components/Appointment/Form"
import Status from "components/Appointment/Status"
import  useVisualMode  from "hooks/useVisualMode";
const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVE = "SAVE";

export default function Appointment(props) {
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVE);
    props.bookInterview(props.id, interview).then(() => transition(SHOW));
  }
  function deleteAppoint() {
    props.cancelInterview()
  }
  const { mode, transition, back } = useVisualMode(
    props.interview ? 
    props.interview.interviewer ?
    SHOW : 
    EMPTY : 
    EMPTY
  );
  return  (
    
    <article className="appointment">
    <Header time={props.time} />  
    {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
    {mode === SHOW && (
    <Show
    student={props.interview.student}
    interviewer={props.interview.interviewer}
    // onEdit={transition("onEdit")}
    onDelete={deleteAppoint}
    />)}
    {mode === CREATE && <Form
    interviewers={props.interviewers}
    onCancel={() => back() }
    onSave={save}
    />}
    {mode === SAVE && <Status 
    message="Saving"    
    />}
    </article>
  )
}