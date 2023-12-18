import React, { useEffect, useRef, useState } from 'react'
import { getLevels, APIManyLevel, APIOneLevel } from '../util/withApi'
import Level from '../components/Level'
import ListInfoBox from '../components/ListInfoBox'
import { ScrollArea } from '../primitives/scroll-area'
import { Input } from '../primitives/input'
import { Separator } from '../primitives/separator'
import { Button, Form } from 'react-bootstrap'

const List: React.FC = () => {
  let [levels, setLevels] = useState<APIManyLevel[]>([])
  let [selectedLevelName, setSelectedLevelName] = useState<string>("")
  let [search, setSearch] = useState<string>('')
  let [{scrolledHeight}, setScrolledHeight] = useState({scrolledHeight: 0})
  let [originalHeight, setOriginalHeight] = useState(0)
  let getScrolledHeight = () => {
    try {
      let element = document.getElementById("levels-section").children[1];
      return parseFloat((element.scrollTop / (element.scrollHeight - element.clientHeight) * 100).toFixed(2)) 
    } catch(_) {
      return 0
    }
  }
  let [listOfObservers, setListOfObservers] = useState([])

  useEffect(() => {
    if(selectedLevelName && !originalHeight && scrolledHeight && window.innerWidth < 800) {
      setOriginalHeight(scrolledHeight)
      return;
    }
    if(search || (selectedLevelName && window.innerWidth < 800) || !levels.length) return;
    if(!selectedLevelName && originalHeight) {
      let element = document.getElementById("levels-section").children[1];
      document.getElementById("levels-section").children[1].scrollTop = (element.scrollHeight - element.clientHeight) * (originalHeight / 100)
      setOriginalHeight(0)
      return;
    }
    let value = getScrolledHeight()
    setScrolledHeight({scrolledHeight: value || 0});
  })

  useEffect(() => {
    document.body.style.overflow = (window.innerWidth < 1500 ? "hidden" : "visible")
    getLevels().then((l) => {
      setLevels(l)
    })
  }, [])

  useEffect(() => {
    if(!levels.length) return;
    let list: any = []
    let levelsLength = document.getElementsByClassName("levellist").length
   for(let i = 0; i < levelsLength; i++) {
    let item =  document.getElementsByClassName("levellist")[i]
    let observer = new IntersectionObserver((entry: any, observor) => {
      list[i] = entry[0]
      setListOfObservers(list)
      observer.unobserve(item)
    })
    observer.observe(item)
    list.push({})
    setListOfObservers(list)
   }
  }, [levels, selectedLevelName, search])

  return (
    <div className={`flex w-full border-4 bg-[#f2f7ff] overflow-hidden sm:mx-auto ${window.innerWidth < 800 ? "flex-col" : ""} ${window.innerWidth < 1500 ? "" : "sm:w-3/4 p-8 sm:m-12"}`}>
   {window.innerWidth < 800 && selectedLevelName ? "" : <div className="flex-grow bg-white p-4 shadow-inner">
        <div className="flex">
          <Input type="text" placeholder="Search..." className="m-4 grow" onChange={(e) => setSearch(e.target.value)} defaultValue={search}/>
          <Input type="number" placeholder="Pos..." className="m-4 w-14" disabled={!!search} onKeyDown={(e) => {
            if(e.key == "Enter") {
              let index = e.currentTarget.value
               let rect = listOfObservers[(parseInt(index) || 1)-1].target
               document.getElementById("levels-section").children[1].scrollTo({
                 top: rect.offsetTop - document.getElementById("levels-section").children[1].clientHeight / 2 + (rect.clientHeight + 2) / 2,
                 left: rect.offsetLeft,
                 behavior: "smooth"
               })
            }
          }}/>
        </div>
        <div className="flex justify-center mb-3">
          <Form.Range
            disabled={!!search}
            step={0.01}
            value={scrolledHeight}
            id="scroll-box"
            onChange={(e) => {
              let index = parseFloat(e.target.value)
              let top = document.getElementById("levels-section").children[1].scrollHeight * (index/100)
               document.getElementById("levels-section").children[1].scrollTo({
                 top,
                 behavior: "auto"
               })
            }}
            className='w-80'
          ></Form.Range>
        </div>
        <div>
          <ScrollArea className="rounded-md border" style={{height: window.innerWidth < 1500 ? "calc(100vh - 200px)" : "60vh"}} id="levels-section">
            <div className="p-4">
              {levels.map((level, i) => (
                <Level
                  {...level}
                  show={search.length > 0 ? level.name.toLowerCase().indexOf(search.toLowerCase()) !== -1 : true}
                  onSelect={() => {
                    setSelectedLevelName(level.name)
                  }}
                  key={`level-${i}`}
                />
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>}
      {window.innerWidth >= 800 ? <Separator orientation="vertical" /> : ""}
      {window.innerWidth < 800 && !selectedLevelName ? "" : <ListInfoBox levelName={selectedLevelName} width={window.innerWidth} selectedState={setSelectedLevelName}/>}
    </div> )
}

export default List
