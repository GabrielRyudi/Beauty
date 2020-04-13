<template>
    <div class='content-container'>
        <div class='about-container'>
            <h1> O sistema </h1>
            <p> 
                O beauty é um sistema de gerenciamento básico para salões, onde é possivel realizar o gerenciamento
                e o registro de compra de produtos, transações realizadas, agendamentos, e de pessoas.
            </p>
            <p>
                O sistema permite que o histórico de transações de cada individuo seja averiguado, sendo possivel assim
                levantar seus gastos, e costumes, além de dividas. Além do histórico de compras com fornecedores, a fim
                de registrar pagamentos e débitos.A estocagem de produtos também pode ser registrada, para que haja controle do estoque e da entrada dos
                mesmos, preço e outros. 
            </p>
            <p>
                O sistema atualmente está em sua versão BETA 1.0.0 e dispõe de 80% de suas funcionalidades finais,
                tal como descrito a cima, entretanto o sistema sofrerá atualizações e irá dispor de novas funcionalidades
                e facilidades, além de maior adaptabilidade à padrões mobile.
            </p>
        </div>
        <div class='about-container'>
            <h1> Atualizações </h1>
            <p> 
                O Beauty irá receber atualizações referentes a suas funcionalidades, para que funcione de forma plena
                e atendendo todas as necessidades do usuário. Entre as novas funcionalidades estão:
            </p>
            <ol>
                <li> Possibilidade de uso mobile </li>
                <li> Modificar registros </li>
                <li> Sistema de notificações </li>
                <li> Atualizações visuais </li>
                <li> Possibilidade de integração à e-commerce de produtos </li>
                <li> Agendamento on-line com notificação no celular </li>
            </ol>
        </div>
    </div>
</template>

<script>

    export default {
        name: 'lvAbout',
        data() {
            return{
            }
        }
    }

</script>

<style>

    .about-container{
        width: 80%;
        margin: 2rem auto;
        padding: 1.5rem;;
        border: 1px solid #c8d6e5;
        border-radius: 8px;
    }

    .about-container p{
        font-size: 1.2rem;
        line-height: 1.6;
        text-align: justify;
        text-indent:2em;
    }

    .about-container h1{
        margin-bottom: 2rem;
    }

    .about-container li{
        font-size: 1.2rem;
    }

</style>
