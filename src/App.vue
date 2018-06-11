<template lang="pug">
  #app
    div.row
      div.offset-md-3.col-md-6(v-if="!this.$store.state.isUserLoggedIn")
        <User />

    div.row(v-if="this.$store.state.isUserLoggedIn")
      div.col-md-3
        div.logout
          b-button(type="button" variant="danger btn-lg" @click="logout") Cerrar Sesión
      div.col-md-9
        <Calculator />
</template>

<script>
import AuthenticationService from '@/services/usersService'
import Calculator from './components/Calculator.vue'
import User from './components/User.vue'

export default {
  name: 'app',
  components: {
    Calculator,
    User
  },
  methods: {
    logout (evt) {
      evt.preventDefault()
      AuthenticationService.logout().then(res => {
        if (res.data) {
          this.$store.dispatch('logout')
          this.isLogin = true
          this.$router.push('/')
        }
      }).catch(err => {
        this.error = 'Error al cerrar sesión'
        this.dismissCountDown = this.dismissSecs
        console.log(err.response.data)
      })
    }
  }
}
</script>

<style lang="scss">
  @import './assets/scss/site.scss';
</style>
