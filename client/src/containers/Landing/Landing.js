import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

import PageContainer from '../PageContainer';
import UserDetailsForm from '../../components/UserDetailsForm';

class Landing extends React.Component {

  submit(values) {
    switch(values['type']) {
      case 'login':
        this.login(values)
        break;
      case 'register':
        this.register(values)
        break;
      default:
        break;
    }
  }

  login(values) {
    this.props.postLoginUser(values, () => {
      this.props.history.push('/portal')
    });
  }

  register(values) {
    this.props.postRegisterUser(values, (data) => {
      this.login(data)
    });
  }

  render() {
    return (
      <PageContainer>
        { !this.props.user.isLoggedIn &&
          <UserDetailsForm onSubmit={this.submit.bind(this)} formError={this.props.user.error} />
        }
      </PageContainer>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps, actions)(Landing);
