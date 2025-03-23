import React, { useState, useEffect, useRef } from 'react'
import { getLevel, getHRRLevel, APIOneLevel } from '../util/withApi'
import Records from './Records'
import { ScrollArea, ScrollAreaNoScroll } from '../primitives/scroll-area'
import { Button } from 'react-bootstrap'
import { Tabs, TabsList, TabsTrigger } from '../primitives/tabs'

interface InfoBoxProps {
  levelName: string,
  hrr?: boolean,
  width: number,
  selectedState: Function
}

const ListInfoBox: React.FC<InfoBoxProps> = ({ levelName, width, selectedState, hrr }) => {
  let [level, setLevel] = useState<APIOneLevel>(undefined)  
  let [view, setView] = useState<'lrr' | 'hrr' | 'comb'>('comb')
  let [w, setWidth] = useState(352)

function ref(element: HTMLDivElement | null) {
  setWidth(Math.min(window.innerWidth, element.clientWidth))
}

  useEffect(() => {
    document.body.style.overflow = "hidden"
    levelName && (hrr ? getHRRLevel(levelName) : getLevel(levelName)).then((l) => setLevel(l))
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
    <div className={`rounded-box flex ${width < 1500 ? "items-center justify-center w-full" : "w-[55%] pl-4"} flex-col overflow-y-auto bg-[#f1f9f5] shadow-inner`}  style={{width: width < 1500 ? "min(800px, 100%)" : "revert-layer",  height: "calc(100vh - 72px)"}}>
      {level ? (<>
        <ScrollAreaNoScroll className={`h-full w-full`}>
          <div className={`grid ${width < 1500 ? "justify-items-center" : "justify-items-start ml-16"} gap-y-16 w-full ${width < 1500 ? "" : "pt-12"} pb-12`}>
          <div className={`grid place-items-start w-full ${width < 1500 ? "pl-8 pt-8" : ""} -mb-8`}>
          <Button className='-mb-8' onClick={() => {
                selectedState("")
                setLevel(undefined)
              }}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" width={16}><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg></Button>
          </div>
            <p className="text-4xl -mb-11 ml-6">
              <strong><span className={`text-${width < 1500 ? "5 text-left" : "6 text-left"}`}>#{level.position}</span> - {level.name} </strong>
              <br></br>
              <span className={`text-2xl text-left ${width < 1500 ? "text-center" : "text-left"}`}>by {level.creator}</span>
            </p>
            <hr className='h-5'  style={{width: "min(384px, 100%)"}}/>
            <div className={`grid h-[120%] -mt-14 ${width < 1500 ? "justify-items-center place-items-center" : "justify-items-start place-items-start"}`} style={{width: "-webkit-fill-available", height: "100%"}}>
              <div className='shadow-black rounded-[30px]' style={{backgroundImage: "url('/frame.png')", backgroundSize: "cover", width: `${w}px`, aspectRatio: 581 / 340}}>
            <iframe className='border-black rounded-[30px]' style={{width: `calc(100% - (100% * 13 / 340))`, aspectRatio: 16 / 9, marginTop: "calc(100% * 7 / 340)", marginLeft: "calc(100% * 11 / 581)"}} src={getYouTubeEmbedUrl(level.records.filter(e => view == "lrr" ? e.hertz <= 75 : view == "hrr" ? e.hertz > 75 : true)[0]?.link || "")} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
            </div>
            </div>
            <div className={`grid ${width < 1500 ? "place-items-center" : "place-items-start"} w-full -mt-12`} style={{width: `min(${window.innerWidth < 1500 ? "90%" : "calc(100% - 160px), 90%"}, 400px)`}}>
                {hrr ? "" : <p className={`${width < 1500 ? "text-center" : "text-left"} text-2xl`}>Points: {level.points.toFixed(2)}</p>}
              </div>
              <div className={`grid place-items-center w-full -mt-24`}  style={{width: `min(${window.innerWidth < 1500 ? "90%" : "calc(100% - 160px), 90%"}, 400px)`}}>
              <Tabs defaultValue={view} className="w-[300px]" onValueChange={(val: 'lrr' | 'hrr' | 'comb') => setView(val)}>
          {!hrr ? <TabsList className="grid w-full grid-cols-3 -mb-9">
             <TabsTrigger className='data-[state=active]:bg-[#93fdc5]' value="lrr">LRR</TabsTrigger>
             <TabsTrigger className='data-[state=active]:bg-[#93fdc5]' value="comb">Combined</TabsTrigger>
             <TabsTrigger className='data-[state=active]:bg-[#93fdc5]' value="hrr">HRR</TabsTrigger>
          </TabsList> : ""}
        </Tabs>
              </div>

            <div className={`grid ${width < 1500 ? "place-items-center" : "place-items-start"} bg-[#dbfeea] -mt-12`} style={{width: `min(${window.innerWidth < 1500 ? "90%" : "calc(100% - 160px), 90%"}, 400px)`, marginTop: hrr ? "-128px" : "unset"}}>
              <p className="text-3xl text-center w-full font-bold py-6">• Records •</p>
              <Records rec={level.records.filter(e => view == "lrr" ? e.hertz <= 75 : view == "hrr" ? e.hertz > 75 : true)} refFunction={ref}/>
            </div>
          </div>
        </ScrollAreaNoScroll>
      </>) : <div className='w-full h-full grid place-items-center'><div
        tabIndex={0}
        className="rounded-box border-base-300 cursor-pointer border pl-6 pr-6 pt-4 pb-4 shadow-lg transition-all hover:shadow-xl bg-white"
        style={{borderRadius: "10px"}}
      ><p className='text-center font-semibold text-2xl text-green-600'>Select a level to display its information!</p></div></div>}
    </div>
  )
}

export default ListInfoBox
