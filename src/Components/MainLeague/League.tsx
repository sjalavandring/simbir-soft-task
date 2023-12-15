import React from 'react'
import { NavLink } from "react-router-dom";
import LeagueMatches from '../Matches/LeagueMatches';

export default function League() {
  return (
    <main className="main league">
        <LeagueMatches />
    </main>
  )
}
