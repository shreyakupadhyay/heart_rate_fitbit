import React, { Component } from 'react';
import { VictoryPie, VictoryTheme, VictoryLegend, VictoryChart } from 'victory';

const styles = {
    dim: {
        display: 'flex',
        flexFlow: 'row',
  
        /* Then we define how is distributed the remaining space */
    }
}

class EventsZone extends Component{
    constructor(props) {
      super(props);
    }

    render(){
        return (
            <div style= {styles.dim}>
                <svg  width={400} height={400} style={{flex: "1 100%"}}>
                    <VictoryPie standalone={false}
                        theme={VictoryTheme.material}
                        sortOrder="descending"
                        labelRadius={70}
                        style={{
                            labels: { fontSize: 12, fill: "white"},
                        }}
                        width={400} height={400}
                        colorScale={["#7B1FA2", "#1E88E5", "#7CB342", "#FF7043"]}
                        data={[
                        { y: "Sleeing", x:35 ,label: "35 min",  },
                        { y: "Walking", x:40, label: "40 min" },
                        { y: "Running", x:55, label: "55 min" },
                        { y: "Eating", x:65, label: "65 min" }
                        ]}
                    />
                    <VictoryLegend x={400} y={50} standalone={false}
                        orientation="vertical"
                        gutter={20}
                        style={{ title: {fontSize: 20 }}}
                        data={[
                        { name: "Sleeping", symbol: { fill: "#7B1FA2"} },
                        { name: "Walking", symbol: { fill: "#1E88E5" } },
                        { name: "Running", symbol: { fill: "#7CB342" } },
                        { name: "Eating", symbol: { fill: "#FF7043" } }
                        ]}
                    />
                </svg>
                <div style={{flex: "1 100%"}}>
                Hello
                </div>
            </div>
        )
    }
}

export default EventsZone;