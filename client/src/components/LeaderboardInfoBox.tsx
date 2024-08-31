import React, { useState, useEffect } from 'react'
import { getPlayer, APIOnePlayer } from '../util/withApi'
import Records from './Records'
import { ScrollArea } from '../primitives/scroll-area'
import { Button } from 'react-bootstrap'

interface InfoBoxProps {
  playerName: string
  view: 'lrr' | 'hrr' | 'comb',
  width: number,
  selectedState: Function
}

const LeaderboardInfoBox: React.FC<InfoBoxProps> = (props: InfoBoxProps) => {
  let { playerName, view, width, selectedState } = props
  let [player, setPlayer] = useState<APIOnePlayer>(undefined)
  // let [breakdownRR, setBreakdownRR] = useState<Array<JSX.Element>>([])
  useEffect(() => {
    document.body.style.overflow = "hidden"
    playerName && getPlayer(playerName).then((p) => setPlayer(p))
  }, [playerName])

  return (
    <div className={`rounded-box flex ${width < 1500 ? "" : "w-3/5"} flex-col bg-white p-4 py-12 shadow-inner`} style={{width: width < 1500 ? "-webkit-fill-available" : "revert-layer"}}>
            {player && <Button onClick={() => {
            selectedState("")
            setPlayer(undefined)
          }}>Back</Button>}
      <ScrollArea className="p-4" style={{height: width < 1500 ? "calc(100vh - 189px)" : "55vh"}}>
        {player && (
           <div className="grid justify-items-center gap-y-16">
            <p className="text-4xl">
              <strong>{player.name}</strong>
            </p>
            <div className="flex h-24 w-[85%] place-items-center justify-items-center">
              <div className="grid flex-grow place-items-center">
                <p className="text-center text-2xl">{view != "comb" ? `${view.toUpperCase()} ` : ""}Class</p>
                <p className="pt-2 text-center text-xl">{player.mclass[view]}</p>
              </div>
              {/* <div className='divider divider-horizontal' />
              <div className='grid flex-grow place-items-center'>
                <p className='text-center text-2xl'>Hertz</p>
                <table className='table-compact table'>
                  <tbody>{breakdownRR}</tbody>
                </table>
              </div> */}
              <div className="divider divider-horizontal" />
              <div className="grid flex-grow place-items-center">
                <p className="text-center text-2xl">Points</p>
                <p className="pt-2 text-center text-xl">{player.points[view].toFixed(2)}</p>
              </div>
            </div>
            <div className="grid justify-items-center">
              <p className="text-3xl">Records</p>
              <br />
              <Records
                rec={player.records
                  .filter((record) => {
                    switch (view) {
                      case 'lrr':
                        return record.hertz <= 60
                      case 'hrr':
                        return record.hertz > 60
                      case 'comb':
                        return true
                    }
                  })}
              />
            </div>
          </div>
  )}
      </ScrollArea>
    </div>
  )
}

export default LeaderboardInfoBox
