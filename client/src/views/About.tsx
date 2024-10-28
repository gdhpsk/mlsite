import React, { useEffect } from 'react'

let mods: any = {
  Owners: [
    {
      name: 'MiniWheatDuo',
      discord: 'glorbinus_slingting_pickleball_x'
    },
    { name: 'Coopersuper', discord: 'coopersuper' },
    { name: 'CappytR', discord: 'cappytr' }
  ],
  Editors: [
    { name: 'Batle', discord: '.batle' },
    { name: 'Mike139115', discord: 'mike139115' },
    { name: 'DreamTide', discord: 'dreamtide' },
    { name: 'Nelluque', discord: 'nell076' },
    { name: 'SubZerov', discord: 'subzerovv' },
    { name: 'Rusty', discord: 'ppgrusty' },
    { name: 'LegDina', discord: 'legdina' },
    { name: 'Cedric22', discord: 'elitecedric22x' },
    { name: 'P8geons', discord: 'p8geons' },
    { name: 'SeaWolfMikes', discord: 'seawolfmikes' },
    { name: 'BiPolarBearr', discord: 'bipolarbearrgd' },
    { name: 'Coheton', discord: 'coheton' },
    { name: 'Karthik', discord: 'karthik567' }
  ],
  Developers: [
    { name: 'Zoink Doink', discord: 'zoinkdoink' },
    { name: 'gdhpsk', discord: 'gdhpsk' }
  ],
  'Special Thanks': [
    { name: 'Pacosky18', discord: undefined },
    { name: 'Stilluetto', discord: undefined },
    { name: 'Gizbro', discord: undefined },
    { name: 'HugeDoge', discord: undefined },
    { name: 'Retina', discord: undefined },
    { name: 'Overowned', discord: undefined },
    { name: 'Zoff', discord: undefined },
    { name: 'Zetzal', discord: undefined },
    { name: 'Gochujang', discord: undefined },
    { name: 'Coffee081', discord: undefined },
    { name: 'Aonsey', discord: undefined },
    { name: 'Thonyell ', discord: undefined },
    { name: 'Nik', discord: undefined },
    { name: 'Venfy', discord: undefined },
    { name: 'Hilo', discord: undefined },
    { name: 'Bigthunder556', discord: undefined },
    { name: 'Amp1ify', discord: undefined },
    { name: 'Surpl3x', discord: undefined },
    { name: 'Zeth', discord: undefined }
  ]
}

