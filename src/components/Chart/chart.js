// CommitChart.js
import {Line} from 'vue-chartjs'
import moment from 'moment'

export default {
  extends: Line,
  props: ['dataSet'],
  watch: {
    dataSet: function () {
      this.renderLineChart()
    }
  },
  mounted () {
    moment.locale('fr')
    this.renderLineChart()
  },
  methods: {
    renderLineChart () {
      this.renderChart({
        labels: this.dataSet[0],

        datasets: [
          {
            label: 'Haricots',
            backgroundColor: 'rgba(130, 163, 132, .5)',

            borderColor: '#49a84e',
            data: this.dataSet[1],

            radius: 1
          },
          {
            label: 'Poivrons',
            backgroundColor: 'rgba(209, 123, 129, .5)',

            borderColor: '#d02a35',
            data: this.dataSet[2],

            radius: 1
          }
        ]
      }, {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          yAxes: [{
            ticks: {
              suggestedMin: 0,
              suggestedMax: 100
            }
          }]
        }
      })
    }
  }
}
