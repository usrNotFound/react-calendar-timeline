import React from 'react'
import Interval from './Interval'
import { getTime } from 'date-fns'
import PropTypes from 'prop-types'
export function CustomDateHeader({
  headerContext: { intervals, unit },
  getRootProps,
  getIntervalProps,
  showPeriod,
  data: {
    style,
    intervalRenderer,
    className,
    getLabelFormat,
    unitProp,
    headerData
  }
}) {
  return (
    <div
      data-testid={`dateHeader`}
      className={className}
      {...getRootProps({ style })}
    >
      {intervals.map((interval) => {
        const intervalText = getLabelFormat(
          [interval.startTime, interval.endTime],
          unit,
          interval.labelWidth
        )
        return (
          <Interval
            key={`label-${getTime(interval.startTime)}`}
            unit={unit}
            interval={interval}
            showPeriod={showPeriod}
            intervalText={intervalText}
            primaryHeader={unitProp === 'primaryHeader'}
            getIntervalProps={getIntervalProps}
            intervalRenderer={intervalRenderer}
            headerData={headerData}
          />
        )
      })}
    </div>
  )
}

CustomDateHeader.propTypes = {
  headerContext: PropTypes.shape({
    intervals: PropTypes.shape({startTime: PropTypes.number, endTime: PropTypes.number}).isRequired,
    unit: PropTypes.string.isRequired
  }).isRequired,
  getRootProps: PropTypes.func.isRequired,
  getIntervalProps: PropTypes.func.isRequired,
  showPeriod: PropTypes.func.isRequired,
  data: {
    style: PropTypes.object,
    intervalRenderer: PropTypes.func,
    className: PropTypes.string,
    getLabelFormat: PropTypes.func.isRequired,
    unitProp: PropTypes.string,
    headerData: PropTypes.object
  }

}
