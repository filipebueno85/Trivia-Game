import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../redux/actions';

class Timer extends React.Component {
  state = {
    toShow: 30,
  };

  componentDidMount() {
    const mil = 1000;
    this.timer = setInterval(() => this.descrease(), mil);
  }

  descrease = () => {
    const { toShow } = this.state;
    const { changeAnswered, sendSeconds } = this.props;
    if (toShow === 0) {
      changeAnswered();
      clearInterval(this.timer);
      return;
    }
    this.setState({
      toShow: toShow - 1,
    });
    sendSeconds(toShow);
  };

  render() {
    const { toShow } = this.state;
    return (
      <div className="timer">
        <span>{toShow}</span>
      </div>
    );
  }
}

Timer.propTypes = {
  changeAnswered: PropTypes.func,
}.isRequired;

const mapDispatchToProps = (dispatch) => bindActionCreators(Actions, dispatch);

export default connect(null, mapDispatchToProps)(Timer);
