import React, {Component} from 'react';

class AddCustomer extends Component {
    constructor() {
        super()

        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(event) {
        event.preventDefault();

        let date = this.date.value.split("-").reverse().join(".");

        this.props.onAdd(this.fname.value, this.lname.value, date, this.location.value)
    }

  render() {

    return (
        <form onSubmit={this.onSubmit} className="form_content">
            <h1>Form</h1>
            First name: <input type="text" ref={fname => this.fname = fname}/>
            Last name: <input type="text" ref={lname => this.lname = lname} />
            Date of Birth: <input type="date" ref={date => this.date = date} />
            Location: <input type="text" ref={location => this.location = location} />
            <button>Submit</button>
        </form>
    );
  }
}

export default AddCustomer;