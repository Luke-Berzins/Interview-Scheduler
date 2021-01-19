import React from "react";
import "components/DayListItem.scss";
const classNames = require('classnames');

export default function DayListItem(props) {
  const selectedDay = props.name;
  const spotsAvail = props.spots
  const formatSpots = function(spotsAvail) {
  if (spotsAvail === 1) {
    return "1 spot remaining"
  } else if (spotsAvail) {
    return `${spotsAvail} spots remaining`
  } return "no spots remaining"
  };

  const dayClass = classNames( "day-list__item",
   { 
      "day-list__item--selected" : props.selected,
      "day-list__item--full " : !props.spots
   })
  return (

    <li className={ dayClass } onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{ selectedDay }</h2> 
      <h3 className="text--light">{ formatSpots(spotsAvail) }</h3>
    </li>
  );
}