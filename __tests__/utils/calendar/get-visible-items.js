import { getVisibleItems } from 'lib/utility/calendar'
import { addDays, addMinutes, getTime } from 'date-fns'

const itemTimeStartKey = 'start'
const itemTimeEndKey = 'end'

const keys = {
  itemTimeStartKey,
  itemTimeEndKey
}

describe('getVisibleItems', () => {
  it('returns items within date range - both dates', () => {
    const startRange = getTime(addDays(new Date(), -1))
    const endRange = getTime(addDays(new Date(startRange), 1))
    const items = [
      {
        [itemTimeStartKey]: getTime(addMinutes(new Date(startRange), 10))
          .valueOf(),
        [itemTimeEndKey]: getTime(addMinutes(new Date(startRange), 20))
          .valueOf(),
        id: 1
      }
    ]

    const result = getVisibleItems(items, startRange, endRange, keys)

    expect(result).toMatchObject(items)
  })

  it('returns items within date range - start date', () => {
    const startRange = getTime(addDays(new Date(), -1))
    const endRange = getTime(addDays(new Date(startRange), 1))
    const items = [
      {
        [itemTimeStartKey]: getTime(addMinutes(new Date(endRange), -10)),
        [itemTimeEndKey]: getTime(addMinutes(new Date(endRange), 20)),
        id: 1
      }
    ]

    const result = getVisibleItems(items, startRange, endRange, keys)

    expect(result).toMatchObject(items)
  })

  it('returns items within date range - end date', () => {
    const startRange = getTime(addDays(new Date(), -1))
    const endRange = getTime(addDays(new Date(startRange), 1))
    const items = [
      {
        [itemTimeStartKey]: getTime(addMinutes(new Date(startRange), -10)),
        [itemTimeEndKey]: getTime(addMinutes(new Date(startRange), 10)),
        id: 1
      }
    ]

    const result = getVisibleItems(items, startRange, endRange, keys)

    expect(result).toMatchObject(items)
  })

  it('does not return items outside of date range - before start date', () => {
    const startRange = getTime(addDays(new Date(), -1))
    const endRange = getTime(addDays(new Date(startRange), 1))
    const items = [
      {
        [itemTimeStartKey]: getTime(addDays(new Date(startRange),-2)),
        [itemTimeEndKey]: getTime(addDays(new Date(startRange), -1)),
        id: 1
      }
    ]

    const result = getVisibleItems(items, startRange, endRange, keys)

    expect(result).toMatchObject([])
  })

  it('does not return items outside of date range - after end date', () => {
    const startRange = getTime(addDays(new Date(), -1))
    const endRange = getTime(addDays(new Date(startRange), 1))
    const items = [
      {
        [itemTimeStartKey]: getTime(addDays(new Date(endRange), 1)),
        [itemTimeEndKey]: getTime(addDays(new Date(endRange), 2)),
        id: 1
      }
    ]

    const result = getVisibleItems(items, startRange, endRange, keys)

    expect(result).toMatchObject([])
  })
})
