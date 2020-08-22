import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import './header.css';

function HEADER(props) {
  const { hash, name, score } = props; // incluir o store aqui;
  return (
    <header className="game-header">
      <div className="left-header">
        <Link to="/">Home</Link>
        <img data-testid="header-profile-picture" alt="avatar" src={`https://www.gravatar.com/avatar/${hash}`} />
        <p data-testid="header-player-name">Jogador: {name}</p>
      </div>
      <div className="right-header">
        <h4>Pontos:
          <span data-testid="header-score">{score}</span>
        </h4>
      </div>
    </header>
  );
}

const mapStateToProps = (state) => ({
  hash: state.reducerGravatar.hash,
  name: state.reducerGravatar.name,
  score: state.reducerGame.score,
})

export default connect(mapStateToProps)(HEADER);

HEADER.propTypes = {
  hash: propTypes.string.isRequired,
  name: propTypes.string.isRequired,
  score: propTypes.number.isRequired,
}
