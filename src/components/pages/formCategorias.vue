<template>
    <div>
        <div class="viewport">
        <form @submit.prevent="optionSubmitForm()">
            <md-card class="md-layout-item md-size-100 md-small-size-100">
                <md-card-header>
                    <div class="md-title">CATEGORIAS</div>
                </md-card-header>
                 <md-progress-spinner v-if="loadSubmitForm"></md-progress-spinner>
                <md-card-content>
                    <div class="md-layout md-gutter">
                    <div class="md-layout-item md-size-100 md-small-size-100">
                        <md-field :class="{'md-invalid': $v.categoria.DESCRICAO.$error && errors}">
                            <label for="DESCRICAO">DESCRICAO</label>
                            <md-input name="DESCRICAO" id="DESCRICAO" v-model.trim="$v.categoria.DESCRICAO.$model" />
                            <div v-if="errors">
                                <span class="md-error" v-if="!$v.categoria.DESCRICAO.required">Campo obrigatório</span> 
                                <span class="md-error" v-else-if="!$v.categoria.DESCRICAO.minLength">Campo deve conter no mínimo 4 caracteres</span>
                            </div>
                        </md-field>
                    </div>
                    </div>
                </md-card-content>
                <md-button v-if="!loadSubmitForm && !editForm" type="submit" class="md-raised  md-primary" :disabled="!($v.$dirty && !$v.$invalid)">SALVAR</md-button>
                <md-button v-if="editForm" type="button" class="md-accent" :disabled="disabledButtonSubmitLoad" @click.prevent="disabledEditFormClearForm()">CANCELAR</md-button>
                <md-button v-if="!loadSubmitForm && editForm" type="submit" class="md-raised  md-primary" :disabled="!($v.$dirty && !$v.$invalid)">EDITAR</md-button>
                <md-button v-if="editForm" type="submit" class="md-raised  md-accent" :disabled="disabledButtonSubmitLoad">DELETAR</md-button>
            </md-card>
        </form>
        </div>
            <div class="viewport">
                <md-table>
                    <md-table-row>
                        <md-table-head class="md-table-head-label-personalized">CÓDIGO</md-table-head>
                        <md-table-head class="md-table-head-label-personalized">DESCRIÇÃO</md-table-head>
                        <md-table-head class="md-table-head-label-personalized">DATA CRIAÇÃO</md-table-head>
                    </md-table-row>
                    <md-table-row v-for="(categoria, index) in listCategoria" :key="index" @click="showCategoriaForm(categoria)">
                        <md-table-cell>{{ categoria.id }}</md-table-cell>
                        <md-table-cell>{{ categoria.DESCRICAO | UpperCase }}</md-table-cell>
                        <md-table-cell>{{ categoria.created_at | formatDate }}</md-table-cell>
                    </md-table-row>
                </md-table>
            </div>
            <div style="height: 50px">
            </div>
    </div>
</template>

<script>
import { required, minLength } from 'vuelidate/lib/validators'
import CategoriaService from '@/services/Categoria.js'
import storageService from '@/services/storage.js'

export default {
    name: 'form-categorias',
    data() {
        return {
            listCategoria: [],
            categoria: {
                DESCRICAO: null,
            },
            errors: false,
            loadSubmitForm: false,
            disabledButtonSubmitLoad: false,
            editForm: false
        }
    },
    methods: {

        optionSubmitForm () {

            if(this.formIsValidated()) {
                if (this.editForm) {
                    this.editCategoria()
                } else {
                    this.createCategoria()
                }
                this.isSucess()   
            } else {
                console.log("Erro")
                this.isError()
            }
        },
         formIsValidated () {
            return (this.$v.$dirty && !this.$v.$invalid)
        },
         async editCategoria () {
            this.toggleLoadSubmit()
            await CategoriaService.update(this.categoria)
            .then((response) => {
                console.log(response)
            })
            .catch((error) => {
                console.log(error)
            })
            this.loadListaCategoria()
            this.toggleLoadSubmit()
        },
        async createCategoria () {
            this.toggleLoadSubmit()
            await CategoriaService.create(this.categoria)
            .then((response) => {
                console.log(response)
            })
            .catch((error) => {
                console.log(error)
            })
            this.clearForm()
            this.loadListaCategoria()
            this.toggleLoadSubmit()
        },
        isError () {
            this.errors = true
        },
        isSucess () {
            this.errors = false
        },
        loadListaCategoria() {
            CategoriaService.list()
            .then((response) => {
                this.listCategoria = response.data.categorias
                console.log(response.data)
            })
            .catch((error) => {
                console.log(error)
            })
        },
        toggleSpinner () {
            this.loadSubmitForm = !this.loadSubmitForm
        },
        toggleDisabledButton () {
            this.disabledButtonSubmitLoad = !this.disabledButtonSubmitLoad
        },
        toggleLoadSubmit () {
            this.toggleSpinner()
            this.toggleDisabledButton()
        },
        enableEditForm () {
            this.editForm = true
        },
        disabledEditForm () {
            this.editForm = false
        },
        disabledEditFormClearForm () {
            this.disabledEditForm()
            this.clearForm()
            this.isSucess()
        },
        showCategoriaForm (categoriaSelected) {
            this.enableEditForm()
            this.categoria = categoriaSelected
        },
        clearForm () {
            this.categoria = {}
        }
    },
    validations: {
        categoria: {
                DESCRICAO: {
                    required,
                    minLength: minLength(4)
                },
            },
    },
    filters: {
        UpperCase (value) {
            return value.toUpperCase()
        },
        formatDate: function (value) {
                value = new Date(value)
                value = `${value.getDate()}-${(value.getMonth()+1)}-${value.getFullYear()}`
                return value
        }
    },
    mounted () {
        this.loadListaCategoria()
        storageService.userLoginSuccess('value')
    }
}
</script>

<style lang="css" scoped>
    .md-table-head {
        background-color: rgba(0,0,0,0.6);
    }
    .md-table-head-label-personalized {
        color: #fff !important;
    }    
</style>

