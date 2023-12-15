import React, { useState } from 'react'

export default function Match({matchInfo} : any) {
  return (
      <React.Fragment>
        <li className="matches-list__match" key={matchInfo.id}>
            <div className="match-date match-info">{new Date(matchInfo.utcDate).toLocaleString()}</div>
            <div className="match-status match-info">{matchInfo.status}</div>
            <div className="match-team-a match-info">{matchInfo.homeTeam.name}</div>
            <div className="match-info">-</div>
            <div className="match-team-b match-info">{matchInfo.awayTeam.name}</div>
            <div className="match-score match-info">
              {
                matchInfo.score.fullTime.home !== null && matchInfo.score.fullTime.away !== null &&
                <>
                  {matchInfo.score.fullTime.home} : {matchInfo.score.fullTime.away}
                </>
              }

              {
              matchInfo.score.halfTime.home !== null && matchInfo.score.halfTime.away !== null &&
                <>
                  ({matchInfo.score.halfTime.home} : {matchInfo.score.halfTime.away})
                </>
              }
              {
                  matchInfo.score.penalties ? 
                  <>
                    ({matchInfo.score.penalties.home} : {matchInfo.score.penalties.away})
                  </> : null
              }
            </div>
        </li>
      </React.Fragment>
  )
}
