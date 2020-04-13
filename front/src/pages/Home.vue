<template>
    <div class='home'>
        <b-container class='hm-card-container'>
            <h1> Bem vindo ao Beauty {{user.name}} </h1>
            <b-row>
                <b-col>
                    <b-card bg-variant="primary" text-variant="white" header="Entrada" class="text-center">
                        <b-card-text>R$4.000,00</b-card-text>
                    </b-card>
                </b-col>
                <b-col>
                    <b-card bg-variant="danger" text-variant="white" header="Saida" class="text-center">
                        <b-card-text>R$5.000,00</b-card-text>
                    </b-card>
                </b-col>
                <b-col>
                    <b-card bg-variant="warning" text-variant="white" header="Devendos" class="text-center">
                        <b-card-text>R$20.000,00</b-card-text>
                    </b-card>
                </b-col>
            </b-row>
        </b-container>
        <b-container class='hm-buttons-container'>
            <b-row>
                <b-col cols='2'>
                    <router-link to='/transacao' tag='button' class='btn-rapidos'> Caixa </router-link>
                </b-col>
                <b-col cols='2'>
                    <router-link to='/compra' tag='button' class='btn-rapidos'> Produto </router-link>
                </b-col>
            </b-row>
        </b-container>
        <b-container class="hm-schedule-container">
            <h3> Agenda de hoje </h3>
            <ol v-for='agenda in agendas' :key='agenda' class='schedule'>
                <li>
                    <a> A(o) cliente {{agenda.cliente}} irá {{agenda.servico}} com {{agenda.funcionario}} 
                        as {{agenda.horario}} do dia {{agenda.dia}}, {{agenda.situacao}}. 
                    </a>
                </li>
            </ol>
        </b-container>
    </div>
</template>

<script>
    export default {
        name: 'lvHome',
        data() {
            return {
                user: {},
                agendas: []
            };
        },
        methods:{
            getUserDetails() {
                let token = localStorage.getItem("jwt");
                let decoded = VueJwtDecode.decode(token);
                this.user = decoded;
            },
            getAgenda(){
                let token = localStorage.getItem('jwt');
                let config = {
                    headers: { Authorization: `Bearer ${token}` }
                }
                this.$http.get('/agenda/agendas/', config)
                    .then(res => {
                        this.agendas = res.data;
                    })
                    .catch(error => {
                        console.log(error);
                    })
            }
        },
        created() {
            this.getUserDetails();
            this.getAgenda();
        }
    }
</script>

<style>

    .hm-card-container{
        margin: 2rem auto;
    }

    .hm-schedule-container{
        margin: 2rem auto;
    }

    .schedule{
        padding: 0;
    }

    .schedule li{
        counter-reset: li;
        list-style: none;
        *list-style: decimal;
        font-size: 20px;
        font-family: 'Raleway', sans-serif;
        padding: 0;
        margin-bottom: 0.5em;
        cursor: pointer;
    }

    .schedule a{
        position: relative;
        display: block;
        padding: .4em .4em .4em 2.2em;
        *padding: .4em;
        margin: .5em 0;
        background: rgb(33, 64, 173);
        color: white;
        text-decoration: none;
        box-shadow:inset 0.5em 0 black;
        -webkit-transition: box-shadow 1s; /* For Safari 3.1 to 6.0 */
        transition: box-shadow 1s;
    }

    .schedule a:hover{
        box-shadow:inset 2em 0 black;
        color: white;
    }

    h1{
        font-size: 2rem;
        margin-bottom: 2rem;
    }

    h3{
        margin-bottom: 2rem;
    }

    .home{
        height: 100vh;
        overflow: auto;
    }

    .btn-rapidos{
        width: 100%;
        border:1px solid var(--bluu);
        padding:5px 0;
        background: transparent;
        font-size: 1.1rem;
        color: var(--bluu);
        transition: 0.5s ease-out linear;
        border-radius: 5px;
    }

    .btn-rapidos:hover{
        background: var(--bluu);
        color: white;
        transition: 0.2s linear;
    }
</style>