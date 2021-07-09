import React from "react";
import ChartComponent, { Chart } from "react-chartjs-2";

import { centerTextPlugin } from "./util";
import { doughnutChartOptions } from "./config";

export default class Doughnut extends React.Component {
  constructor(props) {
    super(props);
    if (this.props.shadow) {
      Chart.defaults.doughnutWithShadow = Chart.defaults.doughnut;
      Chart.controllers.doughnutWithShadow = Chart.controllers.doughnut.extend({
        draw: function(ease) {
          Chart.controllers.doughnut.prototype.draw.call(this, ease);
          let ctx = this.chart.chart.ctx;
          ctx.save();
          ctx.shadowColor = "rgba(0,0,0,0.15)";
          ctx.shadowBlur = 10;
          ctx.shadowOffsetX = 0;
          ctx.shadowOffsetY = 10;
          ctx.responsive = true;
          Chart.controllers.doughnut.prototype.draw.apply(this, arguments);
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
        type={shadow ? "doughnutWithShadow" : "doughnut"}
        plugins={[centerTextPlugin]}
        options={{
          ...doughnutChartOptions
        }}
        data={data}
      />
    );
  }
}
