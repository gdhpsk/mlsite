import React, { useEffect, useRef, useState } from 'react'
import { getLevels, APIManyLevel, APIOneLevel } from '../util/withApi'
import Level from '../components/Level'
import ListInfoBox from '../components/ListInfoBox'
import { ScrollAreaNoScroll } from '../primitives/scroll-area'
import { Input } from '../primitives/input'
import { Separator } from '../primitives/separator'
import { Button, Form } from 'react-bootstrap'

const Legacy: React.FC = () => {
    document.body.style.overflow = "hidden"

  let [levels, setLevels] = useState<APIManyLevel[]>([])
  let [search, setSearch] = useState<string>('')
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
    document.body.style.overflow = (window.innerWidth < 1500 ? "hidden" : "visible")
    setInterval(() => {
      let value = getScrolledHeight();
      (document.getElementById("scroll-box") as any).value = value
    }, 10)
    getLevels().then((l: any) => {
      setLevels(l.slice(100))
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
  }, [levels, search])

  return (
    <div className={`flex w-full border-r-4 border-l-4 bg-[#f2f7ff] sm:mx-auto ${window.innerWidth < 800 ? "flex-col" : ""} ${window.innerWidth < 1500 ? "" : "sm:w-3/4 pr-8 pl-8"}`}  style={{maxWidth: "1800px"}}>
  <div className="flex-grow overflow-hidden bg-white pr-4 pl-4 shadow-inner" style={{height: window.innerHeight - 60}}>
        <div className="flex">
          <Input type="text" placeholder="Search..." className="m-4 grow" onChange={(e) => setSearch(e.target.value)} defaultValue={search}/>
          <Input type="number" placeholder="Pos..." className="m-4 w-20" disabled={!!search} id="level-pos-box" onKeyDown={(e) => {
            if(e.key == "Enter") {
              let index = e.currentTarget.value
               let rect = listOfObservers[(parseInt(index) || 1)-101].target
               document.getElementById("levels-section").children[1].scrollTo({
                 top: rect.offsetTop - document.getElementById("levels-section").children[1].clientHeight / 2 + (rect.clientHeight + 2) / 2,
                 left: rect.offsetLeft,
                 behavior: "smooth"
               })
            }
          }}/>
        </div>
        {window.innerWidth < 1500 ? "" : <>
        <div className="flex justify-center mb-3">
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
            style={{transform: "translateY(calc((-180px + 100vh)/2)) translateX(max(-36.5vw, -885px)) rotate(90deg)"}}
            className='absolute w-[50vh]'
          ></Form.Range>
        </div></>}
        <div>
          <ScrollAreaNoScroll className="rounded-md border" style={{height: "calc(100vh - 180px)"}} id="levels-section">
            <div className="p-4 flex flex-wrap gap-5">
              {levels.filter(e => search.length > 0 ? e.name.toLowerCase().indexOf(search.toLowerCase()) !== -1 : true).map((level, i) => (
                <div className='flex-grow' style={{width: "min(384px, 100%)"}}>
                  <Level
                  {...level}
                  show={true}
                  onSelect={() => {}}
                  key={`level-${i}`}
                />
                </div>
              ))}
            </div>
          </ScrollAreaNoScroll>
        </div>
      </div>
    </div> )
}

export default Legacy
