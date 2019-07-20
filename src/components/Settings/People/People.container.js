import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { logout } from '../../Account/Login/Login.actions';
import { updateUserData } from '../../App/App.actions';
import People from './People.component';
import { getUser } from '../../App/App.selectors';
import API from '../../../api';

export class PeopleContainer extends PureComponent {
  static propTypes = {
    history: PropTypes.object.isRequired
  };

  state = {
    name: this.props.user.name,
    email: this.props.user.email,
    birthdate: this.props.user.birthdate
  };

  handleChange = name => event => {
    this.setState({
      ...this.state,
      [name]: event.target.value
    });
  };

  handleSubmit = async () => {
    try {
      await API.updateUser({
        id: this.props.user.id,
        name: this.state.name,
        email: this.state.email,
        birthdate: this.state.birthdate
      });
      this.props.updateUserData({
        ...this.props.user,
        name: this.state.name,
        email: this.state.email,
        birthdate: this.state.birthdate
      });
    } catch (e) {
    } finally {
    }

  };

  render() {
    const { history } = this.props;

    return <People
      onClose={history.goBack}
      logout={logout}
      name={this.state.name}
      email={this.state.email}
      birthdate={this.state.birthdate}
      onChangePeople={this.handleChange}
      onSubmitPeople={this.handleSubmit} />;
  }
}

const mapStateToProps = state => ({
  user: getUser(state)
});

const mapDispatchToProps = {
  logout,
  updateUserData: updateUserData
};

export default connect(mapStateToProps, mapDispatchToProps)(PeopleContainer);
