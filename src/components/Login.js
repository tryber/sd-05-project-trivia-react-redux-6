import React from 'react';
import md5  from 'crypto-js/md5';
import { connect } from 'react-redux';
import { loginRequest, fetchToken } from '../actions/index';
import { Redirect } from 'react-router-dom';

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
    getToken();
    this.setState({
      redirect: true,
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
    const { redirect } = this.state;
    if (redirect) return <Redirect to="/game" />;
    return (
      <div>
        <label htmlFor="email">Email do Gravatar:</label>
        <input data-testid="input-gravatar-email" id="email" type="email" onChange={this.handleChange} />
        <label htmlFor="name">Nome do Jogador:</label>
        <input data-testid="input-player-name" id="name" type="text" onChange={this.handleChange} />
        <button data-testid="btn-play" type="button" onClick={this.handleClick}>JOGAR!</button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  login: (email, name, hash) => dispatch(loginRequest(email, name, hash)),
  getToken: () => dispatch(fetchToken()),
});

export default connect(null, mapDispatchToProps)(Login);
