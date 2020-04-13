<template>
  <div id="app">
	<div class='full-container'>
		<div class='menu'>
			<router-link to="/home" >
				<div>
					<div class='menu-div-logo'><div class='logo'><img :src="logo"></div></div>			
				</div>
			</router-link>
			<router-link to="/cliente" >
				<div id='d1'>
					<div class='menu-div-label' id='d1a'>Cliente</div>
					<div class='menu-div-icon' id='d1b'><v-awt icon='chevron-right'></v-awt></div>
				</div>
			</router-link>
			<router-link to="/transacao">
				<div id='d2'>
					<div class='menu-div-label' id='d2a'>Caixa</div>
					<div class='menu-div-icon' id='d2b'><v-awt icon='chevron-right'></v-awt></div>
				</div>
			</router-link>
			<router-link to="/produto">
				<div id='d3'>
					<div class='menu-div-label' id='d3a'>Estoque</div>
					<div class='menu-div-icon' id='d3b'><v-awt icon='chevron-right'></v-awt></div>
				</div>
			</router-link>
			<router-link to="/compra">
				<div id='d4'>
					<div class='menu-div-label' id='d4a'>Compra</div>
					<div class='menu-div-icon' id='d4b'><v-awt icon='chevron-right'></v-awt></div>
				</div>
			</router-link>
			<router-link to="/fornecedor">
				<div id='d5'>
					<div class='menu-div-label' id='d5a'>Fornecedor</div>
					<div class='menu-div-icon' id='d5b'><v-awt icon='chevron-right'></v-awt></div>
				</div>
			</router-link>
			<router-link to="/funcionario">
				<div id='d6'>
					<div class='menu-div-label' id='d6a'>Funcionario</div>
					<div class='menu-div-icon' id='d6b'><v-awt icon='chevron-right'></v-awt></div>
				</div>	
			</router-link>
			<router-link to="/agenda">
				<div id='d7'>
					<div class='menu-div-label' id='d7a'>Agenda</div>
					<div class='menu-div-icon' id='d7b'><v-awt icon='chevron-right'></v-awt></div>
				</div>	
			</router-link>
			<router-link to="/historico">
				<div id='d8'>
					<div class='menu-div-label' id='d8a'>Historico</div>
					<div class='menu-div-icon' id='d8b'><v-awt icon='chevron-right'></v-awt></div>
				</div>	
			</router-link>
			<router-link to="/about">
				<div id='d9'>
					<div class='menu-div-label' id='d9a'>Sobre</div>
					<div class='menu-div-icon' id='d9b'><v-awt icon='chevron-right'></v-awt></div>
				</div>	
			</router-link>
			<div id='d10' @click='logUserOut()' style='cursor:pointer;'>
				<div class='menu-div-label' id='d10a'>Sair</div>
				<div class='menu-div-icon' id='d10b'><v-awt icon='chevron-right'></v-awt></div>
			</div>	
		</div>
		<router-view class='classe-router'></router-view>
	</div>
  </div>
</template>

<script>
	import logo from './assets/Login.png'

	export default {
		name: 'app',
		data () {
			return {
				logo: logo,
			}
		},
		methods:{
            logUserOut() {
                localStorage.removeItem("jwt");
                this.$router.push("/");
            }
		}
	}
</script>

<style>
	
	:root{
		--buru: #5352ed;
		--bluu: #3B3B98;
		--blii: #0984e3;
		--blee: #4834d4;
		--bloo: #70a1ff;
		--blaa: #5352ed;
		--blie: #5758BB;
		--bleu: #1289A7;
		--blau: #2c3e50;
		--blou: #192a56;
		--blua: #40739e;
	}

	body{
		padding: 0;
		margin: 0;
	}

	.menu{
		width: 13%;
		height: 100%;
		background: rgba(5, 5, 5, 0.87);
	}

	.menu div{
		font-size: 1rem;
		color: white;
		display: flex;
		flex-direction: row;
	}

	.menu a:hover{
		text-decoration: none;
	}

	.menu div a:hover{
		text-decoration: none;
	}
	
	.menu-div-label{
		width: 80%;
		padding: 5px 0;
		display: flex;
		justify-content: flex-end;
		align-items: center;
		transition: ease-in-out 0.3s;
	}

	.menu-div-icon{
		width: 20%;
		padding: 5px 10px;
		display: flex;
		justify-content: flex-end;
		align-items: center;
	}

	.menu-div-logo{
		width: 100%;
		padding: 1rem 0.5rem;
		margin-bottom:2rem;
		display: flex;
		justify-content: flex-end;
		align-items: center;
	}

	.logo img{
		height: 80px;
		width: 80px;
	}

	.classe-router{
		width: 87%;
		padding: 0.7rem 2.3rem;
	}

	@media only screen and (min-width: 1020px) {
		.container{
			margin: 0;
			width: 100%;
		}
	}

	@media only screen and (min-width: 1200px) {
		.container{
			max-width: 100%!important;
		}
	}
	
	.full-container{
		display: flex;
		flex-direction: row;
		width: 100%;
		height: 100vh;
		overflow: hidden;
	}

	.header-content{
        padding: 0px;
    }

	.content-container{
        height: 100%;
        overflow: auto;
    }

	#d1:hover > #d1a , #d1b{
		color: var(--blaa);
		transition: ease-in-out 0.4s;
	}

	#d2:hover > #d2a , #d2b{
		color: var(--blee);
		transition: ease-in-out 0.4s;
	}

	#d3:hover > #d3a , #d3b{
		color: var(--blii);
		transition: ease-in-out 0.4s;
	} 

	#d4:hover > #d4a , #d4b{
		color: var(--bluu);
		transition: ease-in-out 0.4s;
	} 

	#d5:hover > #d5a , #d5b{
		color: var(--bloo);
		transition: ease-in-out 0.4s;
	} 

	#d6:hover > #d6a , #d6b{
		color: var(--blie);
		transition: ease-in-out 0.4s;
	} 

	#d7:hover > #d7a , #d7b{
		color: var(--bleu);
		transition: ease-in-out 0.4s;
	} 

	#d8:hover > #d8a , #d8b{
		color: var(--buru);
		transition: ease-in-out 0.4s;
	} 

	#d9:hover > #d9a , #d9b{
		color: var(--blua);
		transition: ease-in-out 0.4s;
	} 

	input::-webkit-outer-spin-button,
	input::-webkit-inner-spin-button {
    	-webkit-appearance: none;
    	margin: 0;
	}

	input[type=number],input[type=date] {
    	-moz-appearance:textfield;
	}

	::-webkit-scrollbar {
  		width: 0px;
	}

	.list{
        margin-top:10px;
        padding: 0px!important;
        height: 75vh;
        overflow: auto;
        display: flex;
        flex-direction: row;
        flex-flow: row wrap;
    }

	.list-slice{
		width: 30%;
		height: 250px;
		margin: 5px 15px 5px 0;
	}

	.search-container{
        width: 40%;
        float:right;
    }

    .search-container input:focus{
        outline: none!important;
        box-shadow: none!important;
    }

</style>