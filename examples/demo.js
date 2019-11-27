/**
 * @file demo.js
 */
import React, { Component } from 'react';

import data from './data';

// Styles
import './App.css';

// Local components
import BarChart from '../src/BarChart';

const randomColor = () => {
  return `rgb(${255 * Math.random()}, ${255 * Math.random()}, ${255})`;
}

const len = data[Object.keys(data)[0]].length;
const keys = Object.keys(data);
const colors = keys.reduce((res, item) => ({
    ...res,
    ...{ [item]: randomColor() }
}), {});

const labels = keys.reduce((res, item, idx) => {
  return{
  ...res,
  ...{[item]: (
    <div style={{textAlign:"center",}}>
      <div>{item}</div>
    </div>
    )}
}}, {});

const time = Array(20).fill(0).map((itm, idx) => idx + 1);

class App extends Component {
  render(){
    return (
      <div className="App">
        <div className="container">
          <BarChart
            start={true}
            data={data}
            timeline={time}
            labels={labels}
            colors={colors}
            len={len}
            timeout={400}
            delay={100}
            timelineStyle={{
              textAlign: "center",
              fontSize: "50px",
              color: "rgb(148, 148, 148)",
              marginBottom: "100px"
            }}
            textBoxStyle={{
              textAlign: "right",
              color: "rgb(133, 131, 131)",
              fontSize: "30px",
            }}
            barStyle={{
              height: "60px",
              marginTop: "10px",
              borderRadius: "10px",
            }}
            width={[15, 75, 10]}
            maxItems={5}
          />
        </div>
      </div>
    );
  }
}

export default App;
