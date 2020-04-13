<template>
    <div class='content-container'>
        <b-container class="header-content">
            <b-row>
                <b-col>
                    <p> Históricos - Pesquise o historico das pessoas </p>
                </b-col>
            </b-row>
        </b-container>
        <b-container class='searching'>
            <b-row>
                <b-col class='form-input-override'>
                    <label for="pesquisa"> Faça sua pesquisa </label>
                    <b-input-group class="mb-2 mr-sm-2 mb-sm-0">
                        <b-input-group-prepend>
                            <b-button variant="outline-dark" @click='submitForm()'><v-awt icon='search'></v-awt> Pesquisar! </b-button>
                        </b-input-group-prepend>
                        <template v-slot:append>
                            <b-input-group-text><v-awt icon='user'></v-awt></b-input-group-text>
                        </template>
                        <b-input id="pesquisa" v-model='pesquisa' placeholder="Nome completo"></b-input>
                    </b-input-group>
                </b-col>
            </b-row>
            <div class='infos-hist'>
                <b-row>
                    <b-col>
                        <label>Nome da pessoa</label>
                        <p>{{nome}}</p>
                    </b-col>
                    <b-col>
                        <label>Celular</label>
                        <p>{{celular}}</p>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col>
                        <label>Observação</label>
                        <p>{{observacao}}</p>
                    </b-col>
                </b-row>
            </div>
        </b-container>
        <b-container class='list-variant'>
            <b-table 
                id='the-table'
                outlined
                hover 
                head-variant='light'
                :per-page="perPage"
                :current-page="currentPage"
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
        name: 'lvHistorico',
        data() {
            return{
                pesquisa: '',
                nome: '',
                celular: '',
                observacao: '',
                perPage: 10,
                currentPage: 1,
                sortBy: 'data',
                fields: [
                    {
                        key: 'pessoa',
                        label: 'Pessoa',
                        sortable: false
                    },
                    {
                        key: 'transacao',
                        label: 'Transação',
                        sortable: false
                    },
                    {
                        key: 'tipo',
                        label: 'Tipo',
                        sortable: true
                    },
                    {
                        key: 'quantia',
                        label: 'Quantia',
                        sortable: false
                    },
                    {
                        key: 'data',
                        label: 'Data',
                        sortable: true
                    },
                ],
                items: [

                ]
            }
        },
        methods: {
            submitForm(){
                let pesquisa = {
                    pesquisa: this.pesquisa
                };
                let token = localStorage.getItem('jwt');
                let config = {
                    headers: { Authorization: `Bearer ${token}` }
                }
                this.$http.post('/historico/', pesquisa, config)
                    .then(response => {
                        this.items = response.data.hist;
                        this.nome = response.data.info.nome;
                        this.celular = response.data.info.celular;
                        this.observacao = response.data.info.obs;
                        console.log(response);
                    })
                    .catch(error => {
                        console.log(error)
                        this.errored = true
                    })
            },
            onFiltered(filteredItems) {
                this.totalRows = filteredItems.length
                this.currentPage = 1
            }
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

    .searching{
        padding: 0 15px!important;
    }

    .form-input-override{
        padding: 10px 0px!important;
    }

    .form-input-override input:focus{
        outline: none!important;
        box-shadow: none!important;
    }

    .infos-hist{
        margin: 1rem 0;
    }

    .infos-hist label{
        font-weight: bold;
        color: var(--blii);
        font-size: 0.8rem;
        margin: 0;
    }

    .list-variant{
        width: 100%;
    }
    
</style>