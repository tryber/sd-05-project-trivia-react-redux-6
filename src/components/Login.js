import React from 'react';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import propTypes from 'prop-types';
import { loginRequest, fetchToken } from '../actions/index';
import logo from '../trivia.png';
import imgSettings from '../image/gear.png';
import './login.css';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      name: '',
      hash: '',
      redirect: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { login, getToken } = this.props;
    const { email, name, hash } = this.state;
    login(email, name, hash);
    getToken().then((token) => {
      localStorage.setItem('token', token.token);
      this.setState({
        redirect: true,
      });
    });
  }

  handleChange(e) {
    const { id, value } = e.target;
    this.setState({
      [id]: value,
    });
    if (id === 'email') {
      const hashState = (md5(value).toString());
      this.setState({ hash: hashState });
    }
  }

  render() {
    const { name, email, redirect } = this.state;
    if (redirect) return <Redirect to="/game" />;
    return (
      <div className="App">
        <header className="App-header">
          <Link to="/settings" data-testid="btn-settings">
            <img alt="configurações" src={imgSettings} className="icon_settings" />
          </Link>
          <img src={logo} className="App-logo" alt="logo" />
          <p>SUA VEZ</p>
          <div>
            <label htmlFor="email">Email do Gravatar:</label>
            <input
              data-testid="input-gravatar-email" id="email"
              type="email" onChange={this.handleChange}
            />
            <label htmlFor="name">Nome do Jogador:</label>
            <input
              data-testid="input-player-name" id="name" type="text" onChange={this.handleChange}
            />
            <button
              data-testid="btn-play" type="button"
              disabled={!(name && email)} onClick={this.handleClick}
            >
              JOGAR!
            </button>
          </div>
        </header>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.reducerTrivia.token,
});

const mapDispatchToProps = (dispatch) => ({
  login: (email, name, hash) => dispatch(loginRequest(email, name, hash)),
  getToken: () => dispatch(fetchToken()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);

Login.propTypes = {
  login: propTypes.func.isRequired,
  getToken: propTypes.func.isRequired,
};
