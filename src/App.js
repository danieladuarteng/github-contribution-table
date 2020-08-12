import React, { useState, useEffect } from 'react';
import { data } from './data'
import Button from '@material-ui/core/Button';
import { GithubTooltip, useStyles } from "./styled"

function App() {
  const [dates, setDates] = useState();

  useEffect(() => {
    async function fetchData() {
      let result = await getDates();
      result = result
        .sort((a, b) => new Date(a.date) - new Date(b.date));
      setDates(result);
    }
    fetchData();
  }, []);

  const orderDate = data
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul',
    'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const dateMonths = dates?.map(({ date }) => {
    return months[new Date(date).getMonth()]
  })

  const columnSize = (month) => {
    let result = dateMonths.filter(item => item === month).length
    return result === 7 ? 1 : Math.round(result / 7)
  }

  const removeMonthsDuplicates = dateMonths
    ?.filter((item, index) => dateMonths.indexOf(item) === index);

  const getDates = () => {
    let initialDate = toDate(orderDate.map(({ date }) => date).shift()),
      finalDate = toDate(orderDate.map(({ date }) => date).pop()),
      daysThatHaveNoValue = [];

    switch (days[initialDate.getDay()]) {
      case 'Mon':
        initialDate.setDate(initialDate.getDate() - 1)
        break
      case 'Tue':
        initialDate.setDate(initialDate.getDate() - 2)
        break
      case 'Wed':
        initialDate.setDate(initialDate.getDate() - 3)
        break
      case 'Thu':
        initialDate.setDate(initialDate.getDate() - 4)
        break
      case 'Fri':
        initialDate.setDate(initialDate.getDate() - 5)
        break
      case 'Sat':
        initialDate.setDate(initialDate.getDate() - 6)
        break
      default:
        initialDate.setDate(initialDate.getDate())
        break
    }

    switch (days[finalDate.getDay()]) {
      case 'Sun':
        finalDate.setDate(finalDate.getDate() + 6)
        break
      case 'Mon':
        finalDate.setDate(finalDate.getDate() + 5)
        break
      case 'Tue':
        finalDate.setDate(finalDate.getDate() + 4)
        break
      case 'Wed':
        finalDate.setDate(finalDate.getDate() + 3)
        break
      case 'Thu':
        finalDate.setDate(finalDate.getDate() + 2)
        break
      case 'Fri':
        finalDate.setDate(finalDate.getDate() + 1)
        break
      default:
        finalDate.setDate(finalDate.getDate())
        break
    }

    daysThatHaveNoValue.push(toString(initialDate));

    while (initialDate < finalDate) {
      initialDate.setDate(initialDate.getDate() + 1);
      daysThatHaveNoValue.push(toString(initialDate));
    }

    function toDate(texto) {
      let parts = texto.split('-');
      return new Date(parts[0], parts[1] - 1, parts[2]);
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

    const daysThatHaveValue = orderDate.map(({ date }) => date)

    let totalDates = []

    for (let i = 0; i < daysThatHaveNoValue.length; i++) {

      if (daysThatHaveValue.find(e => e === daysThatHaveNoValue[i])
        === undefined) {
        const date = toDate(daysThatHaveNoValue[i]);
        totalDates.push({
          date: daysThatHaveNoValue[i],
          count: 0,
          day: day(date),
          month: month(date),
          year: year(date),
          dateDay: dateDay(date)
        })
      }

    }

    for (let a = 0; a < daysThatHaveValue.length; a++) {

      if (daysThatHaveNoValue.find(e => e === daysThatHaveValue[a])
        !== undefined) {

        const dateOriginal = daysThatHaveValue[a];
        const count = orderDate
          .filter(item => item.date === daysThatHaveValue[a])
          .map(({ count }) => count)
        const dateString = toDate(dateOriginal);

        totalDates.push({
          date: dateOriginal,
          count: parseInt(count, 10),
          day: day(dateString),
          month: month(dateString),
          year: year(dateString),
          dateDay: dateDay(dateString)
        })
      }

    }
    return totalDates
  }


  const highestCount = dates
    ?.sort((smaller, bigger) => (bigger.count) - new Date(smaller.count))
    .map(({ count }) => count).shift();

  let counts = []
  for (let item = 1; item <= 50; item++) {
    counts.push(item)
  }

  const checkColor = (count) => {
    let result = ''
    const base = Math.round(highestCount / 4)
    const secondColor = counts.slice(0, base);
    const thirdColor = counts.slice(base, base * 2);
    const fourthColor = counts.slice((base * 2), highestCount - 1);

    if (count === 0) {
      result = '#ebedf0'
    } else if (secondColor.find(e => e === count)) {
      result = '#9be9a8'
    } else if (thirdColor.find(e => e === count)) {
      result = '#40c463'
    } else if (fourthColor.find(e => e === count)) {
      result = '#30a14e'
    } else if (count >= highestCount) {
      result = '#216e39'
    }
    return result;
  }


  const classes = useStyles();

  return (

    <table>
      <thead>
        <tr>
          <td></td>
          {removeMonthsDuplicates?.map(month => (
            <td key={month} colSpan={columnSize(month)}>{month}</td>
          ))}
        </tr>
      </thead>
      <tbody>
        {days.map(day =>
          <tr key={day}>
            <td>{day}</td>
            {removeMonthsDuplicates?.map(month => {
              return dates?.sort((a, b) => new Date(a.date) - new Date(b.date))
                .filter(item => item.month === month && item.day === day)
                .map(({ date, count, year, dateDay }) => (
                  <td key={date}
                    style={{
                      background: checkColor(count),
                    }}>
                    <GithubTooltip
                      background="#000"
                      title={
                        <React.Fragment>
                          {count === 0 ? 'No' : count} contributions on {month} {dateDay}, {year}
                        </React.Fragment>
                      }
                    >
                      <Button className={classes.root} />
                    </GithubTooltip>
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
