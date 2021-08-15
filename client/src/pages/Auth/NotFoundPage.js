import React from "react";
import "./style.css";

const NotFoundPage = () => {
  return (
    <div className="row">
      <div className="col-md-12">
        <div className="error-template">
          <h1>Oops!</h1>
          <h2>404 Not Found</h2>
          <div className="error-details">
            Sorry, an error has occured, Requested page not found!
          </div>
          <div className="error-actions">
            <a href="/" className="btn btn-primary btn-lg">
              <i className="fa fa-home mr-2"></i>
              Take Me Home
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
