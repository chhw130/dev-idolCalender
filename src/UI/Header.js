import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import "../UI/Header.css";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store/auth";
import { removeCookie, setCookie } from "../cookie/cookie";
import axios from "axios";

const Headar = () => {
  const [navColor, setnavColor] = useState("transparent");
  const userToken = useSelector((state) => state.auth.userSessionId);
  const dispatch = useDispatch();

  const listenScrollEvent = () => {
    window.scrollY > 10 ? setnavColor("#ffff") : setnavColor("transparent");
  };
  useEffect(() => {
    window.addEventListener("scroll", listenScrollEvent);
    return () => {
      window.removeEventListener("scroll", listenScrollEvent);
    };
  }, []);

  const LogoutHandler = async () => {
    setCookie("asdf");
    // await fetch("http://127.0.0.1:8000/api/v1/users/logout", {
    //   method: "POST",
    // }).then((res) => console.log("logout : API", res));

    dispatch(authActions.logOut());
  };

  return (
    <div
      className="header"
      style={{
        backgroundColor: navColor,
        transition: "all 1s",
      }}
    >
      <div className="headerNav">
        <div className="navItems">
          <div className="navItem">
            <Link to={"/"}>
              <img
                className="navImg"
                src="https://velog.velcdn.com/images/view_coding/post/6e4d7220-8bc8-4e88-9d4b-f3dd9e09b523/image.png"
                alt=""
              ></img>
            </Link>
          </div>
          <div className="navItem navSpan">
            <Link to={"/:idolId"}>
              <span className="navItem_span">스케줄 보기</span>
            </Link>
          </div>
        </div>
        <div className="navItems">
          <div className="navItem">
            {!userToken ? (
              <Link to={"/login"}>
                <>
                  <button className="navBtn">Login</button>
                </>
              </Link>
            ) : (
              <>
                <button className="navBtn">
                  <Link to="/edituser">내 정보</Link>
                </button>
                <button className="navBtn" onClick={LogoutHandler}>
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Headar;
