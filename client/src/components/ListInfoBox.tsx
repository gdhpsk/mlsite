import React, { useState, useEffect } from 'react'
import { getLevel, APIOneLevel } from '../util/withApi'
import Records from './Records'
import { ScrollArea, ScrollAreaNoScroll } from '../primitives/scroll-area'
import { Button } from 'react-bootstrap'
import { Tabs, TabsList, TabsTrigger } from '../primitives/tabs'

interface InfoBoxProps {
  levelName: string,
  width: number,
  selectedState: Function
}

const ListInfoBox: React.FC<InfoBoxProps> = ({ levelName, width, selectedState }) => {
  let [level, setLevel] = useState<APIOneLevel>(undefined)  
  let [view, setView] = useState<'lrr' | 'hrr' | 'comb'>('comb')

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
    <div className={`rounded-box flex ${width < 1500 ? "items-center justify-center w-full" : "w-3/5 pl-4"} flex-col overflow-y-auto bg-slate-100 py-12 shadow-inner`}  style={{width: width < 1500 ? "-webkit-fill-available" : "revert-layer",  height: window.innerHeight - 60}}>
      {level && (<>
      <br></br>
        <ScrollAreaNoScroll className="h-full w-full" style={{height: "calc(100vh - 190px)"}}>
          <div className={`grid ${width < 1500 ? "justify-items-center" : "justify-items-start ml-16"} gap-y-16 w-full`}>
          <Button onClick={() => {
                selectedState("")
                setLevel(undefined)
              }}>Back</Button>
            <p className="text-4xl">
              <strong><span className={`text-${width < 1500 ? "5" : "6"}xl text-left`}>#{level.position}</span> - {level.name} </strong>
              <br></br>
              <span className='text-2xl text-left'>by {level.creator}</span>
            </p>
            <hr className='h-10 -mt-10'  style={{width: "min(384px, 100%)"}}/>
            <div className={`grid h-24 -mt-14 ${width < 1500 ? "justify-items-center place-items-center" : "justify-items-start place-items-start"}`} style={{width: "-webkit-fill-available"}}>
            <iframe width="352" height="198" src={getYouTubeEmbedUrl(level.records[0]?.link || "")} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
            </div>
            <br></br>
            <div className={`grid ${width < 1500 ? "place-items-center" : "place-items-start"} w-full`} style={{width: "min(400px, 90%)"}}>
                <p className={`${width < 1500 ? "text-center" : "text-left"} text-2xl`}>Points: {level.points.toFixed(2)}</p>
              </div>
              <div className={`grid place-items-center w-full`}  style={{width: "min(400px, 90%)"}}>
              <Tabs defaultValue="comb" className="w-[300px]" onValueChange={(val: 'lrr' | 'hrr' | 'comb') => setView(val)}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="lrr">LRR</TabsTrigger>
            <TabsTrigger value="comb">Combined</TabsTrigger>
            <TabsTrigger value="hrr">HRR</TabsTrigger>
          </TabsList>
        </Tabs>
              </div>
            <div className={`grid ${width < 1500 ? "place-items-center" : "place-items-start"} bg-blue-100`} style={{width: "min(400px, 90%)"}}>
        <br/>
              <p className="text-3xl text-center w-full">Records</p>
              <br />
              <Records rec={level.records.filter(e => view == "lrr" ? e.hertz <= 75 : view == "hrr" ? e.hertz > 75 : true)} />
            </div>
          </div>
          <br></br>
          <br></br>
        </ScrollAreaNoScroll>
      </>)}
    </div>
  )
}

export default ListInfoBox
