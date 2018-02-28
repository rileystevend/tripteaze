import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

const Eatin = (props) => {
  return (
    <div>
      {props.restaurants.map((food, index) => (
        <div key= {index} >
          <RaisedButton onClick={() => props.addFoodToTrip(food, props.user, props.city)} label='Add' />
            Restraurant Name
            <a href={food.restaurant.url}>  {food.restaurant.name} </a> 
            average_cost_for_two
            { food.restaurant.average_cost_for_two }
        </div>
    ))}
    </div>
  );
}

export default Eatin;