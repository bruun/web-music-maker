import React from "react";
import ReactDOM from "react-dom";
import StyleSheet from "stilr";

import recordVoice from "../lib/recordVoice";

const styles = StyleSheet.create({
  header: {
    color: "red",
    fontSize: 50,
    textAlign: "center",
  },
});

class App extends React.Component {
  render() {
    return <h1 className={styles.header}>Web Music Maker 2K</h1>;
  }
}

ReactDOM.render(<App />, document.querySelector("#app"));

let stylesheet = document.createElement('style');
stylesheet.textContent = StyleSheet.render();
document.head.appendChild(stylesheet);
