import React, {Component} from 'react';

class Summary extends Component {
  constructor () {
    super()

    this.state = {
      customers: 0,
      age: 0,
      name: ''
    }
  }
  
  componentWillReceiveProps(nextProps) {
    let customer = this.props.summaryLocation();
    let age = this.props.summaryAge();
    let name = this.props.summaryName();
    
    this.setState({ customers: customer, age: age, name: name})
  }

  render() {
    return (
      <div className="summary">
        <p>Count of users from kiev : <span>{this.state.customers}</span></p>
        <p>Sum of three oldest user ages : <span>{this.state.age}</span></p>
        <p>Longest string of first name + last name : <span>{this.state.name}</span></p>
      </div>
    );
  }
}

export default Summary;