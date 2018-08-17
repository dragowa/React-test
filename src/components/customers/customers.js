import React, {Component} from 'react';
import CustomersList from './customersList';
import AddCustomers from "./addCustomers";
import Summary from "./summary";



class Customers extends Component {
  constructor () {
      super()

      this.state = {
          customers: []
      }

      this.onDelete = this.onDelete.bind(this);
      this.onAdd = this.onAdd.bind(this);
      this.onEditSubmit = this.onEditSubmit.bind(this);
      this.summaryLocation = this.summaryLocation.bind(this);
      this.summaryAge = this.summaryAge.bind(this);
      this.summaryName = this.summaryName.bind(this);
  }


  componentDidMount() {
      fetch('/users')
        .then(res => res.json())
        .then(customers => this.setState({customers}))
        .catch(eror => console.log(eror))
  }


  summaryLocation() {
    const customers = this.state.customers;

    let filterCostomers = customers.filter(customer => {
        return customer.location === "kiev" || customer.location === "Kiev";
    });

    return filterCostomers.length;
  }


  summaryAge() {
    const customers = this.state.customers;

    let filterArr = [];

    customers.map(customer => {
        return  filterArr.push(customer.dob)
    })

   let time = filterArr.map(items => {
        return timeParse() - cangeType(items)
    })

    function cangeType(str) {
       let modifed = str.split(".").reverse().join("-");
       let modifedData = Date.parse(modifed);

       let date = new Date(modifedData);
       return date.getFullYear();
    }

    function timeParse() {
        let time = Date.now();
        let timeNow = new Date(time);
        return timeNow.getFullYear();
    }

    function sDecrease(i, ii) { 
        if (i > ii)
            return -1;
        else if (i < ii)
            return 1;
        else
            return 0;
    }

    let changedTime = time.sort(sDecrease);

    let sum = [];

    for (let i = 0; i < changedTime.length; i++) {
        if ( isNaN(changedTime[i])) {
            console.log("NaN")
        } else {
            sum.push(changedTime[i])
        }
    }

    let lastSum = 0;

    for (let i = 0; i < 3; i++) {
        lastSum += sum[i];
    }

    return lastSum;
  }


  summaryName() {
    const customers = this.state.customers;

    let filterArr = customers.map(customer => {
        return  customer.first_name + ' ' + customer.last_name
    })

    let sDecrease = (i, ii) => { 
        if (i.length > ii.length)
            return 1;
        else if (i.length < ii.length)
            return -1;
        else
            return 0;
    }

    let test = filterArr.sort(sDecrease);

    return test[test.length - 1]
  }


  onDelete(id) {
    const customers = this.state.customers;

    const filterCostomers = customers.filter(customer => {
        return customer.id !== id;
    });

    this.setState({ customers : filterCostomers});
    
    fetch(`/users/${id}`, {
        method: 'delete'
    }).then(res => res.json())
      .then( (data) => console.log(data));
  }


  onEditSubmit(fname, lname, dob, location, id) {
      let data = {
          first_name: fname,
          last_name: lname,
          dob: dob,
          location: location
      }
    
    fetch(`/users/${id}`, {
        method: 'put',
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        }
    }) 
    .then(  
        fetch('/users')
        .then(res => res.json())
        .then(customers => this.setState({customers}, () => console.log(customers))))
    .catch(eror => console.log(eror))
  }


  onAdd(fname, lname, dob, location) {
    const prod = this.state.customers;

    let data = {
        first_name: fname,
        last_name: lname,
        dob: dob,
        location: location  
    }

    prod.push(data);

    this.setState({customers : prod});

    fetch(`/users`, {
        method: 'post',
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        }

    }).then(response => response.json())
      .catch(eror => console.log(eror));
  }

  render() {
    return (
      <div className="wrapper">
           <thead>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>DOB</th>
                    <th>Location</th>
                    <th>Actions</th>
                </tr>
            </thead>
        <table>
             
            <tbody>
                {this.state.customers.map(customer => {
                return <CustomersList {...customer}
                                key={customer.id}
                                onDelete={this.onDelete}
                                onEditSubmit={this.onEditSubmit}
                                /> 
                    }
                )}
            </tbody>

        </table>
        <div className="form_content">
            <AddCustomers onAdd={this.onAdd}/>
            <Summary summaryLocation={this.summaryLocation} 
                     summaryAge={this.summaryAge}
                     summaryName={this.summaryName}/>
        </div>
      </div>
    );
  }
}

export default Customers;