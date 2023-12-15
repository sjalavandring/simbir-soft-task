import React from 'react'
import logo from '../../img/logo.png'
import {NavLink} from "react-router-dom";
import { useSelector } from 'react-redux';
import { RootStateType } from '../../store/store';

export default function Header() {
  const currentTeamPage = useSelector((store: RootStateType) => store.teamsInfoReducer.currentTeamId)
  const currentLeaguePage= useSelector((store: RootStateType) => store.leaguesInfoReducer.currentLeagueId)

  return (
    <header className="header">
        <div className="header-content container">
            <div className="header__logo">
              <NavLink to="/"><img className="header__logo-image" src={logo} alt="logo" /></NavLink>
              {/* Лого ведет на главную страницу */}
            </div>
            <nav className="header__nav-menu">
                <NavLink className="header__nav-menu-item" to={"/leagues/" + currentLeaguePage}>Лиги</NavLink>
                <NavLink className="header__nav-menu-item" to={"/teams/" + currentTeamPage}>Команды</NavLink>
            </nav>
        </div>
    </header>
  )
}
