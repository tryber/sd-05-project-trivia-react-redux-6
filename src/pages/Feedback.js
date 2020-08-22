import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import Header from '../components/Header';
import { savePlayer, resetScore } from '../actions';

class Feedback extends React.Component {

  componentDidMount() {
    const { name, email, hash, score, saveAndPlay } = this.props;
    saveAndPlay(name, email, hash, score)
  }

  componentWillUnmount() {
    this.props.resetScore();
  }

  render() {
    const { assertions, score } = this.props;
    return (
      <div className="gameScreen">
        <div className="cardQuestion">
          <Header />
          <div className="card-body">
            <div  data-testid="feedback-text">
              {assertions < 3 ? <h3>Podia ser melhor...</h3> : <h3>Mandou bem!</h3>}
            </div>
            <p> Acertou <span data-testid="feedback-total-question">
                {assertions}
              </span> questões!
            </p>
            <p>Um total de <span data-testid="feedback-total-score"> {score}</span> pontos! </p>
            <div>
              <button type="button" data-testid="btn-ranking">
                <Link to="/ranking">Ver Ranking</Link>
              </button>
            </div>
            <button type="button" data-testid="btn-play-again">
              <Link to="/">Jogar Novamente</Link>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.reducerGravatar.name,
  email: state.reducerGravatar.email,
  hash: state.reducerGravatar.hash,
  assertions: state.reducerGame.assertions,
  score: state.reducerGame.score,
})

const mapDispatchToProps = (dispatch) => ({
  saveAndPlay: (name, email, hash, score) => dispatch(savePlayer(name, email, hash, score)),
  resetScore: () => dispatch(resetScore()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Feedback);

Feedback.propTypes = {
  assertions: propTypes.number.isRequired,
  score: propTypes.number.isRequired,
}
