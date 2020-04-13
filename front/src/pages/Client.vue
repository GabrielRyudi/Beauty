<template>
    <div class='cliente'>
        <b-container class="client-header-content">
            <b-row>
                <b-col>
                    <p> Cliente</p>
                </b-col>
            </b-row>
        </b-container>
        <b-container class='client-add'>
            <b-button squared variant="outline-success" v-b-toggle.collapse-2 class="m-1 toggle-btn">
                <v-awt icon="user-plus"></v-awt> Adicionar Cliente
            </b-button>
            <b-collapse id="collapse-2">
                <b-alert dismissible fade :show="showDismissibleAlert" 
                    @dismissed="showDismissibleAlert=false">
                        {{mensagem}}
                </b-alert>
                <b-form class='form-div'>
                    <b-row>
                        <b-col cols='8' class='form-input-override'>
                            <label class="sr-only" for="nome">Nome</label>
                                <b-input-group class="mb-2 mr-sm-2 mb-sm-0">
                                    <template v-slot:append>
                                        <b-input-group-text><v-awt icon='user'></v-awt></b-input-group-text>
                                        </template>
                                        <b-input id="nome" name='nome' v-model='nome' placeholder="Nome completo"></b-input>
                                    </b-input-group>
                                </b-col>
                                <b-col class='form-input-override' style='padding-left:5px!important;'>
                                    <label class="sr-only" for="datanasc">Data de nascimento</label>
                                    <b-input-group class="mb-2 mr-sm-2 mb-sm-0">
                                        <template v-slot:append>
                                            <b-input-group-text><v-awt icon='calendar-alt'></v-awt></b-input-group-text>
                                        </template>
                                        <b-input id="datanasc" 
                                            name='datanasc' 
                                            v-model='datanasc' 
                                            type="date">
                                        </b-input>
                                    </b-input-group>
                                </b-col>
                            </b-row>
                            <b-row>
                                <b-col class='form-input-override' style='padding-right:5px!important;'>
                                    <label class="sr-only" for="celular">Celular</label>
                                    <b-input-group class="mb-2 mr-sm-2 mb-sm-0">
                                        <template v-slot:append>
                                            <b-input-group-text><v-awt icon='mobile'></v-awt></b-input-group-text>
                                        </template>
                                        <b-input id="celular" 
                                            name='celular' 
                                            v-model='celular' 
                                            placeholder="Celular"
                                            type="number">
                                        </b-input>
                                    </b-input-group>
                                </b-col>
                                <b-col class='form-input-override'>
                                    <label class="sr-only" for="cidade">Cidade</label>
                                    <b-input-group class="mb-2 mr-sm-2 mb-sm-0">
                                        <template v-slot:append>
                                            <b-input-group-text><v-awt icon='city'></v-awt></b-input-group-text>
                                        </template>
                                        <b-input id="cidade" 
                                            name='cidade' 
                                            v-model='cidade' 
                                            placeholder="Cidade"
                                        >
                                        </b-input>
                                    </b-input-group>
                                </b-col>
                                <b-col class='form-input-override' style='padding-left:5px!important;'>
                                    <label class="sr-only" for="bairro">Bairro</label>
                                    <b-input-group class="mb-2 mr-sm-2 mb-sm-0">
                                        <template v-slot:append>
                                            <b-input-group-text><v-awt icon='map-marker-alt'></v-awt></b-input-group-text>
                                        </template>
                                        <b-input id="bairro" 
                                            name='bairro' 
                                            v-model='bairro' 
                                            placeholder="Bairro"
                                        >
                                        </b-input>
                                    </b-input-group>
                                </b-col>
                            </b-row>
                            <b-row>
                                <b-col class='form-input-override' style='padding-right:5px!important;'>
                                    <label class="sr-only" for="rua">Rua</label>
                                    <b-input-group class="mb-2 mr-sm-2 mb-sm-0">
                                        <template v-slot:append>
                                            <b-input-group-text><v-awt icon='map-marker'></v-awt></b-input-group-text>
                                        </template>
                                        <b-input id="rua" 
                                            name='rua' 
                                            v-model='rua' 
                                            placeholder="Rua"
                                        >
                                        </b-input>
                                    </b-input-group>
                                </b-col>
                                <b-col cols='3' class='form-input-override'>
                                    <label class="sr-only" for="numero">Número</label>
                                    <b-input-group class="mb-2 mr-sm-2 mb-sm-0">
                                        <template v-slot:append>
                                            <b-input-group-text><v-awt icon='map-pin'></v-awt></b-input-group-text>
                                            </template>
                                            <b-input id="numero" 
                                                name='numero' 
                                                v-model='numero' 
                                                placeholder="Numero"
                                                type="number"
                                            >
                                            </b-input>
                                        </b-input-group>
                                    </b-col>
                            </b-row>
                            <b-row>
                                <b-col class='form-input-override'>
                                    <label class="sr-only" for="obs">Observações</label>
                                    <b-form-textarea
                                        id="obs"
                                        name="obs"
                                        v-model="obs"
                                        placeholder="Observações"
                                        rows="3"
                                        no-resize
                                    ></b-form-textarea>
                                </b-col>
                            </b-row>
                        </b-form>
                        <b-button variant="success" class='salva-btn' @click='submitForm()'>Salvar</b-button>
                    </b-collapse> 
        </b-container>  
        <b-container class='client-list'>
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
    import axios from "axios";

    export default {
        name: 'lvClient',
        data() {
            return{
                id: '',
                nome: '',
                celular: '',
                datanasc: '',
                rua: '',
                bairro: '',
                cidade: '',
                numero: '',
                obs: '',
                mensagem: '',
                sortBy: 'nome',
                filter: null,
                filterOn: 'nome',
                perPage: 10,
                currentPage: 1,
                showDismissibleAlert: false,
                fields:[
                    {
                        key: 'nome',
                        label: 'Nome',
                        sortable: true
                    },
                    {
                        key:'celular',
                        label:'Celular',
                        sortable: false
                    },
                    {
                        key:'rua',
                        label:'Rua',
                        sortable: false
                    },
                    {
                        key: 'bairro',
                        label: 'Bairro',
                        sortable: false
                    },
                    {
                        key: 'cidade',
                        label: 'Cidade',
                        sortable: false
                    },
                    {
                        key: 'numero',
                        label: 'Numero',
                        sortable: false
                    },
                    {
                        key:'datanasc',
                        label: 'Nascimento',
                        sortable:false
                    },
                    {
                        key:'obs',
                        label: 'Observação',
                        sortable: false
                    }
                ],
                items:[

                ]
            }
        },
        methods: {
            submitForm(){
                let cliente = {
                    nome: this.nome,
                    celular: this.celular,
                    datanasc: this.datanasc,
                    rua: this.rua,
                    bairro: this.bairro,
                    cidade: this.cidade,
                    numero: this.numero,
                    obs: this.obs
                };
                let token = localStorage.getItem('jwt');
                let config = {
                    headers: { Authorization: `Bearer ${token}` }
                }
                this.$http.post('/cliente/', cliente, config)
                    .then(response => {
                        this.mensagem = response.data.msg;
                        this.showDismissibleAlert = true;
                        this.cleanCli();
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
                this.$http.get('/cliente/', config)
                    .then(response => {
                        this.items = response.data; 
                        console.log(this.items);
                    })
                    .catch(error => {
                        console.log(error)
                        this.errored = true
                    })
            },
            getCli(){

            },
            updateCli(){
                let id= this.id;
                let cliente = {
                    nome: this.nome,
                    celular: this.celular,
                    datanasc: this.datanasc,
                    rua: this.rua,
                    bairro: this.bairro,
                    cidade: this.cidade,
                    numero: this.numero,
                    obs: this.obs
                };
                let token = localStorage.getItem('jwt');
                let config = {
                    headers: { Authorization: `Bearer ${token}` }
                }
                this.$http.put('/cliente/'+id, cliente, config)
                    .then(response => {
                        this.mensagem = response.data.msg;     
                    })
                    .catch(error => {
                        console.log(error)
                        this.errored = true
                    })
            },
            deleteCli(){
                let id= this.id;
                let token = localStorage.getItem('jwt');
                let config = {
                    headers: { Authorization: `Bearer ${token}` }
                }
                this.$http.delete('/cliente/'+id, config)
                    .then(response => {
                        this.mensagem = response.data.msg;     
                    })
                    .catch(error => {
                        console.log(error)
                        this.errored = true
                    })
            },
            cleanCli(){
                this.nome = '',
                this.celular = '',
                this.datanasc = '',
                this.rua = '',
                this.bairro = '',
                this.cidade = '',
                this.numero = '',
                this.obs = ''
            },
            onFiltered(filteredItems) {
                this.totalRows = filteredItems.length
                this.currentPage = 1
            }
        },
        created(){
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

    .cliente{
        height: 100%;
        overflow: auto;
    }

    .client-header-content{
        padding: 0px;
    }

    .client-header-content p{
        margin: 0;
        font-size: 1.6rem;
        font-family: 'Times New Roman', Times, serif;
    }

    .client-add{
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

    .client-list{
        margin-top:10px;
        padding: 0px!important;
        overflow: auto;
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

    #collapse-2{
        margin: 0!important;
        width: 60%!important;
    }

    

</style>