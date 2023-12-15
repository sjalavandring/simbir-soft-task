import { combineReducers, createStore} from 'redux'

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

type RootStateType = {
    pagesInfoReducer: PagesInfoType,
    teamsInfoReducer: TeamsInfoType,
    leaguesInfoReducer: LeaguesInfoType,
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
}

let teamsInfoReducer = (state = teamsInfo, action: {type: string, newTeamId: number},) => {
    switch (action.type) {
        case "changeCurrentTeamId":
            return {...pagesInfo, currentTeamId: action.newTeamId}
        default: 
            return state
    }
}

let leaguesInfoReducer = (state = leaguesInfo, action: {type: string, newLeagueId: number},) => {
    switch (action.type) {
        case "changeCurrentLeagueId": 
        console.log(action.newLeagueId)
            return {...pagesInfo, currentLeagueId: action.newLeagueId}
        default: 
            return state
    }
}

const rootReducer = combineReducers({pagesInfoReducer, teamsInfoReducer, leaguesInfoReducer})

const store = createStore(rootReducer)

export type {RootStateType}

export {store}