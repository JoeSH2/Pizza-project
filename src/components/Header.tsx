import { FC, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import Button from "./UI/buttonBusket/Button";
import Input from "./UI/Input/Input";

import HeaderLogo from "./assets/headerLogo.svg";

const Header: FC = () => {
  const [visibleSearch, setVisibleSearch] = useState(false);
  const location = useLocation();

  return (
    <header className="header">
      <div className="container">
        <div className="header__inner">
          <Link to="/">
            <div className="header__logo">
              <img src={HeaderLogo} alt="logo" className="header__logo-pizza" />
              <div className="header__logo-title">
                <h1 className="header__mainTitle">DomiDo</h1>
                <div className="header__subTitle">
                  гарантируем высокое качество
                </div>
              </div>
            </div>
          </Link>
          {location.pathname !== "/Cart" && (
            <div className="header__wrapper">
              {visibleSearch && <Input />}
              <svg
                onClick={() => setVisibleSearch(!visibleSearch)}
                className="search"
                viewBox="0 0 488.4 488.4"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0,203.25c0,112.1,91.2,203.2,203.2,203.2c51.6,0,98.8-19.4,134.7-51.2l129.5,129.5c2.4,2.4,5.5,3.6,8.7,3.6
			          s6.3-1.2,8.7-3.6c4.8-4.8,4.8-12.5,0-17.3l-129.6-129.5c31.8-35.9,51.2-83,51.2-134.7c0-112.1-91.2-203.2-203.2-203.2
			          S0,91.15,0,203.25z M381.9,203.25c0,98.5-80.2,178.7-178.7,178.7s-178.7-80.2-178.7-178.7s80.2-178.7,178.7-178.7
			          S381.9,104.65,381.9,203.25z"
                />
              </svg>
              <Link to="/Cart">
                <Button />
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
