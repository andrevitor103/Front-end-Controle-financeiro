<template>
    <div>
        <footer>
            <p>Made By André Vitor @ 2021-2021</p>
        </footer>
    </div>
</template>

<script>
    export default {
        name: 'footer'
    }
</script>

<style scoped>
    @import url('https://fonts.googleapis.com/css2?family=Otomanopee+One&display=swap');

    * {
        box-sizing: border-box;
    }
      footer {
        background-color: #000;
        min-width: 100%;
        height: 160px;
        position: absolute;
        bottom: 0%;
        text-align: center; 
    }

    footer > p {
        position: absolute;
        bottom: 0%;
        left: 40%;
        top: 40%;
        font-size: 16px;
    }
</style>
