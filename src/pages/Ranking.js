import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Ranking extends React.Component {
  render() {
    // const { player, hash } = this.props; PROPS QUE VIRÃO DO MAPSTATETOPROPS.
    return (
      <div>
        <button data-testid="btn-go-home">
          <Link to="/">Home</Link>
        </button>
        <h3>Ranking</h3>
        {/* {playersInOrder.map((player, index) => (
          <div>
            <img alt="gravatar do jogador" src={`${hash}`} />
            <h5 data-testid={`player-name-${index}`} >{player.name}</h5>
            <h5 data-testid={`player-score-${index}`} >Score: {player.score} </h5>
          </div>  
        ))} */}
      </div>
    )
  }
}

export default connect(null)(Ranking);
