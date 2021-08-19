<template>
    <div class="">
        <app-header-initial />
        <app-content />
        <app-footer />
    </div>
</template>

<script>
    import Header from './header'
    import Content from './content'
    import Footer from './footer'

    export default {
        components: {
            'app-header-initial': Header,
            'app-content': Content,
            'app-footer': Footer    
        },
        name: 'main',
        data() {
            return {
                dados: Header
            }
        }
    }
</script>
    
<style scoped>
</style>