import React from 'react';
import { connect } from 'react-redux';
import { loginRequest } from '../actions/index';
import md5  from 'crypto-js/md5';
import gravatarAPI from '../services/gravatarAPI';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      name: '',
      hash: '',
    };
    this.handleChange = this.handleChange.bind(this);
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
    const { login } = this.props;
    const { email, name, hash } = this.state;
    return (
      <div>
        <label htmlFor="email">Email do Gravatar:</label>
        <input data-testid="input-gravatar-email" id="email" type="email" onChange={this.handleChange} />
        <label htmlFor="name">Nome do Jogador:</label>
        <input data-testid="input-player-name" id="name" type="text" onChange={this.handleChange} />
        <button data-testid="btn-play" type="button" onClick={() => {login(email, name, hash); gravatarAPI(hash);}}>JOGAR!</button>
        {hash !== '' ? <img src={`https://www.gravatar.com/avatar/${hash}`} /> : false}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  login: (email, name, hash) => dispatch(loginRequest(email, name, hash))
});

export default connect(null, mapDispatchToProps)(Login);
