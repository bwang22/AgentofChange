import React from "react";



class ProfileView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      needs: []
    }
  }

  componentDidMount() {
    // for now, mock data

  }
  render() {
    return(
      <div className="row">
        <div className="col-md-3">
          <div className="card">
            <div className="card-body">
              <img src="http://images.mentalfloss.com/sites/default/files/styles/mf_image_16x9/public/504767-Microsoft_0.jpg" style={{ borderRadius: "50%", width: "150px", height: "auto" }} />
              <h5 className="card-title">Mr Clippy</h5>
              <h6 className="card-subtitle mb-2 text-muted">Preparedness Level: Prepared</h6>
              <p className="card-text"></p>
            </div>
          </div>
        </div>
        <div className="col-md-8">
          <div className="card">
            <div className="card-body">
              <h2 style={{ textAlign: "center"}}>Preparedness Level: Prepared</h2>
              <br />
              <p style={{ textAlign: "center" }}>
                Supplies Required:
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileView;
