import React from 'react';
import { data } from './data'
import './App.css';

function App() {
  const orderDate = data
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 
  'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const dateMonths = orderDate.map(({ date }) => {
    return months[new Date(date).getMonth()]
  })
  
  const removeMonthsDuplicates = dateMonths
    .filter((item, index) => dateMonths.indexOf(item) === index);

  const getCell = (day) => orderDate.filter(({date})=> {
    const dateTransform = new Date(date);
    const result = removeMonthsDuplicates
      .includes(months[dateTransform.getMonth()])
      && days[dateTransform.getDay()] === day
    return result
  })

  return (

    <table>
      <thead>
        <tr>
          <th></th>
          {removeMonthsDuplicates.map(month => (
            <th>{month}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {days.map(day => 
          <tr>
          <th>{day}</th>
          {getCell(day).map(({date}) => (
            <td>{date}</td>
          ))}
          </tr>
        )}
      </tbody>
    </table>
  );
}

export default App;
