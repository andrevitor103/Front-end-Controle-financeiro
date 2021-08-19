<template>
        <header class="header">
            <div class="panel-info">
                <div class="panel-info-right">
                    <div class="chamada-right">
                        <p>
                            Crie sua conta agora 
                            e comece a cuidar melhor do seu dinheiro
                        </p>
                        <router-link to="/create-account"><md-button class="md-raised md-primary">Crie sua conta</md-button></router-link>
                    </div>  
                    <div class="chamada-right">
                        <p>
                            Já faz parte do time?
                            Então é so entrar e aproveitar
                        </p>
                        <router-link to="/login"><md-button class="md-raised md-primary">Entrar</md-button></router-link>
                    </div>
                </div>
                <div class="panel-info-left">
                </div>
            </div>
        </header>
</template>

<script>
    export default {
        name: 'header'
    }
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Otomanopee+One&display=swap');

    @media only screen and (min-width: 588px) {
        header {
        background-image: linear-gradient(to bottom, #cee, #cee, #ccc);
        min-width: 100%;
        height: 100%;
        display: flex;
        overflow: hidden;
        font-family: 'emoji', 'sans-serif';
        position: absolute;
        top: -10%;
        }
    
        .panel-info {
            /*background-color: #f00;*/
            display: flex;
            width: 100%;
            font-size: 1.4vw;
            color: #000;
        }

        .panel-info-right {
            /*background-color: #ccc;*/
            width: 50%;
            height: 100%;
            float: left;
            display: flex;
        }

        .chamada-right {
            /*background-color: #ccc;*/
            position: relative;
            top: 20%;
        }
        
        .panel-info-left {
            /*background-color: #000;*/
            width: 50%;
            height: 100%;
            float: right;
            background-image: url(../../assets/logo-sem_fundo.png);
            background-size: 260px;
            background-position: 50% 50%;
            background-repeat: no-repeat;
        }

        .chamada-right {
            margin: 10%;
        }
    }

    @media only screen and (max-width: 768px) {
        header {
            background-image: linear-gradient(to bottom, #cee, #cee, #ccc);
            min-width: 100%;
            height: 100%;
            display: flex;
            overflow: hidden;
            font-family: 'emoji', 'sans-serif';
            position: absolute;
            top: 0%;
        }
        .panel-info {
            /*background-color: #f00;*/
            display: flex;
            width: 100%;
            font-size: 14px;
            color: #000;
        }
        .chamada-right {
            /*background-color: #ccc;*/
            position: relative;
            top: 10%;
            margin: 20px;
            padding: 10px;
        }
    }
</style>