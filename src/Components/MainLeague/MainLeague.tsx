import React, {useState, useEffect} from 'react'
import axios from 'axios';
import searchIcon from "../../img/search-icon.png"
import {NavLink} from "react-router-dom";
import { useDispatch } from 'react-redux';
import Paginator from '../Paginator/Paginator';

export default function MainLeague() {
  const dispatch = useDispatch()
  const [leaguesInfo, setLeguesInfo] = useState<any>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/v4/competitions`, {
          headers: {
            'X-Auth-Token': process.env.REACT_APP_API_KEY,
          },
        });

        console.log(response.data);
        setLeguesInfo(response.data.competitions)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const [currentPage, setCurrentPage] = useState(0);

  const onPageChange = (newPage: number) => {
    console.log(`Switched to page ${newPage}`);
    setCurrentPage(newPage);
  };

  const onNextPage = () => {
    console.log('Next page clicked');
    setCurrentPage((prevPage) => Math.min(prevPage + 1, 10 - 1)); // Обновление текущей страницы
  };

  const onPrevPage = () => {
    console.log('Previous page clicked');
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 0)); // Обновление текущей страницы
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

        <Paginator pageCount={10} currentPage={currentPage} onPageChange={onPageChange} />
    </main>
  )
}
