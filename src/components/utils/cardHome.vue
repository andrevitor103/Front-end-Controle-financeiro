<template>
    <div class="md-layout">
        <md-card>

      <md-card-content>
        <div>
            <div class="md-layout md-gutter">             
                <div class="md-layout-item md-small-size-100">
                
                        <p>CONTA</p>
                        <p>CONTA</p>
                        <p>CONTA</p>
                        <p>CONTA</p> 
                </div> 
            </div>             
        </div>
      </md-card-content>

      <md-card-actions>
       <md-button class="md-icon-button click"  @click="activeModal(despesaDt.id)" >
                    <md-icon>visibility</md-icon>
        </md-button>
      </md-card-actions>
    </md-card>
    </div>
</template>

<script>
export default {
    name: 'app-card-home',
    data () {
        return {

        }
    }
}
</script>

<style lang="css" scoped>
    
</style>