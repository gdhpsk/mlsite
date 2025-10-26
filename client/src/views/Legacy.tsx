import React, { useEffect, useRef, useState } from 'react'
import { getLevels, APIManyLevel, APIOneLevel, getPlayers, APIManyPlayer, getLegacyPlayers } from '../util/withApi'
import Level from '../components/Level'
import ListInfoBox from '../components/ListInfoBox'
import { ScrollArea, ScrollAreaNoScroll } from '../primitives/scroll-area'
import { Input } from '../primitives/input'
import { Separator } from '../primitives/separator'
import { Button, Form } from 'react-bootstrap'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { TabsList, TabsTrigger, Tabs } from '../primitives/tabs'
import { Table, TableBody, TableCell, TableRow } from '../primitives/table'
import LeaderboardInfoBox from '../components/LeaderboardInfoBox'
import Player from '../components/Player'
import { useSearchParams } from 'react-router-dom'

const Legacy: React.FC = () => {
  document.body.style.overflow = "hidden"

  let [levels, setLevels] = useState<APIManyLevel[]>([])
  let [search, setSearch] = useState<string>('')
  let params = useSearchParams()[0]
  const [selectedPlayerName, setSelectedPlayerName] = useState(params.get("player") || "")
  let getScrolledHeight = () => {
    try {
      let element = document.getElementById("levels-section").children[1];
      return parseFloat((element.scrollTop / (element.scrollHeight - element.clientHeight) * 100).toFixed(2))
    } catch (_) {
      return 0
    }
  }
  function getYouTubeEmbedUrl(url: string) {
    // Extract video ID from the URL
    var videoID = getYouTubeVideoID(url);
    if (videoID) {
      return 'https://www.youtube.com/embed/' + videoID;
    } else {
      return url;
    }
  }

  function getYouTubeVideoID(url: string) {
    var regExp = /^.*(?:youtu.be\/|v\/|e\/|u\/\w+\/|embed\/|v=)([^#\&\?]*).*/;
    var match = url.match(regExp);
    if (match && match[1].length === 11) {
      return match[1];
    } else {
      return null;
    }
  }
  let [listOfObservers, setListOfObservers] = useState([])
  const [swalProps, setSwalProps] = useState({});
  const [selectedLevel, setSelectedLevel] = useState(params.get("level") || "")
  const [players, setPlayers] = useState<Array<APIManyPlayer>>([])
  let [type, setType] = useState<'levels' | 'players'>(params.get("player") ? 'players' : 'levels')
  let [view, setView] = useState<'lrr' | 'hrr' | 'comb'>('comb')
  let [margin, setMargin] = useState(0)
  let [showModal, setShowModal] = useState<boolean>(false)
  let [processedPlayers, setProcessedPlayers] = useState<Array<APIManyPlayer>>([])
  useEffect(() => {
    document.body.style.overflow = (window.innerWidth < 1500 ? "hidden" : "visible")
    setInterval(() => {
      let value = getScrolledHeight();
      if (!document.getElementById("scroll-box")) return;
      (document.getElementById("scroll-box") as any).value = value
    }, 10)
    getLevels().then((l: any) => {
      setLevels(l.slice(100).map((e: any) => {
        delete e.urlHash
        return e
      }))
    })
  }, [])
  useEffect(() => {
    if (selectedLevel && levels.length) {
      const level = levels.find(e => e.name == selectedLevel)
      withReactContent(Swal).fire({
        width: window.innerWidth < 1200 ? "98vw" : "75vw",
        showConfirmButton: false,
        customClass: {
          popup: ["legacy-popup"],
          htmlContainer: ['legacy-container']
        },
        html: <div style={{ height: "75vh" }} className='overflow-y-auto overflow-x-clip'>
          <ListInfoBox levelName={level.name} width={window.innerWidth} selectedState={setSelectedLevel} legacy swalClose={Swal.close}></ListInfoBox>
        </div>
      })
    }
  }, [selectedLevel, levels.length])
  useEffect(() => {
    if (!levels.length) return;
    let list: any = []
    let levelsLength = document.getElementsByClassName("levellist").length
    for (let i = 0; i < levelsLength; i++) {
      let item = document.getElementsByClassName("levellist")[i]
      let observer = new IntersectionObserver((entry: any, observor) => {
        list[i] = entry[0]
        setListOfObservers(list)
        observer.unobserve(item)
      })
      observer.observe(item)
      list.push({})
      setListOfObservers(list)
    }
  }, [levels, search])
  useEffect(() => {
    if (type == "players") {
      setProcessedPlayers(players.filter(e => e.name.toLowerCase().startsWith(search.toLowerCase())).toSorted((a, b) => a.name.localeCompare(b.name)))
    }
  }, [search])
  useEffect(() => {
    getLegacyPlayers().then((p) => {
      p.sort((a, b) => a.name.localeCompare(b.name))
      setPlayers(p)
      setProcessedPlayers(p)
    })
  }, [])

  return (
    <div className={`flex w-full border-r-4 border-l-4 bg-[#f2fff7] sm:mx-auto ${window.innerWidth < 800 ? "flex-col" : ""} ${window.innerWidth < 1500 ? "" : "sm:w-4/5 pr-8 pl-8"}`}>
      {window.innerWidth < 1500 || type == "players" ? "" : <div>
        <Form.Range
          disabled={!!search}
          step={0.01}
          defaultValue={0}
          id="scroll-box"
          onChange={(e) => {
            let index = parseFloat(e.target.value)
            let top = document.getElementById("levels-section").children[1].scrollHeight * (index / 100)
            document.getElementById("levels-section").children[1].scrollTo({
              top,
              behavior: "auto"
            })
          }}
          style={{ transform: `translateX(calc(-65vh / 2)) rotate(90deg) translateY(18px) translateX(46vh)` }}
          className={`absolute w-[65vh] ${window.innerWidth < 1500 ? "pl-4" : ""}`}
        ></Form.Range>
      </div>}
      <div className="flex-grow overflow-hidden bg-white pr-4 pl-4 shadow-inner" style={{ height: "calc(100vh - 72px)" }}>
        <div className='w-full grid place-items-center'>
          <Tabs defaultValue={params.get("player") ? 'players' : 'levels'} className="w-[200px]" onValueChange={(val: 'levels' | 'players') => setType(val)}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger className='data-[state=active]:bg-[#93fdc5]' value="levels">Levels</TabsTrigger>
              <TabsTrigger className='data-[state=active]:bg-[#93fdc5]' value="players">Players</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        <div className="flex">
          <Input type="text" placeholder="Search..." className="m-4 grow" onChange={(e) => setSearch(e.target.value)} defaultValue={search} />
          {type == "levels" ? <Input type="number" placeholder="Pos..." className="m-4 w-20" disabled={!!search} id="level-pos-box" onKeyDown={(e) => {
            if (e.key == "Enter") {
              let index = e.currentTarget.value
              let rect = listOfObservers[(parseInt(index) || 1) - 101].target
              document.getElementById("levels-section").children[1].scrollTo({
                top: rect.offsetTop - document.getElementById("levels-section").children[1].clientHeight / 2 + (rect.clientHeight + 2) / 2,
                left: rect.offsetLeft,
                behavior: "smooth"
              })
            }
          }} /> : ""}
        </div>
        <div>
          {type == "levels" ? <ScrollAreaNoScroll className="rounded-md border" style={{ height: "calc(100vh - 180px)" }} id="levels-section">
            <div className="p-4 flex flex-wrap gap-5">
              {levels.filter(e => search.length > 0 ? e.name.toLowerCase().indexOf(search.toLowerCase()) !== -1 : true).map((level, i) => (
                <div className='flex-grow' style={{ width: window.innerWidth < 800 ? "100%" : "min(420px, 100%)" }} onClick={() => {
                  setSelectedLevel(level.name)
                }}>
                  <Level
                    {...level}
                    show={true}
                    onSelect={() => { }}
                    key={`level-${i}`}
                  />
                </div>
              ))}
            </div>
          </ScrollAreaNoScroll> : type == "players" ? <div className="flex">
            {window.innerWidth < 800 && selectedPlayerName ? "" : <div className="flex-grow p-4" style={{ width: window.innerWidth < 1500 ? "84ch" : "auto" }}>
              <div className='bg-white'>
                <div>
                  <ScrollArea style={{ height: "calc(100vh - 240px)" }}>

                    <Table>
                      <TableBody>
                        <TableRow>
                          <TableCell colSpan={2}><h1 className={`text-center font-extrabold text-${window.innerWidth < 800 ? "2" : "3"}xl`}>Legacy Players (A-Z)</h1></TableCell>
                        </TableRow>
                      </TableBody>
                      <TableBody>
                        {processedPlayers
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
                    <br></br>
                  </ScrollArea>
                </div>
              </div></div>}

            {window.innerWidth < 800 && !selectedPlayerName ? "" : (
              <>
                {window.innerWidth < 800 ? "" : <Separator orientation="vertical" className="mx-4" />}
                <LeaderboardInfoBox playerName={selectedPlayerName} view={view} width={window.innerWidth} selectedState={setSelectedPlayerName} />
              </>
            )}
          </div> : ""}
        </div>
      </div>
    </div>)
}

export default Legacy
