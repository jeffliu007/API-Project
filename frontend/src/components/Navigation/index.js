import React, { useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  const navBar = useRef();

  useEffect(() => {
    window.addEventListener("scroll", (e) => {
      if (window.scrollY > 0) {
        navBar?.current?.classList.add("nav-bar-shadow");
      } else {
        navBar?.current?.classList.remove("nav-bar-shadow");
      }
    });
  }, []);

  return (
    <div className="Nav-Main" ref={navBar}>
      <div className="Nav-Home-Button">
        <NavLink exact to="/">
          <img
            src={process.env.PUBLIC_URL + "/images/Nav-Logo.png"}
            alt="Nav-Logo"
            className="Home-Logo"
          />
        </NavLink>
      </div>
      {isLoaded && (
        <div className="Nav-Profile-Button">
          <ProfileButton user={sessionUser} />
        </div>
      )}
    </div>
  );
}

export default Navigation;
