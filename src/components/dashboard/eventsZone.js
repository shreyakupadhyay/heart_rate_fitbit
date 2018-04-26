import React, { Component } from 'react';
import { VictoryPie, VictoryTheme, VictoryLegend, VictoryChart, VictoryTooltip } from 'victory';
import { connect } from 'react-redux';
import TimeZone from './timeZone';


const styles = {
    dim: {
        display: 'flex',
        flexFlow: 'row',
    }
}

class EventsZone extends Component{
    constructor(props) {
      super(props);
      this.handlePieChart = this.handlePieChart.bind(this);
    }

    handlePieChart(data){
        var i, j;
        var dataValue = [];
        var legendColor = [];
        var chartColor = [];
        for(i=0;i<data.length;i++){
            var check = 0;
            for(j=0;j<dataValue.length;j++){
                if(data[i].eventName===dataValue[j].x){
                    dataValue[j]["y"] = dataValue[j]["y"] + data[i].duration;
                    dataValue[j]["label"] =dataValue[j]["y"] + " min.";
                    check = 1;
                }
            }
            if(check==0){
                var dict = {};
                dict["y"] = data[i].duration;
                dict["x"] = data[i].eventName;
                dict["label"] = data[i].duration + " min.";
                dataValue.push(dict);
                var colorDict = {};
                colorDict["name"] = data[i].eventName;
                colorDict["symbol"] = {"fill": data[i].color};
                legendColor.push(colorDict);
                chartColor.push(data[i].color)
            }
        }
        return {dataValue, legendColor, chartColor};
    }


    render(){
        const { eventsZoneError, eventsZoneLoading, eventsZoneData } = this.props;

        if(eventsZoneError) return <div>Error { eventsZoneError.message }</div>

        if(eventsZoneLoading) return <div>Loading...</div>

        var {dataValue, legendColor, chartColor} = this.handlePieChart(eventsZoneData);

        return (
            <div style= {styles.dim}>
                <svg  width={400} height={400} style={{flex: "1 100%"}}>
                    <VictoryPie standalone={false}
                        theme={VictoryTheme.material}
                        sortOrder="ascending"
                        labelRadius={70}
                        style={{
                            labels: { fontSize: 12, fill: "white"},
                        }}
                        width={400} height={400}
                        colorScale={chartColor}
                        data={dataValue}
                    />
                    <VictoryLegend x={400} y={50} standalone={false}
                        title="Activities"
                        orientation="vertical"
                        gutter={20}
                        style={{ title: {fontSize: 20 }}}
                        data={legendColor}
                    />
                </svg>
                <div style={{flex: "1 100%", height:"400px"}}>
                    <TimeZone />
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    eventsZoneData: state.events.items,
    eventsZoneError: state.events.error,
    eventsZoneLoading: state.events.loading,
  })

export default connect(mapStateToProps)(EventsZone);