import React from 'react';

const Events = (props) => {

  return (
    <table>
      <tbody>
        <tr>
        	<th>Event Name</th>
        	<th>Event Duration</th>
        </tr>
        {props.events.map((event, index) =>
    		<tr key={index}> 
    			<td><a href={event.url}>{event.name.text}</a> </td>
    			<td>{event.start.local} - {event.end.local}</td>
    		</tr>
    		)}
    </tbody>
    </table>
  );
}

export default Events;