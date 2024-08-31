import React, { useEffect, useRef } from 'react'
import { APIManyPlayer } from '../util/withApi'
import { TableRow, TableCell } from '../primitives/table'

interface PlayerProps extends APIManyPlayer {
  show: boolean
  view: 'lrr' | 'hrr' | 'comb'
  position: number
  margin: number
  setMargin: Function
  onSelect: () => void
}

const Player: React.FC<PlayerProps> = ({ name, points, position, show, view, onSelect, margin, setMargin }) => {
  let element = useRef()
  useEffect(() => {
    if(!element.current) return;
    let e: any = element.current
    let width = e.getBoundingClientRect().width
    if(position == 1) {
      setMargin(width)
      return;
    }
    (element.current as any).style.paddingLeft = margin - width
  }, [element])
  return (
    show && (
      <>
        <TableRow onClick={onSelect} className="cursor-pointer py-2 text-lg hover:bg-slate-50">
          <TableCell className="font-semibold" ref={element}>
            {position}.&nbsp;{name}
          </TableCell>
          <TableCell className="italic">{points[view].toFixed(2)}</TableCell>
        </TableRow>
      </>
    )
  )
}

export default Player
