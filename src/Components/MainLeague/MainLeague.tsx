import React, {useState, useEffect} from 'react'
import axios from 'axios';
import searchIcon from "../../img/search-icon.png"
import {NavLink} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import Paginator from '../Paginator/Paginator';
import { RootStateType } from '../../store/store';

export default function MainLeague() {
  const dispatch = useDispatch()
  const currentLeaguesPage = useSelector((state: RootStateType) => state.pagesInfoReducer.leaguesPage)
  const [leaguesInfo, setLeguesInfo] = useState<any>([])
  const [maxPagesCount, setMaxPagesCount] = useState<number>(1)
  const maxElementsOnPage = 15;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/v4/competitions`, {
          headers: {
            'X-Auth-Token': process.env.REACT_APP_API_KEY,
          },
        });

        setLeguesInfo(response.data.competitions.slice(((currentLeaguesPage) * maxElementsOnPage) , (currentLeaguesPage + 1) * maxElementsOnPage))
        
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [currentLeaguesPage]);

  useEffect(() => {
      const fetchData = async () => {
          try {
              const response = await axios.get(`/v4/competitions`, {
                  headers: {
                      'X-Auth-Token': process.env.REACT_APP_API_KEY,
                  },
              });

              console.log(response.data)
              setMaxPagesCount(Math.ceil(response.data.count / maxElementsOnPage))
              console.log(maxPagesCount)
          } catch (error: any) {
              if (error.message == 'Request failed with status code 429') {
                  alert('Слишеом много запросов! Подождите')
              }
          }
      };

      fetchData();
  }, []);

  const onPageChange = (newPage: number) => {
      if ((newPage >= 0) && (newPage < maxPagesCount) && (newPage != currentLeaguesPage)) {
          console.log(`Switched to page ${newPage + 1}`);
          dispatch({ type: "changeLeaguesPageTo", newPage: newPage });
      }
  };

  return (
    <main className="main main-leagues">
        <div className="main-leagues-content container">
            <div className="main-search">
                <input className="main-search__field" type="text" placeholder="Поиск" />
                <img className="main-search__icon" src={searchIcon} alt="serachIcon" />
            </div>
            <div className="main-leagues__list">
                {
                  leaguesInfo.map((league: any, index: any) => 
                    <NavLink className="main-leagues__element" to={"league/" + league.id} key={league.id} onClick={() => {dispatch({type: "changeCurrentLeagueId", newLeagueId: league.id})}}>
                      <h3 className="main-leagues__name">{league.name}</h3>
                      <div className="main-leagues__country">{league.area.name}</div>
                    </NavLink>
                  )
                }
            </div>
        </div>

        <Paginator pageCount={maxPagesCount} currentPage={currentLeaguesPage} onPageChange={onPageChange} />
    </main>
  )
}
