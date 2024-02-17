import React, { useState, useEffect } from 'react'
import { getLevel, APIOneLevel } from '../util/withApi'
import Records from './Records'
import { ScrollArea } from '../primitives/scroll-area'
import { Button } from 'react-bootstrap'

export interface ChangelogBoxTypes {
  title: string,
  date: string,
  ruleChanges: Array<JSX.Element>,
  levelPlacements: Array<JSX.Element>,
  placementAdjustments: Array<JSX.Element>,
  knockedOffLevels: Array<JSX.Element>,
  other: Array<JSX.Element>
  extra: JSX.Element
}

const ChangelogBox: React.FC<ChangelogBoxTypes> = ({ title, date, ruleChanges, levelPlacements, placementAdjustments, knockedOffLevels, other, extra }) => {
  return (
    <div className={`rounded-box flex w-4/5 flex-col overflow-y-auto bg-white p-4 py-12 shadow-inner`}  style={{width: "-webkit-fill-available"}}>
      <h1 className="font-extrabold text-xl">({date}){title ?  `- ${title}` : ""}</h1>
    {ruleChanges.length ? <>
    <br></br>
        <h1 className="font-extrabold text-xl">Rule Changes</h1>
        {ruleChanges.map(e => <><br></br>- {e}</>)}
        <br></br>
    </> : ""}
    {levelPlacements.length ? <>
    <br></br>
        <h1 className="font-extrabold text-xl">Level Additions</h1>
        {levelPlacements.map(e => <><br></br>- {e}</>)}
        <br></br>
    </> : ""}
    {placementAdjustments.length ? <>
    <br></br>
        <h1 className="font-extrabold text-xl">Placement Adjustments</h1>
        {placementAdjustments.map(e => <><br></br>- {e}</>)}
        <br></br>
    </> : ""}
    {knockedOffLevels.length ? <>
    <br></br>
        <h1 className="font-extrabold text-xl">Level Removals</h1>
        {knockedOffLevels.map(e => <><br></br>- {e}</>)}
        <br></br>
    </> : ""}
    {other.length ? <>
    <br></br>
        <h1 className="font-extrabold text-xl">Other Changes</h1>
        {other.map(e => <><br></br>- {e}</>)}
        <br></br>
    </> : ""}
    <br></br>
    {extra}
    </div>
  )
}

export default ChangelogBox
