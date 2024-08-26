import React from 'react'

let mods = [
  {
    name: "iCreate Pro",
    logo: "icreate.png",
    link: "https://icreate.pro/"
  },
  {
    name: "MegaHack Mobile",
    logo: "megahack.png",
    link: "https://absolllute.com/"
  },
  {
    name: "Geode",
    logo: "geode.png",
    link: "https://geode-sdk.org/"
  },
  {
    name: "IAD",
    logo: "iad.png",
    link: "https://discord.com/invite/GSnM6ycEdU"
  }
]

let faq: Record<"records" | "submissions" | "misc", Array<[string, React.ReactNode]>> = {
  records: [
    ["What version of GD must I play on?", <>To give mobile players the freedom of choice, <b>both 2.1 and 2.2 records are acceptable.</b> This includes playing on 2.1 without updating, playing on a 2.1 ipa/apk, or playing 2.2 with a 2.1 physics mod.</>],
    ["Does the Mobile List accept specific refresh rates?", <>To place a level on the list, the level must be completed at 60fps. The Mobile List includes all mobile devices, so <b>all native refresh rates are accepted on already placed levels</b>.</>],
  ["Why can only 60fps completions place a level on the list?", <>All opinions gathered for placement are <b>based on a 60fps opinion</b>. We want to keep the list as accurate as possible, and with a jumble of refresh rates added into the mix, we cannot place a level properly.</>],
  ["Which mods are acceptable for the Mobile List?", <>We currently whitelist four mods for GD on mobile, those being <b>iCreate Pro</b>, <b>Megahack Mobile</b>, <b>Italian APK Downloader</b> and <b>Geode</b>. With Geode however, <b>your enabled mods must be shown in the raw footage</b>. Links to their respective websites can be found below:<br></br>
    <div className='grid place-items-center'>
    {mods.map((_, i) => {
      if(i % 2 == 1) return <></>
      return <div className='flex gap-5'>
        <br></br>
        {mods.slice(i, i+2).map(mod => <a href={mod.link}><abbr title={mod.name}><img src={mod.logo} width={128}></img></abbr></a>)}
      </div>
    })}
    </div>
  </>],
  ["I play with bypass, is that accepted?", <>TPS bypass on IAD and MHM, and the iCreate physics bypass <b>are accepted, with a max of 240fps</b>. Your record will be taken as the fps you have bypassed to. If you bypass down to 60fps, your record <b>will be accepted as 60fps</b>.</>]
  ],
  submissions: [
    ["How do I submit a record?", <>You can visit the “<b>Submit Record</b>” page on this website, fill in the information, and submit. Otherwise, you can ask a list staff for the <a href="https://docs.google.com/forms/d/e/1FAIpQLScT8aGlWyRRnn34P9gpvyrECCl-Jn2zaiRO5xsUWzD1qS_98A/viewform" target='_blank'><b>old google form</b></a>, we’ll keep on checking it until the end of the year!</>],
  ["The level I want to submit isn't on the list, can I submit it anyways?", <>You can submit through the <b>Submit page</b> and put the name of the level there. In the <b>Extra Info</b> section, you should also put your placement opinion as well as your progress on relevant levels. Do take note though, to be displayed on the list, levels must have at least one <b>60fps mobile</b> victor. Bypassing down to 60fps also fulfills this requirement.</>],
  ["What proof do I need?", <>Our baseline requirements are <b>raw footage and external audio</b>, although these may be swapped out for an acceptable alternative. <b>Two-player levels beaten solo require a handcam</b>.</>],
  ["How long must my raw footage be?", <>There is <b>no minimum length</b> for your footage, but we recommend at least <b>5-10 minutes</b> of it. Raw footage below this length can be accepted, but we may reject some records on the grounds of insufficient proof.</>],
  ["Where do I upload my raw footage?", <>We recommend <b>Google Drive</b>, <b>Youtube</b> and <b>Mediafire</b> for uploading raw footage, although any cloud service with minimal compression may suffice.</>],
  ["I want to mute certain sections of my raw footage because of swearing/privacy, is that alright?", <>You <b>may mute or censor small sections of the raw footage uploaded</b>, but too much will no longer be acceptable. If you wish for extra privacy, you can <b>directly message a trusted list staff</b> and request that the uncensored content is not shared with the rest of the team.</>],
  ["My taps are not audible, how do I prove legitimacy?", <>You can <b>reduce the ingame music level to 10-20%</b>, while <b>keeping the SFX level at 100%</b>. This helps mobile devices pick up your audio much more clearly, as shown below:<br></br><div className='grid place-items-center'><img src="/taps.png" style={{width: "min(500px, 100%)"}}></img></div></>],
  ["My taps are desynced from my raws, can I manually resync them?", <>We are aware of external audio desync issues becoming more common due to 2.2, you can <b>inform a list staff</b> and <b>upload both the desynced and resynced raws</b>. However, these records will take longer to check. To fix these issues, you can restart your phone, switch to 2.1 or ask a list staff for assistance.</>],
  ["External audio is simply not possible for me, what else can I do?", <>Without external audio, you will need another way to prove that the completion was made in real-time. Two ways we recommend are <b>interactive livestreaming</b> and <b>handcam/liveplay</b>.</>],
  ["I don't have the storage space for raw footage, what can I do?", <>You can <b>livestream the session</b> on twitch or youtube, given that external audio is still present.</>],
  ["How do I prove legitimacy via livestream?", <>You can stream your session of the level on twitch or youtube, and <b>respond to viewers in real-time</b> to rule out speedhack. Alternatively, you can stream with external audio and provide the stream link as raw footage proof.</>],
  ["How do I prove legitimacy via handcam?", <>You can set up a second device pointed at GD, and submit the full recording as raw footage. The two most important parts are that <b>your thumb/index is visible when touching the screen</b>, and that your <b>icon is visible in the handcam for the duration of the completion</b>. <a href="https://youtube.com/@maubile5007">MAUBILE</a> has some good example angles for setting up handcam.</>],
  ["How long does it take for my record to be accepted?", <>We hope to verify your record within <b>one week of submission</b>. If you are curious about the current state of your record, you can ask our list staff on discord.</>],
  ["May I be asked for further proof?", <>We occasionally ask players to <b>play in a live VC</b> if provided proof is insufficient, or if cheats are suspected.</>],
  ],
  misc: [
    ["Does the Mobile List have a discord server?", <>There is, 1453 members and counting, but you’ll have to find it!</>],
  ["How do I provide my opinion for level placement?", <>You can <b>contact a list staff</b> and state the level, your opinion on its placement and your progress on it and related levels. #mobile-list-discussion also works!</>],
  ["What is the AME?", <>All Mobile Extremes is a GDDP of sorts for mobile players, and hopes to organize every extreme beaten on mobile into tiers. If you have at least 10 extremes done on mobile, you can ask <b>WhiteEmerald</b>, <b>MiniWheatDuo</b> or <b>Cappyt</b> for a profile.</>],
  ["Why are there question marks in the legacy list?", <>To date, we have unfortunately lost the names of 8 legacy list levels from 2017-2018, but know their position and have left their spots as such. We offer a bounty for anyone who remembers what these levels are and can provide substantial proof to back the claim.</>],
  ["Will you ever extend the list to 150 levels?", <>Unfortunately due to calculation and workload issues, we <b>do not have plans to extend the list in the near future</b>. However, P8geons runs an unofficial extension of the list at <b>Mobile List Plus</b>, so do check it out!</>],
  ["Do the list packs give list points?", <>List packs do not give any points for now, but they will display on your profile.</>],
  ["My profile shows wrong information, how do I change it?", <>You can <b>contact a list staff</b> on discord and request for your information to be changed.</>],
  ["I have questions not on this page, where do I go?", <>For any other information on this list, you can ask one of the three list leaders on discord. Their information is listed in the “About” page!</>],
  ]
}

const FAQ: React.FC = () => {
  document.body.style.overflow = "visible"
  return (
    <div className="rounded-box max-w-5xl border-4 bg-[#f2f7ff] lg:p-8 sm:m-12 sm:mx-auto">
        <div className={`rounded-box flex w-4/5 flex-col overflow-y-auto bg-white p-4 py-12 shadow-inner`}  style={{width: "-webkit-fill-available"}}>
            <h1 className="text-center font-extrabold text-5xl">FAQ</h1>
            <br></br>
            <br></br>
            <h1 className="font-extrabold text-3xl">Record Guidelines</h1>
            {faq.records.map(e => <>
              <br></br>
              <h1 className="font-extrabold text-xl">{e[0]}</h1>
              <h1 className="text-lg">{e[1]}</h1>
            </>)}
            <br></br>
            <br></br>
            <h1 className="font-extrabold text-3xl">Submission Guidelines</h1>
            {faq.submissions.map(e => <>
              <br></br>
              <h1 className="font-extrabold text-xl">{e[0]}</h1>
              <h1 className="text-lg">{e[1]}</h1>
            </>)}
            <br></br>
            <br></br>
            <h1 className="font-extrabold text-3xl">Misc. Information</h1>
            {faq.misc.map(e => <>
              <br></br>
              <h1 className="font-extrabold text-xl">{e[0]}</h1>
              <h1 className="text-lg">{e[1]}</h1>
            </>)}
        </div>
    </div>
  )
}

export default FAQ