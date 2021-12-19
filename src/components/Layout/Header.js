import React from 'react';

import HeaderCartButton from './HeaderCartButton';
import mealsImage from '../../assets/images/meals.jpg';
import classes from './Header.module.css';

function Header(props) {
  return (
    <React.Fragment>
      <header className={classes.header}>
        <h1>My Meals</h1>
        <HeaderCartButton onClick={props.onShowHandler} />
      </header>
      <div className={classes['main-image']}>
        <img src={mealsImage} alt='meals' />
      </div>
    </React.Fragment>
  );
}

export default Header;
