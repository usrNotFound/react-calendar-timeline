import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import { noop } from 'test-utility'
import PreventClickOnDrag from 'lib/interaction/PreventClickOnDrag'

const defaultClickTolerance = 10
describe('PreventClickOnDrag', () => {
  it('should prevent click if element is dragged further than clickTolerance pixels forwards', () => {
    const onClickMock = jest.fn()
    render(
      <PreventClickOnDrag
        onClick={onClickMock}
        clickTolerance={defaultClickTolerance}
      >
        <div>Click Me</div>
      </PreventClickOnDrag>
    )

    const originalClientX = 100

    fireEvent.mouseDown(screen.getByText(/click me/i), {
      clientX: originalClientX
    })
    fireEvent.mouseUp(screen.getByText(/click me/i), {
      clientX: originalClientX + defaultClickTolerance + 1
    })
    fireEvent.click(screen.getByText(/click me/i))

    expect(onClickMock).not.toHaveBeenCalled()
  })

  it('should prevent click if element is dragged further than clickTolerance pixels backwards', () => {
    const onClickMock = jest.fn()
    render(
      <PreventClickOnDrag
        onClick={onClickMock}
        clickTolerance={defaultClickTolerance}
      >
        <div>Click Me</div>
      </PreventClickOnDrag>
    )
    const originalClientX = 100

    fireEvent.mouseDown(screen.getByText(/click me/i), {
      clientX: originalClientX
    })
    fireEvent.mouseUp(screen.getByText(/click me/i), {
      clientX: originalClientX - defaultClickTolerance - 1
    })
    fireEvent.click(screen.getByText(/click me/i))

    expect(onClickMock).not.toHaveBeenCalled()
  })
  it('should not prevent click if element is dragged less than clickTolerance pixels forwards', () => {
    const onClickMock = jest.fn()
    render(
      <PreventClickOnDrag
        onClick={onClickMock}
        clickTolerance={defaultClickTolerance}
      >
        <div>Click Me</div>
      </PreventClickOnDrag>
    )
    const originalClientX = 100

    fireEvent.mouseDown(screen.getByText(/click me/i), {
      clientX: originalClientX
    })

    fireEvent.mouseUp(screen.getByText(/click me/i), {
      clientX: originalClientX + defaultClickTolerance - 1
    })
    fireEvent.click(screen.getByText(/click me/i))

    expect(onClickMock).toHaveBeenCalledTimes(1)
  })

  it('should not prevent click if element is dragged less than clickTolerance pixels backwards', () => {
    const onClickMock = jest.fn()
    render(
      <PreventClickOnDrag
        onClick={onClickMock}
        clickTolerance={defaultClickTolerance}
      >
        <div>Click Me</div>
      </PreventClickOnDrag>
    )
    const originalClientX = 100

    fireEvent.mouseDown(screen.getByText(/click me/i), {
      clientX: originalClientX
    })

    fireEvent.mouseUp(screen.getByText(/click me/i), {
      clientX: originalClientX - defaultClickTolerance + 1
    })
    fireEvent.click(screen.getByText(/click me/i))

    expect(onClickMock).toHaveBeenCalledTimes(1)
  })
  it('should not prevent click if first interaction was drag but second is click', () => {
    const onClickMock = jest.fn()
    render(
      <PreventClickOnDrag
        onClick={onClickMock}
        clickTolerance={defaultClickTolerance}
      >
        <div>Click Me</div>
      </PreventClickOnDrag>
    )

    const originalClientX = 100

    fireEvent.mouseDown(screen.getByText(/click me/i), {
      clientX: originalClientX
    })
    fireEvent.mouseUp(screen.getByText(/click me/i), {
      clientX: originalClientX + defaultClickTolerance + 1
    })
    fireEvent.click(screen.getByText(/click me/i))

    expect(onClickMock).not.toHaveBeenCalled()

    fireEvent.mouseDown(screen.getByText(/click me/i), {
      clientX: originalClientX
    })
    fireEvent.mouseUp(screen.getByText(/click me/i), {
      clientX: originalClientX + defaultClickTolerance - 1 // less thanthreshold
    })
    fireEvent.click(screen.getByText(/click me/i))

    expect(onClickMock).toHaveBeenCalled()
  })
  it('calls all other event handlers in wrapped component', () => {
    const doubleClickMock = jest.fn()
    render(
      <PreventClickOnDrag
        onClick={jest.fn()}
        clickTolerance={defaultClickTolerance}
      >
        <div onDoubleClick={doubleClickMock}>Click Me</div>
      </PreventClickOnDrag>
    )

    fireEvent.dblClick(screen.getByText(/click me/i), {})

    expect(doubleClickMock).toHaveBeenCalled()
  })

  it('only allows single children element', () => {
    // dont emit propType error
    jest.spyOn(global.console, 'error').mockImplementation(noop)
    expect(() =>
      render(
        <PreventClickOnDrag
          onClick={noop}
          clickTolerance={defaultClickTolerance}
        >
          <div>hey</div>
          <div>hi</div>
          <div>how are ya </div>
        </PreventClickOnDrag>
      )
    ).toThrowError(
      'React.Children.only expected to receive a single React element child'
    )

    jest.restoreAllMocks()
  })
})
