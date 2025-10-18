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
  return (
    show && (
      <>
        <TableRow onClick={onSelect} className="cursor-pointer py-2 text-lg hover:bg-slate-50">
          <TableCell className="font-semibold">
            {position}.&nbsp;{name}
          </TableCell>
          {points.comb ? <TableCell className="italic lead-points"><span className='text-white select-none'>{[...new Array(4 - points[view].toFixed(2).toString().split(".")[0].length)].map(e => "0")}</span>{points[view].toFixed(2).toString().split(".")[0]}<span className='px-[1px]'>.</span>{points[view].toFixed(2).toString().split(".")[1]}</TableCell> : ""}
        </TableRow>
      </>
    )
  )
}

export default Player
