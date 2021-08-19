<template>
    <div>
        <md-card class="md-layout-item md-size-80 md-small-size-80 center animate__animated animate__fadeInUp">
      <md-card-header>
        <div class="md-title">CRIAR CONTA</div>
      </md-card-header>

      <md-card-content>
      
        <md-toolbar :class="{'md-accent': error, 'md-primary': !error, 'md-dense': true}" v-if="error">
            <h4 class="md-title">{{ msg }}</h4>
        </md-toolbar>

          <form @submit.prevent="registerUser()">
           
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

                <div class="md-layout-item md-size-25 md-small-size-100">
                    <md-field :class="{'md-invalid': $v.user.picture_user.$error}">
                        <label>Foto usuário</label>
                            <md-file name="foto_perfil" accept="image/*" @change="fotoUsuario($event)" v-model.trim="$v.user.picture_user.$model" />
                            <span class="md-error" v-if="!$v.user.picture_user.required">Campo obrigatório</span>
                    </md-field>
                </div>

                 <div class="md-layout-item md-size-25 md-small-size-100">
                        <md-avatar class="md-large">
                            <img :src="fotoUsuarioTmp" alt="User" name="userPicture" class="animate__animated">
                        </md-avatar>
                </div>

            </div>
            <md-button type="submit" class="md-raised md-primary" :disabled="!($v.$dirty && !$v.$invalid)">CRIAR</md-button>
            </form>
      </md-card-content>

      <md-card-actions>
      <router-link to="/"><md-button>Home</md-button></router-link>
        <router-link to="/login"><md-button>Login</md-button></router-link>
      </md-card-actions>
    </md-card>
    </div>
</template>

<script>
import { required, minLength, email } from 'vuelidate/lib/validators'
import router from '@/router'
import UserService from '@/services/Usuarios.js'

    export default {
        name: 'createAccount',
        data() {
            return {
                msg: '',
                loadForm: false,
                error: false,
                fotoUsuarioTmp: 'img/logo.png',
                user: {
                    username: '',
                    user_password: '',
                    email: '',
                    picture_user: ''
                } 
            }
        },
        methods: {
            fotoUsuario: function (event) {
                console.log(event.target.files)
                
                document.querySelector('[name=userPicture]').classList.toggle("animate__bounceInUp")
                
                this.fotoUsuarioTmp = URL.createObjectURL(event.target.files[0])
            },
            registerUser: async function () {
                this.toggleLoad()

                await UserService.create(this.user)
                .then((response) => {
                    console.log(response)

                    if (this.isTrue(response.data, 'novo_usuario') && this.formIsValidated()) {
                        router.push({name: 'login'})
                    } else {
                        this.changeError(true)
                        this.changeMessage('Ocorreu algum erro ao salvar, favor verificar seus dados')
                    }
                })
                .catch((error) => {
                    console.log(error)
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
                },
                picture_user: {
                    required
                }
            } 
        },
        computed: {
            
        }
    }
</script>

<style scoped>
    .center {
        left: 100px;
    } 
</style>
