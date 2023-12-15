import React, {useState, useEffect} from 'react'
import axios from 'axios';
import searchIcon from "../../img/search-icon.png"
import { NavLink} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { RootStateType } from '../../store/store';
import Paginator from '../Paginator/Paginator';
import { useDebounce } from '@uidotdev/usehooks';

export default function MainTeams() {
    const dispatch = useDispatch()
    const teamsSearchFilter = useSelector((state: RootStateType) => state.searchInfoReducer.teamsSearchFilter)
    const currentTeamsPage = useSelector((state: RootStateType) => state.pagesInfoReducer.teamsPage)
    
    const [teamsInfo, setTeamsInfo] = useState([]) //Информация о лигах, которую получаем запросм на api
    const [maxPagesCount, setMaxPagesCount] = useState<number>(1) //Общее число страниц

    const debouncedFilter = useDebounce(teamsSearchFilter, 500) //Задержка перед обновлением фильтра

    useEffect(() => {
        //Если фильтра нет, запрашиваем по 30 элементов, если есть, запрашиваем весь массив, фильтруем, и выводим только элементы, соответствующие нужной странице
        const fetchData = async () => {
            if ( teamsSearchFilter == '')
                try {
                    const response = await axios.get(`/v4/teams?limit=30&offset=${(currentTeamsPage) * 30}`, {
                        headers: {
                            'X-Auth-Token': process.env.REACT_APP_API_KEY,
                        },
                    });

                    //На каждой странице получаем 30 элементов для отображения начиная с номера страницы * 30
                    setTeamsInfo(response.data.teams) //Устанавливаем информацию о командах
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            else if ( teamsSearchFilter != '') {
                try {
                    console.log(1)
                    const response = await axios.get(`/v4/teams?limit=10000`, {
                        headers: {
                            'X-Auth-Token': process.env.REACT_APP_API_KEY,
                        },
                    });
    
                    const filteredElements = response.data.teams.filter((item: any) => item.name.toLowerCase().includes(teamsSearchFilter.toLowerCase()));
                    setTeamsInfo(filteredElements.slice(currentTeamsPage * 30, (currentTeamsPage + 1) * 30))
                    setMaxPagesCount(Math.ceil(filteredElements.length / 30))
                } catch (error: any) {
                    if (error.message == 'Request failed with status code 429') {
                        alert('Слишеом много запросов! Подождите')
                    }
                }
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
    }, []);  //При первой загрузке высчитываем общее число страниц

    
    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log(1)
                const response = await axios.get(`/v4/teams?limit=10000`, {
                    headers: {
                        'X-Auth-Token': process.env.REACT_APP_API_KEY,
                    },
                });

                const filteredElements = response.data.teams.filter((item: any) => item.name.toLowerCase().includes(teamsSearchFilter.toLowerCase()));
                setTeamsInfo(filteredElements.slice(currentTeamsPage * 30, (currentTeamsPage + 1) * 30))
                setMaxPagesCount(Math.ceil(filteredElements.length / 30))
            } catch (error: any) {
                if (error.message == 'Request failed with status code 429') {
                    alert('Слишеом много запросов! Подождите')
                }
            }
        };

        fetchData();
    }, [debouncedFilter]) //Фильтрация

    const onPageChange = (newPage: number) => {
        if ((newPage >= 0) && (newPage < maxPagesCount) && (newPage != currentTeamsPage)) {
            console.log(`Switched to page ${newPage + 1}`);
            dispatch({ type: "changeTeamsPageTo", newPage: newPage });
        }
    }; //Изменение текуей страницы с командами в пагинаторе

    return (
        <main className="main main-teams">
            <div className="main-teams-content container">
                <div className="main-search">
                    <input className="main-search__field" type="text" placeholder="Поиск" onChange={(e) => ( dispatch({type: "changeTeamsFilter", newFilter: e.target.value}))}/>
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
