import React, { useEffect, useState } from 'react'
import { APIOneLevel } from '../util/withApi'

interface Pack {
    name: string,
    levels: [APIOneLevel],
    players: Array<Record<any, any>>,
    position: number
}

const Packs: React.FC = () => {

    let [packs, setPacks] = useState<Pack[]>([])

    useEffect(() => {
        (async () => {
            let req = await fetch("/packs")
            let json = await req.json()
            setPacks(json)
        })()
    }, [])

  document.body.style.overflow = "visible"
  return (
    <div className="rounded-box max-w-5xl border-4 bg-[#f2f7ff] p-8 sm:m-12 sm:mx-auto">
        <div className={`rounded-box flex w-4/5 flex-col overflow-y-auto bg-white p-4 py-12 shadow-inner`}  style={{width: "-webkit-fill-available"}}>
            <h1 className="text-center font-extrabold text-5xl">Mobile List Packs</h1>
        </div>
        {packs.map(e => <>
            <br></br>
        <div className={`rounded-box flex w-4/5 flex-col overflow-y-auto bg-white p-4 py-12 shadow-inner`}  style={{width: "-webkit-fill-available"}}>
        <h1 className="text-3xl"><span className='font-extrabold'>{e.name}:</span> {e.levels.map(x => x.name).join(", ")}</h1>
        <br></br>
            <ul style={{listStyleType: "disc", marginLeft: "15px"}}>
            {e.players.map(x => <li>{x.name}<br></br><ol style={{listStyleType: "circle", marginLeft: "15px"}}>
                {x.records.map((y:any) => <li style={{textDecoration: "underline"}}><a href={y.link}>{y.level} ({y.hertz})</a></li>)}    
            </ol></li>)}
            </ul>
        </div>
        </>)}
    </div>
  )
}

export default Packs