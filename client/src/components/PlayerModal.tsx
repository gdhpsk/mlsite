import React, { useEffect, useState } from 'react'
import { getPlayer, APIOnePlayer } from '../util/withApi'

interface PlayerModalProps {
  playerName: string
  show: boolean
  onClose: () => void
}

const PlayerModal: React.FC<PlayerModalProps> = (props: PlayerModalProps) => {
  const { playerName, show, onClose } = props
  let [player, setPlayer] = useState<APIOnePlayer>()

  useEffect(() => {
    getPlayer(playerName).then((p) => setPlayer(p))
  }, [])

  return show && <></>
}

export default PlayerModal
