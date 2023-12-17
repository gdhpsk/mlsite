import React, { useState, useEffect } from 'react'
import { getPlayers, APIManyPlayer } from '../util/withApi'
import Player from '../components/Player'
import LeaderboardInfoBox from '../components/LeaderboardInfoBox'
import PlayerModal from '../components/PlayerModal'
import { Table, TableBody } from '../primitives/table'
import { ScrollArea } from '../primitives/scroll-area'
import { Tabs, TabsList, TabsTrigger } from '../primitives/tabs'
import { Separator } from '../primitives/separator'
import { Input } from '../primitives/input'

const Leaderboard: React.FC = () => {
  let [players, setPlayers] = useState<Array<APIManyPlayer>>([])
  let [selectedPlayerName, setSelectedPlayerName] = useState<string>(undefined)
  let [search, setSearch] = useState<string>('')
  let [view, setView] = useState<'lrr' | 'hrr' | 'comb'>('comb')
  let [showModal, setShowModal] = useState<boolean>(false)

  useEffect(() => {
    document.body.style.overflow = "hidden"
    getPlayers().then((p) => {
      setPlayers(p)
    })
  }, [])

  return (
    <div className={`border-4 bg-[#f2f7ff] sm:m-12 sm:mx-auto overflow-x-hidden ${window.innerWidth < 1400 ? "" : "sm:w-3/5 p-8"}`}>
      {window.innerWidth < 1400 && selectedPlayerName ? "" : <><div className="mx-auto">
        <Tabs defaultValue="comb" className="w-[300px]" onValueChange={(val: 'lrr' | 'hrr' | 'comb') => setView(val)}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="lrr">LRR</TabsTrigger>
            <TabsTrigger value="comb">Combined</TabsTrigger>
            <TabsTrigger value="hrr">HRR</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      <br /></>}
      <div className="flex">
        {window.innerWidth < 1400 && selectedPlayerName ? "" : <div className="flex-grow bg-white p-4 shadow-inner">
          <div className="flex">
            <Input
              type="text"
              placeholder="Search..."
              className="input-bordered input m-4 grow"
              onChange={(e) => setSearch(e.target.value)}
              defaultValue={search}
            />
          </div>
          <div>
            <ScrollArea style={{height: window.innerWidth < 1400 ? `calc(100vh - 236px)` : "55vh"}}>
              <Table>
                <TableBody>
                  {players
                    .filter((player) => {
                      switch (view) {
                        case 'lrr':
                          return player.points.lrr > 0
                        case 'hrr':
                          return player.points.hrr > 0
                        case 'comb':
                          return true
                      }
                    })
                    .sort((a, b) => {
                      switch (view) {
                        case 'lrr':
                          return b.points.lrr - a.points.lrr
                        case 'hrr':
                          return b.points.hrr - a.points.hrr
                        case 'comb':
                          return b.points.comb - a.points.comb
                      }
                    })
                    .map((player, i) => (
                      <Player
                        {...player}
                        show={search.length > 0 ? player.name.toLowerCase().indexOf(search.toLowerCase()) !== -1 : true}
                        view={view}
                        position={i + 1}
                        onSelect={() => {
                          setSelectedPlayerName(player.name)
                          window.innerWidth <= 640 && setShowModal(true)
                        }}
                        key={`player-${i}`}
                      />
                    ))}
                </TableBody>
              </Table>
            </ScrollArea>
          </div>
        </div>}

        {window.innerWidth < 1400 && !selectedPlayerName ? "" :  (
          <>
            {window.innerWidth < 1400 ? "" : <Separator orientation="vertical" className="mx-4" />}
            <LeaderboardInfoBox playerName={selectedPlayerName} view={view} width={window.innerWidth} selectedState={setSelectedPlayerName}/>
          </>
        )}
      </div>
    </div>
  )
}

export default Leaderboard
