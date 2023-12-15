import React, {useState, useEffect} from 'react'
import axios from 'axios';
import searchIcon from "../../img/search-icon.png"
import { NavLink} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { RootStateType } from '../../store/store';
import Paginator from '../Paginator/Paginator';

export default function MainTeams() {
    const dispatch = useDispatch()
    const currentTeamsPage = useSelector((state: RootStateType) => state.pagesInfoReducer.teamsPage)
    const [teamsInfo, setTeamsInfo] = useState([])
    const [maxPagesCount, setMaxPagesCount] = useState<number>(1)

    useEffect(() => {
        // const currentPath = window.location.pathname
        // const teamIdFromPath = currentPath.split('/teams/')[1];
        // dispatch({type: 'changeTeamsPageTo', newPage: teamIdFromPath})
        // console.log(currentPath, currentTeamPage)

        const fetchData = async () => {
            try {
                const response = await axios.get(`/v4/teams?limit=30&offset=${(currentTeamsPage) * 30}`, {
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
    }, [currentTeamsPage]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`/v4/teams?limit=10000`, {
                    headers: {
                        'X-Auth-Token': process.env.REACT_APP_API_KEY,
                    },
                });

                setMaxPagesCount(Math.ceil(response.data.count / 30))
            } catch (error: any) {
                if (error.message == 'Request failed with status code 429') {
                    alert('Слишеом много запросов! Подождите')
                }
            }
        };

        fetchData();
    }, []);

    const onPageChange = (newPage: number) => {
        if ((newPage >= 0) && (newPage < maxPagesCount) && (newPage != currentTeamsPage)) {
            console.log(`Switched to page ${newPage + 1}`);
            dispatch({ type: "changeTeamsPageTo", newPage: newPage });
        }
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
                            <NavLink className="main-teams__element" to={'team/' + team.id} key={team.id} onClick={() => {dispatch({type: "changeCurrentTeamId", newTeamId: team.id})}}>
                                <h4 className="main-teams__name">{team.name}</h4>
                                <img className="main-teams__image" src={team.crest} alt={team.name} />
                            </NavLink>
                        )
                    }
                </div>
                <Paginator pageCount={maxPagesCount} currentPage={currentTeamsPage} onPageChange={onPageChange} />
            </div>
        </main>
    )
}
