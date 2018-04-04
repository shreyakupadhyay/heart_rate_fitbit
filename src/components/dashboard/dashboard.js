import React, { Component } from 'react';
import { VictoryChart, VictoryAxis, VictoryLine, VictoryZoomContainer, VictoryBrushContainer } from 'victory';
import { connect } from 'react-redux';
import { fetchData } from '../../actions/dashboardActions';
import FlatButton from 'material-ui/FlatButton';
import DatePicker from 'material-ui/DatePicker';

const styles = {
  stylePage: {
    width: '1000px',
    margin: '0 auto',
  },
  setMargin: {
    margin: '0 auto'
  },
  styleButtons: {
    width: '550px',
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
      // var d = new Date(year, month, day, hours, minutes, seconds, milliseconds);

    }

    componentDidMount(){
      this.props.fetchData('/heartrate_try.json');
    }

    render() {

      const { error, loading, data } = this.props;

      if(error) return <div>Error { error.message }</div>

      if(loading) return <div>Loading...</div>

      return (
        <div>
          <div style={styles.styleButtons}>
            <FlatButton label="1 Day" primary={true} />
            <FlatButton label="1 Week" primary={true} />
            <FlatButton label="1 Month" primary={true} />
          </div>
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
                    data: {stroke: "#38BEA0"}
                  }}
                  interpolation="bundle"
                  data={data}
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
                    new Date(1522013520000),
                    new Date(1522020000000),
                    new Date(1522033800000),
                    new Date(1522041240000),
                    new Date(1522079040000),
                    new Date(1522088880000)
                  ]}
                  tickFormat={(x) => new Date(x).getFullYear()}
                />
                <VictoryLine
                  style={{
                    data: {stroke: "#38BEA0"}
                  }}
                  interpolation="bundle"
                  data={data}
                />
              </VictoryChart>
          </div>
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