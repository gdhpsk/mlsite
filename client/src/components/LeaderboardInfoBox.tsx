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
    <div className={`rounded-box flex ${width < 1500 ? "items-center justify-center w-full" : "w-3/5 pl-4"} flex-col overflow-y-auto bg-white shadow-inner`}  style={{width: width < 1500 ? "-webkit-fill-available" : "revert-layer",  height: "calc(100vh - 75px)"}}>
      <ScrollArea style={{height: "calc(100vh - 75px)"}} className='w-full'>
        {player ? (
           <div className={`grid justify-items-center`}>
            <div className={`grid place-items-start w-full ${width < 1500 ? "pt-8 pl-8" : "pt-12 pl-16"}`}>
            <Button onClick={() => {
            selectedState("")
            setPlayer(undefined)
          }}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" width={16}><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg></Button>
          </div>
            <p className="text-4xl mt-3">
              <strong>{player.name}</strong>
            </p>
            <div className="flex h-24 w-[85%] place-items-center justify-items-center mt-3">
              <div className="grid flex-grow place-items-center">
                <p className="text-center text-2xl font-bold">• {view != "comb" ? `${view.toUpperCase()} ` : ""}Class •</p>
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
                <p className="text-center text-2xl font-bold">• Points •</p>
                <p className="pt-2 text-center text-xl">{player.points[view].toFixed(2)}</p>
              </div>
            </div>
            <div className="grid justify-items-center bg-[#dbfeea]" style={{width: `min(${window.innerWidth < 1500 ? "90%" : "calc(100% - 160px), 90%"}, 500px)`}}>
              <p className="text-3xl font-bold py-6">• Records ({player.records.filter((e: any) => e.levelID.position < 101)
                  .filter((record) => {
                    switch (view) {
                      case 'lrr':
                        return record.hertz <= 60
                      case 'hrr':
                        return record.hertz > 60
                      case 'comb':
                        return true
                    }
                  }).length}) •</p>
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
  ) : <div className='w-full grid place-items-center' style={{height: "calc(100vh - 75px)"}}><div
  tabIndex={0}
  className="rounded-box border-base-300 cursor-pointer border pl-6 pr-6 pt-4 pb-4 shadow-lg transition-all hover:shadow-xl bg-white"
  style={{borderRadius: "10px"}}
><p className='text-center font-semibold text-2xl text-green-600'>Select a player to display their information!</p></div></div>}
  <br></br>
  <br></br>
      </ScrollArea>
    </div>
  )
}

export default LeaderboardInfoBox
