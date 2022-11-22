import React from 'react'
import Sidebar from 'lib/layout/Sidebar'
import { render, screen } from '@testing-library/react'

const defaultProps = {
  groups: [
    {
        bgColor: '#e8ccff',
        id: '2998',
        label: 'Label Dustin"',
        rightTitle: 'Wolff',
        title: 'Carlotta',
    },
    {
        bgColor: '#e8ccff',
        id: '2999',
        label: 'Label Myrtle"',
        rightTitle: '"Sauer"',
        title: 'Elmer',
    }
  ],
  width: 10,
  height: 10,
  groupHeights: [30, 27],
  keys: {
    groupIdKey: 'id',
    groupRightTitleKey: 'rightTitle',
    groupTitleKey: 'title',
    itemDivTitleKey: 'title',
    itemGroupKey: 'group',
    itemIdKey: 'id',
    itemTimeEndKey: 'end',
    itemTimeStartKey: 'start',
    itemTitleKey: 'title'
  }
}

describe('GroupRows', () => {
  it('passes props and get right height for first group', () => {
    render(<Sidebar {...defaultProps} />);

    const component = screen.getAllByTestId('sidebar')[0];
    expect(component.style.height).toBe('30px');
  })
})
