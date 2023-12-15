import React, { useState } from 'react'

export default function Match({matchesInfo} : any) {
  return (
    <ul className="matches-list">
      {
        matchesInfo.map((match: any, index: number) => 
            <li className="matches-list__match">
                <div className="match-date match-info">{new Date(match.utcDate).toLocaleString()}</div>
                <div className="match-status match-info">{match.status}</div>
                <div className="match-team-a match-info">{match.homeTeam.name}</div>
                <div className="match-info">-</div>
                <div className="match-team-b match-info">{match.awayTeam.name}</div>
                <div className="match-score match-info">
                  {
                    match.score.fullTime.home !== null && match.score.fullTime.away !== null &&
                    <>
                      {match.score.fullTime.home} : {match.score.fullTime.away}
                    </>
                  }

                  {
                  match.score.halfTime.home !== null && match.score.halfTime.away !== null &&
                    <>
                      ({match.score.halfTime.home} : {match.score.halfTime.away})
                    </>
                  }
                  {
                      match.score.penalties ? 
                      <>
                        ({match.score.penalties.home} : {match.score.penalties.away})
                      </> : null
                  }
                </div>
            </li>
        )
      }
    </ul>
  )
}
