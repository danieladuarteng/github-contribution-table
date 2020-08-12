import React, { useState, useEffect } from 'react';
import { data } from './data'
import Button from '@material-ui/core/Button';
import { BootstrapTooltip, useStyles } from "./styled"

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

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul',
    'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const dateMonths = dates?.map(({ date }) => {
    return months[new Date(date).getMonth()]
  })

  const valorColumn = (month) => {
    let result = dateMonths.filter(item => item === month).length
    return result === 7 ? 1 : Math.round(result / 7)
  }

  const removeMonthsDuplicates = dateMonths
    ?.filter((item, index) => dateMonths.indexOf(item) === index);

  // Criei um array com os intervalos

  let d1 = toDate(orderDate.map(({ date }) => date).shift()),
    d2 = toDate(orderDate.map(({ date }) => date).pop()),
    intervalos = [];
  const firstDate = days[new Date(orderDate.map(({ date }) => date).shift()).getDay()]

  switch (firstDate) {
    case 'Mon':
      d1.setDate(d1.getDate() - 2)
      break
    case 'Tue':
      d1.setDate(d1.getDate() - 3)
      break
    case 'Wed':
      d1.setDate(d1.getDate() - 4)
      break
    case 'Thu':
      d1.setDate(d1.getDate() - 5)
      break
    case 'Fri':
      d1.setDate(d1.getDate() - 6)
      break
    case 'Sat':
      d1.setDate(d1.getDate() - 7)
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

  const day = (date) => days[date.getDay()]
  const month = (date) => months[date.getMonth()]
  const year = (date) => date.getFullYear()
  const dateDay = (date) => date.getDate()
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
          month: month(date),
          year: year(date),
          dateDay: dateDay(date)
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
          month: month(dateString),
          year: year(dateString),
          dateDay: dateDay(dateString)
        })
      }

    }
    return arr
  }


  const countMaior = dates
    ?.sort((a, b) => (b.count) - new Date(a.count))
    .map(({ count }) => count).shift();

  let counts = []
  for (let i = 1; i <= 50; i++) {
    counts.push(i)
  }

  const checkColor = (count) => {
    let result = ''
    const base = Math.round(countMaior / 4)
    const secondColor = counts.slice(0, base);
    const terceiraColor = counts.slice(base, base * 2);
    const quartaColor = counts.slice((base * 2), countMaior - 1);

    if (count === 0) {
      result = '#ebedf0'
    } else if (secondColor.find(e => e === count)) {
      result = '#9be9a8'
    } else if (terceiraColor.find(e => e === count)) {
      result = '#40c463'
    } else if (quartaColor.find(e => e === count)) {
      result = '#30a14e'
    } else if (count >= countMaior) {
      result = '#216e39'
    }
    return result;
  }


  const classes = useStyles();

  return (

    <table className={classes.table}>
      <thead>
        <tr className={classes.button}>
          <td></td>
          {removeMonthsDuplicates?.map(month => (
            <td className={classes.button} key={month} colSpan={valorColumn(month)}>{month}</td>
          ))}
        </tr>
      </thead>
      <tbody>
        {days.map(day =>
          <tr key={day} className={classes.button}>
            <td>{day}</td>
            {removeMonthsDuplicates?.map(month => {
              return dates?.sort((a, b) => new Date(a.date) - new Date(b.date))
                .filter(item => item.month === month && item.day === day)
                .map(({ date, count, year, dateDay }) => (
                  <td key={date}
                    style={{
                      background: checkColor(count),
                    }}>
                    <BootstrapTooltip
                      background="#000"
                      title={
                        <React.Fragment>
                          {count === 0 ? 'No' : count} contributions on {month} {dateDay}, {year}
                        </React.Fragment>
                      }
                    >
                      <Button className={classes.root} />


                    </BootstrapTooltip>
                  </td>
                ))
            })}

          </tr>
        )}
      </tbody>
    </table >
  );
}

export default App;
