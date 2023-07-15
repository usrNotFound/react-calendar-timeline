/* eslint-disable no-console */
import React, { Component } from 'react'
import { formatISO, format as _format, add, getTime, startOfDay } from 'date-fns'

import Timeline, {
  TimelineMarkers,
  TodayMarker,
  CustomMarker,
  CursorMarker,
  SidebarHeader,
  CustomHeader,
  TimelineHeaders,
  DateHeader
} from 'react-calendar-timeline'

import generateFakeData from '../generate-fake-data'

var minTime = getTime(add(new Date(), {months: -6}))
var maxTime = getTime(add(new Date(), {months: 6}))

var keys = {
  groupIdKey: 'id',
  groupTitleKey: 'title',
  groupRightTitleKey: 'rightTitle',
  itemIdKey: 'id',
  itemTitleKey: 'title',
  itemDivTitleKey: 'title',
  itemGroupKey: 'group',
  itemTimeStartKey: 'start',
  itemTimeEndKey: 'end'
}

export default class App extends Component {
  constructor(props) {
    super(props)

    const { groups, items } = generateFakeData()
    const defaultTimeStart = startOfDay(new Date())
    const defaultTimeEnd = add(startOfDay(new Date()), {days: 1})

    this.state = {
      groups,
      items,
      defaultTimeStart,
      defaultTimeEnd,
      format: false,
      showHeaders: false
    }
  }

  handleClick = () => {
    this.setState({ format: true })
  }

  handleCanvasClick = (groupId, time) => {
    console.log('Canvas clicked', groupId, formatISO(time))
  }

  handleCanvasDoubleClick = (groupId, time) => {
    console.log('Canvas double clicked', groupId, formatISO(time))
  }

  handleCanvasContextMenu = (group, time) => {
    console.log('Canvas context menu', group, formatISO(time))
  }

  handleItemClick = (itemId, _, time) => {
    console.log('Clicked: ' + itemId, formatISO(time))
  }

  handleItemSelect = (itemId, _, time) => {
    console.log('Selected: ' + itemId, formatISO(time))
  }

  handleItemDoubleClick = (itemId, _, time) => {
    console.log('Double Click: ' + itemId, formatISO(time))
  }

  handleItemContextMenu = (itemId, _, time) => {
    console.log('Context Menu: ' + itemId, formatISO(time))
  }

  handleItemMove = (itemId, dragTime, newGroupOrder) => {
    const { items, groups } = this.state

    const group = groups[newGroupOrder]

    this.setState({
      items: items.map(
        item =>
          item.id === itemId
            ? Object.assign({}, item, {
                start: dragTime,
                end: dragTime + (item.end - item.start),
                group: group.id
              })
            : item
      )
    })

    console.log('Moved', itemId, dragTime, newGroupOrder)
  }

  handleItemResize = (itemId, time, edge) => {
    const { items } = this.state

    this.setState({
      items: items.map(
        item =>
          item.id === itemId
            ? Object.assign({}, item, {
                start: edge === 'left' ? time : item.start,
                end: edge === 'left' ? item.end : time
              })
            : item
      )
    })

    console.log('Resized', itemId, time, edge)
  }

  // this limits the timeline to -6 months ... +6 months
  handleTimeChange = (visibleTimeStart, visibleTimeEnd, updateScrollCanvas) => {
    if (visibleTimeStart < minTime && visibleTimeEnd > maxTime) {
      updateScrollCanvas(minTime, maxTime)
    } else if (visibleTimeStart < minTime) {
      updateScrollCanvas(minTime, minTime + (visibleTimeEnd - visibleTimeStart))
    } else if (visibleTimeEnd > maxTime) {
      updateScrollCanvas(maxTime - (visibleTimeEnd - visibleTimeStart), maxTime)
    } else {
      updateScrollCanvas(visibleTimeStart, visibleTimeEnd)
    }
  }

  moveResizeValidator = (action, item, time) => {
    if (time < new Date().getTime()) {
      var newTime =
        Math.ceil(new Date().getTime() / (15 * 60 * 1000)) * (15 * 60 * 1000)
      return newTime
    }

    return time
  }

  handleClickChangeHeaders = () => {
    this.setState(state => ({
      showHeaders: !state.showHeaders
    }))
  }

