import React, { Component } from "react";
import { Row, Col } from "antd";
import "components/Results/Results.css";
import { connect } from "react-redux";
import { setPlayerTotalScore } from "actions/gamesActions";
import History from "services/History";

class Results extends Component {
  state = {};
  componentWillMount() {
    if (this.props.player === "") History.push("/");
  }
  render() {
    return (
      <React.Fragment>
        <Row className="center">
          <Col>
            <h1>Results</h1>
            <p>Congratulations !!!</p>
            <p>Your Total Points: {this.props.totalScore}</p>
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  totalScore: state.games.totalScore,
  player: state.games.player
});

Results = connect(mapStateToProps, {
  setPlayerTotalScore
})(Results);

export default Results;
