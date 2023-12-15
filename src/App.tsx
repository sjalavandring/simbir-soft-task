import React from 'react';
import './App.scss';
import Header from './Components/Header/Header';
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import MainLeague from './Components/MainLeague/MainLeague';
import MainTeams from './Components/MainTeams/MainTeams';
import NotFound from './Components/NotFound/NotFound';
import League from './Components/MainLeague/League';
import Team from './Components/MainTeams/Team';

function App() {
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path='/' element={<Navigate to="leagues/page=:page" />} />
        <Route path='leagues/:page' element={<MainLeague />}/>
        <Route path='leagues/:page/league/*' element={<League />} />
        <Route path='teams/' element={<MainTeams />}/>
        <Route path='teams/:page' element={<MainTeams />}/>
        <Route path='teams/:page/team/*' element={<Team />}/>
        <Route path='/*' element={<NotFound/>} /> {/*Если страница по адресу не определена, отображается NotFound страница*/}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
