import React from "react";
import ChartComponent, { Chart } from "react-chartjs-2";

import { radarChartOptions } from "./config";

export default class Radar extends React.Component {
  constructor(props) {
    super(props);
    if (this.props.shadow) {
      Chart.defaults.radarWithShadow = Chart.defaults.radar;
      Chart.controllers.radarWithShadow = Chart.controllers.radar.extend({
        draw: function(ease) {
          Chart.controllers.radar.prototype.draw.call(this, ease);
          let ctx = this.chart.chart.ctx;
          ctx.save();
          ctx.shadowColor = "rgba(0,0,0,0.2)";
          ctx.shadowBlur = 7;
          ctx.shadowOffsetX = 0;
          ctx.shadowOffsetY = 7;
          ctx.responsive = true;
          Chart.controllers.radar.prototype.draw.apply(this, arguments);
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
        type={shadow ? "radarWithShadow" : "radar"}
        options={{
          ...radarChartOptions
        }}
        data={data}
      />
    );
  }
}
