import PropTypes from 'prop-types';
import React, { Component } from 'react';

class UserRanking extends Component {
  render() {
    const { name, avatar, score, index } = this.props;
    return (
      <div>
        <div className="ranking-list">
          <img src={ avatar } alt="avatar" />
          <p data-testid={ `player-name-${index}` }>{`${index + 1}º Lugar: ${name}`}</p>
          <p data-testid={ `player-score-${index}` }>{`Pontos: ${score}`}</p>
        </div>
      </div>
    );
  }
}

export default UserRanking;

UserRanking.propTypes = {
  name: PropTypes.string,
  score: PropTypes.string,
  avatar: PropTypes.string,
}.isRequired;
