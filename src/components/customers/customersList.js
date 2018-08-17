import React, {Component} from 'react';

class CustomersList extends Component {
  constructor() {
    super()

    this.state = {
      isEdit: false
    }

    this.onEdit = this.onEdit.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onEditSubmit = this.onEditSubmit.bind(this);
    this.onToggle = this.onToggle.bind(this);
  }

  onToggle() {
    this.setState({ isEdit: false})
  }

  onEdit() {
    this.setState({ isEdit: true });
  }

  onDelete() {
    const { onDelete, id } = this.props;

    onDelete(id);
  }

  onEditSubmit(event) {
    event.preventDefault();

    let date = this.date.value.split("-").reverse().join(".");

    this.props.onEditSubmit(this.fname.value, this.lname.value, date, this.location.value, this.props.id)

    this.setState({ isEdit: false })
  }

  render() {
    const { first_name, last_name, dob, location } = this.props;

    return (
      <div>
        {
          this.state.isEdit
          ? (
            <form onSubmit={this.onEditSubmit} className="form_edit">
              First name: <input type="text" ref={fname => this.fname = fname} />
              Last name: <input type="text" ref={lname => this.lname = lname} />
              Date of Birth: <input type="date" ref={date => this.date = date} />
              Location: <input type="text" ref={location => this.location = location} />
              <div>
                <button>Save</button>
                <button onClick={this.onToggle}>Back</button>
              </div>
            </form>
          )
          :
          (
          <div>
            <td>{first_name}</td>
            <td>{last_name}</td>
            <td>{dob}</td>
            <td>{location}</td>
            <td><button onClick={this.onEdit}>Edit</button>
            <button onClick={this.onDelete}>Delete</button></td>
          </div>
          )
        }
      </div>
    )
  }
  
}

export default CustomersList;

