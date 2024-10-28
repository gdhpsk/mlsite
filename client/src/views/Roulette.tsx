import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { getLevels } from '../util/withApi'
import RouletteLevel from '../components/RouletteLevel'
import { UploadIcon } from 'lucide-react'
import { Input } from '../primitives/input'

const Roulette: React.FC = () => {
  let [levels, setLevels] = useState([])
  let [disable, setDisable] = useState(false)
  let [checkedLevels, setCheckedLevels] = useState({
    main: true,
    extended: true,
    legacy: true
  })
  let [rouletteStarted, setRouletteStarted] = useState(false)
  let [endText, setEndText] = useState("")
  let [Range, setRange] = useState([])
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
    document.body.style.overflow = "visible"
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
    <div className={`rounded-box max-w-5xl border-4 bg-[#f2fff7] lg:p-8 sm:m-12 sm:mx-auto ${window.innerWidth < 1500 ? "" : "w-4/5"}`}>
        <div className={`rounded-box flex flex-col overflow-y-auto bg-white p-4 py-12 shadow-inner min-h-screen`}  style={{width: "-webkit-fill-available"}}>
            <h1 className="text-center font-extrabold text-5xl">Mobile List Roulette</h1>
            <br></br>
            {rouletteStarted ? <h1 className="text-center font-extrabold text-xl">Currently at: {roulette.levels.at(-1).percent}%</h1> : ""}
            <br></br>
            <div className='grid gap-y-5'>
            {!rouletteStarted ? 
              <div className='flex gap-8 mb-3 max-sm:flex-col place-content-center items-center'>
                <div className={`${disable ? "opacity-50" : ""} shadow-lg p-6 rounded-xl text-black bg-opacity-70 ${checkedLevels.main ? `border-blue-500 bg-blue-300` : "border-gray-500 bg-gray-300"} border-2 font-bold transition-all duration-700 w-40 h-20 hover:scale-[1.05]`} onClick={e => {
                  if(disable) return;
                  setCheckedLevels({
                    ...checkedLevels,
                    main: !checkedLevels.main
                  })
                }}><h2 className='text-center'>Main List</h2></div>
                <div className={`${disable ? "opacity-50" : ""} shadow-lg p-6 rounded-xl text-black bg-opacity-70 ${checkedLevels.extended ? `border-blue-500 bg-blue-300` : "border-gray-500 bg-gray-300"} border-2 font-bold transition-all duration-700 w-40 h-20 hover:scale-[1.05]`} onClick={e => {
                  if(disable) return;
                  setCheckedLevels({
                    ...checkedLevels,
                    extended: !checkedLevels.extended
                  })
                }}><h2 className='text-center'>Extended List</h2></div>
                <div className={`${disable ? "opacity-50" : ""} shadow-lg p-6 rounded-xl text-black bg-opacity-70 ${checkedLevels.legacy ? `border-blue-500 bg-blue-300` : "border-gray-500 bg-gray-300"} border-2 font-bold transition-all duration-700 w-40 h-20 hover:scale-[1.05]`} onClick={e => {
                  if(disable) return;
                  setCheckedLevels({
                    ...checkedLevels,
                    legacy: !checkedLevels.legacy
                  })
                }}><h2 className='text-center'>Legacy List</h2></div>
              </div> : ""}
            <div className='grid gap-y-5'>
              {!rouletteStarted ? <div className='grid place-items-center'>
                <Input placeholder='Ranges (x-y) or digits (x), separate w/ commas' defaultValue={Range.map(x => x?.[0] == x?.[1] ? x?.[0] : x?.join?.("-"))?.join?.(", ")} className='w-80' id="ranges" onChange={e => {
                  let input = e.target.value
                  setDisable(!!input)
                  let arr = []
                  let ranges = input.split(", ").map(x => x.split("-").map(x => {
                    return parseInt(x)
                  }))
                  for(const range of ranges) {
                    if(range.find(x => (x || 0) < 1)) continue;
                    if(range.length > 2 || range.length < 1) continue;
                    if(range.length == 1) {
                      range.push(range[0])
                    }
                    if(range[0] > range[1] || (range[0] < 1 || range[0] > levels.length) || (range[1] < 1 || range[1] > levels.length)) continue;
                    arr.push(range)
                  }
                  setRange(arr)
                }}></Input></div> : ""}
            <div className='flex max-sm:flex-col gap-2 place-content-center items-center'>
              {!rouletteStarted ? <><br></br><div className='grid place-items-center'><Button className='bg-blue-500 p-2 w-52 rounded-xl border-2 border-blue-200' style={{color: "white"}} disabled={!levels.length} onClick={() => {
                setEndText("")
                let arr: any[] = []
                if(disable) {
                  Range.forEach(x => {
                    arr.push(...levels.slice(x[0]-1, x[1]))
                  })
                  arr = arr.filter((e,i,a) => a.findIndex(x => x.position == e.position) == i)
                } else {
                  if(checkedLevels.main) {
                    arr.push(...levels.slice(0, 50))
                  }
                  if(checkedLevels.extended) {
                    arr.push(...levels.slice(50, 100))
                  }
                  if(checkedLevels.legacy) {
                    arr.push(...levels.slice(100))
                  }
                }
                if(!arr.length) {
                  document.getElementById("err")?.classList.add("fade-in-out");
                  setTimeout(() => {
                    document.getElementById("err")?.classList.remove("fade-in-out");
                  }, 2500)
                  return
                };
                let ind = Math.floor(Math.random() * (arr.length - 1))
                setRoulette({
                  levels: [{
                    ...arr[ind],
                    percent: 1
                  }],
                  remaining: arr.filter((_, i) => i != ind)
                })
                setRouletteStarted(true)
              }}>Start</Button></div></> : ""}
              {rouletteStarted ? <><br></br><div className='grid place-items-center'><Button className='hidden bg-blue-500 p-2 w-40 rounded-xl border-white' style={{color: "white"}} onClick={() => {
                if(roulette.remaining.length) {
                  setEndText(`In total, you did ${roulette.levels.length} levels (skipping ${roulette.levels.slice(0, -1).filter(e => e.skipped).length} levels), and reached ${roulette.levels.at(-1).percent-1}%. Thanks for playing! :)`)
                } else {
                  setEndText(`In total, you did ${roulette.levels.length} levels (skipping ${roulette.levels.filter(e => e.skipped).length} levels), and reached ${roulette.levels.at(-1).percent}%. Thanks for playing! :)`)
                }
                setRoulette({
                  ...roulette,
                  finished: true
                })
                setRouletteStarted(false)
              }} id="complete-roulette"></Button></div></> : ""}
              {rouletteStarted ? <><div className='grid place-items-center'><Button className='bg-red-500 p-2 w-0 rounded-xl border-2 border-red-200 hidden' style={{color: "white"}} onClick={() => {
                setEndText(`In total, you did ${roulette.levels.length-1} levels (skipping ${roulette.levels.slice(0, -1).filter(e => e.skipped).length} levels), and reached ${roulette.levels.at(-1).percent-1}%. Thanks for playing! :)`)
                setRoulette({
                  ...roulette,
                  finished: true
                })
                setRouletteStarted(false)
              }} id="end-roulette">End</Button><Button className='bg-red-500 border-2 border-red-200 p-2 w-40 rounded-xl' style={{color: "white"}} onClick={() => {
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
              }}>Restart</Button></div></> : ""}
              {rouletteStarted ? <><div className='grid place-items-center'><Button className=' bg-green-500 border-2 border-green-200 p-2 w-40 rounded-xl' style={{color: "white"}} onClick={() => {
                let j = document.createElement("a")
                j.download = "ML_roulette.json"
                j.href = URL.createObjectURL(new Blob([localStorage.getItem("roulette")]))
                j.click()
              }}>Export</Button></div></> : ""}
                            {!rouletteStarted ? <>
                <input type="file" id="fileUpload" onChange={uploadFile} style={{display: "none"}} />
                <label htmlFor="fileUpload"><div className='grid place-items-center'><Button className=' bg-orange-500 border-2 border-orange-200 p-2 w-52 rounded-xl' style={{color: "white"}} onDragOver={evt => evt.preventDefault()} onDragEnter={evt => evt.preventDefault()} onDrop={async evt => {
                  let file = evt.dataTransfer.files[0]
                  evt.preventDefault();
                  let json = await file.text()
                  setRoulette(JSON.parse(json))
                  setRouletteStarted(true)
                  localStorage.setItem("roulette", json)
                  setEndText("")
                }}>Import
                </Button></div></label>
              </> : ""}
              </div>
              {!rouletteStarted ? <div className='grid place-items-center w-full'><br></br>
                <p id="err" className='text-center relative p-5 select-none bg-red-500 opacity-0 border-4 border-red-400 font-bold'>Please input a valid input range!</p></div> : ""}
                </div>
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
            </div>
        </div>
        <br></br>
        <p className='text-center font-extrabold'>{endText}</p>
    </div>
  )
}

export default Roulette
