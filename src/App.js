import React, { useState, useEffect } from 'react';
import { data } from './data'
import './App.css';

function App() {
  const [dates, setDates] = useState();

  useEffect(() => {
    async function fetchData() {
      let result = await getDates();
      result = result
      .sort((a, b) => new Date(a.date) - new Date(b.date));
      setDates(result)
    }
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
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

  // Criei um array com os intervalos
  let d1 = toDate(orderDate.map(({date}) => date).shift()),
    d2 = toDate(orderDate.map(({date}) => date).pop()),
    intervalos = [];

  intervalos.push( toString(d1) );

  while ( d1 < d2 ) {
    d1.setDate( d1.getDate() + 1 );
    intervalos.push( toString(d1) );
  }

  function toDate(texto) {
    let partes = texto.split('-');
    return new Date(partes[0], partes[1]-1, partes[2]);
  }

  function toString(date) {
    return (date.getFullYear() + '-' +
      ('0' + (date.getMonth() + 1)).slice(-2) + '-' +
      ('0' + date.getDate()).slice(-2));
  }

 const getDates = () => {
  const datasQueExistem = orderDate.map(({date}) => date)
  let arr = []
  for(let i =0; i < datasQueExistem.length; i ++){
    
    if(datasQueExistem.find(e => e === intervalos[i]) === undefined){
      arr.push({date: intervalos[i], count : 0})
    } else {
      arr.push(orderDate[i])
    }
  }
  return arr
 }
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
          {dates && dates.map(({date, count}) =>(
            <td>{count}</td>
          ))}
          </tr>
        )} 
      </tbody>
    </table>
  );
}

export default App;
