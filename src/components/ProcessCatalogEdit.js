
import React, { Component } from 'react'
import agent from 'superagent'
import FlatButton from 'material-ui/FlatButton'
import { browserHistory } from 'react-router'
import { connectProfile } from '../auth'
import WizardIdentification from './WizardIdentification'
import WizardFlow from './WizardFlow'
import WizardSupervisor from './WizardSupervisor'
import WizardNotifications from './WizardNotifications'
import WizardScheduler from './WizardScheduler'

const api_server_name = process.env.REACT_APP_API_SERVER_NAME
const api_server_port = process.env.REACT_APP_API_SERVER_PORT

const styles = {
    section: {
        position: 'absolute',
        left: '15%',
        right: '15%'
    }
}

class ProcessCatalogEdit extends Component {

    constructor(props, context) {
        console.log('ProcessCatalogEdit::constructor')
        super(props, context)
        this.state = {
            definition: this.props.location.state.process.definition
        }
        console.log(this.props.location.state.process.definition)
        console.log(this.state.definition)
    }

    handleInputChange = (e) => {
        let change = this.state
        change.definition[e.target.id] = e.target.value
        this.setState(change)
        console.log(this.state)
    }

    handleCheckChange = (e) => {
        let change = this.state
        if (change.definition[e.target.id] === false)
            change.definition[e.target.id] = true
        else
            change.definition[e.target.id] = false
        this.setState(change)
        console.log(this.state)
    }

    //TODO: Generalize selects per name
    handleDefinitionTypeChange = (event, index, value) => {
        let change = this.state
        change.definition.type = value
        this.setState(change)
        console.log(this.state)
    }

    //TODO: Generalize selects per name
    handleDefinitionBusinessAreaChange = (event, index, value) => {
        let change = this.state
        change.definition.businessArea = value
        this.setState(change)
        console.log(this.state)
    }

    //TODO: Generalize selects per name
    handleDefinitionScheduleTypeChange = (event, index, value) => {
        let change = this.state
        change.definition.scheduleType = value
        this.setState(change)
        console.log(this.state)
    }

    handleSaveFlow(name, type, cutoff1, cutoff2) {
        //get max order from array flow
        let orderArray = this.state.definition.flow.map(function (flow) {
            return flow.order
        })
        let maxOrder = 0
        if (orderArray.length !== 0)
            maxOrder = Math.max.apply(null, orderArray)
        //set state
        let change = this.state
        let stepToPush = {
            order: maxOrder + 1,
            type: type,
            name: name,
            cutoff1: cutoff1,
            cutoff2: cutoff2
        }
        change.definition.flow.push(stepToPush)
        this.setState(change)
    }

    handleSaveSupervisor(name, func) {
        let change = this.state
        let supervisorToPush = {
            funtion: func,
            name: name
        }
        change.definition.supervisorTeam.push(supervisorToPush)
        this.setState(change)
    }

    updateProcess() {
        console.log('updating process!')
        let change = this.state
        this.setState(change)
        let id = this.props.location.state.process.id//Get process id for put
        agent.put('http://' + api_server_name + ':' + api_server_port + '/api/processes/' + id)
            .send({
                name: this.state.definition.name,
                definition: this.state.definition
            })
            .set('Accept', 'application/json')
            .end(function (err, res) {
                if (err || !res.ok) {
                    console.error(err);
                } else {
                    console.log('yay! process updated ' + JSON.stringify(res.body));
                }
            })
    }

    handleExit() {
        browserHistory.push('/')
    }

    handleUpdate = () => {
        this.updateProcess()
        browserHistory.push('/')
        //window.location.reload()
    }

    render() {
        return (
            <div style={styles.section}>
                <br />
                <b>Identification</b>
                <hr />
                <div>
                    <WizardIdentification
                        definition={this.state.definition}
                        handleInputChange={this.handleInputChange.bind(this)}
                        handleDefinitionBusinessAreaChange={this.handleDefinitionBusinessAreaChange.bind(this)}
                        handleDefinitionTypeChange={this.handleDefinitionTypeChange.bind(this)}
                    />
                </div>
                 <b>Flow</b>
                <hr />
                <div>
                    <WizardFlow
                        definition={this.state.definition}
                        handleSaveFlow={this.handleSaveFlow.bind(this)}
                    />
                </div>
                 <b>Supervisor</b>
                <hr />
                <div>
                    <WizardSupervisor
                        definition={this.state.definition}
                        handleSaveSupervisor={this.handleSaveSupervisor.bind(this)}
                    />
                </div>
                 <b>Notifications</b>
                <hr />
                <div>
                    <WizardNotifications
                        definition={this.state.definition}
                        handleCheckChange={this.handleCheckChange.bind(this)}
                    />
                </div>
                 <b>Scheduler</b>
                <hr />
                <div>
                    <WizardScheduler
                        definition={this.state.definition}
                        handleDefinitionScheduleTypeChange={this.handleDefinitionScheduleTypeChange.bind(this)}
                    />
                </div>
                <FlatButton label="Update" onTouchTap={this.handleUpdate} />
                <FlatButton label="Exit" onTouchTap={this.handleExit} />
                <br />
                <br />
                <br />
                <br />
            </div >
        )
    }
}

export default connectProfile(ProcessCatalogEdit)