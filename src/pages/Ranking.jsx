import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import UserRanking from '../components/UserRanking';

class Ranking extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ranking: [],
    };
  }

  componentDidMount() {
    const getRanking = JSON.parse(localStorage.getItem('ranking'));
    const sortRanking = getRanking.sort((a, b) => b.score - a.score);
    this.setState({
      ranking: sortRanking,
    });
  }

  render() {
    const { ranking } = this.state;
    return (
      <div className="game-container">
        <h2 className="raking-title" data-testid="ranking-title">Ranking</h2>
        <div className="ranking-container">
          {ranking.map((user, index) => (<UserRanking
            key={ index }
            name={ user.name }
            score={ user.score }
            avatar={ user.avatar }
            index={ index }
          />))}
        </div>

        <Link to="/">
          <button
            className="ranking-button"
            data-testid="btn-go-home"
          >
            Início
          </button>
        </Link>
      </div>
    );
  }
}

export default Ranking;
