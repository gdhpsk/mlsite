import React from 'react'

let faq = [
  ["How do we download iCreate?", "First do this, do that, etc etc..."]
]

const FAQ: React.FC = () => {
  document.body.style.overflow = "visible"
  return (
    <div className="rounded-box max-w-5xl border-4 bg-[#f2f7ff] p-8 sm:m-12 sm:mx-auto">
        <div className={`rounded-box flex w-4/5 flex-col overflow-y-auto bg-white p-4 py-12 shadow-inner`}  style={{width: "-webkit-fill-available"}}>
            <h1 className="text-center font-extrabold text-5xl">FAQ</h1>
            <br></br>
            {faq.map(e => <>
              <br></br>
              <h1 className="font-extrabold text-lg">{e[0]}</h1>
              <h1 className="text-lg">{e[1]}</h1>
            </>)}
        </div>
    </div>
  )
}

export default FAQ