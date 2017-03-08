import React, { Component } from 'react'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'
import { browserHistory } from 'react-router'

const styles = {
    floatButton: {
        margin: 12,
        marginRight: 20,
        marginLeft: 20,
        position: "fixed",
        bottom: "8%",
        right: "1%",
        backgroundColor: '#0097A7'
    }
}

class ProcessCatalogAddFloatingButton extends Component {

    addProcess() {
        browserHistory.push('/addProcess')
        this.props.hideRightMenu()
    }

    render() {
        return (
            <FloatingActionButton style={styles.floatButton} onClick={this.addProcess.bind(this)}>
                <ContentAdd />
            </FloatingActionButton>
        )
    }
}

export default ProcessCatalogAddFloatingButton