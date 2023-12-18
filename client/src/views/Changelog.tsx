import React from 'react'
import ChangelogBox, { ChangelogBoxTypes } from '../components/ChangelogBox'

let changelog: ChangelogBoxTypes[] = [
    {
        title: "The Final Overdue Update",
        date: "8/6/2023",
        ruleChanges: [
            <><i className='contents'>Raws and taps are now required for every completion,</i> and are to be submitted through Google Drive, mediafire or unlisted YT in the record submission</>
        ],
        levelPlacements: [
            <>"Sakupen Hell" was placed at #17, what a conclusion to a legendary level...</>
        ],
        placementAdjustments: [
            <>"Dolos" FINALLY got raised after so long (37 {"->"} 30)</>
        ],
        knockedOffLevels: [
            <>Artifice (the last old list stronghold), RASH (actually good level), Arctic Arena (wasn't this brought up for raising?), Artificial Ideology and The Hell Factory are gone for good, ending TeamN2's reign on the list. Boogie will join them soon...</>
        ],
        other: [
            <>After 6 long years on the Mobile List, Coffee081 has lost his list points and laid to rest. A salute to a mobile legend :salute: </>
        ],
        extra: <div>
            <h1 className='font-extrabold text-base'>
                Word of Thanks
            </h1>
        </div>
    }
]

const Changelog: React.FC = () => {

  document.body.style.overflow = "visible"
  return (
    <div className="rounded-box max-w-5xl border-4 bg-[#f2f7ff] p-8 sm:m-12 sm:mx-auto">
        <div className={`rounded-box flex w-4/5 flex-col overflow-y-auto bg-white p-4 py-12 shadow-inner`}  style={{width: "-webkit-fill-available"}}>
            <h1 className="text-center font-extrabold text-5xl">Changelog</h1>
        </div>
            <br></br>
      {changelog.map(e => <><ChangelogBox
        title={e.title}
        date={e.date}
        ruleChanges={e.ruleChanges}
        levelPlacements={e.levelPlacements}
        placementAdjustments={e.placementAdjustments}
        knockedOffLevels={e.knockedOffLevels}
        other={e.other}
        extra={e.extra}
      /><br></br></>)}
    </div>
  )
}

export default Changelog