  render() {
    const { groups, items, defaultTimeStart, defaultTimeEnd } = this.state

    return (
      <div>
        <button onClick={this.handleClick}>format</button>
        <button onClick={this.handleClickChangeHeaders}>add headers</button>
        <Timeline
          groups={groups}
          items={items}
          keys={keys}
          sidebarWidth={150}
          sidebarContent={<div>Above The Left</div>}
          canMove
          canResize="right"
          canSelect
          itemsSorted
          itemTouchSendsClick={false}
          stackItems
          itemHeightRatio={0.75}
          defaultTimeStart={defaultTimeStart}
          defaultTimeEnd={defaultTimeEnd}
          onCanvasClick={this.handleCanvasClick}
          onCanvasDoubleClick={this.handleCanvasDoubleClick}
          onCanvasContextMenu={this.handleCanvasContextMenu}
          onItemClick={this.handleItemClick}
          onItemSelect={this.handleItemSelect}
          onItemContextMenu={this.handleItemContextMenu}
          onItemMove={this.handleItemMove}
          onItemResize={this.handleItemResize}
          onItemDoubleClick={this.handleItemDoubleClick}
          onTimeChange={this.handleTimeChange}
          // moveResizeValidator={this.moveResizeValidator}
          rightSidebarWidth={150}
          rightSidebarContent={<div>Above The Right</div>}
        >
          <TimelineHeaders className="header-background">
            <SidebarHeader/>
            <DateHeader
              labelFormat={this.state.format ? 'd' : undefined}
              unit= "primaryHeader"
            />
            <DateHeader height={50} />
            <CustomHeader unit="year" headerData={{ hey: 'you' }}>
              {(
                {
                  headerContext: { intervals },
                  getRootProps,
                  getIntervalProps,
                  showPeriod,
                  data,
                },

              ) => {
                console.log('props', data)
                return (
                  <div {...getRootProps()}>
                    {intervals.map(interval => {
                      const intervalStyle = {
                        lineHeight: '30px',
                        textAlign: 'center',
                        borderLeft: '1px solid black',
                        cursor: 'pointer',
                        backgroundColor: 'Turquoise',
                        color: 'white'
                      }
                      return (
                        <div
                          onClick={() => {
                            showPeriod(interval.startTime, interval.endTime)
                          }}
                          {...getIntervalProps({
                            interval,
                            style: intervalStyle
                          })}
                        >
                          <div className="sticky">
                            {_format(interval.startTime, 'yyyy')}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )
              }}
            </CustomHeader>
            <CustomHeader unit="week">
              {({
                headerContext: { intervals },
                getRootProps,
                getIntervalProps,
                showPeriod
              }) => {
                return (
                  <div {...getRootProps()}>
                    {intervals.map(interval => {
                      const intervalStyle = {
                        lineHeight: '30px',
                        textAlign: 'center',
                        borderLeft: '1px solid black',
                        cursor: 'pointer',
                        backgroundColor: 'indianred',
                        color: 'white'
                      }
                      return (
                        <div
                          onClick={() => {
                            showPeriod(interval.startTime, interval.endTime)
                          }}
                          {...getIntervalProps({
                            interval,
                            style: intervalStyle
                          })}
                        >
                          <div className="sticky">
                            {_format(interval.startTime, 'MM/dd')}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )
              }}
            </CustomHeader>
            <CustomHeader>
              {({
                headerContext: { intervals },
                getRootProps,
                getIntervalProps,
                showPeriod
              }) => {
                return (
                  <div {...getRootProps()}>
                    {intervals.map(interval => {
                      const intervalStyle = {
                        lineHeight: '30px',
                        textAlign: 'center',
                        borderLeft: '1px solid black',
                        cursor: 'pointer'
                      }
                      return (
                        <div
                          onClick={() => {
                            showPeriod(interval.startTime, interval.endTime)
                          }}
                          {...getIntervalProps({
                            interval,
                            style: intervalStyle
                          })}
                        >
                          {_format(interval.startTime, 'HH')}
                        </div>
                      )
                    })}
                  </div>
                )
              }}
            </CustomHeader>
            <DateHeader
              unit="week"
              labelFormat="MM/dd"
              height={50}
              headerData={{ hey: 'date header' }}
              intervalRenderer={(
                { getIntervalProps, intervalContext, data },

              ) => {
                console.log('intervalRenderer props', data)
                return (
                  <div {...getIntervalProps()}>
                    {intervalContext.intervalText}
                  </div>
                )
              }}
            />
            {this.state.showHeaders
              ? [
                  <DateHeader
                    labelFormat={this.state.format ? 'd' : undefined}
                    unit = "primaryHeader"
                  />,
                  <DateHeader height={50} />
                ]
              : null}
          </TimelineHeaders>
          <TimelineMarkers>
            <TodayMarker />
            <CustomMarker
              date={
                getTime(startOfDay(new Date())) +
                1000 * 60 * 60 * 2
              }
            />
            <CustomMarker
              date={getTime(add(new Date(), {days: 3}))}
            >
              {({ styles }) => {
                const newStyles = { ...styles, backgroundColor: 'blue' }
                return <div style={newStyles} />
              }}
            </CustomMarker>
            <CursorMarker />
          </TimelineMarkers>
        </Timeline>
      </div>
    )
  }
}
