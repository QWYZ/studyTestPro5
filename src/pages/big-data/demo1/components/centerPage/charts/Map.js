import React, { PureComponent } from 'react';
import Chart from '../../../../../../utils/chart';
import { mapOptions } from './options';
import chinaJson from './china.json';
import * as echarts from 'echarts';

class Map extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      renderer: 'canvas',
    };
  }

  componentDidMount(){
    echarts.registerMap('china', chinaJson);
  }
  

  render() {
    const { renderer } = this.state;
    const { mapData } = this.props;
    return (
      <div
        style={{
          width: '10.625rem',
          height: '8.125rem',
        }}>
          {
            mapData?<Chart renderer={renderer} option={mapOptions(mapData)} />:''
          }
      </div>
    );
  }
}

export default Map;
