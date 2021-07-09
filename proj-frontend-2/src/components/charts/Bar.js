import React from "react";
import ChartComponent, { Chart } from "react-chartjs-2";

import { barChartOptions } from "./config";

export default class Bar extends React.Component {
  constructor(props) {
    super(props);
    if (this.props.shadow) {
      Chart.defaults.barWithShadow = Chart.defaults.bar;
      Chart.controllers.barWithShadow = Chart.controllers.bar.extend({
        draw: function(ease) {
          Chart.controllers.bar.prototype.draw.call(this, ease);
          var ctx = this.chart.ctx;
          ctx.save();
          ctx.shadowColor = "rgba(0,0,0,0.2)";
          ctx.shadowBlur = 7;
          ctx.shadowOffsetX = 5;
          ctx.shadowOffsetY = 7;
          ctx.responsive = true;
          Chart.controllers.bar.prototype.draw.apply(this, arguments);
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
        type={shadow ? "barWithShadow" : "bar"}
        options={{
          ...barChartOptions
        }}
        data={data}
      />
    );
  }
}
