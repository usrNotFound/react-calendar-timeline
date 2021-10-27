import React from 'react'
import PropTypes from 'prop-types'
import DateContext from './DateContext'


const DateProvider = (props) => {
  const { locale, children } = props;

  return (
      <DateContext.Provider value={{ locale }}>
        {children}
      </DateContext.Provider>
  );
};

DateProvider.propTypes = {
  children: PropTypes.node,
  locale: PropTypes.object.isRequired,
}

export default DateProvider;
