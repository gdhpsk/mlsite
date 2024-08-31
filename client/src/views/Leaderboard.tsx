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

const classes = [
  [1000, "Overlords"],
  [600, "Class S"],
  [300, "Class A"],
  [150, "Class B"],
  [50, "Class C"],
  [1, "Class D"]
];

const Leaderboard: React.FC = () => {
  let [players, setPlayers] = useState<Array<APIManyPlayer>>([])
  let [processedPlayers, setProcessedPlayers] = useState<Array<APIManyPlayer>>([])
  let [selectedPlayerName, setSelectedPlayerName] = useState<string>(undefined)
  let [search, setSearch] = useState<string>('')
  let [view, setView] = useState<'lrr' | 'hrr' | 'comb'>('comb')
  let [margin, setMargin] = useState(0)
  let [showModal, setShowModal] = useState<boolean>(false)

  useEffect(() => {
    document.body.style.overflow = (window.innerWidth < 1500 ? "hidden" : "visible")
    getPlayers().then((p) => {
      setPlayers(p)
    })
  }, [])

  useEffect(() => {
    setProcessedPlayers(players.filter((player) => {
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
                    }))
  }, [view, players])

  return (
    <div className={`border-4 bg-[#f2f7ff] sm:mx-auto overflow-x-hidden ${window.innerWidth < 1500 ? "" : "sm:w-3/5 p-8 sm:m-12"}`}>
      {window.innerWidth < 800 && selectedPlayerName ? "" : <>{window.innerWidth < 800 ? <br></br> : ""}<div className={`mx-auto ${window.innerWidth < 800 ? 'grid place-items-center' : ""}`}>
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
        {window.innerWidth < 800 && selectedPlayerName ? "" : <div className="flex-grow bg-white p-4 shadow-inner">
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
            <ScrollArea style={{height: window.innerWidth < 1500 ? `calc(100vh - 236px)` : "55vh"}}>
              {classes.map((c, cIndex) => <div>
                <h1 className="text-center font-extrabold text-3xl">{c[1]} ({c[0]}+)</h1>
                <br></br>
                <Table>
                <TableBody>
                  {processedPlayers
                    .filter((player) => player.points[view] >= (c[0] as number)  && player.points[view] < ((classes[cIndex-1]?.[0] ?? Infinity) as number))
                    .map((player, i) => (
                      <Player
                        {...player}
                        show={search.length > 0 ? player.name.toLowerCase().indexOf(search.toLowerCase()) !== -1 : true}
                        view={view}
                        position={processedPlayers.findIndex(e => e.name == player.name) + 1}
                        margin={margin}
                        setMargin={setMargin}
                        onSelect={() => {
                          setSelectedPlayerName(player.name)
                          window.innerWidth <= 640 && setShowModal(true)
                        }}
                        key={`player-${i}`}
                      />
                    ))}
                </TableBody>
              </Table>
              <br></br>
              </div>)}
            </ScrollArea>
          </div>
        </div>}

        {window.innerWidth < 800 && !selectedPlayerName ? "" :  (
          <>
            {window.innerWidth < 800 ? "" : <Separator orientation="vertical" className="mx-4" />}
            <LeaderboardInfoBox playerName={selectedPlayerName} view={view} width={window.innerWidth} selectedState={setSelectedPlayerName}/>
          </>
        )}
      </div>
    </div>
  )
}

export default Leaderboard
