import React, { Component } from 'react';
import { VictoryBar, VictoryTheme, VictoryAxis, VictoryChart, VictoryLabel } from 'victory';
import { fetchTimeZoneData } from '../../actions/timeZoneActions';
import { connect } from 'react-redux';


const styles = {
    flexContainer: {
        flex: "1 1 100%",
        width: "50%",
        height: "50%"
    }
}

class TimeZone extends Component{
    constructor(props) {
      super(props);
      this.handleBarChart = this.handleBarChart.bind(this);
    }

    componentDidMount(){
        this.props.fetchTimeZoneData('timeZoneData.json');
    }

    handleBarChart(data){
    
    }


    render(){
        const { eventsZoneError, eventsZoneLoading, eventsZoneData } = this.props;

        if(eventsZoneError) return <div>Error { eventsZoneError.message }</div>

        if(eventsZoneLoading) return <div>Loading...</div>

        // var {dataValue} = this.handleBarChart(eventsZoneData);
        const colorScale=["#7B1FA2", "#FF7043", "#1E88E5", "#35A621"]

        return (
            <VictoryChart height="500" width="800" style={styles.flexContainer} scale={{x: "Heart Rate Zone"}} 
            theme={VictoryTheme.material}
            domainPadding={50}>
            <VictoryLabel text="Time (min.)" font={18} x={100} y={30} textAnchor="middle"/>
                <VictoryBar
                alignment="middle"                
                style = {{
                    data: {
                        // fill: "#c43a31",
                        fill: (d) => colorScale[d.key % colorScale.length],
                        width: 45
                    }
                }}
                data={[
                    { key: 1, y: 0, x: "" },
                    { key: 2, y: 5, x: "Zone1\n(0-90)" },
                    { key: 3, y: 25, x: "Zone2\n(91-120)" },
                    { key: 4, y: 13, x: "Zone3\n(121-150)" },
                    { key: 5, y: 10, x: "Zone4\n(150-180)" },
                    { key: 5, y: 17, x: "Zone5\n(>181)" },
                ]}
                />

                <VictoryAxis crossAxis
                    style={{
                    tickLabels: {fontSize: 18, padding: 1}
                    }}
                />

                <VictoryAxis dependentAxis
                    style={{
                        ticks: {stroke: "grey", size: 5},
                        tickLabels: {fontSize: 18, padding: 5},
                        axisLabel: {fontSize: 20, padding: 30}
                    }}
                    offsetX={100}


                />
            </VictoryChart>
        )
    }
}

const mapStateToProps = state => ({
    timeZoneData: state.timeZone.items,
    timeZoneError: state.timeZone.error,
    timeZoneLoading: state.timeZone.loading,
  })

const matchDispatchToProps = dispatch => {
    return {
        fetchTimeZoneData: (url) => dispatch(fetchTimeZoneData(url)),
    }
}
  

export default connect(mapStateToProps, matchDispatchToProps)(TimeZone);