import React, { useEffect, useRef, useState } from 'react'
import { getHRRLevels, APIManyLevel, APIOneLevel } from '../util/withApi'
import Level from '../components/Level'
import ListInfoBox from '../components/ListInfoBox'
import { ScrollAreaNoScroll } from '../primitives/scroll-area'
import { Input } from '../primitives/input'
import { Separator } from '../primitives/separator'
import { Button, Form } from 'react-bootstrap'
import { useSearchParams } from 'react-router-dom'

const HRRList: React.FC = () => {
  useEffect(() => {
    document.body.style.overflow = "hidden"
  }, [])
  let params = useSearchParams()[0]
  let [levels, setLevels] = useState<APIManyLevel[]>([])
  let [selectedLevelName, setSelectedLevelName] = useState<string>(params.get("level") || "")
  let [search, setSearch] = useState<string>('')
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
    if(search || (selectedLevelName && window.innerWidth < 800) || !levels.length) return;
    if(!selectedLevelName && originalHeight) {
      let element = document.getElementById("levels-section").children[1];
      document.getElementById("levels-section").children[1].scrollTop = (element.scrollHeight - element.clientHeight) * (originalHeight / 100)
      setOriginalHeight(0)
      return;
    }
  })
  useEffect(() => {
    document.body.style.overflow = (window.innerWidth < 1500 ? "hidden" : "visible")
        setInterval(() => {
      try {
        let value = getScrolledHeight();
      (document.getElementById("scroll-box") as any).value = value
      } catch(_) {}
    }, 10)
    getHRRLevels().then((l: any) => {
      setLevels(l.slice(0, 100))
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
    <div className={`flex w-full border-r-4 border-l-4 bg-[#f2fff7] sm:mx-auto ${window.innerWidth < 800 ? "flex-col" : ""} ${window.innerWidth < 1500 ? "" : "sm:w-4/5 pr-8 pl-8"}`}>
       {window.innerWidth < 1500 ? "" : <div>
        <Form.Range
            disabled={!!search}
            step={0.01}
            defaultValue={0}
            id="scroll-box"
            onChange={(e) => {
              let index = parseFloat(e.target.value)
              let top = document.getElementById("levels-section").children[1].scrollHeight * (index/100)
               document.getElementById("levels-section").children[1].scrollTo({
                 top,
                 behavior: "auto"
               })
            }}
            style={{transform: `translateX(calc(-65vh / 2)) rotate(90deg) translateY(18px) translateX(46vh)`}}
            className={`absolute w-[65vh] ${window.innerWidth < 1500 ? "pl-4" : ""}`}
          ></Form.Range>
        </div>}
   {window.innerWidth < 800 && selectedLevelName ? "" : <div className="flex-grow overflow-hidden bg-white pr-4 pl-4 shadow-inner" style={{height: "calc(100vh - 72px)"}}>
        <div className="flex">
          <Input type="text" placeholder="Search..." className="m-4 grow" onChange={(e) => setSearch(e.target.value)} defaultValue={search}/>
          <Input type="number" placeholder="#" className="m-4 w-20" disabled={!!search} id="level-pos-box" onKeyDown={(e) => {
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
        <div>
          <ScrollAreaNoScroll className="rounded-md border" style={{height: "calc(100vh - 180px)"}} id="levels-section">
            <div className="p-4">
              {levels.map((level, i) => (
                <Level
                  {...level}
                  hrr={true}
                  show={search.length > 0 ? level.name.toLowerCase().indexOf(search.toLowerCase()) !== -1 : true}
                  onSelect={() => {
                    setSelectedLevelName(level.name)
                  }}
                  key={`level-${i}`}
                />
              ))}
            </div>
          </ScrollAreaNoScroll>
        </div>
      </div>}
      {window.innerWidth < 800 && !selectedLevelName ? "" : <><ListInfoBox levelName={selectedLevelName} width={window.innerWidth} selectedState={setSelectedLevelName} hrr={true}/></>}
      {window.innerWidth < 2000 ? "" : <div className='bg-slate-300 p-20 text-3xl'>
        <h1 className='font-bold text-center'>Live Changelog</h1>
      </div>}
    </div> )
}

export default HRRList
