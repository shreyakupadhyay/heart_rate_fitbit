import React, { Component } from 'react';
import { VictoryChart, VictoryAxis, VictoryBar, VictoryLine, VictoryGroup, VictoryTooltip,
        VictoryScatter, VictoryVoronoiContainer } from 'victory';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchData } from '../../actions/dashboardActions';

const styles = {
    height: '50%',
    width: '50%',
    margin: '0 auto',
}

const stylesPage = {
    width: '800px',
    margin: '0 auto',
}

class Dashboard extends Component {
 
  componentDidMount(){
    this.props.fetchData('/data.json');
  }

  render() {

    const { error, loading, data } = this.props;

    if(error) return <div>Error { error.message }</div>

    if(loading) return <div>Loading...</div>

    return (
      <div id="page-wrap" style={stylesPage}>
          <VictoryChart height={400} width={400}
          containerComponent={<VictoryVoronoiContainer style={styles}/>}
        >
            <VictoryGroup
              labels={(d) => `y: ${d.y}`}
              labelComponent={
                <VictoryTooltip
                  style={{ fontSize: 10 }}
                />
              }
              data={data}
            >
              <VictoryLine/>
              <VictoryScatter
                size={(d, a) => {return a ? 8 : 3;}}
              />
            </VictoryGroup>
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