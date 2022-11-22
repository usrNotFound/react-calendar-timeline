import React from 'react'
import { noop } from 'test-utility'
import GroupRow from 'lib/row/GroupRow'
import { render, screen, fireEvent } from '@testing-library/react'


const defaultProps = {
  onClick: noop,
  onDoubleClick: noop,
  onContextMenu: noop,
  isEvenRow: false,
  clickTolerance: 10,
  style: {},
  group: {}
}

// using mount to be able to interact with element, render
// to assert dom level props (styles, className)
describe('GroupRow', () => {
  it('calls passed in onDoubleClick',  () => {
    const onDoubleClickMock = jest.fn()
    const props = {
      ...defaultProps,
      onDoubleClick: onDoubleClickMock
    }

    render(<GroupRow {...props} />)
    fireEvent.dblClick(screen.getByTestId('group'))

    expect(onDoubleClickMock).toHaveBeenCalledTimes(1)
  })

  it('calls passed in onClick', () => {
    const onClickMock = jest.fn()
    const props = {
      ...defaultProps,
      onClick: onClickMock
    }

    render(<GroupRow {...props} />)

    fireEvent.click(screen.getByTestId('group'))

    expect(onClickMock).toHaveBeenCalledTimes(1)
  })

  it('calls passed in onContextMenu', () => {
    const onContextMenuMock = jest.fn()
    const props = {
      ...defaultProps,
      onContextMenu: onContextMenuMock
    }

    render(<GroupRow {...props} />)

    fireEvent.contextMenu(screen.getByTestId('group'))

    expect(onContextMenuMock).toHaveBeenCalledTimes(1)
  })
  it('assigns "rct-hl-even" class if isEvenRow is true', () => {
    const props = {
      ...defaultProps,
      isEvenRow: true
    }

    render(<GroupRow {...props} />)

    expect(screen.getByTestId('group').className.trim()).toBe('rct-hl-even')
  })
  it('assigns "rct-hl-odd" if isEvenRow is false', () => {
    const props = {
      ...defaultProps,
      isEvenRow: false
    }

    render(<GroupRow {...props} />)

    expect(screen.getByTestId('group').className.trim()).toBe('rct-hl-odd')
  })
  it('passes style prop to style', () => {
    const props = {
      ...defaultProps,
      style: { border: '1px solid black' }
    }

    render(<GroupRow {...props} />)

    expect(screen.getByTestId('group').style.border).toBe(props.style.border)
  })
})
