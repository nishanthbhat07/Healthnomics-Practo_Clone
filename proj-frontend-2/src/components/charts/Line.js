import React from "react";
import ChartComponent, { Chart } from "react-chartjs-2";

import { lineChartOptions } from "./config";

export default class Line extends React.Component {
  constructor(props) {
    super(props);
    if (this.props.shadow) {
      Chart.defaults.lineWithShadow = Chart.defaults.line;
      Chart.controllers.lineWithShadow = Chart.controllers.line.extend({
        draw: function(ease) {
          Chart.controllers.line.prototype.draw.call(this, ease);
          var ctx = this.chart.ctx;
          ctx.save();
          ctx.shadowColor = "rgba(0,0,0,0.15)";
          ctx.shadowBlur = 10;
          ctx.shadowOffsetX = 0;
          ctx.shadowOffsetY = 10;
          ctx.responsive = true;
          ctx.stroke();
          Chart.controllers.line.prototype.draw.apply(this, arguments);
          ctx.restore();
        }
      });
    }
  }

  render() {
    const { data, shadow } = this.props;
    return (
      <ChartComponent
        ref={ref => (this.chart_instance = ref && ref.chart_instance)}
        type={shadow ? "lineWithShadow" : "line"}
        options={{
          ...lineChartOptions
        }}
        data={data}
      />
    );
  }
}
