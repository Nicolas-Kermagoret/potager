import ChartComponent from '../Chart/chart.vue'
import axios from 'axios'
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
      lastData: []
    }
  },
  mounted () {
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
    useLed: function (state) {
      const url = `http://192.168.0.20:3000/${state}`
      fetch(url)
    },
    getData: function () {
      const url = 'http://192.168.0.20:3000/moisture'
      return axios.get(url).then(response => {
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
    getLastData () {
      const url = 'http://192.168.0.20:3000/moisture/last'
      return axios.get(url).then(response => {
        this.lastData = response.data
      })
    }
  }
}
