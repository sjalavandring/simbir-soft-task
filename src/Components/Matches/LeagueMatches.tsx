import React, {useState, useEffect} from 'react'
import axios from 'axios';
import Match from './Match'
import { useDispatch, useSelector } from 'react-redux';
import { RootStateType } from '../../store/store';

//Компонент высшего порядка, возвращающий 
export default function LeagueMatches() {
    const currentleaguePage = useSelector((store: RootStateType) => store.leaguesInfoReducer.currentLeagueId)
    const [matchesInfo, setMatchesInfo] = useState([])
    const [startDate, setStartDate] = useState<string | undefined>();
    const [endDate, setEndDate] = useState<string | undefined>('');

    // useEffect(() => {
    //     console.log(currentleaguePage)
    // }, [currentleaguePage])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`/v4/competitions/${currentleaguePage}/matches`, {
                    headers: {
                    'X-Auth-Token': process.env.REACT_APP_API_KEY,
                    },
                });

                // console.log(response.data);
                setMatchesInfo(response.data.matches);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (startDate && endDate) {
          const fetchData = async () => {
            try {
              const response = await axios.get(`/v4/competitions/${currentleaguePage}/matches?dateFrom=${startDate}&dateTo=${endDate}`, {
                headers: {
                  'X-Auth-Token': process.env.REACT_APP_API_KEY,
                },
              });
              
              console.log(response.data.matches)
              setMatchesInfo(response.data.matches);
            } catch (error) {
              console.error('Error fetching data:', error);
            }
          };
      
          fetchData();
        }
    }, [startDate, endDate]);

    let breadcrumbsPath = `Лига/Название Лиги`.split('/')
    return (
        <div className="matches-content container">
            <div className="breadcrumbs">

                {breadcrumbsPath.map((item: string, index: number) => (
                    index < breadcrumbsPath.length - 1 ?
                    <React.Fragment>
                        <div className="breadcrumbs__item">{item}</div>
                        <div className="breadcrumbs__item">&gt;</div>
                    </React.Fragment> :
                    <div className="breadcrumbs__item">{item}</div>
                ))}

            </div>
            <div className="matches">

                <h2 className="matches-title">Матчи</h2>
                <div className="matches-date">
                    <label htmlFor="startDate">с</label>
                    <input id="startDate" className="date__date-picker" type="date" onChange={(event: React.ChangeEvent<HTMLInputElement>) => setStartDate(event.target.value)}/>

                    <label htmlFor="endDate">по</label>
                    <input id="endDate" className="date__date-picker" type="date" onChange={(event: any) =>  setEndDate(event.target.value)}/>
                </div>

                <Match matchesInfo={matchesInfo}/>

            </div>
        </div>
    )
}

