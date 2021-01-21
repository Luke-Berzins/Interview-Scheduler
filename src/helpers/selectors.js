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