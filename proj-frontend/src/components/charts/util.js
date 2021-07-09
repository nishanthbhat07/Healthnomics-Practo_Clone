
import { ThemeColors } from "../../helpers/ThemeColors";

export const chartTooltip = {
    backgroundColor: ThemeColors().foregroundColor,
    titleFontColor: ThemeColors().primaryColor,
    borderColor: ThemeColors().separatorColor,
    borderWidth: 0.5,
    bodyFontColor: ThemeColors().primaryColor,
    bodySpacing: 10,
    xPadding: 15,
    yPadding: 15,
    cornerRadius: 0.15
  }
  
  export const centerTextPlugin = {
    afterDatasetsUpdate: function (chart) {},
    beforeDraw: function (chart) {
      var width = chart.chartArea.right
      var height = chart.chartArea.bottom
      var ctx = chart.chart.ctx
      ctx.restore()
  
      var activeLabel = chart.data.labels[0]
      var activeValue = chart.data.datasets[0].data[0]
      var dataset = chart.data.datasets[0]
      var meta = dataset._meta[Object.keys(dataset._meta)[0]]
      var total = meta.total
  
      var activePercentage = parseFloat(((activeValue / total) * 100).toFixed(1))
      activePercentage = chart.legend.legendItems[0].hidden
        ? 0
        : activePercentage
  
      if (chart.pointAvailable) {
        activeLabel = chart.data.labels[chart.pointIndex]
        activeValue =
          chart.data.datasets[chart.pointDataIndex].data[chart.pointIndex]
  
        dataset = chart.data.datasets[chart.pointDataIndex]
        meta = dataset._meta[Object.keys(dataset._meta)[0]]
        total = meta.total
        activePercentage = parseFloat(((activeValue / total) * 100).toFixed(1))
        activePercentage = chart.legend.legendItems[chart.pointIndex].hidden
          ? 0
          : activePercentage
      }
  
      ctx.font = '36px Nunito, sans-serif'
      ctx.fillStyle = ThemeColors().primaryColor
      ctx.textBaseline = 'middle'
  
      var text = activePercentage + '%'
      var textX = Math.round((width - ctx.measureText(text).width) / 2)
      var textY = height / 2
      ctx.fillText(text, textX, textY)
  
      ctx.font = '14px Nunito, sans-serif'
      ctx.textBaseline = 'middle'
  
      var text2 = activeLabel
      var textX2 = Math.round((width - ctx.measureText(text2).width) / 2)
      var textY2 = height / 2 - 30
      ctx.fillText(text2, textX2, textY2)
  
      ctx.save()
    },
    beforeEvent: function (chart, event, options) {
      var firstPoint = chart.getElementAtEvent(event)[0]
  
      if (firstPoint) {
        chart.pointIndex = firstPoint._index
        chart.pointDataIndex = firstPoint._datasetIndex
        chart.pointAvailable = true
      }
    }
  }
  