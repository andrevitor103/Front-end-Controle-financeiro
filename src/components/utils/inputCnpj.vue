<template>
<md-input :name="name" :id="id" :v-model="model" @keyup="formatCnpj()" />
</template>

<script>
export default {
    name: 'input-cnpj',
    props: {
        name: String,
        id: String,
        model: String
    },
    methods: {
        formatCnpj () {
            console.log(this.model.length == 2)
            switch(this.model.length){
                case 2:
                    this.model = this.addScore(this.model, '.')
                    break
                case 6:
                    this.model = this.addScore(this.model, '.')
                    break
                case 10:
                    this.model = this.addScore(this.model, '/')
                    break
                case 15:
                    this.model = this.addScore(this.model, '-')
                    break
            }
        },
    }
}
</script>

<style lang="css" scoped>
    
</style>
