import React, { Component } from "react";
import { Form, Input, Button, Row, Col, List, Typography, Badge } from "antd";

import "components/Dashboard/Dashboard.css";

import History from "services/History";
import { connect } from "react-redux";
import { setPlayerTotalScore, setSubmit, setTimer } from "actions/gamesActions";
import axios from "axios";

class Dashboard extends Component {
  formRef = React.createRef();
  _isMounted = false;

  state = {
    scores: [],
    total: 0,
    board: [],
    boardLength: 0,
    results: [],
    errMsg: ""
  };

  async componentWillReceiveProps(nextProps) {
    if (nextProps.submit) {
      await this.handleSubmit();
      await this.props.setTimer(false);
    }
  }

  onFinish = async form => {
    // clear the input field
    this.formRef.current.resetFields();
    this.formInput.focus();
    // validate if length < 2
    if (form.combination.length <= 2) {
      this.setState({
        errMsg: "Not valid. Please combine 3 letters at least."
      });
      return;
    }
    const { results, scores } = this.state;
    const combination = form.combination.toUpperCase();

    if (results.length > 0) {
      const exist = results.filter(res => {
        return res === combination;
      });
      if (exist.length > 0) {
        // check in scores
        if (scores.length > 0) {
          const existScore = scores.filter(res => {
            return res.wordCombination === combination;
          });
          if (existScore.length === 0) {
            this.setState(prevState => ({
              scores: [
                ...prevState.scores,
                {
                  wordCombination: form.combination.toUpperCase(),
                  score: form.combination.length
                }
              ]
            }));
          } else {
            this.setState({ errMsg: "Already Submitted." });
          }
        } else {
          // initial state
          this.setState(prevState => ({
            scores: [
              ...prevState.scores,
              {
                wordCombination: form.combination.toUpperCase(),
                score: form.combination.length
              }
            ]
          }));
        }
      } else {
        this.setState({ errMsg: "NOT FOUND" });
      }
    }
  };

  handleSubmit = async () => {
    const { scores } = this.state;
    if (scores.length > 0) {
      const total = scores.reduce(function(total, res) {
        return total + res.score;
      }, 0);
      this.props.setPlayerTotalScore(total);
    }
    this.props.setSubmit();
    History.push("/results");
  };

  componentWillUnmount() {
    this._isMounted = false;
  }

  async componentDidMount() {
    this._isMounted = true;
    // if already submitted then close this
    if (this.props.submit) History.push("/");
    await this.fetchData();
  }

  fetchData = async () => {
    const response = await axios(
      `${process.env.REACT_APP_API_URL}/games/check-combination`
    );
    if (response.data && this._isMounted) {
      if (response.data.results.length === 0) {
        await this.fetchData();
      } else {
        await this.setState({
          board: response.data.board,
          boardLength: response.data.boardLength,
          results: response.data.results
        });
        await this.props.setTimer(true);
      }
    }
  };

  handlePress = () => {
    const { errMsg } = this.state;
    if (errMsg) {
      this.setState({ errMsg: "" });
    }
  };

  render() {
    const { scores, board, boardLength, errMsg } = this.state;

    return (
      <>
        {board.length > 0 && (
          <Row>
            <Col span={12}>
              <Row>
                <Col span={24} className="games">
                  <h1 style={{ textAlign: "center" }}>
                    {boardLength} X {boardLength} board
                  </h1>
                  <div id="table">
                    <div className="row">
                      <div className="cell">{board[0][0]}</div>
                      <div className="cell">{board[0][1]}</div>
                      <div className="cell">{board[0][2]}</div>
                      <div className="cell">{board[0][3]}</div>
                    </div>
                    <div className="row">
                      <div className="cell">{board[1][0]}</div>
                      <div className="cell">{board[1][1]}</div>
                      <div className="cell">{board[1][2]}</div>
                      <div className="cell">{board[1][3]}</div>
                    </div>
                    <div className="row">
                      <div className="cell">{board[2][0]}</div>
                      <div className="cell">{board[2][1]}</div>
                      <div className="cell">{board[2][2]}</div>
                      <div className="cell">{board[2][3]}</div>
                    </div>
                    <div className="row">
                      <div className="cell">{board[3][0]}</div>
                      <div className="cell">{board[3][1]}</div>
                      <div className="cell">{board[3][2]}</div>
                      <div className="cell">{board[3][3]}</div>
                    </div>
                  </div>
                </Col>
              </Row>
              <Row style={{ marginTop: "20px" }}>
                <Col span={12} offset={8} className="submitForm">
                  <Form
                    layout="inline"
                    ref={this.formRef}
                    onFinish={this.onFinish}
                  >
                    <Form.Item
                      name="combination"
                      rules={[
                        { required: true, message: "Please input word!" }
                      ]}
                    >
                      <Input
                        placeholder="Word"
                        style={{ width: "250px" }}
                        onKeyPress={this.handlePress}
                        ref={input => {
                          this.formInput = input;
                        }}
                      />
                    </Form.Item>
                    <Form.Item>
                      <Button type="primary" htmlType="submit">
                        Ok
                      </Button>
                    </Form.Item>
                  </Form>
                </Col>
              </Row>
              {errMsg && (
                <Row
                  style={{
                    marginTop: "20px",
                    textAlign: "center",
                    color: "red"
                  }}
                >
                  <Col span={12} offset={8}>
                    {errMsg}
                  </Col>
                </Row>
              )}
              <Row style={{ marginTop: "20px" }}>
                <Col span={12} offset={8}>
                  <Button
                    type="primary"
                    onClick={this.handleSubmit}
                    style={{ width: "250px" }}
                  >
                    Submit
                  </Button>
                </Col>
              </Row>
            </Col>
            <Col span={8}>
              {scores.length > 0 && (
                <List
                  header={
                    <div style={{ fontWeight: "bold", fontSize: "1em" }}>
                      Scores
                    </div>
                  }
                  bordered
                  dataSource={scores}
                  renderItem={item => (
                    <List.Item>
                      <Typography.Text strong>
                        {item.wordCombination}
                      </Typography.Text>
                      <Badge
                        count={item.score}
                        style={{ backgroundColor: "#52c41a" }}
                      />
                    </List.Item>
                  )}
                />
              )}
            </Col>
          </Row>
        )}
        {board.length <= 0 && (
          <div style={{ fontSize: "2em", textAlign: "center" }}>...Loading</div>
        )}
      </>
    );
  }
}

const mapStateToProps = state => ({
  submit: state.games.submit,
  timer: state.games.timer
});

Dashboard = connect(mapStateToProps, {
  setPlayerTotalScore,
  setSubmit,
  setTimer
})(Dashboard);

export default Dashboard;
