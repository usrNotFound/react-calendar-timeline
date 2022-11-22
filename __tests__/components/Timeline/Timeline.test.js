import React from 'react'
import { render, cleanup, screen } from '@testing-library/react'
import Timeline from 'lib/Timeline'
import { noop } from 'test-utility'
import { getTime } from 'date-fns'

const defaultProps = {
  ...Timeline.defaultProps,
  items: [],
  groups: []
}

describe('Timeline', () => {
  describe('initialiation', () => {
    // it('sets the visibleTime properties to defaultTime props', () => {
    //   const defaultTimeStart = new Date(2018, 1, 1)
    //   const defaultTimeEnd = new Date(2018, 3, 1)
    //
    //   const props = {
    //     ...defaultProps,
    //     defaultTimeStart,
    //     defaultTimeEnd
    //   }
    //
    //   render(<Timeline {...props} />)
    //
    //   expect(wrapper.state()).toMatchObject({
    //     visibleTimeStart: defaultTimeStart.valueOf(),
    //     visibleTimeEnd: defaultTimeEnd.valueOf()
    //   })
    // })
    // it('sets the visibleTime properties to visibleTime props', () => {
    //   const visibleTimeStart = getTime(new Date(2018, 1, 1))
    //   const visibleTimeEnd = getTime(new Date(2018, 3, 1))
    //
    //   const props = {
    //     ...defaultProps,
    //     visibleTimeStart,
    //     visibleTimeEnd
    //   }
    //
    //   render(<Timeline {...props} />)
    //
    //   expect(wrapper.state()).toMatchObject({
    //     visibleTimeStart,
    //     visibleTimeEnd
    //   })
    // })
    it('throws error if neither visibleTime or defaultTime props are passed', () => {
      const props = {
        ...defaultProps,
        visibleTimeStart: undefined,
        visibleTimeEnd: undefined,
        defaultTimeStart: undefined,
        defaultTimeEnd: undefined
      }
      jest.spyOn(global.console, 'error').mockImplementation(noop)
      expect(() => render(<Timeline {...props} />)).toThrow(
        'You must provide either "defaultTimeStart" and "defaultTimeEnd" or "visibleTimeStart" and "visibleTimeEnd" to initialize the Timeline'
      )
      jest.restoreAllMocks()
    })
  })
})
