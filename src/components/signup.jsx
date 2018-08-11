import React from "react";

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
  }

  boxes() {
    const result = [];
    for(let i = 0; i < 20; i++){
      result.push(<CheckBox key={i} id={i}/>);
    }
    return result;
  }

  render() {
    return(
      <div>
      <br />
        <form>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
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

const CheckBox = props => (
  <div className="form-group form-check form-check-inline">
    <input type="checkbox" className="form-check-input" id={`exampleCheck${props.id}`} />
    <label className="form-check-label" htmlFor={`exampleCheck${props.id}`}>Check me out</label>
  </div>
);

const BooleanRadio = props => (
  <div className="row">
    <legend className="col-form-label col-sm-5 pt-0">{props.legend}</legend>
    <div className="form-check form-check-inline">
      <input className="form-check-input" type="radio" name={props.name} id={`${props.name}1`} value={props.value1} />
      <label className="form-check-label" htmlFor="inlineRadio1">{props.text1}</label>
    </div>
    <div className="form-check form-check-inline">
      <input className="form-check-input" type="radio" name="inlineRadioOptions" id={`${props.name}2`} value={props.value2} />
      <label className="form-check-label" htmlFor="inlineRadio2">{props.text2}</label>
    </div>
  </div>

);

export default Signup;
