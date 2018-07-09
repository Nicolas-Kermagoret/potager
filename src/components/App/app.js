import ChartComponent from '../Chart/chart.vue'
import moment from 'moment'

export default {
  name: 'App',
  components: {
    'chart': ChartComponent
  },
  data: function () {
    return {
      led: false,
      dataSetMoisture: [
        [],
        [],
        []
      ],
      lastData: [],
      url: this.$resource('http://192.168.0.20:3000/moisture/{suffix}')
    }
  },
  mounted() {
    this.getData()
    this.getLastData()
  },
  methods: {
    add: function (event) {
      this.led = !this.led
      if (this.led) {
        this.useLed('on')
      } else {
        this.useLed('off')
      }
    },
    getData() {
      return this.url.get().then(response => {
        let dataSet = [
          [],
          [],
          []
        ]
        response.data.forEach(element => {
          if (moment(element.date).hour() === 0) {
            dataSet[0].push(moment(element.date).format('lll'))
          } else {
            dataSet[0].push(moment(element.date).format('LT'))
          }
          dataSet[1].push(element.moisture1)
          dataSet[2].push(element.moisture2)
        })
        this.dataSetMoisture = dataSet
      })
    },
    getLastData() {
      return this.url.get({
        suffix: 'last'
      }).then(response => {
        this.lastData = response.data
      })
    }
  }
}
