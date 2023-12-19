import React, { useState, useEffect } from 'react'
import { getLevel, APIOneLevel } from '../util/withApi'
import Records from './Records'
import { ScrollArea } from '../primitives/scroll-area'
import { Button } from 'react-bootstrap'

interface InfoBoxProps {
  name: string,
  position: number,
  creator: string,
  percent: number,
  skipped: boolean,
  done: boolean,
  rouletteState?: {
    obj: Record<any, any>,
    rouletteStarted: boolean,
    func: Function
  }
}

const RouletteLevel: React.FC<InfoBoxProps> = ({ position, name, creator, percent, done, skipped, rouletteState }) => {

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
      <div
        tabIndex={0}
        className="rounded-box border-base-300 mb-4 cursor-pointer border bg-white p-12 shadow-lg transition-all hover:shadow-xl"
      >
        <div className="text-xl">
          <p>
            <strong>
              {position}. &ldquo;{name}&rdquo; {skipped ? "(skipped)" : ""}
            </strong>
          </p>
          <p className="text-secondary-content text-base">
            <em>{creator}</em>
          </p>
          <br></br>
          {!done ? <div>
          <p className="text-sm">
            Currently at: {percent}%
          </p>
          {rouletteState.rouletteStarted ? <><br></br>
            <input placeholder={`At least ${percent}%...`} type="number" id="percentile" className="border-2"></input>
            <br></br>
            <br></br>
            <div className="flex gap-2">
            <Button className='bg-blue-500 p-2' onClick={() => {
                let inputtedPercent = parseInt((document.getElementById("percentile") as any)?.value || 0)  || percent
                if(inputtedPercent < percent) return;
                let ind = Math.floor(Math.random() * (rouletteState.obj.remaining.length - 1))
                if(!rouletteState.obj.remaining.length || inputtedPercent == 100) {
                    rouletteState.func({
                        levels: [...rouletteState.obj.levels.slice(0, -1), {
                          ...rouletteState.obj.levels.at(-1),
                          percent: inputtedPercent,
                          done: true
                        }],
                        remaining: []
                      })
                     setTimeout(() => {
                        document.getElementById("end-roulette").click()
                     }, 0)
                      return
                }
                rouletteState.func({
                  levels: [...rouletteState.obj.levels.slice(0, -1), {
                    ...rouletteState.obj.levels.at(-1),
                    percent: inputtedPercent,
                    done: true
                  }, {
                    ...rouletteState.obj.remaining[ind],
                    percent: inputtedPercent+1
                  }],
                  remaining: rouletteState.obj.remaining.filter((_: any, i: any) => i != ind)
                })
                try {
                    (document.getElementById("percentile") as any).value = ""
                } catch(_) {}
            }}>Enter</Button>
            <Button className='bg-purple-400 p-2' onClick={() => {
                let ind = Math.floor(Math.random() * (rouletteState.obj.remaining.length - 1))
                if(!rouletteState.obj.remaining.length || percent == 100) {
                    rouletteState.func({
                        levels: [...rouletteState.obj.levels.slice(0, -1), {
                          ...rouletteState.obj.levels.at(-1),
                          done: true,
                          skipped: true
                        }],
                        remaining: []
                      })
                      setTimeout(() => {
                         document.getElementById("end-roulette").click()
                      }, 0)
                      return
                }
                rouletteState.func({
                  levels: [...rouletteState.obj.levels.slice(0, -1), {
                    ...rouletteState.obj.levels.at(-1),
                    done: true,
                    skipped: true
                  }, {
                    ...rouletteState.obj.remaining[ind],
                    percent: percent+1
                  }],
                  remaining: rouletteState.obj.remaining.filter((_: any, i: any) => i != ind)
                })
                try {
                    (document.getElementById("percentile") as any).value = ""
                } catch(_) {}
            }}>Skip</Button>
            <Button className='p-2 bg-red-600' onClick={() => {
                document.getElementById("end-roulette").click()
            }}>End</Button>
            </div></> : ""}
          </div> : <p className="text-sm">
            Got to: {percent}%
          </p>}
        </div>
      </div>
  )
}

export default RouletteLevel
