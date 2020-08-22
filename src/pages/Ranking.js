import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Ranking extends React.Component {
  render() {
    const { players } = this.props; // PROPS QUE VIRÃO DO MAPSTATETOPROPS.
    const playersInOrder = players.sort((a,b) =>
      a.score < b.score ? 1 : a.score > b.score ? -1 : 0 // ref1
    );
    return (
      <div className="cardScreen">
        <div className="cardQuestion">
        <button data-testid="btn-go-home">
          <Link to="/">Home</Link>
        </button>
        <h3 data-testid="ranking-title">Ranking</h3>
        {playersInOrder.map((player, index) => (
          <div>
            <img alt="gravatar do jogador" src={`https://www.gravatar.com/avatar/${player.hash}`} />
            <h5 data-testid={`player-name-${index}`} >{player.name}</h5>
            <h5 data-testid={`player-score-${index}`} >Score: {player.score} </h5>
          </div>  
        ))}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  players: state.reducerGame.players
})

export default connect(mapStateToProps)(Ranking);


// ref1 - metodo sort em array de objetos. Consulta no stackOverFlow
// https://pt.stackoverflow.com/questions/46600/como-ordenar-uma-array-de-objetos-com-array-sort
