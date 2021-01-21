export function getAppointmentsForDay(state, day) {
  const result = [];
  const filteredDays = state.days.filter(filteredDay => filteredDay.name === day )
  if (filteredDays.length === 0) {
    return [];
  }
  filteredDays[0].appointments.forEach(x => {
    for (let y in state.appointments) {
      if (state.appointments[y].id === x) {
        result.push(state.appointments[y])
      }
    }
  })
  
  return result;
}

export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }
  const result = {
    student: interview.student
  };
  let intID = interview.interviewer;
  result.interviewer = state.interviewers[`${intID}`];
  return result
}