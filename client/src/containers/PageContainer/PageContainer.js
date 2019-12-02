import React from 'react';

const PageContainer = (props) => {
  return (
    <div className="container">
      <div className="row align-items-center page-container">
        <div className="col align-self-center page-container-border">
          <div className="jumbotron">
            <h1 className="display-4">Time Tracking Application</h1>
            <p className="lead">This is a simple application to allow freelancers to track their time.</p>
            <hr className="my-4" />
            {props.children}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PageContainer;
