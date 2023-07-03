import React, { useEffect, useRef, useState } from 'react'
import { getLevels, APIManyLevel, APIOneLevel } from '../util/withApi'
import Level from '../components/Level'
import ListInfoBox from '../components/ListInfoBox'
import { ScrollArea } from '../primitives/scroll-area'
import { Input } from '../primitives/input'
import { Separator } from '../primitives/separator'

const List: React.FC = () => {
  let [levels, setLevels] = useState<APIManyLevel[]>([])
  let [selectedLevelName, setSelectedLevelName] = useState<string>(undefined)
  let [search, setSearch] = useState<string>('')

  useEffect(() => {
    getLevels().then((l) => {
      setLevels(l)
      setSelectedLevelName(l[0].name)
    })
  }, [])

  return (
    <div className="flex w-full border-4 bg-[#f2f7ff] p-8 sm:m-12 sm:mx-auto">
      <div className="max-h-[75vh] flex-grow bg-white p-4 shadow-inner">
        <div className="flex">
          <Input type="text" placeholder="Search..." className="m-4 grow" onChange={(e) => setSearch(e.target.value)} />
        </div>
        <div>
          <ScrollArea className="h-[60vh] rounded-md border">
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
      </div>
      <Separator orientation="vertical" />
      <ListInfoBox levelName={selectedLevelName} />
    </div>
  )
}

export default List
