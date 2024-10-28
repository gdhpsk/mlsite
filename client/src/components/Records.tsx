import React, { LegacyRef, useEffect, useRef } from 'react'
import { ExternalLink } from 'lucide-react'
import { Table, TableBody, TableRow, TableCell } from '../primitives/table'
import { ScrollArea } from '../primitives/scroll-area'
import { cn } from '../util/reusables'

interface Record {
  hertz: number
  link: string
  player?: string
  level?: string
  levelID?: {
    position?: number
  }
}

interface RecordsProps {
  rec: Record[],
  refFunction?: Function
}

const Records: React.FC<RecordsProps> = ({ rec, refFunction }) => {
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
        {rec.filter(e => e.levelID.position < 101).map((r, i) => (
          <TableRow key={`record-${i}`} style={{backgroundColor: i % 2 ? "whitesmoke" : "lightgray"}} className={cn('text-lg', r.hertz === 60 && 'font-semibold')}>
            <TableCell>{r.level ? r.levelID.position : i+1}. {r.player ? <a href={`/#/leaderboard?player=${r.player}`}>{r.player}</a> : <a href={`/#/?level=${r.level}`}>{r.level}</a>}</TableCell>
            <TableCell style={{width: "20px"}}>{r.hertz}</TableCell>
            <TableCell className='grid place-items-center'>
              <a href={r.link} target={'_blank'}>
                <div className="w-min rounded-lg p-2 hover:bg-[#f1f9f5]">
                  <ExternalLink />
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
