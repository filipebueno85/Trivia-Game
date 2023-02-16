import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import Header from '../components/Header';
import * as Actions from '../redux/actions';

class Feedback extends Component {
  componentWillUnmount() {
    const { resetPoints } = this.props;
    resetPoints();
    this.setLocalStorage();
  }

  setLocalStorage = () => {
    const { ranking } = this.props;
    localStorage.setItem('ranking', JSON.stringify(ranking));
  };

  render() {
    const { assertions, score } = this.props;

    const minScore = 3;

    const feedback = {
      lessThanThree: 'Could be better...',
      threeOrMore: 'Well Done!',
    };

    return (
      <div className="game-container">
        <Header />
        <h2 className="feedback-title">Feedback</h2>
        <main className="feedback-container">
          <p className="feedback-text" data-testid="feedback-text">
            { assertions < minScore
              ? feedback.lessThanThree
              : feedback.threeOrMore }
          </p>
          <p
            className="feedback-text"
            data-testid="feedback-total-score"
          >
            {`Pontos da Rodada: ${score}`}

          </p>
          <p
            className="feedback-text"
            data-testid="feedback-total-question"
          >
            {`Acertos: ${assertions}`}

          </p>
          <div className="feedback-buttons">
            <Link data-testid="btn-play-again" to="/">
              Play Again
            </Link>
            <Link data-testid="btn-ranking" to="/ranking">
              Ranking
            </Link>
          </div>
        </main>
      </div>
    );
  }
}

Feedback.propTypes = {
  score: PropTypes.number.isRequired,
  assertions: PropTypes.number.isRequired,
  resetPoints: PropTypes.func.isRequired,
  ranking: PropTypes.shape({
    name: PropTypes.string.isRequired,
    score: PropTypes.number.isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  score: state.player.score,
  assertions: state.player.assertions,
  ranking: state.ranking.ranking,
});

const mapDispatchToProps = (dispatch) => bindActionCreators(Actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Feedback);
