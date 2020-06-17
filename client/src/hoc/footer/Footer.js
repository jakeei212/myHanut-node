import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="bck_b_dark">
      <div className="">
        <div className="logo">Jacob</div>
        <div className="wrapper">
          <div className="left">
            <h2>Contact information</h2>
            <div className="business_nfo">
              <div className="tag">
                <div className="nfo">
                  <div>Address</div>
                  <div>Haifa 12345</div>
                </div>
              </div>
              <div className="tag">
                <div className="nfo">
                  <div>Phone</div>
                  <div>555-555-555</div>
                </div>
              </div>
              <div className="tag">
                <div className="nfo">
                  <div>Working hours</div>
                  <div>Mon-Sun/ 8am-12pm</div>
                </div>
              </div>
              <div className="tag">
                <div className="nfo">
                  <div>Email</div>
                  <div>jacobthejacobs@gmail.com</div>
                </div>
              </div>
            </div>
          </div>
          <div className="left">
            <h2>Be the first to know</h2>
            <div>
              <div>
                Get all the latest information on events, sales and offers.You
                can miss out.
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
