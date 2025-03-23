import React, { useState, useEffect } from 'react'
import CreatableSelect from 'react-select/creatable'
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import { getLevels, getPlayers, APIManyLevel, APIManyPlayer, submitRecord } from '../util/withApi'
import RenderTime from '../partials/RenderTime'
import { Input } from '../primitives/input'
import { Label } from '../primitives/label'
import { Button } from '../primitives/button'
import { cn } from '../util/reusables'

const SubmitRecord: React.FC = () => {
  let [levels, setLevels] = useState<Array<APIManyLevel>>([])
  let [players, setPlayers] = useState<Array<APIManyPlayer>>([])
  let [level, setLevel] = useState<string>('')
  let [player, setPlayer] = useState<string>('')
  let [hertz, setHertz] = useState<number>(60)
  let [link, setLink] = useState<string>('')
  let [raw, setRaw] = useState<string>('')
  let [submitStatus, setSubmitStatus] = useState<number>(undefined)
  let [error, setError] = useState<string>(undefined)
  let [disabled, setDisabled] = useState<boolean>(false)

  useEffect(() => {
    getLevels().then((l) => setLevels(l))
    getPlayers().then((p) => setPlayers(p))
  }, [])

  useEffect(() => {
    document.body.style.overflow = "hidden"
  }, [])
  useEffect(() => {
    setTimeout(() => {
      setSubmitStatus(undefined)
      setError(undefined)
    }, 5000)
  }, [submitStatus, error])

  useEffect(() => {
    setTimeout(() => {
      setDisabled(false)
    }, 62000)
  }, [disabled])
  document.body.style.overflow = "visible"
  return (
    <div className="place-content-center border-4 bg-[#f2fff7] p-8 sm:mx-auto sm:mt-12 sm:w-1/2" style={{height: window.innerWidth < 640 ? "calc(100vh - 60px)" : "initial"}}>
      <div className="self-center">
        <div className="mb-3 grid justify-items-center text-3xl font-bold">
          <p>Submit a Record</p>
        </div>
        <Label>Player</Label>
        <CreatableSelect
          className="z-39 mb-3 w-48"
          name="playerSelect"
          options={players.map((p) => ({ value: p.name, label: p.name }))}
          onChange={(e) => setPlayer(e.value)}
          isSearchable
          openMenuOnClick={false}
          placeholder=". . ."
          styles={{
            indicatorSeparator: (baseStyles, state) => ({
              visibility: 'hidden',
            }),
          }}
        />
        <Label>Level</Label>
        <CreatableSelect
          className="z-39 mb-3 w-48"
          name="levelSelect"
          options={levels.map((l) => ({ value: l.name, label: l.name }))}
          onChange={(e) => setLevel(e.value)}
          isSearchable
          openMenuOnClick={false}
          placeholder=". . ."
          styles={{
            indicatorSeparator: (baseStyles, state) => ({
              visibility: 'hidden',
            }),
          }}
        />
        <Label>Refresh Rate</Label>
        <Input
          type="number"
          placeholder=". . ."
          className="mb-3 w-48"
          onChange={(e) => setHertz(Number(e.target.value))}
        />
        <Label>Video Link</Label>
        <Input type="text" onChange={(e) => setLink(e.target.value)} className="mb-3" placeholder=". . ." />
        <Label>Raw Footage</Label>
        <Input type="text" onChange={(e) => setRaw(e.target.value)} className="mb-3" placeholder=". . ." />
        <div className="mt-3 flex justify-center">
          <Button
            disabled={disabled}
            onClick={() => {
              if (player && level && hertz && link && raw) {
                setDisabled(true)
                submitRecord({ player, level, hertz, link, raw })
                  .then((data) => {
                    setSubmitStatus(data.status)
                  })
                  .then((e) => {
                    setPlayer(undefined)
                    setLevel(undefined)
                    setHertz(undefined)
                    setLink(undefined)
                    setRaw(undefined)
                  })
              } else {
                setError('Please fill out all fields')
              }
            }}
          >
            Submit
          </Button>
        </div>
        <div className={cn('w-0 transition-all duration-1000', disabled && 'w-4')} />
        <div className={cn('opacity-0 transition-opacity duration-1000', disabled && 'opacity-100')}>
          {disabled && (
            <CountdownCircleTimer
              isPlaying
              duration={60}
              colors={['#000000', '##000000', '#000000', '#000000']}
              colorsTime={[60, 30, 10, 0]}
              size={50}
              strokeWidth={4}
            >
              {RenderTime}
            </CountdownCircleTimer>
          )}
        </div>
        {submitStatus === 201 && (
          <div className="flex flex-row justify-between rounded-lg bg-white shadow-lg">
            <div className="flex flex-row gap-2 p-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 flex-shrink-0 stroke-current"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <div>Record was submitted</div>
            </div>
          </div>
        )}
        {submitStatus === 409 && (
          <div className="flex flex-row justify-between rounded-lg bg-white shadow-lg">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 flex-shrink-0 stroke-current"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <span>Record already added</span>
            </div>
          </div>
        )}
        {(submitStatus === 500 || submitStatus === 503) && (
          <div className="flex flex-row justify-between rounded-lg bg-white shadow-lg">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 flex-shrink-0 stroke-current"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>Server unavailable, try again later</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default SubmitRecord
