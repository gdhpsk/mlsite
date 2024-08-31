import React, { useEffect } from 'react'

const AllMobileExtremes: React.FC = () => {
  useEffect(() => {
    document.body.style.overflow = "visible"
  }, [])
  return (
    <div className="rounded-box max-w-5xl border-4 bg-[#f2f7ff] p-8 sm:m-12 sm:mx-auto">
        <div className={`rounded-box flex w-4/5 flex-col overflow-y-auto bg-white p-4 py-12 shadow-inner`}  style={{width: "-webkit-fill-available"}}>
            <h1 className="text-center font-extrabold text-5xl">All Mobile Extremes</h1>
        </div>
        <br></br>
        <div className={`rounded-box flex w-4/5 flex-col overflow-y-auto bg-white p-4 py-12 shadow-inner`}  style={{width: "-webkit-fill-available"}}>
        <p>Here's a collection of every extreme (and near-extreme) level that 60hz mobile players have beaten!  As the list gets harder, great players could go through the accomplishments of completing multiple extremes without getting any recognition.  This is meant to fix that, showing off what the mobile community has been able to do despite our hardware limitations.</p>
<br></br>
<p>These levels are split into groups rather than numbers in a list so nobody has to argue about what levels are just slightly harder or easier, and can be more useful for tracking a player's progress.  Also, it's less work for us, and more convenient for when we need to add more levels.</p>
<br></br>
<p>Players' profiles are completely customizable!  You can view them on the second sheet, and if you want to customize your own profile, the rules to do so are available in the mobile squad discord server.  While there are non-extreme demons on this sheet, we had to create a way to limit the amount of profiles to keep track of.  Therefore, you need to have beaten <strong className='contents'>2 extremes</strong> to have a profile, and <strong className='contents'>10 levels total</strong> to customize your profile.</p>
<br></br>
<p>The players with the most extremes beaten are the top contributors to this list, and therefore are the frontrunners and have their profiles first instead of the people with the most list points.</p>
        </div>
        <br></br>
        <div className={`rounded-box flex w-4/5 flex-col overflow-y-auto bg-white p-4 py-12 shadow-inner`}  style={{width: "-webkit-fill-available"}}>
        <iframe sandbox="allow-scripts allow-popups allow-forms allow-same-origin allow-popups-to-escape-sandbox allow-downloads allow-modals allow-storage-access-by-user-activation" frameBorder="0" aria-label="Spreadsheet, Mobile players' love letter" style={{height: "844px"}} allowFullScreen={false} src="https://docs.google.com/spreadsheets/d/13kIprTbi69eHAUS9KvPctkoX2c3qFHCfeUVDa0WTWJQ/htmlembed?authuser=0&amp;gid=0"></iframe>
        </div>
    </div>
  )
}

export default AllMobileExtremes