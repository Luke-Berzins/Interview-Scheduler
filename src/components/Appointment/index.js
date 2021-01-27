import React from "react";
import "components/Appointment/styles.scss"
import Header from "components/Appointment/Header"
import Show from "components/Appointment/Show"
import Empty from "components/Appointment/Empty"
import Form from "components/Appointment/Form"
import Status from "components/Appointment/Status"
import Confirm from "components/Appointment/Confirm"
import Error from "components/Appointment/Error"
import  useVisualMode  from "hooks/useVisualMode";
const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

export default function Appointment(props) {
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    if (name && interviewer) {
    transition(SAVING);
    props.bookInterview(props.id, interview)
    .then(() => transition(SHOW))
    .catch(error => {
    transition(ERROR_SAVE, true)
    });
    }
  }


  function confirmDelete() {
  transition(DELETING, true);
  props
  .cancelInterview(props.id)
  .then(() => transition(EMPTY))
  .catch(error => 
  transition(ERROR_DELETE, true)
  
  );
  }
  

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  return  (
    
    <article className="appointment" data-testid="appointment">
    <Header time={props.time} />  
    {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
    {mode === SHOW && props.interview && (
          <Show
            student={props.interview.student}
            interviewer={props.interview.interviewer}
            onEdit={() => transition(EDIT)}
            onDelete={() => transition(CONFIRM)}
          />
        )}
    {mode === CREATE && <Form
    interviewers={props.interviewers}
    onCancel={() => back() }
    onSave={save}
    />}
    {mode === SAVING && <Status 
    message="Saving"    
    />}
    {mode === DELETING && <Status 
    message="Deleting"    
    />}
    {mode === CONFIRM && <Confirm
    message="Are you sure you want to delete?"
    onConfirm={confirmDelete}
    onCancel={() => back() }   
    />}
    {mode === EDIT && <Form
    interviewers={props.interviewers}
    onCancel={() => back() }
    onSave={save}
    name={props.interview.student}
    interviewer={props.interview.interviewer.id}
    />}
    {mode === ERROR_SAVE && (
          <Error
          message="Error Saving Appointment"
          onClose={() => back()} />
           )}
    {mode === ERROR_DELETE && (
          <Error
          message="Error Deleting Appointment"
          onClose={() => back()} />
           )}
    </article>
  )
}