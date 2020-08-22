import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Ranking extends React.Component {
  render() {
    const { hash } = this.props; // PROPS QUE VIRÃO DO MAPSTATETOPROPS.
    const { player } = JSON.parse(localStorage.getItem('state'));
    return (
      <div className="cardScreen">
        <div className="cardQuestion">
        <button data-testid="btn-go-home">
          <Link to="/">Home</Link>
        </button>
        <h3 data-testid="ranking-title">Ranking</h3>
        <img alt="gravatar do jogador" src={`https://www.gravatar.com/avatar/${hash}`} />
        <h5 data-testid={`player-name-0`} >{player.name}</h5>
        <h5 data-testid={`player-score-0`} >Score: {player.score} </h5>
        {/* {player.map((player, index) => (
          <div>
            <img alt="gravatar do jogador" src={`https://www.gravatar.com/avatar/${hash}`} />
            <h5 data-testid={`player-name-${index}`} >{player.name}</h5>
            <h5 data-testid={`player-score-${index}`} >Score: {player.score} </h5>
          </div>  
        ))} */}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  hash: state.reducerGravatar.hash,
})

export default connect(mapStateToProps)(Ranking);
