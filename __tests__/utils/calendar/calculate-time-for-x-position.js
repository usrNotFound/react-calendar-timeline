import { calculateTimeForXPosition } from 'lib/utility/calendar'
import { addHours, getTime } from 'date-fns'

describe('calculate time for x position', () => {
  it('calculates point in middle of timeline', () => {
    const canvasStart = getTime(new Date(2018, 1, 1))
    const canvasEnd = getTime(new Date(2018, 1, 3))
    const canvasWidthInPixels = 3000

    const currentXPositionInPixels = canvasWidthInPixels / 2

    const actual = calculateTimeForXPosition(
      canvasStart,
      canvasEnd,
      canvasWidthInPixels,
      currentXPositionInPixels
    )

    const expected = getTime(new Date(2018, 1, 2))

    expect(actual).toBe(expected)
  })

  it('calculates point in first quarter of timeline', () => {
    const canvasStart = getTime(new Date(2018, 1, 1))
    const canvasEnd = getTime(new Date(2018, 1, 2))
    const canvasWidthInPixels = 3000

    const currentXPositionInPixels = canvasWidthInPixels / 4

    const actual = calculateTimeForXPosition(
      canvasStart,
      canvasEnd,
      canvasWidthInPixels,
      currentXPositionInPixels
    )

    const expected = getTime(addHours(new Date(2018, 1, 1), 6))

    expect(actual).toBe(expected)
  })

  it('calculates point in latter quarter of timeline', () => {
    const canvasStart = getTime(new Date(2018, 1, 1))
    const canvasEnd = getTime(new Date(2018, 1, 2))
    const canvasWidthInPixels = 3000

    const currentXPositionInPixels = canvasWidthInPixels * 0.75

    const actual = calculateTimeForXPosition(
      canvasStart,
      canvasEnd,
      canvasWidthInPixels,
      currentXPositionInPixels
    )

    const expected = getTime(addHours(new Date(2018, 1, 1), 18))

    expect(actual).toBe(expected)
  })
})
