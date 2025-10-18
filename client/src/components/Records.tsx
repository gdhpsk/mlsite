import React, { LegacyRef, useEffect, useRef } from 'react'
import { ExternalLink } from 'lucide-react'
import { Table, TableBody, TableRow, TableCell } from '../primitives/table'
import { ScrollArea } from '../primitives/scroll-area'
import { cn } from '../util/reusables'
import e from 'cors'
import { getPlayer } from '../util/withApi'
import Swal from 'sweetalert2'

interface Record {
  hertz: string
  link: string
  player?: string
  level?: string
  percent: number
  levelID?: {
    position?: number
  }
}

interface RecordsProps {
  rec: Record[],
  hrr?: true
  progress?: boolean
  longest?: number
  legacy?: boolean
  refFunction?: Function
}

const Records: React.FC<RecordsProps> = ({ rec, refFunction, hrr, progress, longest, legacy }) => {
  let ref = useRef()
  useEffect(() => {
    if(refFunction) refFunction(ref.current)
  }, [ref.current])
if(rec?.[0]?.level) {
  rec.sort((a,b) => a.levelID.position - b.levelID.position)
}
  return (
    <div className='overflow-x-hidden w-full' ref={ref}>
    <Table>
      <TableBody>
        {rec.filter(e => e.levelID && !legacy ? e.levelID.position < 101 : true).map((r, i) => (
          <TableRow key={`record-${i}`} style={{backgroundColor: i % 2 ? "whitesmoke" : "lightgray"}} className={cn('text-lg', r.hertz.split("/").at(-1) == "60" && 'font-semibold')}>
            <TableCell className='text-left'>{r.level ? r.levelID.position : i+1}. {r.player ? <a onClick={async () => {
              const player = await getPlayer(r.player)
              if(legacy) Swal.close()
              if(player.points.comb) {
                window.location.href = `/#/leaderboard?player=${r.player}`
              } else {
                window.location.assign(`/#/legacy?player=${r.player}`)
                window.location.reload()
              }
            }}>{r.player}{longest ? <span className='opacity-0 select-none'>{Array.from(new Array(longest - r.player.length)).join("e")}</span> : ""}</a> : <a href={`/#/${hrr ? "hrr" : ""}?level=${r.level}`}>{r.level}{longest ? <span className='opacity-0 select-none'>{Array.from(new Array(longest-r.level.length)).join("e")}</span> : ""}</a>}</TableCell>
            <TableCell style={{width: "100px"}}>{r.hertz}</TableCell>
            <TableCell className='grid place-items-center'>
              <a href={r.link} target={'_blank'}>
                <div className="w-min rounded-lg p-2 hover:bg-[#f1f9f5]">
                  {progress ? <p className='text-blue-800 font-bold hover:bg-none'>{r.percent}%</p> : <ExternalLink />}
                </div>
              </a>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
    </div>
  )
}

export default Records
