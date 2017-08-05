import React, { Component } from 'react';
import { Table } from 'semantic-ui-react'

import FeatureTitle from './FeatureTitle';

export default class FeatureTitleTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            "features": this.props.features || []
        }
        this.adjustOrder = this.adjustOrder.bind(this);
    }

    adjustOrder() {
        let features = this.state.features.slice();
        features.sort((f0, f1) => {
            return f0.count < f1.count;
        });
        this.setState({
            "features": features
        });
    }

    render() {
        let rows = [];
        this.state.features.forEach(feature => {
            rows.push(<FeatureTitle feature={feature} adjustOrder={this.adjustOrder} key={feature._id} />);
        });

        return (
            <Table basic='very'>
                <Table.Body>
                    {rows}
                </Table.Body>
            </Table>
        );
    }
}