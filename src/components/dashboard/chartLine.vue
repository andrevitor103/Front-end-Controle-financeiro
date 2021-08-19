<template>
    <div>
        <Chart type="line" :data="basicData" v-if="see" />
    </div>
</template>

<script>
import Chart from 'primevue/chart'
import DashboardService from '@/services/dashboard.js'

export default {
    name: 'bar-chart',
	props: {
		data: Array	
	},
    components: {
        Chart
    },
data() {
	return {
		msg: 'Óla mundo',
		see: true,
		responseData: this.data,
		meses: [],
		limite: [],
		gastos: [],
		saldo: [],
		basicData: {
			labels: [],
			datasets: [
				{
					label: 'LIMITE',
					data: [],
					fill: false,
					borderColor: '#12c0dc82'
				},
				{
					label: 'GASTOS',
					data: [],
					fill: false,
					borderColor: '#F00'
				},
				{
					label: 'SALDO',
					data: [],
					fill: false,
					borderColor: '#FFA726'
				}
			]
		},
	}
},
	methods: {
		getData() {
			DashboardService.filter([])
                .then((response) => {
                    console.log(response.data)
                    if ("Dashboard_error" in response.data) 
                    {
                        this.clearDashboard() 
                        return false
                    }
					this.responseData = response.data.Dashboard
				this.clearAndAddDataDashboard(response.data.Dashboard)

                }).catch((error) => {
                    console.log(error)
                })
		},
		clearDashboard() {
			this.meses = []
			this.limite = []
			this.gastos = []
			this.saldo = []
		},
		toggleSee() {
			this.see = !this.see
		},
		async clearAndAddDataDashboard(value) {
			await this.toggleSee()
			await this.clearDashboard()
			await this.addData(value)
		},
		addData(value) {
			if (value.length > 0) {
				value.forEach((valueItem) => {
					valueItem.forEach((item) => {
						this.meses.push(item.MES_ANO);
						this.limite.push(item.LIMITE);
						this.gastos.push(item.GASTOS);
						this.saldo.push(item.SALDO);
					})	
				})
			this.createDashboard()	
			} else {
				this.toggleSee()
			}
		},
		async createDashboard() {
			this.basicData.labels = this.meses
			this.basicData.datasets[0].data = this.limite
			this.basicData.datasets[1].data = this.gastos
			this.basicData.datasets[2].data = this.saldo
			await this.toggleSee()
		}
	},
	computed: {
	},
	watch: {
		basicData: (value) => {
			return value
		},
		data:  function (value) {
			console.log(value)
			this.clearAndAddDataDashboard(this.responseData)
			return value
		}
	},
	created() {
			// this.getData()
		},	
	mounted() {
	}
	
}
</script>

<style lang="css" scoped>
    
</style>
