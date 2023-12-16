import React, { useState, useEffect } from 'react'
import { getLevel, APIOneLevel } from '../util/withApi'
import Records from './Records'
import { ScrollArea } from '../primitives/scroll-area'
import { Button } from 'react-bootstrap'

interface InfoBoxProps {
  levelName: string,
  width: number,
  selectedState: Function
}

const ListInfoBox: React.FC<InfoBoxProps> = ({ levelName, width, selectedState }) => {
  let [level, setLevel] = useState<APIOneLevel>(undefined)

  useEffect(() => {
    levelName && getLevel(levelName).then((l) => setLevel(l))
  }, [levelName])

  function getYouTubeEmbedUrl(url: string) {
    // Extract video ID from the URL
    var videoID = getYouTubeVideoID(url);
    if (videoID) {
        return 'https://www.youtube.com/embed/' + videoID;
    } else {
        return url;
    }
}

function getYouTubeVideoID(url: string) {
    var regExp = /^.*(?:youtu.be\/|v\/|e\/|u\/\w+\/|embed\/|v=)([^#\&\?]*).*/;
    var match = url.match(regExp);
    if (match && match[1].length === 11) {
        return match[1];
    } else {
        return null;
    }
}

  return (
    <div className={`rounded-box flex ${width < 1000 ? "" : "w-3/5"} flex-col space-y-12 overflow-y-auto bg-white p-4 py-12 shadow-inner`}  style={{width: width < 1000 ? "-webkit-fill-available" : "revert-layer"}}>
      {level && <Button onClick={() => {
                selectedState("")
                setLevel(undefined)
              }}>Back</Button>}
      {level && (<>
        <ScrollArea className="h-full w-full" style={{height: width < 1000 ? `${window.innerHeight - 236}px` : "60vh"}}>
          <div className="grid justify-items-center gap-y-16">
            <p className="text-4xl">
              <strong>{level.name}</strong>
            </p>
            <iframe width="352" height="198" src={getYouTubeEmbedUrl(level.records[0].link)} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
            <div className="flex h-24 w-[85%] place-items-center justify-items-center">
              <div className="grid flex-grow place-items-center">
                <p className="text-center text-2xl">Position</p>
                <p className="pt-2 text-center text-xl">{level.position}</p>
              </div>
              <div className="divider divider-horizontal" />
              <div className="grid flex-grow place-items-center">
                <p className="text-center text-2xl">Creator</p>
                <p className="pt-2 text-center text-xl">{level.creator}</p>
              </div>
              <div className="divider divider-horizontal" />
              <div className="grid flex-grow place-items-center">
                <p className="text-center text-2xl">Points</p>
                <p className="pt-2 text-center text-xl">{level.points.toFixed(2)}</p>
              </div>
            </div>
            <div className="grid w-3/4 justify-items-center">
              <p className="text-3xl">Records</p>
              <br />
              <Records rec={level.records} />
            </div>
          </div>
        </ScrollArea>
      </>)}
    </div>
  )
}

export default ListInfoBox
