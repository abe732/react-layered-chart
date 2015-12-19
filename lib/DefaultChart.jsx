import React from 'react';
import PureRender from 'pure-render-decorator';

import SelectFromStore from './mixins/SelectFromStore';
import MetadataDrivenDataLayer from './layers/MetadataDrivenDataLayer';
import BrushLayer from './layers/BrushLayer';
import InteractionCaptureLayer from './layers/InteractionCaptureLayer';
import HoverLayer from './layers/HoverLayer';
import Stack from './Stack';

import ActionType from './flux/ActionType';
import Actions from './flux/Actions';

import YAxis from './axes/YAxis';
import XAxis from './axes/XAxis';

@PureRender
@SelectFromStore
class DefaultChart extends React.Component {
  static propTypes = {
    store: React.PropTypes.object.isRequired
  };

  static selectFromStore = {
    seriesIds: 'seriesIds',
    xAxis: 'xAxis',
    yAxis: 'yAxis',
    selection: 'selection',
    hover: 'hover'
  };

  render() {
    return (
      <div className='default-chart'>
        <Stack className='chart-body'>
          <MetadataDrivenDataLayer
            store={this.props.store}
            seriesIds={this.state.seriesIds}
          />
          <BrushLayer
            xDomain={this.state.xAxis}
            selection={this.state.selection}
          />
          <InteractionCaptureLayer
            xDomain={this.state.xAxis}
            onHover={this._onHover}
            onPan={this._onPan}
            onZoom={this._onZoom}
            onBrush={this._onBrush}
          />
          <HoverLayer
            xDomain={this.state.xAxis}
            hover={this.state.hover}
          />
          <YAxis
            yDomain={this.state.yAxis}
          />
        </Stack>
        <Stack className='time-axis'>
          <XAxis
            xDomain={this.state.xAxis}
          />
        </Stack>
      </div>
    );
  }

  _onHover = (xPos) => {
    this.props.store.dispatch(Actions.hover(xPos));
  };

  _onPan = (deltaX) => {
    this.props.store.dispatch(Actions.pan(deltaX));
  };

  _onZoom = (factor, focus) => {
    this.props.store.dispatch(Actions.zoom(factor, focus));
  };

  _onBrush = (brush) => {
    this.props.store.dispatch(Actions.brush(brush));
  };
}

export default DefaultChart;
