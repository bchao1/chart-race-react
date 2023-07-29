import React from 'react';
import Bar from './Bar';

const classes = {
  barChart: {
    width: "100%",
    position: "relative",
  },
  container: {
    width: "100%",
  }
}
class BarChart extends React.Component {
    constructor(props){
        super(props);
        this.barHeight = `calc(${props.barStyle.height} + ${props.barStyle.marginTop})`;
        this.nItmes = Object.keys(this.props.data).length;
        this.maxItems = props.maxItems <= this.nItmes ? props.maxItems : this.nItmes;
        this.barChartStyle = {
            height: `calc(${this.maxItems} * ${this.barHeight})`,
        };
        let [initRank, maxVal] = this.sortAxis(0);
        this.state = {
            idx: 0,
            prevRank: initRank,
            currRank: initRank,
            maxVal: maxVal,
            started: props.start
        };
    }

    componentDidMount = () => {
      if(this.props.start){
        var intervalId = setInterval(this.update, this.props.timeout + this.props.delay);
        this.setState({intervalId: intervalId});
      }
    }

    componentWillReceiveProps(nextProps) {
      if (nextProps.start) {
        var intervalId = setInterval(this.update, this.props.timeout + this.props.delay);
        this.setState({intervalId: intervalId});
      }
    }

    componentWillUnmount = () => {
      clearInterval(this.state.intervalId);
    }

    update = () => {
      if(this.state.idx + 1 === this.props.timeline.length) {
        clearInterval(this.state.intervalId);
        return;
      }
      this.setState(prevState => {
            let [currRank, maxVal] = this.sortAxis(prevState.idx + 1);
            return {
                idx: prevState.idx + 1,
                prevRank: prevState.currRank,
                currRank: currRank,
                maxVal: maxVal,
            }
        });
    }

       /**
  * sortAxis
  * Handles sorting the results
  * @param {*} i is the item to start sorting from
  * @param {number} maxItems is the maximum number of items to allow in the list
  * @param {*} descending is the direction to sort
  */
   sortAxis = (i, descending) => {
     if(descending === undefined) descending = true;
     // Build a new array to sort e.x. { name: 'some name', val: 1 }
     let toSort = Object.keys(this.props.data).map(name => {
       return {
         name,
         val: this.props.data[name][i]
       };
     });
     // Handle the sorting based on the values
     toSort.sort((left, right) => left.val - right.val)
     if (descending) {
       toSort.reverse()
     }
     // Slice based on the maximum items allowed
     const fItems = Object.keys(this.props.data).length
     if (this.maxItems && this.maxItems <= fItems) {
       toSort = toSort.slice(0, this.maxItems)
     }
     const maxVal = Math.max.apply(Math, toSort.map(item => item.val))
     const minVal = Math.min.apply(Math, toSort.map(item => item.val))
     // Sorted list of results based on the axis
     return [toSort.reduce((ret, item, idx) => ({
       ...ret, ...{ [item.name]: idx }
     }), {}), minVal, maxVal]
   }

    getInfoFromRank = name => {
      const currIdx = this.state.idx;
      const prevIdx = (currIdx > 0 ? currIdx - 1 : 0);
      const value = this.props.data[name][currIdx];
      const hidden = (this.state.currRank[name] === undefined);
      const currStyle = {
        ...this.props.barStyle,
        marginTop: `calc(${this.state.currRank[name]} * ${this.barHeight})`,
        width: `${100 * this.props.data[name][currIdx]/ this.state.maxVal}%`,
        backgroundColor: this.props.colors[name],
      };
      const prevStyle = {
        ...this.props.barStyle,
        marginTop: `calc(${this.state.prevRank[name]} * ${this.barHeight})`,
        width: `${100 * this.props.data[name][prevIdx]/ this.state.maxVal}%`,
        backgroundColor: this.props.colors[name],
      };
      return [value, hidden, currStyle, prevStyle];
    }

    render(){
      return (
        <div style={classes.container}>
          <div style={this.props.timelineStyle}>
            {this.props.timeline[this.state.idx]}
          </div>
          <div style={{...classes.barChart, ...this.barChartStyle}}>
            {
              Object.keys(this.props.data).map(name => {
                const [value, hidden, currStyle, prevStyle] = this.getInfoFromRank(name);
                if(hidden) return (<div key={name}></div>);
                return (
                    <Bar
                      name={name}
                      value={value}
                      label={this.props.labels[name]}
                      currStyle={currStyle}
                      prevStyle={prevStyle}
                      key={name}
                      timeout={this.props.timeout}
                      textBoxStyle={this.props.textBoxStyle}
                      width={this.props.width}
                    />
                )
              })
            }
          </div>
        </div>
      );
    }
}

export default BarChart;
