<template>
    <div>
        <Chart type="bar" :data="basicData"  v-if="see" />
    </div>
</template>

<script>
import Chart from 'primevue/chart'
import DashboardService from '@/services/dashboard.js'

export default {
    name: 'bar-chart',
    components: {
        Chart
    },
	props: {
		data: Array	
	},
    data() {
        return {
            msg: 'Óla mundo',
			see: false,
			responseData: this.data,
			objectResponse: [
			{
				"forma_pagamento": "NUBAKs",
				"saldo_limite": "4000.00",
				"id": 402,
				"despesas": "35280.00"
			},
			{
				"forma_pagamento": "TRIG",
				"saldo_limite": "2000.00",
				"id": 401,
				"despesas": "30280.00"
			}
			],
			formas: [],
			limite: [],
			despesas: [],
            basicData: {
				labels: [],
				datasets: [
					{
						label: 'LIMITE',
						backgroundColor: '#42A5F5',
						data: []
					},
					{
						label: 'DESPESAS',
						backgroundColor: '#FFA726',
						data: []
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
			this.formas = []
			this.limite = []
			this.despesas = []
		},
		toggleSee() {
			this.see = !this.see
		},
		async clearAndAddDataDashboard(value) {
			// await this.toggleSee()	
			await this.clearDashboard()
			await this.addData(value)
		},
		addData(value) {
			if (value.length > 0) {
				value.forEach((valueItem) => {
					valueItem.forEach((item) => {
						this.formas.push(item.forma_pagamento);
						this.limite.push(item.saldo_limite);
						this.despesas.push(item.despesas);
					})	
				})
			this.createDashboard()	
			} else {
				this.toggleSee()
			}
		},
		async createDashboard() {
			this.basicData.labels = this.formas
			this.basicData.datasets[0].data = this.limite
			this.basicData.datasets[1].data = this.despesas
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