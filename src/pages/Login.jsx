import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SettingsButton from '../components/SettingsButton';
import * as Actions from '../redux/actions';
import { apiRequestToken } from '../services/api';
import { saveHashAndUserNametoLS } from '../services/gravatar';

class Login extends Component {
  state = {
    email: '',
    name: '',
    isDisabled: true,
  };

  handleValidate = () => {
    const tres = 3;
    const { email, name } = this.state;
    const emailRegex = /^[a-z0-9.-_]+@[a-z0-9]+\.[a-z]+\)?$/i.test(email);
    if (emailRegex && name.length >= tres) {
      this.setState({
        isDisabled: false,
      });
      return;
    }
    this.setState({
      isDisabled: true,
    });
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState(
      { [name]: value },
      this.handleValidate(),
    );
  };

  handleClick = async () => {
    const { history } = this.props;
    const data = await apiRequestToken();
    const { token } = data;
    localStorage.setItem('token', token);
    history.push('/game');
  };

  render() {
    const { isDisabled, name, email } = this.state;
    const { saveUserName } = this.props;
    return (
      <div className="login-container">
        <div>
          <h1 className="trivia-title">Trivia</h1>
          <h1 className="game-title">GAME</h1>
        </div>
        <form className="form-login">
          <input
            data-testid="input-player-name"
            type="text"
            name="name"
            id=""
            placeholder="Nome do Jogador"
            value={ name }
            onChange={ this.handleChange }
          />
          <br />
          <input
            data-testid="input-gravatar-email"
            type="email"
            name="email"
            id=""
            placeholder="E-mail do Jogador"
            onChange={ this.handleChange }
            value={ email }
          />
          <br />
          <button
            type="submit"
            data-testid="btn-play"
            disabled={ isDisabled }
            onClick={ (event) => {
              event.preventDefault();
              this.handleClick();
              saveHashAndUserNametoLS(email, name);
              saveUserName({ name });
            } }
          >
            Play
          </button>
        </form>
        <br />
        <SettingsButton />
      </div>
    );
  }
}

Login.propTypes = {
  saveUserName: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

const mapDispatchToProps = (dispatch) => bindActionCreators(Actions, dispatch);

export default connect(null, mapDispatchToProps)(Login);
