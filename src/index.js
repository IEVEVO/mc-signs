import React from "react";
import ReactDOM from "react-dom";
import { Page } from "./Page";
import { Codes } from "./Codes";

import "./styles.scss";


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      page: "main"
    };

    this.changePage = this.changePage.bind(this);
  }

  changePage(e) {
    this.setState({
      page: e.target.name
    });
  }

  render() {
    var page = "";

    if(this.state.page == "main") {
      page = (<Page navigate={this.changePage} />);
    }
    else if(this.state.page == "codes") {
      page = (<Codes navigate={this.changePage} />);
    }


    return (
      page
    );
  }
}


const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
