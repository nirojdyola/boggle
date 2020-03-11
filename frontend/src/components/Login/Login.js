import React, { Component } from "react";
import { Form, Input, Button } from "antd";
import History from "services/History";

import "components/Login/Login.css";

import { connect } from "react-redux";
import { setPlayerName } from "actions/gamesActions";

class Login extends Component {
  state = {};

  onFinish = async form => {
    if (form.player) {
      this.props.setPlayerName(form.player);
      History.push("/dashboard");
    }
  };

  render() {
    return (
      <div className="login-center">
        <h1>Boggle Game</h1>
        <Form layout="inline" onFinish={this.onFinish}>
          <Form.Item
            name="player"
            rules={[{ required: true, message: "Please input player!" }]}
          >
            <Input placeholder="Player Name" style={{ width: "110%" }} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  player: state.games.player
});

Login = connect(mapStateToProps, {
  setPlayerName
})(Login);

export default Login;
