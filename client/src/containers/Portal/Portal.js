import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

import PageContainer from '../PageContainer';
import Nav from '../../components/Nav';
import TimerForm from '../../components/TimerForm';
import TimerSessionsView from '../../components/TimerSessionsView';

class Portal extends React.Component {

  componentDidMount() {
    this.props.getTimerSessions(this.props.user.username)
  }

  submit(values) {
    const newValues = Object.assign({}, values, { "createdAt": new Date().toString(), "username": this.props.user.username })
    this.props.postNewTimerSession(newValues, () => {
      alert('Your session has been saved!\n\nPlease view your sessions by clicking on the `View Saved Sessions` button on the left.');
      this.props.getTimerSessions(this.props.user.username)
    })
  }

  onViewChange() {
    this.props.changeView(this.props.view);
  }

  onSelectedDate(date) {
    this.props.setTimerSessionViewDate(date);
  }

  render() {
    const { user, view } = this.props
    if (!user.isLoggedIn) { this.props.history.push('/') }
    return (
      <PageContainer>
        <div className="row">
          <div className="col-3">
            <Nav username={this.props.user.username} onViewChange={this.onViewChange.bind(this)} view={view['view']} />
          </div>
          <div className="col-9">
            { view['view'] === 'new' &&
              <TimerForm onSubmit={this.submit.bind(this)} />
            }
            { view['view'] === 'view' &&
              <TimerSessionsView
                sessions={this.props.sessions.sessions}
                selectedDate={this.props.sessions.selectedDate}
                onSelectedDate={this.onSelectedDate.bind(this)}
              />
            }
          </div>
        </div>
      </PageContainer>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    view: state.view,
    user: state.user,
    sessions: state.sessions
  }
}

export default connect(mapStateToProps, actions)(Portal);
