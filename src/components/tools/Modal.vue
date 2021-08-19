<template>
    <div> 
          <md-dialog :md-active.sync="showModal">
            <md-dialog-title>EDITAR</md-dialog-title>
                    <slot></slot>
            <md-button class="md-primary" @click="toggleModal">Close</md-button>
            <md-button class="md-primary" @click="toggleModal">Save</md-button>
          </md-dialog>
    </div>
</template>

<script>

    export default {
        name: 'modal',
        props: {
            showModal:{
                type: [Boolean],
                required: true
            }
        },
        data() {
            return {
                msg: "Óla mundo",
                showDialog: this.showModal
            }
        },
        methods: {
            toggleModal: function()
            {
                this.showDialog = !this.showDialog;    
            }
        }
    }

</script>

<style >
    .md-dialog-container {
        overflow: scroll !important;
    }
</style>
