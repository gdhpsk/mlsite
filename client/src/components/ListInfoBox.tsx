import React, { useState, useEffect, useRef } from 'react'
import { getLevel, getHRRLevel, APIOneLevel } from '../util/withApi'
import Records from './Records'
import { ScrollArea, ScrollAreaNoScroll } from '../primitives/scroll-area'
import { Button } from 'react-bootstrap'
import { Tabs, TabsList, TabsTrigger } from '../primitives/tabs'
import { Table, TableBody, TableRow, TableCell, TableHead, TableHeader } from '../primitives/table'

interface InfoBoxProps {
  levelName: string,
  hrr?: boolean,
  width: number,
  legacy?: boolean
  selectedState: Function
  swalClose?: Function
}

const ListInfoBox: React.FC<InfoBoxProps> = ({ levelName, width, selectedState, hrr, legacy, swalClose }) => {
  let [level, setLevel] = useState<APIOneLevel>(undefined)  
  let [view, setView] = useState<'lrr' | 'hrr' | 'comb'>('comb')
  let [w, setWidth] = useState(352)
  let [longest, setLongest] = useState(0)
  const [legacies, setLegacy] = useState(legacy)
function ref(element: HTMLDivElement | null) {
  setWidth(Math.min(window.innerWidth, element.clientWidth))
}

  useEffect(() => {
    document.body.style.overflow = "hidden"
    levelName && (hrr ? getHRRLevel(levelName) : getLevel(levelName)).then((l) => setLevel(l))
  }, [levelName])

  useEffect(() => {
    setLongest(0)
  }, [view])

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
// ENDS AT LINE 114
  return (
    <div className={`rounded-box flex ${legacy ? "w-full rounded-2xl" : width < 1500 ? "items-center justify-center w-full overflow-y-auto" : "w-[55%] pl-4 overflow-y-auto"} flex-col bg-[#f1f9f5] shadow-inner`}  style={{width: width < 1500 && !legacy ? "min(800px, 100%)" : "revert-layer",  height: legacy ? "100%" : "calc(100vh - 72px)"}}>
      {level ? (<>
        {legacy ? <div className={`w-full h-full ${width < 1300 ? "grid justify-content-center" : "flex"}`}>
          <div className={`grid ${width < 1300 ? "justify-items-center" : "justify-items-start ml-16 h-96"} gap-y-16 ${width < 1200 ? "pt-12 w-full" : "pt-12 w-2/4"} pb-12`}>

          <div className={`grid place-items-start w-full ${legacy ? "-ml-4 -mt-4" : width < 1500 ? "pl-8 pt-8" : ""} -mb-8`}>
          <Button className={`-mb-8 ${width < 1200 ? "-ml-1" : "-ml-8"} -mt-6 fixed`} onClick={() => {
                if(swalClose) swalClose()
                selectedState("")
                setLevel(undefined)
              }}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" width={16}><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg></Button>
          </div>
            <p className={`text-4xl -mb-11 ${legacy ? "" : "ml-6"}`}>
              <strong><span className={`text-${width < 1500 && !legacy ? "5 text-left" : "6 text-left"}`}>#{level.position}</span> - {level.name} </strong>
              <br></br>
              <span className={`text-2xl text-left ${width < 1500 && !legacy ? "text-center" : "text-left"}`}>by {level.creator}</span>
            </p>
            <hr className='h-5'  style={{width: "min(384px, 100%)"}}/>
            <div className={`grid h-[120%] -mt-14 ${width < 1300 ? "justify-items-center place-items-center" : "justify-items-start place-items-start"}`} style={{width: "-webkit-fill-available", height: "100%"}}>
              <div className='shadow-black rounded-[30px]' style={{backgroundImage: "url('/frame.png')", backgroundSize: "cover", width: `${w}px`, aspectRatio: 581 / 340}}>
            <iframe className='border-black rounded-[30px]' style={{width: `calc(100% - (100% * 13 / 340))`, aspectRatio: 16 / 9, marginTop: "calc(100% * 7 / 340)", marginLeft: "calc(100% * 11 / 581)"}} src={getYouTubeEmbedUrl(level.records.filter(e => view == "lrr" ? parseInt(e.hertz.split("/").at(-1)) <= 75 : view == "hrr" ? parseInt(e.hertz.split("/").at(-1)) > 75 || e.hertz.split("/").at(-1) == "CBF" : true)[0]?.link || "")} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
            </div>
            </div>
          </div>
          <div className={`${width < 1200 ? "w-full" : "w-2/4"} h-full ${width < 1300 ? "grid" : ""}`} style={{textAlign: width < 1300 ? "-webkit-center" as any : "unset"}}>
          <ScrollAreaNoScroll className={`w-full h-full`}>
          <div className={`grid place-items-center w-full mt-6`}  style={{width: `min(${window.innerWidth < 1500 ? "90%" : "calc(100% - 160px), 90%"}, 400px)`}}>
              <Tabs defaultValue={view} className="w-[300px]" onValueChange={(val: 'lrr' | 'hrr' | 'comb') => setView(val)}>
          {!hrr ? <TabsList className="grid w-full grid-cols-3 -mb-9">
             <TabsTrigger className='data-[state=active]:bg-[#93fdc5]' value="lrr">LRR</TabsTrigger>
             <TabsTrigger className='data-[state=active]:bg-[#93fdc5]' value="comb">Combined</TabsTrigger>
             <TabsTrigger className='data-[state=active]:bg-[#93fdc5]' value="hrr">HRR</TabsTrigger>
          </TabsList> : ""}
        </Tabs>
              </div>
            <div className={`grid ${width < 1300 ? "justify-items-center place-items-center" : "place-items-start"} bg-[#dbfeea] mt-12 mb-8`} style={{width: `min(${window.innerWidth < 1500 ? "90%" : "100%"}, 400px)`}}>
              <p className="text-3xl text-center w-full font-bold py-6">• Records •</p>
              <Records rec={level.records.filter(e => view == "lrr" ? parseInt(e.hertz.split("/").at(-1)) <= 75 : view == "hrr" ? parseInt(e.hertz.split("/").at(-1)) > 75 || e.hertz.split("/").at(-1) == "CBF" : true).filter(e => e.percent == 100)} refFunction={ref} longest={longest} legacy={true}/>
            </div>
          </ScrollAreaNoScroll>
          </div>
          </div> : <ScrollAreaNoScroll className={`h-full w-full`}>
          <div className={`grid ${width < 1500 && ~legacy ? "justify-items-center" : "justify-items-start ml-16"} gap-y-16 w-full ${width < 1500 ? "" : "pt-12"} pb-12`}>
          <div className={`grid place-items-start w-full ${legacy ? "-ml-4 -mt-4" : width < 1500 ? "pl-8 pt-8" : ""} -mb-8`}>
          <Button className={`-mb-8 ${legacy ? "fixed" : ""}`} onClick={() => {
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
            <iframe className='border-black rounded-[30px]' style={{width: `calc(100% - (100% * 13 / 340))`, aspectRatio: 16 / 9, marginTop: "calc(100% * 7 / 340)", marginLeft: "calc(100% * 11 / 581)"}} src={getYouTubeEmbedUrl(level.records.filter(e => view == "lrr" ? parseInt(e.hertz.split("/").at(-1)) <= 75 : view == "hrr" ? parseInt(e.hertz.split("/").at(-1)) > 75 || e.hertz.split("/").at(-1) == "CBF" : true)[0]?.link || "")} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
            </div>
            </div>
            <div className={`grid ${width < 1500 ? "place-items-center" : "place-items-start"} w-full -mt-12`} style={{width: `min(${window.innerWidth < 1500 ? "90%" : "calc(100% - 160px), 90%"}, 400px)`}}>
                {hrr || legacy ? "" : level.position > 50 ? <p className={`${width < 1500 ? "text-center" : "text-left"} text-2xl`}>Points: {level.points.toFixed(2)}</p> :  <><div className='grid place-items-center w-full'>
                    <div className='flex w-full'>
                      <div className='grid w-2/4'>
                        <p className='w-full text-center font-bold text-2xl mb-2'>Points</p>
                        <p className='w-full text-center text-lg'>{level.points.toFixed(2)}</p>
                      </div>
                      <div className='grid w-2/4'>
                        <p className='w-full text-center font-bold text-2xl mb-2'>Progress ({level.listpercent}%)</p>
                        <p className='w-full text-center text-lg'>{(level.points / 4).toFixed(2)}</p>
                      </div>
                    </div>
                </div></>}
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
              <Records rec={level.records.filter(e => view == "lrr" ? parseInt(e.hertz.split("/").at(-1)) <= 75 : view == "hrr" ? parseInt(e.hertz.split("/").at(-1)) > 75 || e.hertz.split("/").at(-1) == "CBF" : true).filter(e => e.percent == 100)} refFunction={ref} longest={longest}/>
            </div>

            {level.position <= 50 && !hrr ? <div className={`grid ${width < 1500 ? "place-items-center" : "place-items-start"} bg-[#dbfeea] -mt-12`} style={{width: `min(${window.innerWidth < 1500 ? "90%" : "calc(100% - 160px), 90%"}, 400px)`, marginTop: hrr ? "-128px" : "unset"}}>
              <p className="text-3xl text-center w-full font-bold py-6">• Progress •</p>
              <Records rec={level.records.filter(e => view == "lrr" ? parseInt(e.hertz.split("/").at(-1)) <= 75 : view == "hrr" ? parseInt(e.hertz.split("/").at(-1)) > 75 || e.hertz.split("/").at(-1) == "CBF" : true).filter(e => e.percent >= level.listpercent && e.percent != 100)} longest={longest} refFunction={ref} progress/>
            </div> : ""}
          </div>
        </ScrollAreaNoScroll>}
      </>) : legacy ? <div className='w-full h-full grid place-items-center'><div
        tabIndex={0}
        className="rounded-box border-base-300 cursor-pointer border pl-6 pr-6 pt-4 pb-4 shadow-lg transition-all hover:shadow-xl bg-white"
        style={{borderRadius: "10px"}}
      ><p className='text-center font-semibold text-2xl text-green-600'>Loading...</p></div></div> :<div className='w-full h-full grid place-items-center'><div
        tabIndex={0}
        className="rounded-box border-base-300 cursor-pointer border pl-6 pr-6 pt-4 pb-4 shadow-lg transition-all hover:shadow-xl bg-white"
        style={{borderRadius: "10px"}}
      ><p className='text-center font-semibold text-2xl text-green-600'>Select a level to display its information!</p></div></div>}
    </div>
  )
}

export default ListInfoBox
