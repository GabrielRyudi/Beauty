<template>
    <div class='content-container'>
        <b-container class="header-content">
            <b-row>
                <b-col>
                    <p> Agenda </p>
                </b-col>
            </b-row>
        </b-container>
        <b-container class='add'>
            <b-button squared variant="outline-success" v-b-toggle.collapse-3 class="m-1 toggle-btn">
                <v-awt icon="user-plus"></v-awt> Marcar Horario
            </b-button>
            <b-collapse id="collapse-3">
                <b-alert dismissible fade :show="showDismissibleAlert" 
                @dismissed="showDismissibleAlert=false">
	                {{mensagem}}
                </b-alert>
                <b-form class='form-div'>
                    <b-row>
                        <b-col cols='9' class='form-input-override'>
                            <label class="sr-only" for="nome">Nome</label>
                            <b-input-group class="mb-2 mr-sm-2 mb-sm-0">
                                <template v-slot:append>
                                    <b-input-group-text><v-awt icon='user'></v-awt></b-input-group-text>
                                </template>
                                <b-input v-model='cliente' placeholder="Nome completo"></b-input>
                            </b-input-group>
                        </b-col>
                        <b-col class='form-input-override' style='padding-left:5px!important;'>
                            <label class="sr-only" for="celular">Horário</label>
                            <b-input-group class="mb-2 mr-sm-2 mb-sm-0">
                                <template v-slot:append>
                                    <b-input-group-text><v-awt icon='clock'></v-awt></b-input-group-text>
                                </template>
                                <b-input v-model='horario' type="time" min="07:00" max="20:00"></b-input>
                            </b-input-group>
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col class='form-input-override'>
                            <label class="sr-only" for="nome">Dia</label>
                            <b-input-group class="mb-2 mr-sm-2 mb-sm-0">
                                <template v-slot:append>
                                    <b-input-group-text><v-awt icon='calendar'></v-awt></b-input-group-text>
                                </template>
                                <b-input v-model='dia' type='date'></b-input>
                            </b-input-group>
                        </b-col>
                        <b-col class='form-input-override' style='padding-left:5px!important;'>
                            <label class="sr-only" for="celular">Serviço</label>
                            <b-input-group class="mb-2 mr-sm-2 mb-sm-0">
                                <template v-slot:append>
                                    <b-input-group-text><v-awt icon='tag'></v-awt></b-input-group-text>
                                </template>
                                <b-input v-model='servico' placeholder="Serviço prestado"></b-input>
                            </b-input-group>
                        </b-col>
                        <b-col class='form-input-override' style='padding-left:5px!important;'>
                            <label class="sr-only" for="celular">Serviço</label>
                            <b-input-group class="mb-2 mr-sm-2 mb-sm-0">
                                <template v-slot:append>
                                    <b-input-group-text><v-awt icon='users'></v-awt></b-input-group-text>
                                </template>
                                <b-form-select v-model="funcionario" :options="funcionarios"></b-form-select>
                            </b-input-group>
                        </b-col>
                    </b-row>                
                </b-form>
                <b-button variant="success" class='salva-btn' @click='submitForm()'>Salvar</b-button>
            </b-collapse>        
        </b-container>
        <b-container class="list">
            <div style='width: 100%'>
                <b-form-group class='search-container'>
                        <b-input-group size="sm">
                            <b-form-input v-model="filter" type="search" id="filterInput" placeholder="Type to Search"></b-form-input>
                            <b-input-group-append>
                                <b-button :disabled="!filter" @click="filter = ''">Clear</b-button>
                            </b-input-group-append>
                        </b-input-group>
                    </b-form-group>
            </div>
            <b-table 
                id='the-table'
                outlined
                hover 
                head-variant='light'
                :per-page="perPage"
                :current-page="currentPage"
                :filter="filter" 
                :filterIncludedFields="filterOn" 
                :sort-by.sync="sortBy" 
                :items="items" 
                :fields="fields">
            </b-table>
            <b-pagination
                v-model="currentPage"
                :total-rows="rows"
                :per-page="perPage"
                aria-controls="the-table"
                first-number
                size="sm"
            ></b-pagination>

        </b-container>
    </div>
</template>

