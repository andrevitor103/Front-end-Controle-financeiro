<template>
    <div>
        <md-card>
            <md-card-header>
                <md-card-header-text>
                <div class="md-title">CONTA</div>
                </md-card-header-text>
                <md-card-media md-big>
                </md-card-media>
            </md-card-header>
            <md-card-content>
              <form @submit.prevent="updateUser()" enctype="multipart/form-data">
           
           <div v-if="loadForm">
                <md-progress-spinner md-mode="indeterminate"></md-progress-spinner>
            </div>
            
            <div class="md-layout md-gutter">

                <div class="md-layout-item md-size-50 md-small-size-100">
                    <md-field :class="{'md-invalid': $v.user.email.$error}">
                        <label for="email">E-MAIL</label>
                        <md-input type="email" name="email" id="email" autocomplete="email" v-model.trim="$v.user.email.$model" />
                        <span class="md-error" v-if="!$v.user.email.required">Campo obrigatório</span>
                        <span class="md-error" v-else-if="!$v.user.email.email">Campo deve conter um email válido</span>
                    </md-field>
                </div>
                
                <div class="md-layout-item md-size-50 md-small-size-100">
                    <md-field :class="{'md-invalid': $v.user.username.$error}">
                        <label for="usuario">Usuário</label>
                        <md-input type="text" name="usuario" id="usuario" autocomplete="given-name" v-model.trim="$v.user.username.$model" />
                        <span class="md-error" v-if="!$v.user.username.required">Campo obrigatório</span>
                        <span class="md-error" v-else-if="!$v.user.username.minLength">Campo deve conter no mínimo 3 caracteres</span>
                    </md-field>
                </div>

                <div class="md-layout-item md-size-50 md-small-size-100">
                    <md-field :class="{'md-invalid': $v.user.user_password.$error}">
                        <label for="senha">Senha</label>
                        <md-input type="password" name="senha" id="senha" autocomplete="given-name" v-model.trim="$v.user.user_password.$model" />
                        <span class="md-error" v-if="!$v.user.user_password.required">Campo obrigatório</span>
                        <span class="md-error" v-else-if="!$v.user.user_password.minLength">Campo deve conter no mínimo 8 caracteres</span>
                    </md-field>
                </div>
            </div>
            <md-button type="submit" class="md-raised md-primary" :disabled="!($v.$dirty && !$v.$invalid)">SALVAR</md-button>
            </form>
            </md-card-content>
            <md-card-actions>
            </md-card-actions>
        </md-card>
    </div>
</template>

<script>
import { required, minLength, email } from 'vuelidate/lib/validators'
import userService from '@/services/Usuarios.js'
import usuariosService from '@/services/Usuarios.js'

export default {
    name: 'view-account',
    components: {
    },
    data () {
        return {
            msg: 'Óla mundo',
            loadForm: false,
            error: false,
            fotoUsuarioTmpt: "",
            user: {
                username: '',
                user_password: '',
                email: '',
                picture_user: null
            }, 
        }
    },
    methods: {
        viewUser: function () {
            usuariosService.view()
            .then((response) => {
                console.log(response)
                this.user = response.data.user
            })
            .catch((error) => {
                console.log(error)
            })
        },
        updateUser: function () {
            //console.log(this.user.picture_user)
            userService.update(this.user)
            .then((response) => {
                console.log(response)
            })
            .catch((error) => {
                console.log(error)
            })
        },
        fotoUsuario: function (event) {
            console.log(event.target.files)
            
            //document.querySelector('[name=userPicture]').classList.toggle("animate__bounceInUp")
            
            //this.fotoUsuarioTmpt = URL.createObjectURL(event.target.files[0])
        },
    },
     validations: {
            user: {
                username: {
                    required,
                    minLength: minLength(3)
                },
                user_password: {
                    required,
                    minLength: minLength(8)
                },
                email: {
                    required,
                    email
                }
            } 
        },
    mounted () {
        this.viewUser()
    }
}
</script>

<style lang="css" scoped>
    .imageSize {
        max-height: 100%;
        object-fit: contain;
    }
</style>