const About: React.FC = () => {
  useEffect(() => {
    document.body.style.overflow = "visible"
  }, [])
  return (
    <div className="rounded-box max-w-5xl border-4 bg-[#f2fff7] p-8 sm:m-12 sm:mx-auto">
      <div className="flex flex-col justify-self-center">
        <div className="grid justify-items-center">
          <h1 className={`text-${window.innerWidth < 800 ? "4" : "5"}xl font-bold`}>The Mobile List</h1>
          <br />
          <p>
          Ever since the use of high refresh rate (HRR) displays and bypasses became popular, Geometry Dash has become a very competitive game. The original and most popular demon list “Pointercrate” is full of levels that are inaccessible to mobile players due to these HRR advancements. There is still a very large playing community who only has access to lower refresh rate devices and/or chooses to play on these devices. To adapt to the mobile scene, MiniWheatDuo created “The Mobile List” near the end of 2017. It has served through the test of time on Google Sites, and has led GD mobile history. Now a team with the resources necessary, we have created this modern list which maintains the top 100 most difficult demons beaten by mobile players.
          </p>
        </div>
        <hr className="my-4" />
        <div className="grid justify-items-center">
          <h3 className="text-3xl underline">The Team</h3>
          <br />
          <div className="grid place-items-start justify-items-center gap-x-12" style={{gridTemplateColumns: `repeat(${Object.keys(mods).length-1}, minmax(0, 1fr))`}}>
            {Object.entries(mods).slice(0, -1).map(([header, moderators]: any) => <div className="grid justify-items-center gap-y-1">
              <h5 className="text-lg font-bold mb-2">{window.innerWidth < 800 ? `${header}` : `• ${header} •`}</h5>
              <div className="grid place-items-start justify-items-center" style={{gridTemplateColumns: `repeat(${moderators.length > 10 && window.innerWidth > 768 ? 2 : 1}, minmax(0, 1fr))`}}>
              {(header == "Editors" && (moderators.length % 2) ? moderators.slice(0, -1) : moderators).map((e:any) => <abbr title="Click to copy discord username"><p className='hover:cursor-pointer' style={{textDecoration: "dotted underline"}} onClick={() => {
                navigator.clipboard.writeText(e.discord)
                alert(`Successfully copied ${e.name}'s discord username`)
              }}>{e.name}</p></abbr>)}
              </div>
              {header == "Editors" ? <abbr title="Click to copy discord username"><p className='hover:cursor-pointer' style={{textDecoration: "dotted underline"}} onClick={() => {
                navigator.clipboard.writeText(moderators.at(-1).discord)
                alert(`Successfully copied ${moderators.at(-1).name}'s discord username`)
              }}>{moderators.at(-1).name}</p></abbr> : ""}
            </div>)}
          </div>
          <br></br>
          <h5 className="text-xl font-bold text-center mb-2">• Special Thanks •</h5>
          <div className='flex flex-wrap gap-3 justify-center' style={{maxWidth: "70%", rowGap: "5px"}}>
            {(Object.values(mods).at(-1) as any).map((e:any) => <span>{e.name}</span>)}
          </div>
        </div>
        <hr className="my-4" />
        <div className="grid justify-items-center">
          <h3 className="text-3xl underline">How it Works</h3>
          <br />
          <ul className="list-disc">
          <li>Remember: This is a mobile-based list. These levels may not be in the order that computer players or higher refresh rate players want them to be in.</li>
<li>The levels are organized from hardest to easiest, hardest at #1, easiest at #100.</li>
<li>The records are ordered by who beat the level first, with the first victor at the top. Levels with completions above 60hz will only be added once a 60hz mobile player has completed the level.</li>
<li>LDM (Low Detail Mode) versions of levels are accepted, as long as it does not affect the difficulty of the level.</li>
<li>Former mobile players will still be on the list, but only their mobile records will count.</li>
<li>Illegitimate records will be removed, along with any other records that person holds.</li>
<li>As of 12/15/17, only levels that have been demons at one point or another will be added.</li>
<li>As of 08/06/23, raw footage and external audio/taps are required for every record submission.</li>
<li>Using "force smooth fix" or any other method of slowing down your device won't get your record on the list.</li>
<li>Records submitted where a mouse or controller is used will not be accepted, as it doesn't stay true to the touchscreen aspect of mobile.</li>
<li>Levels are placed at most 1 month after the date of completion.</li>
<li>For an updated level to be added, the update must stay true to the original. The general gameplay of the level should remain the same, excluding buffs, nerfs, and bugfixes (e.g. Furious Flames, Killbot, Fabrication).</li>
<li>Updates that do not resemble the original level will not be added to the list. The update must also be harder than the original by 2 or more positions. If the level is nerfed, it will simply be moved down, retaining its records.</li>
<li>Megahack Mobile, IAD, Geode and iCreate records are allowed on the list. Geode completions should show the enabled mods in the raw footage.</li>
<li>Due to 2.2 standardising physics to 2.1 60fps, 2.1 and 2.2 records will both continue to be accepted to Mobile List.</li>
<li>TPS Bypass is allowed on the list, with the following restrictions:</li>
<li style={{marginLeft: "20px"}}>The highest limit of TPS Bypass is 240fps, and records will be taken as the fps bypassed to.</li>
<li style={{marginLeft: "20px"}}>Records submitted must also contain information on their device model, as well as native fps used before bypass.</li>
<li style={{marginLeft: "20px"}}>Furthermore, HRR devices using TPS Bypass down to 60fps will be accepted as 60hz, and are able to add new levels to the list.</li>
<li>Additionally, Click on Steps will be allowed on the list with the same above restrictions, with refresh rate taken as your device's sampling rate. CBF implementations that bypass the step system will not be allowed.</li>
<li style={{marginLeft: "20px"}}>Records that use either mod must show so in their raw footage by opening mod settings. If we find that records input between frames without being marked as such, these records will be removed from the list.</li>
          </ul>
        </div>
        <hr className="my-4" />
        <div className="grid justify-items-center">
          <h3 className="text-3xl underline">Contact Us</h3>
          <br />
          <p>
          For questions/concerns about the rules or
the list in general, reach out to one of the owners on discord.
          </p>
          <br></br>
          <p>
            For questions/concerns about the site, reach out to either{' '}
            <strong className="select-all">zoinkdoink</strong> or <strong className="select-all">gdhpsk</strong> on discord.
          </p>
        </div>
      </div>
    </div>
  )
}

export default About
