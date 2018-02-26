import React from 'react';

const styles = {
    image: {
        width: '13px'
    }
}

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
    			<td><img onClick={() => props.addEventToTrip(event,props.user,props.city)} style={styles.image} src={'http://www.clker.com/cliparts/f/e/5/e/11954452971071026229jean_victor_balin_add.svg.med.png'}/><a href={event.url}>  {event.name.text}</a> </td>
    			<td>{event.start.local} - {event.end.local}</td>
    		</tr>
    		)}
    </tbody>
    </table>
  );
}

export default Events;