import React from 'react';
import moment from 'moment';

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

    			<td>{moment(event.start.local).format('MM/DD/YY hh:mm A')} - {moment(event.end.local).format('MM/DD/YY hh:mm A')}</td>

    			<td>
                    <img onClick={() => props.addEventToTrip(event,props.user,props.city)} style={styles.image} src={'http://www.clker.com/cliparts/f/e/5/e/11954452971071026229jean_victor_balin_add.svg.med.png'}/>
                    <img onClick={() => props.deleteEvent(event,props.user,props.city)} style={styles.image} src={'https://orig00.deviantart.net/bf3e/f/2017/209/d/3/battle_for_the_big_b__cross_body_newer__by_greatjobguys-dbhye7j.png'}/>
                    <a href={event.url}>  {event.name.text}</a> 
                </td>
    			<td>{event.start.local} - {event.end.local}</td>

    		</tr>
    		)}
    </tbody>
    </table>
  );
}

export default Events;