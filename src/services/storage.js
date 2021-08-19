import router from '@/router'

export default {
    setStorage: (item,value) => {
        return localStorage.setItem(item, value)
    },
    getStorage: (item) => {
        return localStorage.getItem(item)
    },
    removeStorage: (value) => {
        return localStorage.setItem(value, null)
    },
    userLoginSuccess: (value) => {
        if (localStorage.getItem(value) == 'null') {
            return router.push({name: 'login'}) 
        }
        return true
    }
}