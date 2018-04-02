import React, { Component } from 'react';
import { VictoryChart, VictoryAxis, VictoryBar, VictoryLine, VictoryGroup, VictoryTooltip,
        VictoryScatter, VictoryVoronoiContainer, VictoryZoomContainer, VictoryBrushContainer } from 'victory';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchData } from '../../actions/dashboardActions';

const styles = {
  stylePage: {
    width: '1000px',
    margin: '0 auto',
  },
  setMargin: {
    margin: '0 auto'
  }
}

class Dashboard extends Component {
 
    constructor() {
      super();
      this.state = {};
    }

    handleZoom(domain) {
      this.setState({selectedDomain: domain});
    }

    handleBrush(domain) {
      this.setState({zoomDomain: domain});
    }

    changeTimeFormat(unix_timestamp){
      var date = new Date(unix_timestamp);
      var hours = date.getHours();
      var minutes = "0" + date.getMinutes();
      var seconds = "0" + date.getSeconds();
      var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    }

    componentDidMount(){
      this.props.fetchData('/heartrate_try.json');
    }

    render() {

      const { error, loading, data } = this.props;

      if(error) return <div>Error { error.message }</div>

      if(loading) return <div>Loading...</div>

      return (
        <div style={styles.stylesPage}>
            <VictoryChart width={600} height={350} scale={{x: "time"}}
              containerComponent={
                <VictoryZoomContainer style={styles.setMargin} responsive={false}
                  zoomDimension="x"
                  zoomDomain={this.state.zoomDomain}
                  onZoomDomainChange={this.handleZoom.bind(this)}
                />
              }
            >
              <VictoryLine
                style={{
                  data: {stroke: "tomato"}
                }}
                data={[
                  {x: new Date(1982, 1, 1), y: 125},
                  {x: new Date(1987, 1, 1), y: 257},
                  {x: new Date(1993, 1, 1), y: 345},
                  {x: new Date(1997, 1, 1), y: 515},
                  {x: new Date(2001, 1, 1), y: 132},
                  {x: new Date(2005, 1, 1), y: 305},
                  {x: new Date(2011, 1, 1), y: 270},
                  {x: new Date(2015, 1, 1), y: 470}
                ]}
              />
  
            </VictoryChart>
  
            <VictoryChart
              padding={{top: 0, left: 50, right: 50, bottom: 30}}
              width={600} height={90} scale={{x: "time"}}
              containerComponent={
                <VictoryBrushContainer style={styles.setMargin} responsive={false}
                  brushDimension="x"
                  brushDomain={this.state.selectedDomain}
                  onBrushDomainChange={this.handleBrush.bind(this)}
                />
              }
            >
              <VictoryAxis
                tickValues={[
                  new Date(1985, 1, 1),
                  new Date(1990, 1, 1),
                  new Date(1995, 1, 1),
                  new Date(2000, 1, 1),
                  new Date(2005, 1, 1),
                  new Date(2010, 1, 1)
                ]}
                tickFormat={(x) => new Date(x).getFullYear()}
              />
              <VictoryLine
                style={{
                  data: {stroke: "tomato"}
                }}
                data={[
                  {x: new Date(1982, 1, 1), y: 125},
                  {x: new Date(1987, 1, 1), y: 257},
                  {x: new Date(1993, 1, 1), y: 345},
                  {x: new Date(1997, 1, 1), y: 515},
                  {x: new Date(2001, 1, 1), y: 132},
                  {x: new Date(2005, 1, 1), y: 305},
                  {x: new Date(2011, 1, 1), y: 270},
                  {x: new Date(2015, 1, 1), y: 470}
                ]}
              />
            </VictoryChart>
        </div>
      );
    }
}

const mapStateToProps = state => ({
  data: state.dashboard.items,
  loading: state.dashboard.loading,
  error: state.dashboard.error
})

const matchDispatchToProps = dispatch => {
  return {
    fetchData: (url) => dispatch(fetchData(url))
  }
}

export default connect(mapStateToProps, matchDispatchToProps)(Dashboard);