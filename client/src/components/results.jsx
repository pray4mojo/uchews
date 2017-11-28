import React from 'react';
import Paper from 'material-ui/Paper';
import MapsContainer from './map.jsx';
import RaisedButton from 'material-ui/RaisedButton';

const style = {
  paper: {
    display: 'inline-block',
    height: '50%',
    margin: '0 auto',
    padding: 50,
    textAlign: 'center',
    width: '50%',
  },
  separater: {
    height: '400px',
  }
};

class Results extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cycleChoicesCounter: 0,
      choices: [this.props.results[0][0], this.props.results[1][0], this.props.results[2][0]],
      buttonText: 'Show Me More'
    };
    this.cycleChoices = this.cycleChoices.bind(this);
    this.setChoices = this.setChoices.bind(this);
  }

  setChoices() {
    const choicesIndex = [];
    let endOfList = true;
    let buttonText = 'Show Me More';
    this.props.results.forEach((cuisineResults) => {
      if (this.state.cycleChoicesCounter > cuisineResults.length - 1) {
        choicesIndex.push(cuisineResults.length - 1);
      } else {
        choicesIndex.push(this.state.cycleChoicesCounter);
        endOfList = false;
      }
    });
    if (endOfList) {
      buttonText = 'No more results'
    }
    this.setState({
      choices: [this.props.results[0][choicesIndex[0]], this.props.results[1][choicesIndex[1]], this.props.results[2][choicesIndex[2]]],
      buttonText: buttonText
    });
  }

  cycleChoices() {
    this.setState({
      cycleChoicesCounter: ++this.state.cycleChoicesCounter
    });
    this.setChoices();
  }

  componentDidMount() {
    this.setChoices();
  }

  render() {
    let buttonText;
    if (this.state.endOfList) {
      buttonText = 'No more results';
    } else {
      buttonText = 'Show Me More';
    }

    return (
      <div>
        <Paper style={style.paper} zDepth={3}>
          <h2>Your Results!</h2>
          <MapsContainer results={[[this.state.choices[0]], [this.state.choices[1]], [this.state.choices[2]]]}/>
          <div style={style.separater}></div>  {/* this provides the buffer between the map and the results */}
          <h1>#1</h1>                          {/* otherwise the map will overlap the results */}
          <h2>{this.state.choices[0].name}</h2>
          {this.state.choices[0].formatted_address}

          <h1>#2</h1>
          <h2>{this.state.choices[1].name}</h2>
          {this.state.choices[1].formatted_address}

          <h1>#3</h1>
          <h2>{this.state.choices[2].name}</h2>
          {this.state.choices[2].formatted_address} <br /><br />
          <RaisedButton label={this.state.buttonText} primary={true} onClick={this.cycleChoices} />
        </Paper>
      </div>
    )
  }

}

export default Results;