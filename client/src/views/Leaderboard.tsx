import React, { useState, useEffect } from 'react'
import { getPlayers, APIManyPlayer } from '../util/withApi'
import Player from '../components/Player'
import LeaderboardInfoBox from '../components/LeaderboardInfoBox'
import PlayerModal from '../components/PlayerModal'

const Leaderboard: React.FC = () => {
  let [players, setPlayers] = useState<Array<APIManyPlayer>>([])
  let [selectedPlayerName, setSelectedPlayerName] = useState<string>(undefined)
  let [search, setSearch] = useState<string>('')
  let [view, setView] = useState<'lrr' | 'hrr' | 'comb'>('lrr')
  let [showModal, setShowModal] = useState<boolean>(false)

  useEffect(() => {
    getPlayers().then((p) => {
      setPlayers(p)
      setSelectedPlayerName(p[0].name)
    })
  }, [])

  return (
    <div className='rounded-box border-4 bg-[#f2f7ff] p-8 sm:container sm:m-12 sm:mx-auto sm:w-3/5'>
      <div className='rounded-box flex justify-center'>
        <div
          className={`select-none p-2 text-lg transition-all ${
            view === 'lrr' ? 'bg-slate-200' : 'cursor-pointer hover:bg-slate-300'
          }`}
          onClick={() => setView('lrr')}
        >
          LRR
        </div>
        <div
          className={`select-none p-2 text-lg transition-all ${
            view === 'comb' ? 'bg-slate-200' : 'cursor-pointer hover:bg-slate-300'
          }`}
          onClick={() => setView('comb')}
        >
          Combined
        </div>
        <div
          className={`select-none p-2 text-lg transition-all ${
            view === 'hrr' ? 'bg-slate-200' : 'cursor-pointer hover:bg-slate-300'
          }`}
          onClick={() => setView('hrr')}
        >
          HRR
        </div>
      </div>
      <br />
      <div className='flex'>
        <div className='rounded-box max-h-[70vh] flex-grow bg-white p-4 shadow-inner'>
          <div className='flex'>
            <input
              type='text'
              placeholder='Search...'
              className='input-bordered input m-4 grow'
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className='h-[55vh] overflow-y-auto'>
            <table className='table-compact table w-full'>
              <tbody>
                {players
                  .filter((player) => {
                    switch (view) {
                      case 'lrr':
                        return player.points.lrr > 0
                      case 'hrr':
                        return player.points.hrr > 0
                      case 'comb':
                        return true
                    }
                  })
                  .sort((a, b) => {
                    switch (view) {
                      case 'lrr':
                        return b.points.lrr - a.points.lrr
                      case 'hrr':
                        return b.points.hrr - a.points.hrr
                      case 'comb':
                        return b.points.comb - a.points.comb
                    }
                  })
                  .map((player, i) => (
                    <Player
                      {...player}
                      show={search.length > 0 ? player.name.toLowerCase().indexOf(search.toLowerCase()) !== -1 : true}
                      view={view}
                      position={i + 1}
                      onSelect={() => {
                        setSelectedPlayerName(player.name)
                        window.innerWidth <= 640 && setShowModal(true)
                      }}
                    />
                  ))}
              </tbody>
            </table>
          </div>
        </div>
        
        {window.innerWidth > 640 ? 
          <>
            <div className='divider divider-horizontal' />
            <LeaderboardInfoBox playerName={selectedPlayerName} view={view} />
          </>
          : 
          <PlayerModal playerName={selectedPlayerName} show={showModal} onClose={() => setShowModal(false)}/>
        }
      </div>
    </div>
  )
}

export default Leaderboard
