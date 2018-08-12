import React from "react";
import {CheckBox} from "./signup";

const level = {
  prepared: <span style={{ color: "#239F1D" }}>Prepared</span>,
  somewhatPrepared: <span style={{ color: "#F5CC0B" }}>Somewhat Prepared</span>,
  unprepared: <span style={{ color: "#E40024" }}>Unprepared</span>,
}

const defaultPerson = {
  name: "Mr Clippy",
  img: "http://images.mentalfloss.com/sites/default/files/styles/mf_image_16x9/public/504767-Microsoft_0.jpg"

};

const randomBool = () => Math.random() < 0.5;

const otherNeeds = [
  {name: 'Canned Food', need: ()=>randomBool(), unit: "cans", amount: 42},
  {name: 'Water(Drinking and Sanitation)', need: ()=>randomBool(),  unit: "gallons", amount: 14},
  {name: 'Blankets', need: ()=>randomBool(), unit: "", amount: 1},
  {name: 'Batteries', need: ()=>randomBool(), unit: "", amount: 14},
  {name: 'Candles', need: ()=>randomBool(),  unit: "", amount: 28},
  {name: 'Matches', need: ()=>randomBool(), unit: "box(es)", amount: 1},
  {name: 'First Aid Kit', need: ()=>randomBool(), unit: "", amount: 1}
];

const persons = [
  {
    name: "Young Bill Gates",
    img: "https://cdn.thegentlemansjournal.com/wp-content/uploads/2015/10/front18-900x600-c-center.jpg"

  },
  {
    name: "Steve Ballmer",
    img: "https://cdn0.tnwcdn.com/wp-content/blogs.dir/1/files/2010/11/ballmer5.png"

  }
];

class ProfileView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      needs: this.props.location.state.needs || [],
      householdNumber: this.props.location.state.householdNumber || 0,
      preparedness: "unprepared",
      person: this.props.location.state.person || defaultPerson
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
      if(this.state.needs[i].need) result.push(<CheckBox key={i} id={i} name={this.state.needs[i].name} unit={this.state.needs[i].unit} amount={this.state.needs[i].amount} householdNumber={this.state.householdNumber} profilePage />);
    }
    return result;
  }

  userBoxes(name, householdNumber = 0) {
    const result = [];
    for(let i = 0; i < otherNeeds.length; i++){

      result.push(<CheckBox key={name+i} id={name+i} name={otherNeeds[i].name} unit={otherNeeds[i].unit} amount={otherNeeds[i].amount} householdNumber={householdNumber} otherInfo disabled need={otherNeeds[i].need()}/>);
    }
    return result;
  }

  render() {
    return(
      <div className="row">
        <div className="col-md-3">
          <div className="card">
            <div className="card-body">
              <img src={this.state.person.img} style={{ borderRadius: "50%", width: "100px", height: "100px", border: "1px solid #cccccc", objectFit: "cover" }} />
              <h5 className="card-title">{this.state.person.name}</h5>
              <h6 className="card-subtitle mb-2 text-muted">Preparedness Level: {level[this.state.preparedness]}</h6>
              <h6 className="card-subtitle mb-2 text-muted">Household members: {this.state.householdNumber}</h6>
              <p className="card-text"></p>
            </div>
          </div>
        </div>
        <div className="col-md-8">
          <div className="row">
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
        {
          persons.map((element) => <ProfileItems {...this.state} userBoxes={this.userBoxes} person={element}/>)
        }
        </div>
      </div>
    );
  }
}

const ProfileItems = props => (
  <div className="row" style={{ marginTop: "20px"}}>
    <div className="card">
      <div className="card-body">
        <div className="row justify-content-between">
          <div className="col-md-2" style={{ midWidth: "115px" , minHeight: "115px"}}>
          <img src={props.person.img} style={{ borderRadius: "50%", width: "100px", height: "100px", border: "1px solid #cccccc", objectFit: "cover" }} />
          </div>
          <div className="col" style={{marginLeft: "10px"}}>
            <div>{props.person.name}</div>
            <div>{props.userBoxes("otherNeeds")}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
)

export default ProfileView;
