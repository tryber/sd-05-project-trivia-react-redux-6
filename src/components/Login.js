import React from 'react';
import md5  from 'crypto-js/md5';
import { connect } from 'react-redux';
import { loginRequest, fetchToken, fetchQuestions } from '../actions/index';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      name: '',
      hash: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { login, testeToken, token, setAPIToken } = this.props;
    const { email, name, hash } = this.state;
    login(email, name, hash);
    testeToken();
    setAPIToken(token); // Colocar em outro componente
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
    const { token, setAPIToken } = this.props;
    console.log(token);
    return (
      <div>
        <label htmlFor="email">Email do Gravatar:</label>
        <input data-testid="input-gravatar-email" id="email" type="email" onChange={this.handleChange} />
        <label htmlFor="name">Nome do Jogador:</label>
        <input data-testid="input-player-name" id="name" type="text" onChange={this.handleChange} />
        <button data-testid="btn-play" type="button" onClick={this.handleClick}>JOGAR!</button>
        {/* {hash !== '' ? <img src={`https://www.gravatar.com/avatar/${hash}`} /> : false} */}
        {/* <button onClick={() => setAPIToken(token)}>Teste</button> */}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.reducerTrivia.token,
});

const mapDispatchToProps = (dispatch) => ({
  login: (email, name, hash) => dispatch(loginRequest(email, name, hash)),
  testeToken: () => dispatch(fetchToken()),
  setAPIToken: (token) => dispatch(fetchQuestions(token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
