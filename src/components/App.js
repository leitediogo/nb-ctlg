import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
//import {darken, fade, emphasize, lighten} from 'material-ui/utils/colorManipulator'
import { Router, Route, browserHistory } from 'react-router'
import agent from 'superagent'
import ProcessCatalogAppBar from './ProcessCatalogAppBar'
import ProcessCatalogCardList from './ProcessCatalogCardList'
import ProcessCatalogBottomNavigation from './ProcessCatalogBottomNavigation'
import ProcessCatalogEdit from './ProcessCatalogEdit'
import Wizard from './Wizard'
import EditProfile from './EditProfile'
import { requireAuth } from '../auth'

// Needed for onTouchTap
import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

const api_server_name = process.env.REACT_APP_API_SERVER_NAME
const api_server_port = process.env.REACT_APP_API_SERVER_PORT
let business_area_filter = 'All' //filtered by on screen

//pallete layout definition below
const muiTheme = getMuiTheme({
    //spacing: '200',
    fontFamily: 'Roboto, sans-serif',
    palette: {
        primary1Color: '#455A64',
        //primary2Color: 'green',
        //primary3Color: 'green',
        //accent1Color: 'green',
        //accent2Color: 'green',
        //accent3Color: 'green',
        //textColor: 'white',
        //alternateTextColor: 'white',
        //canvasColor: 'white',
        borderColor: '#0097A7',
        //disabledColor: 'green',
        //pickerHeaderColor: 'green',
        //clockCircleColor: fade('green', 0.07),
        //shadowColor: 'green',
    }
})

class App extends Component {

    constructor() {
        super()
        this.state = {
            filteredProcesses: [],
            allProcesses: [],
            showRightMenu: true
        }
        this.filterProcesses = this.filterProcesses.bind(this)
        this.hideRightMenu = this.hideRightMenu.bind(this)
        this.showRightMenu = this.showRightMenu.bind(this)
    }

    componentDidMount() {
        agent.get('http://' + api_server_name + ':' + api_server_port + '/api/Processes')
            .then(function (res) {
                this.setState({ allProcesses: res.body })
                this.setState({ filteredProcesses: res.body })
                console.log(this.state)
            }.bind(this));
    }

    hideRightMenu() {
        this.setState({ showRightMenu: false })
    }

    showRightMenu() {
        this.setState({ showRightMenu: true })
    }


    filterProcesses(filter, iconComponent) {
        console.log('Process Filter: ', filter)
        business_area_filter = filter //set filtered by on screen
        if (filter !== "All") {
            this.setState({
                filteredProcesses: this.state.allProcesses.filter(function (process) {
                    return process.definition.businessArea === filter
                })
            })
        } else {
            console.log('all')
            this.setState({
                filteredProcesses: this.state.allProcesses.filter(function (process) {
                    return process
                })
            })
        }
    }

    render() {
        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <div>
                    <ProcessCatalogAppBar filterProcesses={this.filterProcesses} showRightMenu={this.state.showRightMenu} />
                    <Router history={browserHistory}>
                        <Route path="/" component={() => (<ProcessCatalogCardList
                            processes={this.state.filteredProcesses}
                            filteredBy={business_area_filter}
                            hideRightMenu={this.hideRightMenu}
                            showRightMenu={this.showRightMenu}
                        />)} />
                        <Route onEnter={requireAuth}>
                            {/* Place all authenticated routes here */}
                            <Route path="/addProcess" component={Wizard} />
                            <Route path="/editProcess" component={ProcessCatalogEdit} />
                            <Route path="/profile/edit" component={EditProfile} />
                        </Route>
                    </Router>
                    <ProcessCatalogBottomNavigation />
                </div>
            </MuiThemeProvider>
        )
    }
}

export default App