import React, {useState, useEffect} from 'react'
import axios from 'axios';
import searchIcon from "../../img/search-icon.png"
import { NavLink} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { RootStateType } from '../../store/store';
import Paginator from '../Paginator/Paginator';

export default function MainTeams() {
    const dispatch = useDispatch()
    const currentTeamPage = useSelector((store: RootStateType) => store.pagesInfoReducer.teamsPage)
    const [teamsInfo, setTeamsInfo] = useState([])

    useEffect(() => {
        // const currentPath = window.location.pathname
        // const teamIdFromPath = currentPath.split('/teams/')[1];
        // dispatch({type: 'changeTeamsPageTo', newPage: teamIdFromPath})
        // console.log(currentPath, currentTeamPage)

        const fetchData = async () => {
            try {
                const response = await axios.get(`/v4/teams?limit=30&offset=${(currentTeamPage) * 30}`, {
                    headers: {
                    'X-Auth-Token': process.env.REACT_APP_API_KEY,
                    },
                });

                // console.log(response.data.teams);
                setTeamsInfo(response.data.teams)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [currentTeamPage]);

    const onPageChange = (newPage: number) => {
        console.log(`Switched to page ${newPage}`);
        // Тут вычитаем 1 из newPage, чтобы согласовать с индексацией, начинающейся с 0 в Paginator
        dispatch({ type: "changeTeamsPageTo", newPage: newPage });
    };

    return (
        <main className="main main-teams">
            <div className="main-teams-content container">
                <div className="main-search">
                    <input className="main-search__field" type="text" placeholder="Поиск"/>
                    <img className="main-search__icon" src={searchIcon} alt="serachIcon" />
                </div>
                <div className="main-teams__list">
                    {
                        teamsInfo.map((team: any, index) => 
                            <NavLink className="main-teams__element" to={'team/' + team.id} onClick={() => {dispatch({type: "changeCurrentTeamId", newTeamId: team.id})}}>
                                <h3 className="main-teams__name">{team.name}</h3>
                                <img className="main-teams__image" src={team.crest} alt={team.name} />
                            </NavLink>
                        )
                    }
                </div>
                <Paginator pageCount={10} currentPage={currentTeamPage} onPageChange={onPageChange} />
            </div>
        </main>
    )
}
