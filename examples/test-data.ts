import * as _ from 'lodash';
import * as moment from 'moment';

import { Interval } from '../src';

// from https://datamarket.com/data/set/232f/chemical-concentration-readings#!ds=232f&display=line
const UNPARSED_DATA = [{
  timestamp: "1975-01-01T00:00:00",
  value: 17.0
}, {
  timestamp: "1975-01-01T02:00:00",
  value: 16.6
}, {
  timestamp: "1975-01-01T04:00:00",
  value: 16.3
}, {
  timestamp: "1975-01-01T06:00:00",
  value: 16.1
}, {
  timestamp: "1975-01-01T08:00:00",
  value: 17.1
}, {
  timestamp: "1975-01-01T10:00:00",
  value: 16.9
}, {
  timestamp: "1975-01-01T12:00:00",
  value: 16.8
}, {
  timestamp: "1975-01-01T14:00:00",
  value: 17.4
}, {
  timestamp: "1975-01-01T16:00:00",
  value: 17.1
}, {
  timestamp: "1975-01-01T18:00:00",
  value: 17.0
}, {
  timestamp: "1975-01-01T20:00:00",
  value: 16.7
}, {
  timestamp: "1975-01-01T22:00:00",
  value: 17.4
}, {
  timestamp: "1975-01-02T00:00:00",
  value: 17.2
}, {
  timestamp: "1975-01-02T02:00:00",
  value: 17.4
}, {
  timestamp: "1975-01-02T04:00:00",
  value: 17.4
}, {
  timestamp: "1975-01-02T06:00:00",
  value: 17.0
}, {
  timestamp: "1975-01-02T08:00:00",
  value: 17.3
}, {
  timestamp: "1975-01-02T10:00:00",
  value: 17.2
}, {
  timestamp: "1975-01-02T12:00:00",
  value: 17.4
}, {
  timestamp: "1975-01-02T14:00:00",
  value: 16.8
}, {
  timestamp: "1975-01-02T16:00:00",
  value: 17.1
}, {
  timestamp: "1975-01-02T18:00:00",
  value: 17.4
}, {
  timestamp: "1975-01-02T20:00:00",
  value: 17.4
}, {
  timestamp: "1975-01-02T22:00:00",
  value: 17.5
}, {
  timestamp: "1975-01-03T00:00:00",
  value: 17.4
}, {
  timestamp: "1975-01-03T02:00:00",
  value: 17.6
}, {
  timestamp: "1975-01-03T04:00:00",
  value: 17.4
}, {
  timestamp: "1975-01-03T06:00:00",
  value: 17.3
}, {
  timestamp: "1975-01-03T08:00:00",
  value: 17.0
}, {
  timestamp: "1975-01-03T10:00:00",
  value: 17.8
}, {
  timestamp: "1975-01-03T12:00:00",
  value: 17.5
}, {
  timestamp: "1975-01-03T14:00:00",
  value: 18.1
}, {
  timestamp: "1975-01-03T16:00:00",
  value: 17.5
}, {
  timestamp: "1975-01-03T18:00:00",
  value: 17.4
}, {
  timestamp: "1975-01-03T20:00:00",
  value: 17.4
}, {
  timestamp: "1975-01-03T22:00:00",
  value: 17.1
}, {
  timestamp: "1975-01-04T00:00:00",
  value: 17.6
}, {
  timestamp: "1975-01-04T02:00:00",
  value: 17.7
}, {
  timestamp: "1975-01-04T04:00:00",
  value: 17.4
}, {
  timestamp: "1975-01-04T06:00:00",
  value: 17.8
}, {
  timestamp: "1975-01-04T08:00:00",
  value: 17.6
}, {
  timestamp: "1975-01-04T10:00:00",
  value: 17.5
}, {
  timestamp: "1975-01-04T12:00:00",
  value: 16.5
}, {
  timestamp: "1975-01-04T14:00:00",
  value: 17.8
}, {
  timestamp: "1975-01-04T16:00:00",
  value: 17.3
}, {
  timestamp: "1975-01-04T18:00:00",
  value: 17.3
}, {
  timestamp: "1975-01-04T20:00:00",
  value: 17.1
}, {
  timestamp: "1975-01-04T22:00:00",
  value: 17.4
}, {
  timestamp: "1975-01-05T00:00:00",
  value: 16.9
}, {
  timestamp: "1975-01-05T02:00:00",
  value: 17.3
}, {
  timestamp: "1975-01-05T04:00:00",
  value: 17.6
}, {
  timestamp: "1975-01-05T06:00:00",
  value: 16.9
}, {
  timestamp: "1975-01-05T08:00:00",
  value: 16.7
}, {
  timestamp: "1975-01-05T10:00:00",
  value: 16.8
}, {
  timestamp: "1975-01-05T12:00:00",
  value: 16.8
}, {
  timestamp: "1975-01-05T14:00:00",
  value: 17.2
}, {
  timestamp: "1975-01-05T16:00:00",
  value: 16.8
}, {
  timestamp: "1975-01-05T18:00:00",
  value: 17.6
}, {
  timestamp: "1975-01-05T20:00:00",
  value: 17.2
}, {
  timestamp: "1975-01-05T22:00:00",
  value: 16.6
}, {
  timestamp: "1975-01-06T00:00:00",
  value: 17.1
}, {
  timestamp: "1975-01-06T02:00:00",
  value: 16.9
}, {
  timestamp: "1975-01-06T04:00:00",
  value: 16.6
}, {
  timestamp: "1975-01-06T06:00:00",
  value: 18.0
}, {
  timestamp: "1975-01-06T08:00:00",
  value: 17.2
}, {
  timestamp: "1975-01-06T10:00:00",
  value: 17.3
}, {
  timestamp: "1975-01-06T12:00:00",
  value: 17.0
}, {
  timestamp: "1975-01-06T14:00:00",
  value: 16.9
}, {
  timestamp: "1975-01-06T16:00:00",
  value: 17.3
}, {
  timestamp: "1975-01-06T18:00:00",
  value: 16.8
}, {
  timestamp: "1975-01-06T20:00:00",
  value: 17.3
}, {
  timestamp: "1975-01-06T22:00:00",
  value: 17.4
}, {
  timestamp: "1975-01-07T00:00:00",
  value: 17.7
}, {
  timestamp: "1975-01-07T02:00:00",
  value: 16.8
}, {
  timestamp: "1975-01-07T04:00:00",
  value: 16.9
}, {
  timestamp: "1975-01-07T06:00:00",
  value: 17.0
}, {
  timestamp: "1975-01-07T08:00:00",
  value: 16.9
}, {
  timestamp: "1975-01-07T10:00:00",
  value: 17.0
}, {
  timestamp: "1975-01-07T12:00:00",
  value: 16.6
}, {
  timestamp: "1975-01-07T14:00:00",
  value: 16.7
}, {
  timestamp: "1975-01-07T16:00:00",
  value: 16.8
}, {
  timestamp: "1975-01-07T18:00:00",
  value: 16.7
}, {
  timestamp: "1975-01-07T20:00:00",
  value: 16.4
}, {
  timestamp: "1975-01-07T22:00:00",
  value: 16.5
}, {
  timestamp: "1975-01-08T00:00:00",
  value: 16.4
}, {
  timestamp: "1975-01-08T02:00:00",
  value: 16.6
}, {
  timestamp: "1975-01-08T04:00:00",
  value: 16.5
}, {
  timestamp: "1975-01-08T06:00:00",
  value: 16.7
}, {
  timestamp: "1975-01-08T08:00:00",
  value: 16.4
}, {
  timestamp: "1975-01-08T10:00:00",
  value: 16.4
}, {
  timestamp: "1975-01-08T12:00:00",
  value: 16.2
}, {
  timestamp: "1975-01-08T14:00:00",
  value: 16.4
}, {
  timestamp: "1975-01-08T16:00:00",
  value: 16.3
}, {
  timestamp: "1975-01-08T18:00:00",
  value: 16.4
}, {
  timestamp: "1975-01-08T20:00:00",
  value: 17.0
}, {
  timestamp: "1975-01-08T22:00:00",
  value: 16.9
}, {
  timestamp: "1975-01-09T00:00:00",
  value: 17.1
}, {
  timestamp: "1975-01-09T02:00:00",
  value: 17.1
}, {
  timestamp: "1975-01-09T04:00:00",
  value: 16.7
}, {
  timestamp: "1975-01-09T06:00:00",
  value: 16.9
}, {
  timestamp: "1975-01-09T08:00:00",
  value: 16.5
}, {
  timestamp: "1975-01-09T10:00:00",
  value: 17.2
}, {
  timestamp: "1975-01-09T12:00:00",
  value: 16.4
}, {
  timestamp: "1975-01-09T14:00:00",
  value: 17.0
}, {
  timestamp: "1975-01-09T16:00:00",
  value: 17.0
}, {
  timestamp: "1975-01-09T18:00:00",
  value: 16.7
}, {
  timestamp: "1975-01-09T20:00:00",
  value: 16.2
}, {
  timestamp: "1975-01-09T22:00:00",
  value: 16.6
}, {
  timestamp: "1975-01-10T00:00:00",
  value: 16.9
}, {
  timestamp: "1975-01-10T02:00:00",
  value: 16.5
}, {
  timestamp: "1975-01-10T04:00:00",
  value: 16.6
}, {
  timestamp: "1975-01-10T06:00:00",
  value: 16.6
}, {
  timestamp: "1975-01-10T08:00:00",
  value: 17.0
}, {
  timestamp: "1975-01-10T10:00:00",
  value: 17.1
}, {
  timestamp: "1975-01-10T12:00:00",
  value: 17.1
}, {
  timestamp: "1975-01-10T14:00:00",
  value: 16.7
}, {
  timestamp: "1975-01-10T16:00:00",
  value: 16.8
}, {
  timestamp: "1975-01-10T18:00:00",
  value: 16.3
}, {
  timestamp: "1975-01-10T20:00:00",
  value: 16.6
}, {
  timestamp: "1975-01-10T22:00:00",
  value: 16.8
}, {
  timestamp: "1975-01-11T00:00:00",
  value: 16.9
}, {
  timestamp: "1975-01-11T02:00:00",
  value: 17.1
}, {
  timestamp: "1975-01-11T04:00:00",
  value: 16.8
}, {
  timestamp: "1975-01-11T06:00:00",
  value: 17.0
}, {
  timestamp: "1975-01-11T08:00:00",
  value: 17.2
}, {
  timestamp: "1975-01-11T10:00:00",
  value: 17.3
}, {
  timestamp: "1975-01-11T12:00:00",
  value: 17.2
}, {
  timestamp: "1975-01-11T14:00:00",
  value: 17.3
}, {
  timestamp: "1975-01-11T16:00:00",
  value: 17.2
}, {
  timestamp: "1975-01-11T18:00:00",
  value: 17.2
}, {
  timestamp: "1975-01-11T20:00:00",
  value: 17.5
}, {
  timestamp: "1975-01-11T22:00:00",
  value: 16.9
}, {
  timestamp: "1975-01-12T00:00:00",
  value: 16.9
}, {
  timestamp: "1975-01-12T02:00:00",
  value: 16.9
}, {
  timestamp: "1975-01-12T04:00:00",
  value: 17.0
}, {
  timestamp: "1975-01-12T06:00:00",
  value: 16.5
}, {
  timestamp: "1975-01-12T08:00:00",
  value: 16.7
}, {
  timestamp: "1975-01-12T10:00:00",
  value: 16.8
}, {
  timestamp: "1975-01-12T12:00:00",
  value: 16.7
}, {
  timestamp: "1975-01-12T14:00:00",
  value: 16.7
}, {
  timestamp: "1975-01-12T16:00:00",
  value: 16.6
}, {
  timestamp: "1975-01-12T18:00:00",
  value: 16.5
}, {
  timestamp: "1975-01-12T20:00:00",
  value: 17.0
}, {
  timestamp: "1975-01-12T22:00:00",
  value: 16.7
}, {
  timestamp: "1975-01-13T00:00:00",
  value: 16.7
}, {
  timestamp: "1975-01-13T02:00:00",
  value: 16.9
}, {
  timestamp: "1975-01-13T04:00:00",
  value: 17.4
}, {
  timestamp: "1975-01-13T06:00:00",
  value: 17.1
}, {
  timestamp: "1975-01-13T08:00:00",
  value: 17.0
}, {
  timestamp: "1975-01-13T10:00:00",
  value: 16.8
}, {
  timestamp: "1975-01-13T12:00:00",
  value: 17.2
}, {
  timestamp: "1975-01-13T14:00:00",
  value: 17.2
}, {
  timestamp: "1975-01-13T16:00:00",
  value: 17.4
}, {
  timestamp: "1975-01-13T18:00:00",
  value: 17.2
}, {
  timestamp: "1975-01-13T20:00:00",
  value: 16.9
}, {
  timestamp: "1975-01-13T22:00:00",
  value: 16.8
}, {
  timestamp: "1975-01-14T00:00:00",
  value: 17.0
}, {
  timestamp: "1975-01-14T02:00:00",
  value: 17.4
}, {
  timestamp: "1975-01-14T04:00:00",
  value: 17.2
}, {
  timestamp: "1975-01-14T06:00:00",
  value: 17.2
}, {
  timestamp: "1975-01-14T08:00:00",
  value: 17.1
}, {
  timestamp: "1975-01-14T10:00:00",
  value: 17.1
}, {
  timestamp: "1975-01-14T12:00:00",
  value: 17.1
}, {
  timestamp: "1975-01-14T14:00:00",
  value: 17.4
}, {
  timestamp: "1975-01-14T16:00:00",
  value: 17.2
}, {
  timestamp: "1975-01-14T18:00:00",
  value: 16.9
}, {
  timestamp: "1975-01-14T20:00:00",
  value: 16.9
}, {
  timestamp: "1975-01-14T22:00:00",
  value: 17.0
}, {
  timestamp: "1975-01-15T00:00:00",
  value: 16.7
}, {
  timestamp: "1975-01-15T02:00:00",
  value: 16.9
}, {
  timestamp: "1975-01-15T04:00:00",
  value: 17.3
}, {
  timestamp: "1975-01-15T06:00:00",
  value: 17.8
}, {
  timestamp: "1975-01-15T08:00:00",
  value: 17.8
}, {
  timestamp: "1975-01-15T10:00:00",
  value: 17.6
}, {
  timestamp: "1975-01-15T12:00:00",
  value: 17.5
}, {
  timestamp: "1975-01-15T14:00:00",
  value: 17.0
}, {
  timestamp: "1975-01-15T16:00:00",
  value: 16.9
}, {
  timestamp: "1975-01-15T18:00:00",
  value: 17.1
}, {
  timestamp: "1975-01-15T20:00:00",
  value: 17.2
}, {
  timestamp: "1975-01-15T22:00:00",
  value: 17.4
}, {
  timestamp: "1975-01-16T00:00:00",
  value: 17.5
}, {
  timestamp: "1975-01-16T02:00:00",
  value: 17.9
}, {
  timestamp: "1975-01-16T04:00:00",
  value: 17.0
}, {
  timestamp: "1975-01-16T06:00:00",
  value: 17.0
}, {
  timestamp: "1975-01-16T08:00:00",
  value: 17.0
}, {
  timestamp: "1975-01-16T10:00:00",
  value: 17.2
}, {
  timestamp: "1975-01-16T12:00:00",
  value: 17.3
}, {
  timestamp: "1975-01-16T14:00:00",
  value: 17.4
}, {
  timestamp: "1975-01-16T16:00:00",
  value: 17.4
}, {
  timestamp: "1975-01-16T18:00:00",
  value: 17.0
}, {
  timestamp: "1975-01-16T20:00:00",
  value: 18.0
}, {
  timestamp: "1975-01-16T22:00:00",
  value: 18.2
}, {
  timestamp: "1975-01-17T00:00:00",
  value: 17.6
}, {
  timestamp: "1975-01-17T02:00:00",
  value: 17.8
}, {
  timestamp: "1975-01-17T04:00:00",
  value: 17.7
}, {
  timestamp: "1975-01-17T06:00:00",
  value: 17.2
}, {
  timestamp: "1975-01-17T08:00:00",
  value: 17.4
}];

export const DATA = UNPARSED_DATA.map(({ timestamp, value }) => ({
  xValue: moment(timestamp).valueOf(),
  yValue: value
}));

const TIMESTAMPS = _.map<{}, number>(DATA, 'xValue');
const VALUES = _.map<{}, number>(DATA, 'yValue');

export const X_DOMAIN: Interval = {
  min: _.min(TIMESTAMPS),
  max: _.max(TIMESTAMPS)
};

export const Y_DOMAIN: Interval = {
  min: _.min(VALUES),
  max: _.max(VALUES)
};