<script>
    import bus from '../bus.js'

    export default {
        name: 'lvFuncionario',
        data() {
            return{
                cliente: '',
                horario: '',
                dia: '',
                servico: '',
                funcionario: '',
                situacao: '',
                pago: '',
                mensagem: '',
                showDismissibleAlert: false,
                sortBy: 'dia',
                filter: null,
                filterOn: '',
                perPage: 10,
                currentPage: 1,
                funcionarios:[
                    {value:'Thayná', text: 'Thayná'},
                    {value:'Alcilene', text: 'Alcilene'},
                    {value:'Sula', text: 'Sula'},
                    {value:'Sueli', text: 'Sueli'},
                    {value:'Juliana', text: 'Juliana'},
                    {value:'Eloisa', text: 'Eloisa'},
                    {value:'Adrieli', text: 'Adrieli'}
                ],
                fields:[
                    {
                        key: 'cliente',
                        label:'Cliente',
                        sortable: true
                    },
                    {
                        key:'servico',
                        label: 'Serviço',
                        sortable: false
                    },
                    {
                        key:'funcionario',
                        label: 'Funcionário',
                        sortable: true
                    },
                    {
                        key: 'dia',
                        label:'Data',
                        sortable: true
                    },
                    {
                        key: 'horario',
                        label: 'Hora',
                        sortable: false
                    },
                    {
                        key: 'situacao',
                        label: 'Situação',
                        sortable: false
                    },
                    {
                        key:'pago',
                        label:'Pago',
                        sortable: false
                    }
                ],
                items: [

                ]
            }
        },
        methods: {
            getAgenda(){
                let token = localStorage.getItem('jwt');
                let config = {
                    headers: { Authorization: `Bearer ${token}` }
                }
                this.$http.get('/agenda/', config)
                    .then(res => {
                        this.items = res.data;
                    })
                    .catch(error => {
                        console.log(error);
                    })
            },
            submitForm(){
                let agenda = {
                    cliente: this.cliente,
                    horario: this.horario,
                    dia: this.dia,
                    servico: this.servico,
                    funcionario: this.funcionario
                };
                let token = localStorage.getItem('jwt');
                let config = {
                    headers: { Authorization: `Bearer ${token}` }
                }
                this.$http.post('/agenda/', agenda, config)
                    .then(response => {
                        this.mensagem = response.data.msg;
                        this.showDismissibleAlert = true;
                        this.clean();
                        this.getAgenda();
                    })
                    .catch(error => {
                        console.log(error)
                        this.errored = true
                    })
            },
            updateAgenda(){
                let agenda = {
                    id:this.id,
                    cliente: this.cliente,
                    horario: this.horario,
                    dia: this.dia,
                    servico: this.servico,
                    funcionario: this.funcionario
                };
                let token = localStorage.getItem('jwt');
                let config = {
                    headers: { Authorization: `Bearer ${token}` }
                }
                this.$http.put('/agenda/'+id, agenda, config)
                    .then(response => {
                        this.mensagem = response.data.msg;     
                    })
                    .catch(error => {
                        console.log(error)
                        this.errored = true
                    })
            },
            updadeSitu(){
                let agenda = {
                    id:this.id,
                    situacao: this.situacao,
                    pago: this.pago
                };
                let token = localStorage.getItem('jwt');
                let config = {
                    headers: { Authorization: `Bearer ${token}` }
                }
                this.$http.put('/agenda/services', agenda, config)
                    .then(response => {
                        this.mensagem = response.data.msg;     
                    })
                    .catch(error => {
                        console.log(error)
                        this.errored = true
                    })
            },
            deleteAgenda(){
                let id= this.id;
                let token = localStorage.getItem('jwt');
                let config = {
                    headers: { Authorization: `Bearer ${token}` }
                }
                this.$http.delete('/agenda/'+id, config)
                    .then(response => {
                        this.mensagem = response.data.msg;     
                    })
                    .catch(error => {
                        console.log(error)
                        this.errored = true
                    })
            },
            pesquisa(){
                console.log('pesquisando');
            },
            clean(){
                this.cliente = '';
                this.horario = '';
                this.dia = '';                   
                this.servico = '';
                this.funcionario  = '';
            },
            onFiltered(filteredItems) {
                this.totalRows = filteredItems.length
                this.currentPage = 1
            }
        },
        created() {
            this.getAgenda();
        },
        computed: {
            rows() {
                return this.items.length
            }
        }
    }

</script>

<style>

    .header-content p{
        margin: 0;
        font-size: 1.6rem;
        font-family: 'Times New Roman', Times, serif;
    }

    .add{
        padding: 0!important;
    }

    .toggle-btn{
        margin: 15px 0 10px 0!important;
        transition: 0.4s ease-in-out;
    }

    .toggle-btn:hover{
        transition: 0.4s ease-in-out;
    }

    .toggle-btn:active{
        box-shadow: none!important;
    }

    .toggle-btn:focus{
        box-shadow: none!important;
    }

    .salva-btn{
        margin: 5px 0 10px 0!important;
        transition: 0.4s ease-in-out;
    }

    .salva-btn:hover{
        transition: 0.4s ease-in-out;
    }

    .salva-btn:active{
        box-shadow: none!important;
    }

    .salva-btn:focus{
        box-shadow: none!important;
    }

    .form-input-override{
        padding: 10px 0px!important;
    }

    .form-input-override input:focus{
        outline: none!important;
        box-shadow: none!important;
    }

    .form-div{
        padding: 0 15px;
    }
    
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

    .input-search{
        display: flex;
        flex-direction: row;
        width: 100%;
    }

    .input-search input{
        width: 90%;   
        border: none;
        border:1px solid #95a5a6;  
        padding-left: 2px;
    }

    .input-search input:focus{
        outline: 0;
        -webkit-box-shadow: none !important;
        box-shadow: none !important;   
    }

    .icon{
        width: 10%;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0;
        background: #95a5a6;
        color: white;
        cursor: pointer;
    }

    #collapse-3{
        margin: 0!important;
        width: 60%!important;
    }

</style>