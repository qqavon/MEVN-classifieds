export default {
    setUserToken(token) {
        localStorage.setItem('token', token)
    },
    removeUserToken() {
        localStorage.removeItem('token')
    },
    isToken() {
        return localStorage.getItem('token') ? true : false
    },
    getToken() {
        return localStorage.getItem('token')
    }
}