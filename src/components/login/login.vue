<template>
<div>
        <md-toolbar :class="{'md-accent': error, 'md-primary': !error, 'md-dense': true}" v-if="error">
            <h4 class="md-title">{{ msg }}</h4>
        </md-toolbar>

        <form @submit.prevent="logar()" novalidate class="animate__animated animate__fadeInUp">
           
           <div v-if="loadForm">
                <md-progress-spinner md-mode="indeterminate"></md-progress-spinner>
            </div>
            
           <md-card class="md-layout-item md-size-50 md-small-size-100 center">
        <md-card-header>
          <div class="md-title">Seja bem vindo ao EC</div>
        </md-card-header>
        
         <md-card-content>
          <div class="md-layout md-gutter">
            
                <div class="md-layout-item md-small-size-100">
                <md-field :class="{'md-invalid': $v.credentialsUser.username.$error}">
                    <label for="username">Usuário</label>
                        <md-input name="username" id="username" autocomplete="given-name" 
                        v-focus 
                        v-model.trim="$v.credentialsUser.username.$model" 
                        />
                        <span class="md-error" v-if="!$v.credentialsUser.username.required">Campo obrigatório</span>
                        <span class="md-error" v-else-if="!$v.credentialsUser.username.minLength">Campo deve ter no mínimo 3 caracteres</span>
                        </md-field>
                </div>

                <div class="md-layout-item md-small-size-100">
                <md-field  :class="{'md-invalid': $v.credentialsUser.user_password.$error}">
                    <label for="senha">Senha</label>
                        <md-input type="password" name="senha" id="senha" 
                         v-model.trim="$v.credentialsUser.user_password.$model"
                        />
                        <span class="md-error" v-if="!$v.credentialsUser.user_password.required">Campo obrigatório</span>
                        <span class="md-error" v-else-if="!$v.credentialsUser.user_password.minLength">Campo deve ter no mínimo 8 caracteres</span>
                        </md-field>
            </div>
            </div>
        </md-card-content>
         <router-link to="/create-account"><md-button class="md-primary">Criar conta</md-button></router-link>
         <md-button type="submit" class="md-accent" :disabled="!($v.$dirty && !$v.$invalid)">Acessar</md-button>
        </md-card>
        </form>
</div>
</template>

<script>
import { required, minLength } from 'vuelidate/lib/validators'
import router from '@/router'
import UserService from '@/services/Usuarios.js'
import storageService from '@/services/storage.js'

const focus = {
    inserted: (el) => {
        el.focus()
    },
}
    
export default {
    router,
    directives: {
        focus
    },
    name: 'login',
    data() {
        return {
            msg: '',
            loadForm: false,
            error: false,
            credentialsUser: {
                username: '',
                user_password: ''
            }
        }
    },
    methods: {
    logar: async function()
    {
        this.toggleLoad()
        
        await UserService.login(this.credentialsUser)
        .then((response) => {
            console.log(response)
            if (this.isTrue(response.data,'Logado com sucesso') && this.formIsValidated()) {
                storageService.setStorage('value', response.data.id_user)
                storageService.setStorage('picture', "@/assets/perfil.jpg")
                router.push({name: 'home'})   
            } else {
                this.changeError(true)
                this.changeMessage('Usuário inválido')
                }
        })
        .catch((error) => {
            console.log(error)
            this.changeError(true)
            this.changeMessage('Houve algum problema, tente novamente')
        })
        
        this.toggleLoad() 
    },
     toggleLoad: function () {
            this.loadForm = !this.loadForm
    },
    changeError: function (status) {
            this.error = status
    },
    changeMessage: function (message) {
        this.msg = message
    },
    isTrue: function (response, check) {
        if(check in response) {
            return true
        }
        return false
    },
    formIsValidated: function () {
        return (this.$v.$dirty && !this.$v.$invalid)
        }
    },
    validations: {
    credentialsUser: {
            username: {
                required,
                minLength: minLength(3)
            },
            user_password: {
                required,
                 minLength: minLength(8)
            }
        }
    },
    mounted() {
        storageService.removeStorage('value')
        storageService.removeStorage('picture')
    },
}

</script>

<style scoped>

.md-avatar.md-large {
    min-width: 101px;
    min-height: 97px;
}

.md-title {
    color: rgba(255,0,0,1);
}

 .center {
        display: inline-block;
}

.error {
    color: #f00;
}

</style>

