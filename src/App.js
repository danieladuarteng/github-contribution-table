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
  const daysMap = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat',];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul',
    'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const dateMonths = orderDate.map(({ date }) => {
    return months[new Date(date).getMonth()]
  })

  const valorColumn = (month) => {
    let result = dateMonths.filter(item => item === month).length

    return Math.round(result / 7)
  }

  const removeMonthsDuplicates = dateMonths
    .filter((item, index) => dateMonths.indexOf(item) === index);

  // Criei um array com os intervalos

  let d1 = toDate(orderDate.map(({ date }) => date).shift()),
    d2 = toDate(orderDate.map(({ date }) => date).pop()),
    intervalos = [];
  const firstDate = days[new Date(orderDate.map(({ date }) => date).shift()).getDay()]

  switch (firstDate) {
    case 'Tue':
      d1.setDate(d1.getDate() - 1)
      break
    case 'Wed':
      d1.setDate(d1.getDate() - 2)
      break
    case 'Thu':
      d1.setDate(d1.getDate() - 3)
      break
    case 'Fri':
      d1.setDate(d1.getDate() - 4)
      break
    case 'Sat':
      d1.setDate(d1.getDate() - 5)
      break
    case 'Sun':
      d1.setDate(d1.getDate() - 6)
      break
    default:
      d1.setDate(d1.getDate())
      break
  }

  intervalos.push(toString(d1));

  while (d1 < d2) {
    d1.setDate(d1.getDate() + 1);
    intervalos.push(toString(d1));
  }

  function toDate(texto) {
    let partes = texto.split('-');
    return new Date(partes[0], partes[1] - 1, partes[2]);
  }

  function toString(date) {
    return (date.getFullYear() + '-' +
      ('0' + (date.getMonth() + 1)).slice(-2) + '-' +
      ('0' + date.getDate()).slice(-2));
  }

  const day = (date) => daysMap[date.getDay()]
  const month = (date) => months[date.getMonth()]

  const getDates = () => {
    const datasQueExistem = orderDate.map(({ date }) => date)

    let arr = []

    for (let i = 0; i < intervalos.length; i++) {
      if (datasQueExistem.find(e => e === intervalos[i]) === undefined) {
        const date = toDate(intervalos[i]);
        arr.push({
          date: intervalos[i],
          count: 0,
          day: day(date),
          month: month(date)
        })
      }
    }

    for (let a = 0; a < datasQueExistem.length; a++) {

      if (intervalos.find(e => e === datasQueExistem[a]) !== undefined) {

        const dateOriginal = datasQueExistem[a];
        const count = orderDate
          .filter(item => item.date === datasQueExistem[a])
          .map(({ count }) => count)
        const dateString = toDate(dateOriginal);

        arr.push({
          date: dateOriginal,
          count: parseInt(count, 10),
          day: day(dateString),
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
            <th colSpan={valorColumn(month)}>{month}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {days.map(day =>
          <tr>
            <th>{day}</th>
            {removeMonthsDuplicates.map(month => {
              return dates && dates
                .filter(item => item.month === month && item.day === day)
                .map(({ date, count }) => (
                  <td>{count}</td>
                ))
            })}

          </tr>
        )}
      </tbody>
    </table>
  );
}

export default App;
