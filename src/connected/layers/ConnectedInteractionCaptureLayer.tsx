import * as React from 'react';
import * as PureRender from 'pure-render-decorator';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {
  Interval,
  BooleanMouseEventHandler,
  panInterval,
  zoomInterval,
  InteractionCaptureLayer
} from '../../core';
import * as uiActions from '../flux/uiActions';
import { ChartState } from '../model/state';
import { selectXDomain } from '../model/selectors';

export interface OwnProps {
  enablePan?: boolean;
  enableZoom?: boolean;
  enableHover?: boolean;
  enableBrush?: boolean;
  shouldZoom?: BooleanMouseEventHandler;
  shouldPan?: BooleanMouseEventHandler;
  shouldBrush?: BooleanMouseEventHandler;
  zoomSpeed?: number;
}

export interface ConnectedProps {
  xDomain: Interval;
}

export interface DispatchProps {
  actions: typeof uiActions;
}

@PureRender
export class ConnectedInteractionCaptureLayer extends React.Component<OwnProps & ConnectedProps & DispatchProps, {}> {
  render() {
    return (
      <InteractionCaptureLayer
        xDomain={this.props.xDomain}
        onZoom={this.props.enableZoom && this._zoom}
        onPan={this.props.enablePan && this._pan}
        onHover={this.props.enableHover && this._hover}
        onBrush={this.props.enableBrush && this._brush}
        shouldZoom={this.props.shouldZoom}
        shouldPan={this.props.shouldPan}
        shouldBrush={this.props.shouldBrush}
        zoomSpeed={this.props.zoomSpeed}
      />
    );
  }


  private _zoom = (factor: number, anchorBias: number) => {
    this.props.actions.setXDomain(zoomInterval(this.props.xDomain, factor, anchorBias));
  };

  private _pan = (logicalUnits: number) => {
    this.props.actions.setXDomain(panInterval(this.props.xDomain, logicalUnits));
  };

  private _brush = (logicalUnitInterval?: Interval) => {
    this.props.actions.setSelection(logicalUnitInterval);
  };

  private _hover = (logicalPosition?: number) => {
    this.props.actions.setHover(logicalPosition);
  };
}

function mapStateToProps(state: ChartState): ConnectedProps {
  return {
    xDomain: selectXDomain(state)
  };
}

function mapDispatchToProps(dispatch: Dispatch): DispatchProps {
  return {
    actions: bindActionCreators(uiActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ConnectedInteractionCaptureLayer) as React.ComponentClass<OwnProps>;
