import React from 'react'
import { Component } from 'react'
import ProcessCatalogCard from './ProcessCatalogCard'
import ProcessCatalogAddFloatingButton from './ProcessCatalogAddFloatingButton'
import { connectProfile } from '../auth'
import InsertChart from 'material-ui/svg-icons/editor/insert-chart'

const styles = {
    icon: {
        width: 200,
        height: 200,
        color: '#455A64'
    },
    iconDiv: {
        textAlign: 'center',
        position: 'absolute',
        //border: '1px solid #131313',
        top: '25%',
        left: '25%',
        bottom: '25%',
        right: '25%'
    },
    cardDiv: {
        margin: 20,
        textAlign: 'center'
    },
    filteredByStyle: {
        textAlign: 'center',
        position: 'absolute',
        top: '15%',
        left: '25%',
        right: '25%'
    }
}

class ProcessCatalogCardList extends Component {

    render() {
        const { profile } = this.props
        let cards = [];
        for (var i = 0; i < this.props.processes.length; i++) {
            cards.push(
                <ProcessCatalogCard process={this.props.processes[i]} key={i} />
            )
        }
        return (
            <div>
                <div style={styles.filteredByStyle}>Filtered by : {this.props.filteredBy}</div>
                <br />
                <br />
                <br />
                {(cards.length === 0) ? <div style={styles.iconDiv}><InsertChart style={styles.icon} /></div> : <div style={styles.cardDiv}>{cards}</div>}
                {(profile) ? <ProcessCatalogAddFloatingButton hideRightMenu={this.props.hideRightMenu} showRightMenu={this.props.showRightMenu} /> : ''}
                <br />
                <br />
                <br />
            </div>
        )
    }
}

export default connectProfile(ProcessCatalogCardList)