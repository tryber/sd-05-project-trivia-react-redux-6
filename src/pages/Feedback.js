import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
// import propTypes from 'prop-types';
import Header from '../components/Header';

class Feedback extends React.Component {
  render() {
    // const { acertos, score } = this.props;
    const acertos = 3; // acertos virá como props do redux.
    return (
      <div>
        <Header />
        <div className="card-body">
          <div  data-testid="feedback-text">
            {acertos < 3 ? <h3>Podia ser melhor...</h3> : <h3>Mandou bem!</h3>}
          </div>
          <p data-testid="feedback-total-question">Você acertou {/* acertos-props */} questões!</p>
          <p data-testid="feedback-total-score">Um total de {/* score-props */} pontos! </p>
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
    );
  }
}

// const mapStateToProps = (state) => ({
//   acertos: state.reducerGame.acertos,
//   score: state.reducerGame.score,
// })

export default connect(null)(Feedback);

// Feedback.propTypes = {
//   acertos: propTypes.number.isRequired,
//   score: propTypes.number.isRequired,
// }
