import React from 'react'
import { APIManyLevel } from '../util/withApi'
import { Button } from 'react-bootstrap'

interface LevelProps extends APIManyLevel {
  show: boolean
  hrr?: boolean
  onSelect: () => void
}

const Level: React.FC<LevelProps> = (props: LevelProps) => {
  let { name, creator, position, show, urlHash, onSelect } = props
  let modifiedName = name.split(" (")

  let obj = {}
  if(urlHash) {
    obj = {backgroundPosition: "right", backgroundSize: "auto 110%", backgroundRepeat: "no-repeat"}
  }
  return (
    show && (
      <div style={{borderRadius: "12px", background: ` url("${urlHash ? `https://storage.hpsk.me/api/bucket/file/${urlHash}` : ""}")`, ...obj}}>
      <div
        tabIndex={0}
        className="levellist rounded-box border-base-300 mb-4 cursor-pointer border pl-6 pr-12 pt-4 pb-4 shadow-lg transition-all hover:shadow-xl"
        style={{borderRadius: "10px", background: `linear-gradient(130deg, rgb(255, 255, 255) ${urlHash ? "calc(100% - 125px)" : "100%"}, transparent 0%)`, backgroundColor: urlHash ? "rgba(0, 0, 0, 0.2)" : ""}}
        onClick={onSelect}
      >
        {!urlHash && position < 101 ? <div className='relative w-0 h-0' style={{left: "calc(100% - 10px)", top: "15px"}}>
        <Button className='rounded-full relative bg-sky-600 w-8 text-2xl'>+</Button>
        </div> : ""}
        <div className="text-xl">
          <p style={{overflowWrap: "anywhere", textShadow: "-1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff, 1px 1px 0 #fff"}}>
            <strong style={{overflowWrap: "anywhere"}}>
              {position}. &ldquo;{modifiedName[0]}&rdquo;{modifiedName[1] ? " (old)" : ""}
            </strong>
          </p>
          <p className="text-secondary-content text-base" style={{overflowWrap: "anywhere", textShadow: "-1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff, 1px 1px 0 #fff"}}>
            <em style={{overflowWrap: "anywhere"}}>{creator}</em>
          </p>

          {/* &nbsp;<em>&#40;{Math.round(100 * points) / 100} points&#41;</em> */}
        </div>
      </div>
      </div>
    )
  )
}

export default Level
