<template>
    <div class='content-container'>
        <b-container class="header-content">
            <b-row>
                <b-col>
                    <p> Produto </p>
                </b-col>
            </b-row>
        </b-container>
        <b-container class='add'>
            <b-button squared variant="outline-success" v-b-toggle.collapse-4 class="m-1 toggle-btn">
                <v-awt icon="plus"></v-awt> Adicionar produto
            </b-button>
            <b-collapse id="collapse-4">
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
                                    <b-input-group-text><v-awt icon='box'></v-awt></b-input-group-text>
                                </template>
                                <b-input id="nome" name='nome' v-model='nome' placeholder="Nome do produto"></b-input>
                            </b-input-group>
                        </b-col>
                        <b-col class='form-input-override' style='padding-left:5px!important;'>
                            <label class="sr-only" for="celular">Marca</label>
                            <b-input-group class="mb-2 mr-sm-2 mb-sm-0">
                                <template v-slot:append>
                                    <b-input-group-text><v-awt icon='tag'></v-awt></b-input-group-text>
                                </template>
                                <b-input id="marca" name='marca' v-model='marca' placeholder="Marca"></b-input>
                            </b-input-group>
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col cols='3' class='form-input-override'>
                            <label class="sr-only" for="celular">Preço</label>
                            <b-input-group class="mb-2 mr-sm-2 mb-sm-0">
                                <template v-slot:append>
                                    <b-input-group-text><v-awt icon='dollar-sign'></v-awt></b-input-group-text>
                                </template>
                                <b-input id="preco" name='preco' v-model='preco' placeholder="Preço - 0.00" type='number'></b-input>
                            </b-input-group>
                        </b-col>
                        <b-col cols='6' class='form-input-override' style='padding-left:5px!important;'>
                            <label class="sr-only" for="celular">Tipo</label>
                            <b-input-group class="mb-2 mr-sm-2 mb-sm-0">
                                <template v-slot:append>
                                    <b-input-group-text><v-awt icon='wine-bottle'></v-awt></b-input-group-text>
                                </template>
                                <b-input id="tipo" name='tipo' v-model='tipo' placeholder="Tipo"></b-input>
                            </b-input-group>
                        </b-col>
                        <b-col cols='3' class='form-input-override' style='padding-left:5px!important;'>
                            <label class="sr-only" for="celular">Quantidade</label>
                            <b-input-group class="mb-2 mr-sm-2 mb-sm-0">
                                <template v-slot:append>
                                    <b-input-group-text><v-awt icon='sort-amount-up-alt'></v-awt></b-input-group-text>
                                </template>
                                <b-input 
                                    id="quantidade" 
                                    name='quantidade' 
                                    v-model='quantidade' 
                                    placeholder="Quantidade"
                                    type='number'>
                                </b-input>
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
        name: 'lvProduto',
        data() {
            return{
                id: '',
                nome: '',
                preco: '',
                tipo: '',
                quantidade: '',
                marca: '',
                mensagem: '',
                showDismissibleAlert: false,
                sortBy: 'nome',
                filter: null,
                filterOn: 'nome',
                perPage: 10,
                currentPage: 1,
                fields:[
                    {
                        key: 'nome',
                        label: 'Nome',
                        sortable: true
                    },
                    {
                        key:'tipo',
                        label: 'Tipo',
                        sortable: true
                    },
                    {
                        key:'marca',
                        label: 'Marca',
                        sortable: true
                    },
                    {
                        key: 'preco',
                        label:'Preço',
                        sortable: false
                    },
                    {
                        key: 'quantidade',
                        label: 'Quantidade',
                        sortable: false
                    }
                ],
                items:[

                ]
            }
        },
        methods: {
            submitForm(){
                let produto = {
                    nome: this.nome,
                    preco: this.preco,
                    tipo:this.tipo,
                    marca:this.marca,
                    quantidade:this.quantidade
                };
                let token = localStorage.getItem('jwt');
                let config = {
                    headers: { Authorization: `Bearer ${token}` }
                }
                this.$http.post('/produto/', produto, config)
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
                this.$http.get('/produto/', config)
                    .then(response => {
                        this.items = response.data; 
                        console.log(this.items);
                    })
                    .catch(error => {
                        console.log(error)
                        this.errored = true
                    })
            },
            getBuy(){

            },
            updateProd(){
                let id = this.id;
                let produto = {
                    nome: this.nome,
                    preco: this.preco,
                    tipo:this.tipo,
                    marca:this.marca,
                    quantidade:this.quantidade
                };
                let token = localStorage.getItem('jwt');
                let config = {
                    headers: { Authorization: `Bearer ${token}` }
                }
                this.$http.put('/produto/'+id, produto, config)
                    .then(response => {
                        this.mensagem = response.data.msg;     
                    })
                    .catch(error => {
                        console.log(error)
                        this.errored = true
                    })
            },
            deleteProd(){
                let id= this.id;
                let token = localStorage.getItem('jwt');
                let config = {
                    headers: { Authorization: `Bearer ${token}` }
                }
                this.$http.delete('/produto/'+id, config)
                    .then(response => {
                        this.mensagem = response.data.msg;     
                    })
                    .catch(error => {
                        console.log(error)
                        this.errored = true
                    })
            },
            clean(){
                this.nome = '',
                this.preco = '',
                this.tipo = '',
                this.marca = '',
                this.quantidade = ''
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