import React, { useState, useEffect } from 'react'
import { getLevel, APIOneLevel } from '../util/withApi'
import Records from './Records'
import { ScrollArea, ScrollAreaNoScroll } from '../primitives/scroll-area'
import { Button } from 'react-bootstrap'

interface InfoBoxProps {
  levelName: string,
  width: number,
  selectedState: Function
}

const ListInfoBox: React.FC<InfoBoxProps> = ({ levelName, width, selectedState }) => {
  let [level, setLevel] = useState<APIOneLevel>(undefined)

  useEffect(() => {
    document.body.style.overflow = "hidden"
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
    <div className={`rounded-box flex ${width < 1500 ? "" : "w-3/5"} flex-col overflow-y-auto bg-white pl-4 pt-4 pb-4 py-12 shadow-inner`}  style={{width: width < 1500 ? "-webkit-fill-available" : "revert-layer",  height: "calc(100vh - 50px)"}}>
      {level && <Button onClick={() => {
                selectedState("")
                setLevel(undefined)
              }}>Back</Button>}
      {level && (<>
      <br></br>
        <ScrollAreaNoScroll className="h-full w-full" style={{height: width < 1500 ? "calc(100vh - 190px)" : "60vh"}}>
          <div className={`grid ${width < 1500 ? "justify-items-center" : "justify-items-start ml-16"} gap-y-16`}>
            <p className="text-4xl">
              <strong><span className={`text-${width < 1500 ? "5" : "6"}xl text-left`}>#{level.position}</span> - {level.name} </strong>
              <br></br>
              <span className='text-2xl text-left'>by {level.creator}</span>
            </p>
            <hr className='w-96 h-10 -mt-10' />
            <div className={`grid h-24 -mt-10 ${width < 1500 ? "justify-items-center place-items-center pr-8" : "justify-items-start place-items-start"}`} style={{width: "-webkit-fill-available"}}>
            <iframe width="352" height="198" src={getYouTubeEmbedUrl(level.records[0]?.link || "")} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
            </div>
            <br></br>
            <div className={`grid ${width < 1500 ? "place-items-center pr-8" : "place-items-start"}`} style={{width: "min(400px, 90%)"}}>
                <p className={`${width < 1500 ? "text-center" : "text-left"} text-2xl`}>Points: {level.points.toFixed(2)}</p>
              </div>
            <div className={`grid ${width < 1500 ? "place-items-center pr-8" : "place-items-start"}`} style={{width: "min(400px, 90%)"}}>
              <p className="text-3xl">Records</p>
              <br />
              <Records rec={level.records} />
            </div>
          </div>
        </ScrollAreaNoScroll>
      </>)}
    </div>
  )
}

export default ListInfoBox
