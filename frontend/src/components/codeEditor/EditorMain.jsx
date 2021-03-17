import React, { Component } from 'react';
import Editor from "./EditorComponent";
import AceExample from "./AceComponent";
import Problem from "./ProblemComponent";
class Main extends Component {
  state = {  }
  render() { 
    return (
      <div className="container m-5">
        <div className="row">
          <div className="col-12">
            <h3>Coding Platform.</h3>
          </div>
        </div>
        <Editor />
        <AceExample />
      </div>
    );
  }
}

export default Main;