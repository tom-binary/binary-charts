import React, { Component, PropTypes } from 'react';
import Highcharts from 'Highcharts/Highstock';
import * as BinaryTypes from './BinaryTypes';
import initChart from './configurator/initChart';
// import { fullConfig } from './configurator';
import { shouldUpdateChart } from './updater';

import spotIndicator from './plugins/spotIndicator';
// import tradeMarker from './plugins/tradeMarker';
import theme from './theme/';

// workaround for tests to work
if (Object.keys(Highcharts).length > 0) {
    // spotIndicator();
// tradeMarker();
    Highcharts.setOptions(theme);
}

export default class BinaryChart extends Component {

    static propTypes = {
        symbol: PropTypes.string,
        ticks: BinaryTypes.tickArray,
        contract: BinaryTypes.contractOrTrade,
        trade: BinaryTypes.contractOrTrade,
    };

    static defaultProps = {
        ticks: [],
    };

    componentDidMount() {
        const config = initChart(this.props);
        config.chart.renderTo = this.refs.chart;
        this.chart = new Highcharts.Chart(config);
        shouldUpdateChart(this.chart, { ticks: this.props.ticks }, this.props);
    }

    shouldComponentUpdate(nextProps) {
        shouldUpdateChart(this.chart, this.props, nextProps);
        return false;
    }

    render() {
        return (
            <div {...this.props} ref="chart" />
        );
    }
}
