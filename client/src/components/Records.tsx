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
}

interface RecordsProps {
  rec: Record[]
}

const Records: React.FC<RecordsProps> = ({ rec }) => {
  return (
    <Table>
      <TableBody>
        {rec.map((r, i) => (
          <TableRow key={`record-${i}`} style={{backgroundColor: i % 2 ? "white" : "lightgray"}} className={cn('text-lg', r.hertz === 60 && 'font-semibold')}>
            <TableCell>{r.level ? `${i+1}. ` : ""}{r.player ?? r.level}</TableCell>
            <TableCell>{r.hertz}</TableCell>
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
  )
}

export default Records
