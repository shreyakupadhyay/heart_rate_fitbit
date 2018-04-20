import React, { Component } from 'react';
import { VictoryChart, VictoryAxis, VictoryLine, VictoryZoomContainer, VictoryBrushContainer,
          VictoryBar, VictoryArea, VictoryTooltip, VictoryTheme } from 'victory';
import { connect } from 'react-redux';
import { fetchHeartRateData, fetchEventsData} from '../../actions/heartRateActions';
import purple from 'material-ui/colors/purple';
import lime from 'material-ui/colors/lime';
import compose from 'recompose/compose';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';

const themeStyles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
});


const styles = {
  stylePage: {
    width: '1000px',
    margin: '0 auto',
  },
  color: {
    color: '#2196f3'
  },
  setMargin: {
    marginTop: '50px',
  },
  styleButtons: {
    width: '550px',
    margin: '0 auto'
  }
}

class HeartRate extends Component {
    constructor(props) {
      super(props);
      this.state = {
        time: 0
      };
      this.handleDataFilter = this.handleDataFilter.bind(this);
      this.handleMovingAverage = this.handleMovingAverage.bind(this);
      this.handleEventData = this.handleEventData.bind(this);
      this.rainbow = this.rainbow.bind(this);
    }

    handleZoom(domain) {
      this.setState({selectedDomain: domain});
    }

    handleBrush(domain) {
      this.setState({zoomDomain: domain});
    }

    handleDataFilter(data, time) {
      if(time===0){
        return data;
      }
      else if(data.length > 0){
        let d =  new Date(data[0].x);
        d.setHours(d.getHours() + time);
        return data.filter((item) => item.x <= d)
      }
    }
  
    handleMovingAverage(data){
      let movingAverage = []
      for (var i = 1; i < data.length-1; i++)
          {
              var meanX = (data[i].y + data[i-1].y + data[i+1].y)/3.0;
              var dict = {"y":meanX, "x": data[i].x}
              movingAverage.push(dict);
          }
      return movingAverage
    }

    handleEventData(eventsData, data){
      const rendered = []
      for (var i = 0; i < eventsData.length; i++)
          {
              var startTime = eventsData[i].startTime;
              let endTime =  new Date(eventsData[i].startTime);
              endTime.setMinutes(endTime.getMinutes() + eventsData[i].duration);
              var dataEvent = data.filter((item) => item.x <= endTime && item.x >= startTime);
              console.log(dataEvent)
              var dataEventLabel = dataEvent.map((item) => Object(item, {label: eventsData[i].eventName}))
              // var avg = dataEvent.map(item => item.y).reduce((sum, y) => sum + y) / dataEvent.length;
              // var max = dataEvent.map(item => item.y).reduce((sum, y) =>  sum > y ? sum : y);
              console.log(dataEventLabel)
              rendered.push(<VictoryArea
                    labelComponent={<VictoryTooltip/>}
                    active={true}
                    style={{ data: { fill:  lime['300']} }}
                    data={dataEventLabel}
                    />)
          }
      return rendered
    }

    rainbow(n) {
      n = (255-n) * 240 / 255;
      return 'hsl(' + n + ',100%,50%)';
    }

    componentDidMount(){
      this.props.fetchHeartRateData('/heartrate_try.json');
      this.props.fetchEventsData('eventsData.json');
    }

    render() {

      const { heartRateError,heartRateLoading, heartRateData, eventsError, eventsLoading, eventsData } = this.props;

      const { classes } = this.props;

      if(heartRateError) return <div>Error { heartRateError.message }</div>
      else if(eventsError) return <div>Error { eventsError.message }</div>

      if(heartRateLoading) return <div>Loading...</div>
      else if(eventsLoading) return <div>Loading...</div>

      var dataValue = this.state.time==-1 ? this.handleMovingAverage(heartRateData) : this.handleDataFilter(heartRateData,this.state.time);

      {/* <div style={styles.styleButtons}> */}
            {/* <Button color="primary" className={classes.button}>
              Primary
            </Button>
            <Button color="secondary" className={classes.button}>
              Secondary
            </Button> */}
            {/* <FlatButton label="8 Hours." primary={true} onClick={() => this.setState({time: 8})}/>
            <FlatButton label="16 Hours" primary={true} onClick={() => this.setState({time: 16})}/>
            <FlatButton label="1 Day" primary={true} onClick={() => this.setState({time: 24})}/>
            <FlatButton label="Moving Average" primary={true} onClick={() => this.setState({time: -1})}/>
            <FlatButton label="Default" primary={true} onClick={() => this.setState({time: 0})}/>
            <FlatButton label="No Event Data" primary={true} onClick={() => this.setState({time: 0})}/> */}
          {/* </div> */}

      return (
          <div style={styles.setMargin}>
          <VictoryChart width="2400" height="600" scale={{x: "time"}} theme={VictoryTheme.material}
            containerComponent={
              <VictoryZoomContainer responsive={true}
                zoomDimension="x"
                zoomDomain={this.state.zoomDomain}
                onZoomDomainChange={this.handleZoom.bind(this)}
              />
            }
          >
          {this.state.time==-1 ? this.handleEventData(eventsData, dataValue): this.handleEventData(eventsData, heartRateData)}
            <VictoryLine
              style={{
                data: {stroke: "tomato"},
                strokeWidth: 0.3
              }}
              data={dataValue}
            />
          <VictoryAxis crossAxis
            tickCount={24}
            style={{
              ticks: {stroke: "grey", size: 5},
              tickLabels: {fontSize: 18, padding: 5}
            }}
          />

            <VictoryAxis dependentAxis
          style={{
            ticks: {stroke: "grey", size: 5},
            tickLabels: {fontSize: 18, padding: 5}
          }}
            />
          </VictoryChart>
          </div>
      );
    }
}

const mapStateToProps = state => ({
  heartRateData: state.heartrate.items,
  heartRateLoading: state.heartrate.loading,
  heartRateError: state.heartrate.error,
  eventsData: state.events.items,
  eventsError: state.events.error,
  eventsLoading: state.events.loading,
  classes: PropTypes.object.isRequired
})

const matchDispatchToProps = dispatch => {
  return {
    fetchHeartRateData: (url) => dispatch(fetchHeartRateData(url)),
    fetchEventsData: (url) => dispatch(fetchEventsData(url))
  }
}

export default compose(
        withStyles(themeStyles, {
          name: 'HeartRate',
      }),connect(mapStateToProps, matchDispatchToProps))(HeartRate);