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
  let [longest, setLongest] = useState(0)
  // let [breakdownRR, setBreakdownRR] = useState<Array<JSX.Element>>([])
  useEffect(() => {
    document.body.style.overflow = "hidden"
    playerName && getPlayer(playerName).then((p) => {
      setLongest(0)
      setPlayer(p)
    }
    )
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
            <p className="text-4xl mt-3 mb-2">
              <strong>{player.name}</strong>
            </p>
            {player.avatar ? <div className='grid place-items-center'>
              <div style={{backgroundImage: `url(https://storage.hpsk.me/api/bucket/file/${player.avatar})`, width: "128px", height: "128px", borderRadius: "200px", backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "center"}}></div>
            </div> : ""}
            {player.points.comb == 0 ? "" : <div className="flex h-24 w-[85%] place-items-center justify-items-center mt-1">
              <div className="grid flex-grow place-items-center">
                <p className="text-center text-2xl font-bold">• {view != "comb" ? `${view.toUpperCase()} ` : ""}Class •</p>
                <p className="pt-2 text-center text-xl">{!player.records.filter((e: any) => e.levelID.position < 101).length && player.hrr_records.length ? "HRR Victor" : player.records.filter((e: any) => e.levelID.position > 100).length == player.records.length ? "Former Good Player" : player.mclass[view]}</p>
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
            </div>}
            {player.records.filter((e: any) => (player.points.comb == 0 ? e.levelID.position > 100 : e.levelID.position < 101) && e.percent == 100).length ? <div className={`grid justify-items-center bg-[#dbfeea] ${player.points.comb ? "" : "mt-6"}`} style={{width: `min(${window.innerWidth < 1500 ? "90%" : "calc(100% - 160px), 90%"}, 500px)`}}>
              <p className={`text-3xl font-bold py-6`}>• {player.points.comb ? "Records" : "Legacy"} ({player.records.filter((e: any) => (player.points.comb == 0 ? e.levelID.position > 100 : e.levelID.position < 101) && e.percent == 100)
                  .filter((record) => {
                    switch (view) {
                      case 'lrr':
                        return parseInt(record.hertz.split("/").at(-1)) <= 60
                      case 'hrr':
                        return parseInt(record.hertz.split("/").at(-1)) > 60 || record.hertz.split("/").at(-1) == "CBF"
                      case 'comb':
                        return true
                    }
                  }).length}) •</p>
              <Records
              legacy={!player.points.comb}
                rec={player.records.filter((e: any) => (player.points.comb == 0 ? e.levelID.position > 100 : e.levelID.position < 101) && e.percent == 100)
                  .filter((record) => {
                    switch (view) {
                      case 'lrr':
                        return parseInt(record.hertz.split("/").at(-1)) <= 60
                      case 'hrr':
                        return parseInt(record.hertz.split("/").at(-1)) > 60 || record.hertz.split("/").at(-1) == "CBF"
                      case 'comb':
                        return true
                    }
                  })}
              />
            </div> : ""}
            {player.points.comb != 0 && player.records.filter((e: any) => e.levelID.position > 100 && e.percent == 100).length ? <><br></br><br></br><div className="grid justify-items-center bg-[#dbfeea]" style={{width: `min(${window.innerWidth < 1500 ? "90%" : "calc(100% - 160px), 90%"}, 500px)`}}>
              <p className="text-3xl font-bold py-6">• Legacy ({player.records.filter((e: any) => e.levelID.position > 100 && e.percent == 100)
                  .filter((record) => {
                    switch (view) {
                      case 'lrr':
                        return parseInt(record.hertz.split("/").at(-1)) <= 60
                      case 'hrr':
                        return parseInt(record.hertz.split("/").at(-1)) > 60 || record.hertz.split("/").at(-1) == "CBF"
                      case 'comb':
                        return true
                    }
                  }).length}) •</p>
              <Records
                rec={player.records.filter((e: any) => e.levelID.position > 100 && e.percent == 100)
                  .filter((record) => {
                    switch (view) {
                      case 'lrr':
                        return parseInt(record.hertz.split("/").at(-1)) <= 60
                      case 'hrr':
                        return parseInt(record.hertz.split("/").at(-1)) > 60 || record.hertz.split("/").at(-1) == "CBF"
                      case 'comb':
                        return true
                    }
                  })}
                legacy={true}
              />
            </div></> : ""}
            {player.hrr_records.length ? <><br></br><br></br><div className="grid justify-items-center bg-[#dbfeea]" style={{width: `min(${window.innerWidth < 1500 ? "90%" : "calc(100% - 160px), 90%"}, 500px)`}}>
              <p className="text-3xl font-bold py-6">• HRR Records ({player.hrr_records.length}) •</p>
              <Records
                rec={player.hrr_records}
                hrr={true}
              />
            </div></> : ""}
            {player.records.filter((e: any) => e.levelID.position < 51 && e.levelID.listpercent <= e.percent && e.percent != 100).length ? <div className="grid justify-items-center bg-[#dbfeea] mt-8" style={{width: `min(${window.innerWidth < 1500 ? "90%" : "calc(100% - 160px), 90%"}, 500px)`}}>
              <p className="text-3xl font-bold py-6">• Progress ({player.records.filter((e: any) => e.levelID.position < 51 && e.levelID.listpercent <= e.percent && e.percent != 100)
                  .filter((record) => {
                    switch (view) {
                      case 'lrr':
                        return parseInt(record.hertz.split("/").at(-1)) <= 60
                      case 'hrr':
                        return parseInt(record.hertz.split("/").at(-1)) > 60 || record.hertz.split("/").at(-1) == "CBF"
                      case 'comb':
                        return true
                    }
                  }).length}) •</p>
              <Records
              progress
                rec={player.records.filter((e: any) => e.levelID.position < 51 && e.levelID.listpercent <= e.percent && e.percent != 100)
                  .filter((record) => {
                    switch (view) {
                      case 'lrr':
                        return parseInt(record.hertz.split("/").at(-1)) <= 60
                      case 'hrr':
                        return parseInt(record.hertz.split("/").at(-1)) > 60 || record.hertz.split("/").at(-1) == "CBF"
                      case 'comb':
                        return true
                    }
                  })}
              />
            </div> : ""}
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
