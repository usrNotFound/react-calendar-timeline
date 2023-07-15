import React, {Component} from "react";

import generateFakeData from '../generate-fake-data'
import Timeline from "react-calendar-timeline";
import { add, getHours, getMinutes, isSameDay, parse, startOfDay } from 'date-fns'

const format = "dd.MM.yyyy"
const holidays = [parse("01.01.2018", format, new Date()), parse("06.01.2018", format, new Date()), parse("30.03.2018", format, new Date()),
  parse("01.04.2018", format, new Date()), parse("02.04.2018", format, new Date()), parse("01.05.2018", format, new Date()),
  parse("10.05.2018", format, new Date()), parse("20.05.2018", format, new Date()), parse("21.05.2018", format, new Date()),
  parse("31.05.2018", format, new Date()), parse("15.08.2018", format, new Date()), parse("26.10.2018", format, new Date()),
  parse("01.11.2018", format, new Date()), parse("08.12.2018", format, new Date()), parse("24.12.2018", format, new Date()),
  parse("25.12.2018", format, new Date()), parse("26.12.2018", format, new Date()), parse("31.12.2018", format, new Date())]

const keys = {
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

    const {groups, items} = generateFakeData()
    const defaultTimeStart = startOfDay(new Date())
    const defaultTimeEnd = add(startOfDay(new Date()), {days: 1})

    this.state = {
      groups,
      items,
      defaultTimeStart,
      defaultTimeEnd
    }
  }

  getMinutesOfDay = (date) => {
    return getHours(date) * 60 + getMinutes(date)
  }

  verticalLineClassNamesForTime = (timeStart, timeEnd) => {
    const currentTimeStart = timeStart
    const currentTimeEnd = timeEnd

    let classes = [];

    // check for public holidays
    for (let holiday of holidays) {
      if (isSameDay(holiday, currentTimeStart) && isSameDay(holiday, currentTimeEnd)) {
        classes.push("holiday")
      }
    }

    // highlight lunch break (12:00-13:00)
    const lunchStart = new Date().setHours(12, 0, 0);
    const lunchEnd = new Date().setHours(13, 0, 0);
    if (this.getMinutesOfDay(currentTimeStart) >= this.getMinutesOfDay(lunchStart) &&
      this.getMinutesOfDay(currentTimeEnd) <= this.getMinutesOfDay(lunchEnd)) {
      classes.push("lunch");
    }

    return classes;
  }

  render() {
    const {groups, items, defaultTimeStart, defaultTimeEnd} = this.state

    return (
      <div style={{ padding: 20, paddingTop: 0 }}>
        In this example we have public holidays we want to highlight.<br />
        Also we want to visually highlight a blocking range (e.g. lunch break).<br />
        <br />
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
          verticalLineClassNamesForTime={this.verticalLineClassNamesForTime}
        />
      </div>
  )
  }

}
