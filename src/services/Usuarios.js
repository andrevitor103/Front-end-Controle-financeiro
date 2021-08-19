import { http } from './config'
import storageService from '@/services/storage.js'

export default {
    view: () => {
        return http.get(`user/${storageService.getStorage('value')}`)
    },
    create: (newUser) => {
        return http.post('create-usuario', {
            username: newUser.username,
            user_password: newUser.user_password,
            email: newUser.email,
            picture_user: newUser.picture_user
        })
    },
    update: (user) => {
        return http.put(`user/update-user/${user.id}`,{
            username: user.username,
            user_password: user.user_password,
            email: user.email,
            picture_user: '../assents/'+user.picture_user
        })
    },
    login: (credentialsUser) => {
        return http.post('user/confirm-login', {
            username: credentialsUser.username,
             user_password: credentialsUser.user_password
        })
    }
}