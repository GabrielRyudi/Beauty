<template>
    <div class='content-container'>
        <b-container class="header-content">
            <b-row>
                <b-col>
                    <p> Transação </p>
                </b-col>
            </b-row>
        </b-container>
        <b-container class='add'>
            <b-button squared variant="outline-success" v-b-toggle.collapse-4 class="m-1 toggle-btn">
                <v-awt icon="plus"></v-awt> Adicionar transação
            </b-button>
            <b-collapse id="collapse-4">
                <b-alert dismissible fade :show="showDismissibleAlert" 
                    @dismissed="showDismissibleAlert=false">
                        {{mensagem}}
                </b-alert>
                <b-form class='form-div'>
                    <b-row>
                        <b-col class='form-input-override'>
                            <label class="sr-only" for="nome">Tipo</label>
                            <b-input-group class="mb-2 mr-sm-2 mb-sm-0">
                                <template v-slot:append>
                                    <b-input-group-text><v-awt icon='cash-register'></v-awt></b-input-group-text>
                                </template>
                                <b-form-select v-model="tipo" :options="kind"></b-form-select>
                            </b-input-group>
                        </b-col>
                        <b-col class='form-input-override' style='padding-left:5px!important;'>
                            <label class="sr-only" for="celular">Trasação</label>
                            <b-input-group class="mb-2 mr-sm-2 mb-sm-0">
                                <template v-slot:append>
                                    <b-input-group-text><v-awt icon='shopping-cart'></v-awt></b-input-group-text>
                                </template>
                                <b-form-select v-model="transacao" :options="transaction">
                                </b-form-select>
                            </b-input-group>
                        </b-col>
                        <b-col class='form-input-override' style='padding-left:5px!important;'>
                            <label class="sr-only" for="celular">Quantia</label>
                            <b-input-group class="mb-2 mr-sm-2 mb-sm-0">
                                <template v-slot:append>
                                    <b-input-group-text><v-awt icon='dollar-sign'></v-awt></b-input-group-text>
                                </template>
                                <b-input v-model='preco' placeholder="Preço - 0.00" type='number'></b-input>
                            </b-input-group>
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col cols='8' class='form-input-override'>
                            <label class="sr-only" for="celular">Pessoa</label>
                            <b-input-group class="mb-2 mr-sm-2 mb-sm-0">
                                <template v-slot:append>
                                    <b-input-group-text><v-awt icon='user'></v-awt></b-input-group-text>
                                </template>
                                <b-input v-model='pessoa' placeholder="Quem está realizando a transação?" ></b-input>
                            </b-input-group>
                        </b-col>
                        <b-col cols='4' class='form-input-override' style='padding-left:5px!important;'>
                            <label class="sr-only" for="celular">Data</label>
                            <b-input-group class="mb-2 mr-sm-2 mb-sm-0">
                                <template v-slot:append>
                                    <b-input-group-text><v-awt icon='calendar'></v-awt></b-input-group-text>
                                </template>
                                <b-input v-model='data' type='date'></b-input>
                            </b-input-group>
                        </b-col>
                    </b-row>                    
                </b-form>
                <b-button variant="success" class='salva-btn' @click='submitForm()'>Salvar</b-button>
            </b-collapse>        
        </b-container>
        <b-container class='list'>
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
        name: 'lvTransaction',
        data() {
            return{
                id: '',
                tipo: '',
                transacao: '',
                preco: '',
                data: '',
                pessoa: '',
                mensagem: '',
                sortBy: 'data',
                filter: null,
                filterOn: 'pessoa',
                perPage: 10,
                currentPage: 1,
                showDismissibleAlert: false,
                kind:[
                    { value: 'Entrada', text: 'Entrada' },
                    { value: 'Saída', text: 'Saída' }
                ],
                transaction:[
                    { value: 'Serviço', text: 'Serviço' },
                    { value: 'Pagamento', text: 'Pagamento' },
                    { value: 'Emprestimo', text:'Notinha'},
                    { value: 'Estocagem', text:'Estocagem'},
                    { value: 'Outros', text:'Outros'}
                ],
                fields:[
                    {
                        key: 'tipo',
                        label: 'Tipo',
                        sortable: true
                    },
                    {
                        key:'transacao',
                        label:'Transação',
                        sortable: false
                    },
                    {
                        key:'quantia',
                        label:'Quantia',
                        sortable: false
                    },
                    {
                        key: 'data',
                        label: 'Data',
                        sortable: true
                    },
                    {
                        key: 'pessoa',
                        label: 'Pessoa',
                        sortable: false
                    }
                ],
                items:[

                ]
            }
        },
        methods: {
            submitForm(){
                let transacao = {
                    tipo: this.tipo,
                    transacao: this.transacao,
                    quantia: this.preco,
                    data:this.data,
                    pessoa: this.pessoa,
                };
                let token = localStorage.getItem('jwt');
                let config = {
                    headers: { Authorization: `Bearer ${token}` }
                }
                this.$http.post('/transacao/', transacao, config)
                    .then(response => {
                        this.mensagem = response.data.msg;
                        this.showDismissibleAlert = true;
                        this.clean();
                        this.getInfo();
                    })
                    .catch(error => {
                        console.log(error)
                        this.errored = true
                    })
            },
            getInfo(){
                let token = localStorage.getItem('jwt');
                let config = {
                    headers: { Authorization: `Bearer ${token}` }
                }
                this.$http.get('/transacao/', config)
                    .then(response => {
                        this.items = response.data; 
                    })
                    .catch(error => {
                        console.log(error)
                        this.errored = true
                    })
            },
            getTran(){

            },
            updateTran(){
                let id = this.id;
                let transacao = {
                    tipo: this.tipo,
                    transacao: this.transacao,
                    quantia: this.preco,
                    data:this.data,
                    pessoa: this.pessoa,
                };
                let token = localStorage.getItem('jwt');
                let config = {
                    headers: { Authorization: `Bearer ${token}` }
                }
                this.$http.put('/transacao/'+id, transacao, config)
                    .then(response => {
                        this.mensagem = response.data.msg;     
                    })
                    .catch(error => {
                        console.log(error)
                        this.errored = true
                    })
            },
            deleteTran(){
                let id= this.id;
                let token = localStorage.getItem('jwt');
                let config = {
                    headers: { Authorization: `Bearer ${token}` }
                }
                this.$http.delete('/transacao/'+id, config)
                    .then(response => {
                        this.mensagem = response.data.msg;     
                    })
                    .catch(error => {
                        console.log(error)
                        this.errored = true
                    })
            },
            clean(){
                this.tipo = '',
                this.transacao = '',
                this.quantia = '',
                this.data = '',
                this.pessoa = ''
            },
            onFiltered(filteredItems) {
                this.totalRows = filteredItems.length
                this.currentPage = 1
            }
        },
        created() {
            this.getInfo();
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

    .form-input-override select:focus{
        outline: none!important;
        box-shadow: none!important;
    }

    .form-div{
        padding: 0 15px;
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

    #collapse-4{
        margin: 0!important;
        width: 60%!important;
    }

</style>