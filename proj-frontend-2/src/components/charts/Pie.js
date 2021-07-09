import React from "react";
import ChartComponent, { Chart } from "react-chartjs-2";

import { pieChartOptions } from "./config";

export default class Pie extends React.Component {
  constructor(props) {
    super(props);
    if (this.props.shadow) {
      Chart.defaults.pieWithShadow = Chart.defaults.pie;
      Chart.controllers.pieWithShadow = Chart.controllers.pie.extend({
        draw: function(ease) {
          Chart.controllers.pie.prototype.draw.call(this, ease);
          let ctx = this.chart.chart.ctx;
          ctx.save();
          ctx.shadowColor = "rgba(0,0,0,0.15)";
          ctx.shadowBlur = 10;
          ctx.shadowOffsetX = 0;
          ctx.shadowOffsetY = 10;
          ctx.responsive = true;
          Chart.controllers.pie.prototype.draw.apply(this, arguments);
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
        type={shadow ? "pieWithShadow" : "pie"}
        options={{
          ...pieChartOptions
        }}
        data={data}
      />
    );
  }
}
