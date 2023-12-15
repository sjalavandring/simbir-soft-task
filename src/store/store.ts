import { combineReducers, createStore} from 'redux'

//Разделить редюсеры по файлам

type PagesInfoType = {
    teamsPage: number,
    leaguesPage: number,
    teamPage: number,
    leaguePage: number,
}

type TeamsInfoType = {
    currentTeamId: number,
}

type LeaguesInfoType = {
    currentLeagueId: number,
}

type searchInfoType = {
    teamsSearchFilter: string,
    leaguesSearchFilter: string,
}

type RootStateType = {
    pagesInfoReducer: PagesInfoType,
    teamsInfoReducer: TeamsInfoType,
    leaguesInfoReducer: LeaguesInfoType,
    searchInfoReducer: searchInfoType,
}



let pagesInfo: PagesInfoType = {
    teamsPage: 0,
    leaguesPage: 0,
    teamPage: 0,
    leaguePage: 0,
}

let teamsInfo: TeamsInfoType = {
    currentTeamId: 1,
}

let leaguesInfo: LeaguesInfoType = {
    currentLeagueId: 2013,
}

let searchInfo: searchInfoType = {
    teamsSearchFilter: '',
    leaguesSearchFilter: '',
}


let pagesInfoReducer = (state = pagesInfo, action: {type: string, newPage: number},) => {
    switch (action.type) {
        case "changeTeamsPageTo": 
            return {...pagesInfo, teamsPage: action.newPage}
        case "changeLeaguesPageTo": 
            return {...pagesInfo, leaguesPage: action.newPage}
        case "changeLeagueListPageTo": 
            return {...pagesInfo, leaguePage: action.newPage}
        case "changeTeamListPageTo": 
            return {...pagesInfo, teamPage: action.newPage}
        default: 
            return state
    }
} //Редючер для управления Текущей странице Лиг, Команд, Игр лиги и Игр команды

let teamsInfoReducer = (state = teamsInfo, action: {type: string, newTeamId: number},) => {
    switch (action.type) {
        case "changeCurrentTeamId":
            return {...teamsInfo, currentTeamId: action.newTeamId}
        default: 
            return state
    }
} //Id команды, на страницу которой выполняется переход

let leaguesInfoReducer = (state = leaguesInfo, action: {type: string, newLeagueId: number},) => {
    switch (action.type) {
        case "changeCurrentLeagueId": 
            return {...leaguesInfo, currentLeagueId: action.newLeagueId}
        default: 
            return state
    }
}

let searchInfoReducer = (state = searchInfo, action: {type: string, newFilter: 'string'}) => {
    switch (action.type) {
        case "changeTeamsFilter": 
            return {...searchInfo, teamsSearchFilter: action.newFilter}
        case "changeLeaguesFilter": 
            return {...searchInfo, leaguesSearchFilter: action.newFilter}
        default: 
            return state
    }
} //Фильтры для строки поиска в разделе Команды и Лиги соответственно

const rootReducer = combineReducers({pagesInfoReducer, teamsInfoReducer, leaguesInfoReducer, searchInfoReducer}) 

const store = createStore(rootReducer)

export type {RootStateType} //Общий тип для store

export {store}