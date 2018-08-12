import React from "react";


const Header = () => (
  <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: "#F15D5D", borderRadius: "2px", marginBottom: "20px" }}>
  <a className="navbar-brand" href="#">Samarytn</a>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarNav">
    <ul className="navbar-nav">
      <li className="nav-item active">
        <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="#">Feed</a>
      </li>
    </ul>
  </div>
</nav>

);

export default Header;
