import React from "react";
import ChartComponent, { Chart } from "react-chartjs-2";

import { scatterChartOptions } from "./config";

export default class Scatter extends React.Component {
  constructor(props) {
    super(props);
    if (this.props.shadow) {
      Chart.defaults.scatterWithShadow = Chart.defaults.scatter;
      Chart.controllers.scatterWithShadow = Chart.controllers.scatter.extend({
        draw: function(ease) {
          Chart.controllers.scatter.prototype.draw.call(this, ease);
          let ctx = this.chart.chart.ctx;
          ctx.save();
          ctx.shadowColor = "rgba(0,0,0,0.2)";
          ctx.shadowBlur = 7;
          ctx.shadowOffsetX = 0;
          ctx.shadowOffsetY = 7;
          ctx.responsive = true;
          Chart.controllers.scatter.prototype.draw.apply(this, arguments);
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
        type={shadow ? "scatterWithShadow" : "scatter"}
        options={{
          ...scatterChartOptions
        }}
        data={data}
      />
    );
  }
}
