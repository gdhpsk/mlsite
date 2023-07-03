import React from 'react'
import { APIManyPlayer } from '../util/withApi'
import { TableRow, TableCell } from '../primitives/table'

interface PlayerProps extends APIManyPlayer {
  show: boolean
  view: 'lrr' | 'hrr' | 'comb'
  position: number
  onSelect: () => void
}

const Player: React.FC<PlayerProps> = ({ name, points, position, show, view, onSelect }) => {
  return (
    show && (
      <>
        <TableRow onClick={onSelect} className="cursor-pointer py-2 text-lg hover:bg-slate-50">
          <TableCell className="font-semibold">
            {position}.&nbsp;{name}
          </TableCell>
          <TableCell className="italic">{points[view].toFixed(2)}</TableCell>
        </TableRow>
      </>
    )
  )
}

export default Player
