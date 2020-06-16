import React, { Component } from 'react';

export default class Bar extends Component {
  render() {
    const { inssPercent, irpfPercent } = this.props.percents;
    return (
      <div
        style={{
          height: '15px',
          marginTop: '30px',
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        <div
          style={{
            width: `${inssPercent}%`,
            backgroundColor: '#ff9800',
            height: '20px',
          }}
        ></div>
        <div
          style={{
            width: `${irpfPercent}%`,
            backgroundColor: '#f44336',
            height: '20px',
          }}
        ></div>
        <div
          style={{
            width: `${100 - irpfPercent - inssPercent}%`,
            backgroundColor: '#26A69A',
            height: '20px',
          }}
        ></div>
      </div>
    );
  }
}
