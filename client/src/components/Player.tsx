import React, { useState, useEffect, useTransition, lazy } from 'react'
import { APIManyPlayer } from '../util/withApi'

interface PlayerProps extends APIManyPlayer {
  show: boolean
  view: 'lrr' | 'hrr' | 'comb'
  position: number
  onSelect: () => void
}

const Player: React.FC<PlayerProps> = (props: PlayerProps) => {
  const { name, points, position, show, view, onSelect } = props

  return (
    show && (
      <>
        <tr className='hover cursor-pointer' onClick={onSelect}>
          <td className='flex items-center'>
            <div className='text-lg'>
              <strong>{position}.</strong>&nbsp;{name}
            </div>
            <div className='text-md grow text-right opacity-70'>
              <em>{points[view].toFixed(2)}</em>
            </div>
          </td>
        </tr>
      </>
    )
  )
}

export default Player
