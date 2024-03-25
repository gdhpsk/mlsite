import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { getLevels } from '../util/withApi'
import RouletteLevel from '../components/RouletteLevel'

const Roulette: React.FC = () => {
  document.body.style.overflow = "visible"
  let [levels, setLevels] = useState([])
  let [checkedLevels, setCheckedLevels] = useState({
    main: true,
    extended: true,
    legacy: true
  })
  let [rouletteStarted, setRouletteStarted] = useState(false)
  let [endText, setEndText] = useState("")
  let [roulette, setRoulette] = useState<{levels: any[], remaining: any[], finished?: boolean}>({
    levels: [],
    remaining: [],
    finished: false
  })

  useEffect(() => {
    try {
      if(!localStorage.getItem("roulette")) throw new Error()
      setRoulette(JSON.parse(localStorage.getItem("roulette")))
      setRouletteStarted(true)
    } catch(_) {}
    if(!rouletteStarted) getLevels().then((l) => {
      setLevels(l)
    })
  }, [])

  useEffect(() => {
    if(!roulette.levels.length) return;
    if(roulette.finished) return localStorage.removeItem("roulette")
    localStorage.setItem("roulette", JSON.stringify(roulette))
  }, [roulette])

  function uploadFile() {
    var fileInput = document.getElementById('fileUpload')
     var fileReader=new FileReader();
  
     fileReader.onload=function(){ 
       try {
          setRoulette(JSON.parse(fileReader.result as string))
          setRouletteStarted(true)
         localStorage.setItem("roulette", fileReader.result as string)
         setEndText("")
       } catch(e) {
         console.log(e)
       }
     }
  
     fileReader.readAsText((fileInput as any).files[0]);
  }
  
  return (
  <div className={`flex w-full border-4 bg-[#f2f7ff] sm:mx-auto ${window.innerWidth < 800 ? "flex-col" : ""} ${window.innerWidth < 1500 ? "" : "sm:w-1/2 p-8 sm:m-12"}`}>
      <div className={`rounded-box flex flex-col overflow-y-auto bg-white p-4 py-12 shadow-inner overflow-x-hidden`}  style={{width: "-webkit-fill-available", height: window.innerWidth < 1500 ? "calc(100vh - 68px)" : "80vh"}}>
            <h1 className="text-center font-extrabold text-5xl">Mobile List Roulette</h1>
            <br></br>
            {rouletteStarted ? <h1 className="text-center font-extrabold text-xl">Currently at: {roulette.levels.at(-1).percent}%</h1> : ""}
            <br></br>
            {!rouletteStarted ? <div>
                  <div className='flex gap-1'>
                    <input type='checkbox' defaultChecked onChange={(e) => {
                      let {checked} = e.target
                      setCheckedLevels({
                        ...checkedLevels,
                        main: checked
                      })
                    }}></input>
                    <p>Main List</p>
                  </div>
                  <div className='flex gap-1'>
                    <input type='checkbox' defaultChecked onChange={(e) => {
                      let {checked} = e.target
                      setCheckedLevels({
                        ...checkedLevels,
                        extended: checked
                      })
                    }}></input>
                    <p>Extended List</p>
                  </div>
                  <div className='flex gap-1'>
                    <input type='checkbox' defaultChecked onChange={(e) => {
                      let {checked} = e.target
                      setCheckedLevels({
                        ...checkedLevels,
                        legacy: checked
                      })
                    }}></input>
                    <p>Legacy List</p>
                  </div>
              </div> : ""}
            <div className='grid'>
              {!rouletteStarted ? <><br></br><Button disabled={!levels.length} onClick={() => {
                setEndText("")
                let arr = []
                if(checkedLevels.main) {
                  arr.push(...levels.slice(0, 75))
                }
                if(checkedLevels.extended) {
                  arr.push(...levels.slice(75, 150))
                }
                if(checkedLevels.legacy) {
                  arr.push(...levels.slice(150))
                }
                let ind = Math.floor(Math.random() * (arr.length - 1))
                setRoulette({
                  levels: [{
                    ...arr[ind],
                    percent: 1
                  }],
                  remaining: arr.filter((_, i) => i != ind)
                })
                setRouletteStarted(true)
              }}>Start</Button></> : ""}
              {rouletteStarted ? <><br></br><Button className='hidden' onClick={() => {
                setEndText(`In total, you did ${roulette.levels.length} levels (skipping ${roulette.levels.slice(0, -1).filter(e => e.skipped).length} levels), and got to ${roulette.levels.at(-1).percent}%. Thanks for playing! :)`)
                setRoulette({
                  ...roulette,
                  finished: true
                })
                setRouletteStarted(false)
              }} id="complete-roulette"></Button></> : ""}
              {rouletteStarted ? <><br></br><Button onClick={() => {
                setEndText(`In total, you did ${roulette.levels.length-1} levels (skipping ${roulette.levels.slice(0, -1).filter(e => e.skipped).length} levels), and got to ${roulette.levels.at(-1).percent}%. Thanks for playing! :)`)
                setRoulette({
                  ...roulette,
                  finished: true
                })
                setRouletteStarted(false)
              }} id="end-roulette">End</Button></> : ""}
              {!rouletteStarted ? <>
              <br></br>
                <input type="file" id="fileUpload" onChange={uploadFile} style={{display: "none"}} />
                <Button>
                  <label htmlFor="fileUpload">Import</label>
                </Button>
              </> : ""}
              {rouletteStarted ? <><br></br><Button onClick={() => {
                let j = document.createElement("a")
                j.download = "ML_roulette.json"
                j.href = URL.createObjectURL(new Blob([localStorage.getItem("roulette")]))
                j.click()
              }}>Export</Button></> : ""}
              {roulette.levels.slice(0, -1).map(e => <div key={e.name}><br></br><RouletteLevel
                name={e.name}
                position={e.position}
                creator={e.creator}
                percent={e.percent}
                skipped={e.skipped || false}
                done={e.done || false}
              ></RouletteLevel></div>)}
              {roulette.levels.slice(roulette.levels.length == 1 ? 0 : -1).map(e => <div key={e.name}><br></br><RouletteLevel
                name={e.name}
                position={e.position}
                creator={e.creator}
                percent={e.percent}
                skipped={false}
                done={e.done || false}
                rouletteState={{
                  obj: roulette,
                  rouletteStarted,
                  func: setRoulette
                }}
              ></RouletteLevel></div>)}
              <br></br>
              <p className='text-center font-extrabold'>{endText}</p>
            </div>
        </div>
    </div>
  )
}

export default Roulette
