import React, { Component } from "react";

import { Layout, Row, Col } from "antd";
import { connect } from "react-redux";
import History from "services/History";
import "components/NavBar/NavBar.css";
import moment from "moment";
import { setSubmit, setTimer } from "actions/gamesActions";

const { Header } = Layout;

class NavBar extends Component {
  state = {
    duration: "02:00"
  };

  componentWillReceiveProps(nextProps) {
    console.log("next-props", nextProps);
    if (nextProps.timer) {
      this.setTimer();
    }
  }

  componentDidMount() {
    if (!this.props.player) History.push("/");
  }
  componentWillUnmount() {
    clearInterval(this.duration);
  }

  setTimer = () => {
    let duration = moment.duration({
      minutes: 2,
      seconds: 0
    });
    let that = this;
    const interval = 1;
    let timer = setInterval(function() {
      duration = moment.duration(duration.asSeconds() - interval, "seconds");
      let min = duration.minutes();
      let sec = duration.seconds();

      sec -= 1;
      if (min < 0) return clearInterval(timer);
      if (min < 10 && min.length !== 2) min = "0" + min;
      if (sec < 0 && min !== 0) {
        min -= 1;
        sec = 59;
      } else if (sec < 10 && sec.length !== 2) sec = "0" + sec;
      if (min === "00" && sec === "00") {
        clearInterval(timer);
        that.props.setSubmit();
      }
      that.setState({ duration: min + ":" + sec });
    }, 1000);
  };

  render() {
    const { player } = this.props;
    const { duration } = this.state;
    return (
      <React.Fragment>
        <Header>
          <Row>
            <Col span={6} offset={6}>
              <span className="duration">{duration}</span>
            </Col>
            <Col span={6} offset={6}>
              <span className="player">{player}</span>
            </Col>
          </Row>
        </Header>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  player: state.games.player,
  submit: state.games.submit,
  timer: state.games.timer
});

NavBar = connect(mapStateToProps, { setSubmit, setTimer })(NavBar);

export default NavBar;
