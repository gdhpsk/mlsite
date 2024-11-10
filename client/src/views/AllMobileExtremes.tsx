import React, { useEffect } from 'react'

const AllMobileExtremes: React.FC = () => {
  useEffect(() => {
    document.body.style.overflow = "visible"
  }, [])
  return (
    <div className={`rounded-box max-w-5xl border-4 bg-[#f2fff7] p-8 sm:m-12 sm:mx-auto ${window.innerWidth < 1500 ? "" : "w-4/5"}`}>
        <div className={`rounded-box flex flex-col overflow-y-auto bg-white p-4 py-12 shadow-inner`}  style={{width: "-webkit-fill-available"}}>
            <h1 className="text-center font-extrabold text-5xl">Not List Worthy</h1>
        </div>
        <br></br>
        <div className={`rounded-box flex w-4/5 flex-col overflow-y-auto bg-white p-4 py-12 shadow-inner`}  style={{width: "-webkit-fill-available"}}>
        <p>Here's a collection of every extreme (and near-extreme) level that 60hz mobile players have beaten!  As the list gets harder, great players could go through the accomplishments of completing multiple extremes without getting any recognition.  This is meant to fix that, showing off what the mobile community has been able to do despite our hardware limitations.</p>
<br></br>
<p>These levels are split into groups rather than numbers in a list so nobody has to argue about what levels are just slightly harder or easier, and can be more useful for tracking a player's progress.  Also, it's less work for us, and more convenient for when we need to add more levels.</p>
<br></br>
<p>Players' profiles are completely customizable!  You can view them on the second sheet, and if you want to customize your own profile, the rules to do so are available in the <a href="https://discord.gg/gdmobile" style={{textDecoration: "none"}}>mobile squad discord server</a>.  While there are non-extreme demons on this sheet, we had to create a way to limit the amount of profiles to keep track of.  Therefore, you need to have beaten <strong className='contents'>2 extremes</strong> to have a profile, and <strong className='contents'>10 levels total</strong> to customize your profile.</p>
<br></br>
<p>The players with the most extremes beaten are the top contributors to this list, and therefore are the frontrunners and have their profiles first instead of the people with the most list points.</p>
<br></br>
<p className='font-bold'>To view the spreadsheet on a separate sheet, click <a href="https://docs.google.com/spreadsheets/d/1DM9uBt0waurqhYAJVvVJvaPME3_JxxkJPmVGWF9QBGI/htmlembed?authuser=0" target='_blank' className='underline'><i>here</i></a></p>
        </div>
        <br></br>
        <div className={`rounded-box flex w-4/5 flex-col overflow-y-auto bg-white p-4 py-12 shadow-inner`}  style={{width: "-webkit-fill-available"}}>
        <iframe className="YMEQtf L6cTce-purZT L6cTce-pSzOP KfXz0b" sandbox="allow-scripts allow-popups allow-forms allow-same-origin allow-popups-to-escape-sandbox allow-downloads allow-modals allow-storage-access-by-user-activation" frameBorder="0" aria-label="Spreadsheet, Non-Listworthy Mobile Extreme Demons" allowFullScreen={false} src="https://docs.google.com/spreadsheets/d/1DM9uBt0waurqhYAJVvVJvaPME3_JxxkJPmVGWF9QBGI/htmlembed?authuser=0" style={{height: "844px"}}></iframe>
        </div>
    </div>
  )
}

export default AllMobileExtremes