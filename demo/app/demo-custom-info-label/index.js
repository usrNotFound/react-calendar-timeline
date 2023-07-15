import React, { Component } from 'react'

import Timeline from 'react-calendar-timeline'
import CustomInfoLabel from './CustomInfoLabel'

import generateFakeData from '../generate-fake-data'
import { add, format, startOfDay } from 'date-fns'

var keys = {
  groupIdKey: 'id',
  groupTitleKey: 'title',
  groupRightTitleKey: 'rightTitle',
  itemIdKey: 'id',
  itemTitleKey: 'title',
  itemDivTitleKey: 'title',
  itemGroupKey: 'group',
  itemTimeStartKey: 'start',
  itemTimeEndKey: 'end',
  groupLabelKey: 'title'
}

export default class App extends Component {
  constructor(props) {
    super(props)

    const { groups, items } = generateFakeData(5, 20)
    const defaultTimeStart = startOfDay(new Date())
    const defaultTimeEnd = add(startOfDay(new Date()), {days: 1})

    this.state = {
      groups,
      items,
      defaultTimeStart,
      defaultTimeEnd,
      showInfoLabel: false,
      infoLabelTime: '',
      infoLabelGroupTitle: '',
      infoLabelHeading: ''
    }
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
      ),
      showInfoLabel: false,
      infoLabelTime: ''
    })
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
      ),
      showInfoLabel: false,
      infoLabelTime: ''
    })
  }

  handleItemDrag = ({ eventType, itemId, time, edge, newGroupOrder }) => {
    const group = this.state.groups[newGroupOrder]
    const infoLabelGroupTitle = group ? group.title : ''
    const infoLabelTime = format(time, 'EEEE, MMMM Do YYYY')
    let heading = ''
    switch (eventType) {
      case 'move':
        heading = '🚚 Moving'
        break
      case 'resize':
        heading = '📅 Resizing'
        break
    }

    if (
      this.state.infoLabelTime !== infoLabelTime ||
      this.state.infoLabelGroupTitle !== infoLabelGroupTitle
    ) {
      this.setState({
        showInfoLabel: true,
        infoLabelTime,
        infoLabelGroupTitle,
        infoLabelHeading: heading
      })
    }
  }

  render() {
    const {
      groups,
      items,
      defaultTimeStart,
      defaultTimeEnd,
      showInfoLabel,
      infoLabelTime,
      infoLabelGroupTitle,
      infoLabelHeading
    } = this.state

    const customInfoLabelMarkup = showInfoLabel ? (
      <CustomInfoLabel
        time={infoLabelTime}
        groupTitle={infoLabelGroupTitle}
        heading={infoLabelHeading}
      />
    ) : null

    return (
      <div>
        {customInfoLabelMarkup}
        <Timeline
          groups={groups}
          items={items}
          keys={keys}
          fullUpdate
          itemTouchSendsClick={false}
          stackItems
          itemHeightRatio={0.75}
          canMove={true}
          canResize={'both'}
          defaultTimeStart={defaultTimeStart}
          defaultTimeEnd={defaultTimeEnd}
          onItemMove={this.handleItemMove}
          onItemResize={this.handleItemResize}
          onItemDrag={this.handleItemDrag}
        />
      </div>
    )
  }
}
