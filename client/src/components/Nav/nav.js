import React from 'react';

const Nav = props => {
  const btnText = props.view === 'new' ? 'View Saved Sessions' : 'Create New Session';
  return(
    <ul className="nav flex-column">
      <li className="nav-item">
        <div className="disabled" style={{ marginBottom: '1em' }} aria-disabled="true">Logged In: <strong>{props.username}</strong></div>
      </li>
      <li className="nav-item">
        <button className="btn btn-secondary btn-sm" onClick={props.onViewChange}>{btnText}</button>
      </li>
    </ul>
  )
}

export default Nav;
