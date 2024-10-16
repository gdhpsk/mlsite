import React from 'react'
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
  rec: Record[]
}

const Records: React.FC<RecordsProps> = ({ rec }) => {
  return (
    <div className='overflow-x-hidden w-full'>
    <Table>
      <TableBody>
        {rec.map((r, i) => (
          <TableRow key={`record-${i}`} style={{backgroundColor: i % 2 ? "whitesmoke" : "lightgray"}} className={cn('text-lg', r.hertz === 60 && 'font-semibold')}>
            <TableCell>{r.level ? r.levelID.position : i+1}. {r.player ? <a href={`/#/leaderboard?player=${r.player}`}>{r.player}</a> : r.level}</TableCell>
            <TableCell style={{width: "20px"}}>{r.hertz}</TableCell>
            <TableCell>
              <a href={r.link} target={'_blank'}>
                <div className="w-min rounded-lg p-2 hover:bg-slate-100">
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
