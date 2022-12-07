import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar__links">
        <Link to="/about">0. About</Link>
        <Link to="/posts">1. Posts</Link>
      </div>
    </div>
  );
};

export default Navbar;
