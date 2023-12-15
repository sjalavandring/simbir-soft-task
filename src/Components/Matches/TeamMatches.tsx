import React, {useState, useEffect} from 'react'
import axios from 'axios';
import Match from './Match'
import { useDispatch, useSelector } from 'react-redux';
import { RootStateType } from '../../store/store';

//Компонент высшего порядка, возвращающий 
export default function TeamMatches() {
    const currentTeamPage = useSelector((store: RootStateType) => store.teamsInfoReducer.currentTeamId)
    const [matchesInfo, setMatchesInfo] = useState([])
    const [startDate, setStartDate] = useState<string | undefined>();
    const [endDate, setEndDate] = useState<string | undefined>('');
    const [dataLoadingStatus, setLoadingStatus] = useState<string>('Данные загружаются')

    useEffect(() => {
        console.log(currentTeamPage)
    }, [currentTeamPage])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`/v4/teams/${currentTeamPage}/matches`, {
                    headers: {
                    'X-Auth-Token': process.env.REACT_APP_API_KEY,
                    },
                });

                console.log(response.data)
                setMatchesInfo(response.data.matches);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoadingStatus('Нет доступа к данным')
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (startDate && endDate) {
          const fetchData = async () => {
            try {
              const response = await axios.get(`/v4/teams/${currentTeamPage}/matches/?dateFrom=${startDate}&dateTo=${endDate}`, {
                headers: {
                  'X-Auth-Token': process.env.REACT_APP_API_KEY,
                },
              });
              
            //   console.log(response.data)
              setMatchesInfo(response.data.matches);
            } catch (error) {
              console.error('Error fetching data:', error);
            }
          };
      
          fetchData();
        }
    }, [startDate, endDate]);

    let breadcrumbsPath = "Команды/Название команды".split('/')
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
                {
                    matchesInfo.length > 0 ? <Match matchesInfo={matchesInfo} /> : <div>{dataLoadingStatus}</div>
                }
            </div>
        </div>
    )
}
