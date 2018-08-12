import React from "react";

export const needs = [
  {name: 'Canned Food', need: true, unit: "cans", amount: 42},
  {name: 'Water(Drinking and Sanitation)', need: true,  unit: "gallons", amount: 14},
  {name: 'Blankets', need: true, unit: "", amount: 1},
  {name: 'Batteries', need: true, unit: "", amount: 14},
  {name: 'Candles', need: true,  unit: "", amount: 28},
  {name: 'Matches', need: true, unit: "box(es)", amount: 1},
  {name: 'First Aid Kit', need: true, unit: "", amount: 1},
];

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      needs,
      householdNumber: 0
    }
    this.onSubmit = this.onSubmit.bind(this);
    this.handleChangeNeed = this.handleChangeNeed.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.history.replace({pathname: "/findProfileId/1", state: {needs, householdNumber: this.state.householdNumber}});
  }

  handleChangeNeed(e) {
    const target = parseInt(e.target.id.split("exampleCheck")[1],10);
    const newArray = [...this.state.needs];
    newArray[target].need = !newArray[target].need;
    this.setState({needs: newArray});
  }

  handleInput(e) {
    const newNum = isNaN(parseInt(e.target.value,10)) ? 0 : parseInt(e.target.value,10);
    this.setState({householdNumber: newNum});
  }

  boxes() {
    const result = [];
    for(let i = 0; i < this.state.needs.length; i++){
      result.push(<CheckBox key={i} id={i} name={needs[i].name} handleChangeNeed={this.handleChangeNeed}/>);
    }
    return result;
  }

  render() {
    return(
      <div>
      <br />
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
          </div>
          <div className="form-group">
            <label htmlFor="householdNumber">Number of household members other than yourself:</label>
            <input type="text" className="form-control col-sm-2" id="householdNumber" aria-describedby="emailHelp" onChange={this.handleInput} value={this.state.householdNumber} />
          </div>
          <h5 className="card-title">Supplies I have</h5>
          { this.boxes() }
          <BooleanRadio
            legend="Gender"
            name="gender"
            text1="Male"
            text2="Female"
            value1="M"
            value2="F"
          />
          <BooleanRadio
            legend="Do you have children?"
            name="children"
            text1="Yes"
            text2="No"
            value1={true}
            value2={false}
          />
          <BooleanRadio
            legend="Do you have any disabled household members?"
            name="disabled"
            text1="Yes"
            text2="No"
            value1={true}
            value2={false}
          />
          <BooleanRadio
            legend="Do you have any senior household members?"
            name="senior"
            text1="Yes"
            text2="No"
            value1={true}
            value2={false}
          />
          <button type="submit" className="btn btn-danger">Create Account</button>
        </form>
      </div>
    )
  }
}

export const CheckBox = props => (
  <div className="custom-control custom-checkbox custom-control-inline">
    <input type="checkbox" className="custom-control-input" id={`exampleCheck${props.id}`} onChange={props.handleChangeNeed} />
    <label className="custom-control-label" htmlFor={`exampleCheck${props.id}`}>
      {props.name}
      {
        props.profilePage ?
          ": " + (props.amount * (props.householdNumber + 1)) + " " + props.unit
        : null
      }
    </label>
  </div>
);

const BooleanRadio = props => (
  <div className="row">
    <legend className="col-form-label col-sm-5 pt-0">{props.legend}</legend>
    <div className="custom-control custom-radio custom-control-inline">
      <input className="custom-control-input" type="radio" name={props.name} id={`${props.name}1`} value={props.value1} />
      <label className="custom-control-label" htmlFor={`${props.name}1`}>{props.text1}</label>
    </div>
    <div className="custom-control custom-radio custom-control-inline">
      <input className="custom-control-input" type="radio" name={props.name} id={`${props.name}2`} value={props.value2} />
      <label className="custom-control-label" htmlFor={`${props.name}2`}>{props.text2}</label>
    </div>
  </div>

);

export default Signup;
