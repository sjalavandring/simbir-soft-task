import React, {useState, useEffect} from 'react'
import axios from 'axios';
import searchIcon from "../../img/search-icon.png"
import {NavLink} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import Paginator from '../Paginator/Paginator';
import { RootStateType } from '../../store/store';
import { useDebounce } from '@uidotdev/usehooks';

export default function MainLeague() {
  const dispatch = useDispatch()
  const currentLeaguesPage = useSelector((state: RootStateType) => state.pagesInfoReducer.leaguesPage)  //Число страниц, на которые разделены все лиги
  const leaguesSeacrhFilter = useSelector((state: RootStateType) => state.searchInfoReducer.leaguesSearchFilter) //Фильтр для поиска по лигам, получаем из поля поиска

  const [leaguesInfo, setLeguesInfo] = useState<any>([]) //Информация о лигах, которую получаем запросм на api
  const [maxPagesCount, setMaxPagesCount] = useState<number>(1) //Максимальное число страниц, на которое разделены все лиги. Нужно для Правильного от ображения пагинатора

  const maxElementsOnPage = 15;  //максимальное число лиг на одной странице
  const debouncedFilter = useDebounce(leaguesSeacrhFilter, 500) //Значение фильтра обновляется не сразу, а только если оно не обновляется снова за 1000ms, чтобы не отправлять лишние запросы

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/v4/competitions`, {
          headers: {
            'X-Auth-Token': process.env.REACT_APP_API_KEY, //Ключ api хранится в окружении
          },
        });

        setLeguesInfo(response.data.competitions.slice(((currentLeaguesPage) * maxElementsOnPage) , (currentLeaguesPage + 1) * maxElementsOnPage))
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [currentLeaguesPage]);  //Api не предоставляет иструментов, чтобы получать информацию по частям, поэтому каждый раз когда обновляется страницы
  //отправляем запрос к api, получаем их все и выбираем только те, которые сответствуют текущим страницам

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
              // if (error.message == 'Request failed with status code 429') {
              //     alert('Слишеом много запросов! Подождите')
              // }
          }
      };

      fetchData();
  }, []); //При первой загрузке страницы рассчитываем общее число страниц, необходимое, чтобы поместить все данные с api



  useEffect(() => {
    const fetchData = async () => {
        try {
            console.log(1)
            const response = await axios.get(`/v4/competitions`, {
                headers: {
                    'X-Auth-Token': process.env.REACT_APP_API_KEY,
                },
            });

            const filteredElements = response.data.competitions.filter((item: any) => item.name.toLowerCase().includes(leaguesSeacrhFilter.toLowerCase())); //Получаем данные с api и фильтруем их по соответствии между именем лиги и фильтром лиг
            setLeguesInfo(filteredElements)
            setMaxPagesCount(Math.ceil(filteredElements.length / maxElementsOnPage)) //Перерасчитываем число страниц на основании отфильтрованных данных
        } catch (error: any) {
            if (error.message == 'Request failed with status code 429') {
                alert('Слишеом много запросов! Подождите')
            }
        }
    };

    fetchData();
  }, [debouncedFilter])  



  const onPageChange = (newPage: number) => {
      if ((newPage >= 0) && (newPage < maxPagesCount) && (newPage != currentLeaguesPage)) {
          console.log(`Switched to page ${newPage + 1}`);
          dispatch({ type: "changeLeaguesPageTo", newPage: newPage });
      }
  }; //Функция для пагинатора, которая меняет текущую страницу лиги

  return (
    <main className="main main-leagues">
        <div className="main-leagues-content container">
            <div className="main-search">
                <input className="main-search__field" type="text" placeholder="Поиск" onChange={(e) => ( dispatch({type: "changeLeaguesFilter", newFilter: e.target.value}))}/>
                <img className="main-search__icon" src={searchIcon} alt="serachIcon" />
            </div>
            {/*Поле поиска*/}
            <div className="main-leagues__list">
                {
                  leaguesInfo.map((league: any, index: any) => 
                    <NavLink className="main-leagues__element" to={"league/" + league.id} key={league.id} onClick={() => {dispatch({type: "changeCurrentLeagueId", newLeagueId: league.id})}}> {/*Меняем номер страницы при переходе по ссылке*/}
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
