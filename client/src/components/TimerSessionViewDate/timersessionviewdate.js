import React from 'react';

class TimerSessionViewDate extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      years: this.generateYears(),
      months: ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"],
      days: [],
      selectedDate: {}
    }
  }

  generateYears() {
    let years = [null];
    let startYear = 1980;
    let currentYear = new Date().getFullYear();
    for (let year = currentYear; year >= startYear; year--) {
      years.push(year)
    }
    return years
  }

  generateDays(year, month) {
    let days = [null];
    let startDay = 1;
    let lastDayForMonth = new Date(year, month + 1, 0).getDate();
    for (let day = startDay; day <= lastDayForMonth; day++) {
      days.push(day)
    }
    return days
  }

  selectedYear(event) {
    this.setState({
      selectedDate: Object.assign({}, this.state.selectedDate, { year: event.target.value }),
      days: this.generateDays(event.target.value, this.state.selectedDate.month)
    }, () => {
      this.props.onSelectedDate(this.state.selectedDate)
    })
  }

  selectedMonth(event) {
    this.setState({
      selectedDate: Object.assign({}, this.state.selectedDate, { month: this.state.months.indexOf(event.target.value) - 1 }),
      days: this.generateDays(this.state.selectedDate.year, this.state.months.indexOf(event.target.value) - 1)
    }, () => {
      this.props.onSelectedDate(this.state.selectedDate)
    })
  }

  selectedDay(event) {
    this.setState({
      selectedDate: Object.assign({}, this.state.selectedDate, { day: event.target.value })
    }, () => {
      this.props.onSelectedDate(this.state.selectedDate)
    })
  }

  render() {
    return (
      <div className="form-row">
        <div className="form-group col-md-6">
          <label>Year</label>
          <select className="form-control" onChange={this.selectedYear.bind(this)}>
            {this.state.years && this.state.years.map((year, key) => {
              return <option key={key} value={year}>{year}</option>
            })}
          </select>
        </div>
        <div className="form-group col-md-4">
          <label>Month</label>
          <select className="form-control" onChange={this.selectedMonth.bind(this)}>
            {this.state.months && this.state.months.map((month, key) => {
              return <option key={key} value={month}>{month}</option>
            })}
          </select>
        </div>
        <div className="form-group col-md-2">
          <label>Day</label>
          <select className="form-control" onChange={this.selectedDay.bind(this)}>
            {this.state.days && this.state.days.map((day, key) => {
              return <option key={key} value={day}>{day}</option>
            })}
          </select>
        </div>
      </div>
    )
  }

}

export default TimerSessionViewDate
