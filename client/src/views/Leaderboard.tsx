import React, { useState, useEffect } from 'react'
import { getPlayers, APIManyPlayer } from '../util/withApi'
import Player from '../components/Player'
import LeaderboardInfoBox from '../components/LeaderboardInfoBox'
import PlayerModal from '../components/PlayerModal'
import { Table, TableBody, TableCell, TableRow } from '../primitives/table'
import { ScrollArea } from '../primitives/scroll-area'
import { Tabs, TabsList, TabsTrigger } from '../primitives/tabs'
import { Separator } from '../primitives/separator'
import { Input } from '../primitives/input'
import { useSearchParams } from 'react-router-dom'

const classes = [
  [1000, "Overlords"],
  [600, "Class S"],
  [300, "Class A"],
  [150, "Class B"],
  [50, "Class C"],
  [1, "Class D"]
];

const Leaderboard: React.FC = () => {
  useEffect(() => {
    document.body.style.overflow = "hidden"
  }, [])
  let params = useSearchParams()[0]
  let [players, setPlayers] = useState<Array<APIManyPlayer>>([])
  let [processedPlayers, setProcessedPlayers] = useState<Array<APIManyPlayer>>([])
  let [selectedPlayerName, setSelectedPlayerName] = useState<string>(params.get("player"))
  let [search, setSearch] = useState<string>('')
  let [view, setView] = useState<'lrr' | 'hrr' | 'comb'>('comb')
  let [margin, setMargin] = useState(0)
  let [showModal, setShowModal] = useState<boolean>(false)

  useEffect(() => {
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
          return player.points.comb > 0
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
    <div className={`border-4 bg-[#f2fff7] sm:mx-auto overflow-x-hidden ${window.innerWidth < 1500 ? "" : "sm:w-4/5 p-8"}`}>
      <div className="flex">
        {window.innerWidth < 800 && selectedPlayerName ? "" : <div className="flex-grow p-4" style={{width: window.innerWidth < 1500 ? "84ch" : "auto"}}>
          <div className={`mx-auto grid place-items-center`}>
        <Tabs defaultValue="comb" className="w-[300px]" onValueChange={(val: 'lrr' | 'hrr' | 'comb') => setView(val)}>
          <TabsList className="grid w-full grid-cols-3">
             <TabsTrigger className='data-[state=active]:bg-[#93fdc5]' value="lrr">LRR</TabsTrigger>
             <TabsTrigger className='data-[state=active]:bg-[#93fdc5]' value="comb">Combined</TabsTrigger>
             <TabsTrigger className='data-[state=active]:bg-[#93fdc5]' value="hrr">HRR</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      <br></br>
<div className='bg-white'>
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
            <ScrollArea style={{height: "calc(100vh - 240px)"}}>
              
            <Table>
              {classes.map((c, cIndex) => <>
              <TableBody>
                <TableRow>
                  <TableCell colSpan={2}><h1 className={`text-center font-extrabold text-${window.innerWidth < 800 ? "2" : "3"}xl`}>• {c[1]} ({c[0]}+) •</h1></TableCell>
                </TableRow>
              </TableBody>
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
                </TableBody></>)}
              </Table>
              <br></br>
              <br></br>
            </ScrollArea>
          </div>
        </div></div>}

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
