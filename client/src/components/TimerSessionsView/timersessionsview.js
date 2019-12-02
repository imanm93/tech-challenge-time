import React from 'react';

import TimerSessionViewDate from '../TimerSessionViewDate';
import TimerSessionCard from './timersessioncard';

class TimerSessionsView extends React.Component {

  renderTimeSessions() {
    if (Object.keys(this.props.selectedDate).length === 0) { return this.renderTimeSessionsView(this.props.sessions) }
    else if (this.props.selectedDate.year !== undefined) {
      return this.renderFilteredTimeSessions(this.props.selectedDate);
    }
  }

  renderFilteredTimeSessions(date) {
    let filteredSessions = null;
    if (date.day !== undefined && date.day !== "") {
      const filterDate = new Date(date.year, date.month, date.day)
      filteredSessions = this.props.sessions.filter((session) => {
        const sessionDate = new Date(session.createdAt)
        return (sessionDate.getFullYear() === filterDate.getFullYear()) && (sessionDate.getMonth() === filterDate.getMonth()) && (sessionDate.getDate() === filterDate.getDate())
      })
    }
    else {
      const isMonthNotSelected = (date.month === undefined || date.month === "" || date.month === -1);
      const month = isMonthNotSelected ? 0 : date.month;
      const filterStartDate = new Date(date.year, month, 1)
      const filterEndDate = isMonthNotSelected ? new Date(date.year, month + 12, 0) : new Date(date.year, month + 1, 0)
      filteredSessions = this.props.sessions.filter((session) => {
        const sessionDate = new Date(session.createdAt)
        return (sessionDate >= filterStartDate) && (sessionDate <= filterEndDate)
      })
    }
    return this.renderTimeSessionsView(filteredSessions);
  }

  renderTimeSessionsView(sessions) {
    if (sessions.length > 0) {
      return sessions.map((session, key) => {
        return (
          <TimerSessionCard key={key} name={session.name} time={session.time} createdAt={session.createdAt} />
        )
      })
    }
    else {
      return (
        <h3>You have no sessions to view for this filter. Update filter using controls regenerate list.</h3>
      )
    }
  }

  render() {
    return (
      <div className="row">
        <div className="col-12">
          <TimerSessionViewDate onSelectedDate={this.props.onSelectedDate.bind(this)} />
        </div>
        <div className="col-12">
          { this.props.sessions && this.renderTimeSessions() }
        </div>
      </div>
    )
  }

}

export default TimerSessionsView
