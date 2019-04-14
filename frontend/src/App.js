import React, { Component } from "react";
import { Route, withRouter } from "react-router-dom";

import Navbar from "./Navbar/Navbar";
import Questions from "./Questions/Questions";
import Question from "./Question/Question";
import CallBack from "./CallBack";
import NewQuestion from "./NewQuestion/NewQuestion";
import SecuredRoute from "./SecuredRoute/SecureRoute";
import auth0Client from "./Auth";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkingSession: true
    };
  }

  async componentDidMount() {
    if (this.props.location.pathname === "/callback") {
      this.setState({ checkingSession: false });
      return;
    }

    if (this.props.location.pathname === "/callback") return;
    try {
      await auth0Client.silentAuth();
      this.forceUpdate();
    } catch (err) {
      if (err.error !== "login_required") console.log(err.error);
    }

    this.setState({ checkingSession: false });
  }

  render() {
    return (
      <div className="App">
        <Navbar />
        <Route exact path="/" component={Questions} />
        <Route exact path="/question/:questionId" component={Question} />
        <Route exact path="/callback" component={CallBack} />
        <SecuredRoute
          path="/new-question"
          component={NewQuestion}
          checkingSession={this.state.checkingSession}
        />
      </div>
    );
  }
}

export default withRouter(App);
