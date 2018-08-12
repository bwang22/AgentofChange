import React from "react";
import {CheckBox} from "./signup";

const level = {
  prepared: <span style={{ color: "#239F1D" }}>Prepared</span>,
  somewhatPrepared: <span style={{ color: "#F5CC0B" }}>Somewhat Prepared</span>,
  unprepared: <span style={{ color: "#E40024" }}>Unprepared</span>,
}

class ProfileView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      needs: this.props.location.state.needs || [],
      householdNumber: this.props.location.state.householdNumber || 0,
      preparedness: "unprepared"
    }
  }

  componentDidMount() {
    const needLevel = this.state.needs.filter(need=>need.need).length / this.state.needs.length;
    if( needLevel < .5) {
      this.setState({preparedness: "prepared"});
    } else if (needLevel > .3) {
      this.setState({preparedness: "unprepared"});
    } else {
      this.setState({preparedness: "somewhatPrepared"});
    }
  }

  boxes() {
    const result = [];
    for(let i = 0; i < this.state.needs.length; i++){
      if(this.state.needs[i].need) result.push(<CheckBox key={i} id={i} name={this.state.needs[i].name} unit={this.state.needs[i].unit} amount={this.state.needs[i].amount} householdNumber={this.state.householdNumber} profilePage/>);
    }
    return result;
  }

  render() {
    return(
      <div className="row">
        <div className="col-md-3">
          <div className="card">
            <div className="card-body">
              <img src="http://images.mentalfloss.com/sites/default/files/styles/mf_image_16x9/public/504767-Microsoft_0.jpg" style={{ borderRadius: "50%", width: "150px", height: "auto" }} />
              <h5 className="card-title">Mr Clippy</h5>
              <h6 className="card-subtitle mb-2 text-muted">Preparedness Level: {level[this.state.preparedness]}</h6>
              <h6 className="card-subtitle mb-2 text-muted">Household members: {this.state.householdNumber}</h6>
              <p className="card-text"></p>
            </div>
          </div>
        </div>
        <div className="col-md-8">
          <div className="card">
            <div className="card-body">
              <h2 style={{ textAlign: "center"}}>Preparedness Level: {level[this.state.preparedness]}</h2>
              <br />
              <div style={{ textAlign: "center" }}>
                Supplies Required:
                <br />
                {this.boxes()}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileView;
