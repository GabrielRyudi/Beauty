<template>
    <div class='login-container'>
        <b-modal 
            title="Aviso!"
            v-model="modalShow"
            :header-bg-variant="headerBgVariant"
            :footer-bg-variant="footerBgVariant"
            button-size="sm"
        >Erro no Login!<br/>Por favor verifique suas credenciais</b-modal>
        <div class='login-card'>
            <p> Login </p>
            <p class='subtitle'> Bem vindo ao Beauty </p>
            <b-row class='login-card-rw'>
                <b-col class='login-card-cl'>
                    <label class='sr-only' for="email">Email</label>
                    <b-input-group class="mb-2 mr-sm-2 mb-sm-0">
                        <template v-slot:append>
                            <b-input-group-text class='modify'><v-awt icon='user'></v-awt></b-input-group-text>
                        </template>
                        <b-input v-model='login.email' placeholder="Email"></b-input>
                    </b-input-group>
                </b-col>
            </b-row>
            <b-row class='login-card-rw'>
                <b-col class='login-card-cl'>
                    <label class='sr-only' for="senha">Senha</label>
                    <b-input-group class="mb-2 mr-sm-2 mb-sm-0">
                        <template v-slot:append>
                            <b-input-group-text class='modify'><v-awt icon='lock'></v-awt></b-input-group-text>
                        </template>
                        <b-input v-model='login.password' placeholder="Senha" type='password'></b-input>
                    </b-input-group>
                </b-col>
            </b-row>
            <b-row class='login-card-rw'>
                <b-col>
                    <b-button @click="loginUser()" class='btn-login'>Entrar</b-button>
                </b-col>
            </b-row>
            <b-row>
                <b-col>
                    <p class='rodape'> Gabriel R. A. Nakatani @ Alguns direitos reservados, 2020</p>
                </b-col>
            </b-row>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        name: 'lvLogin',
        data(){
            return{
                login:{
                    email: '',
                    password: ''
                },
                mensagem: '',
                modalShow: false,
                headerBgVariant: 'danger',
                footerBgVariant: 'danger',
            }
        },
        methods:{
            async loginUser() {
                try {
                    let response = await this.$http.post("/usuario/login", this.login);
                    let token = response.data.token;
                    localStorage.setItem("jwt", token);
                    if (token) {
                        this.$router.push("/home");
                    }
                } catch (err) {
                    console.log(err.response);
                    this.modalShow = true;
                }
            }
        }
    }
</script>

<style>

    .login-container{
        height: 100%;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .login-card{
        width: 27%;
        padding: 30px;
        border-radius: 8px;
        background: #1e3799;
    }

    .login-card p{
        font-size: 1.7rem;
        color: white;
        text-align: center;
        margin: 0;
        font-family: 'Roboto', sans-serif;
    }

    .subtitle{
        font-size: 0.8rem!important;
        margin-bottom: 3rem!important;
    }

    .login-card-rw{
        margin-top: 1.3rem;
    }

    .login-card-rw input{
        outline: none!important;
        box-shadow: none!important;
        background: transparent;
        border:none;
        border-bottom: 1px solid white;
        border-radius: 0;
        color: white!important;
    }

    .login-card-rw input:focus{
        outline: none!important;
        box-shadow: none!important;
        background: transparent;
        border-bottom: 1px solid white;
    }

    .login-card-rw label{
        font-weight: bolder;
        font-size: 0.7rem;
        color: white;
        margin:0;
    }

    .modify {
        color: white!important;
        border: none!important;
        border-bottom: 1px solid white!important;
        border-radius: 0!important;
        background-color: transparent!important;
    }

    .login-card-cl{
        margin-bottom: 1rem;
    }

    .btn-login{
        width: 100%;
        margin-top: 0.8rem;
        background: transparent;
        border:1px solid #78e08f;
        color: #78e08f;
        text-transform: uppercase;
    }

    .btn-login:hover{
        background: transparent;
        border:1px solid #78e08f;
        color: #78e08f;
    }

    .btn-login:focus{
        background: transparent;
        border:1px solid #78e08f;
        color: #78e08f;
    }

    .login-card-rw input::-webkit-input-placeholder{
        color: white;
    }

    .login-card-rw input::-ms-input-placeholder{
        color: white;
    }

    .login-card-rw input::-moz-placeholder{
        color: white;
    }

    .rodape{
        color: white!important;
        font-size: 0.6rem!important;
        margin-top: 1.2rem!important;
        margin-bottom: 0!important;
    }

</style>
