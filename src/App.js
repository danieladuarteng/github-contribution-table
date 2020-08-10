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

  const getCell = (day, date) => {
   
    // const dateTransform = new Date(date);
    // console.log(dateTransform)
    // const result = removeMonthsDuplicates
    //   .includes(months[dateTransform.getMonth()])
    //   && days[dateTransform.getDay()] === day ? date : 'sem data'
    //   console.log(result)
    // return result
    
// orderDate.filter(({date})=> {
//     const dateTransform = new Date(date);
//     const result = removeMonthsDuplicates
//       .includes(months[dateTransform.getMonth()])
//       && days[dateTransform.getDay()] === day
//     return result
//   })
  }

  const getMonth =(date) => {
    const dateTransform = new Date(date);
    const day = days[dateTransform.getDay()]
    const month = months[dateTransform.getMonth()]
    //setDates([...dates.date, ...dates.count, day, month])
  }

  console.log(getMonth('2017-06-12'))
  

  // Criei um array com os intervalos
 
 let d1 = toDate(orderDate.map(({date}) => date).shift()),
    d2 = toDate(orderDate.map(({date}) => date).pop()),
    intervalos = [];
  const firstDate = days[new Date(orderDate.map(({date}) => date).shift()).getDay()]
 //console.log(firstDate)
 const dayprimeiro =  toDate(orderDate.map(({date}) => date).shift())

 console.log(dayprimeiro)

  switch(firstDate){
    case 'Mon':
     d1.setDate( d1.getDate())
     break
    case 'Tue':
     d1.setDate( d1.getDate() -1 )
     break
    case 'Wed':
     d1.setDate( d1.getDate() -2 )
     break
    case 'Thu':
     d1.setDate( d1.getDate() -3 )
     break
    case 'Fri':
     d1.setDate( d1.getDate() -4 )
     break
    case 'Sat':
     d1.setDate( d1.getDate() -5 )
     break
    case 'Sun':
     d1.setDate( d1.getDate() -6 )
     break
  }
  

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

  console.log(intervalos)

 const dateTransform = (date) => new Date(date);
 const day = (date) => days[date.getDay()]
 const month = (date) => months[date.getMonth()]
 const date = (value) => dateTransform(value);

 const getDates = () => {
  const datasQueExistem = orderDate.map(({date}) => date)
  let arr = []
  for(let i =0; i < datasQueExistem.length; i ++){
    
    if(datasQueExistem.find(e => e === intervalos[i]) === undefined){
      const date = dateTransform(intervalos[i]);
      arr.push({
        date: intervalos[i],
        count : 0,
        day:day(date),
        month: month(date)
      })
    } else {
      const dateOriginal = orderDate[i].date;
      const count = orderDate[i].count;
      const dateString = dateTransform(dateOriginal);

      arr.push({
        date: dateOriginal,
        count,
        day:day(dateString),
        month: month(dateString)
      })
    }
  }
  return arr
 }

 console.log(dates)
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
          {dates && dates
            .filter(item => item.month === 'Oct' && item.day === day  )
            .map(({date}) =>(
            <td>{date}</td>
          ))}

          </tr>
        )} 
      </tbody>
    </table>
  );
}

export default App;
