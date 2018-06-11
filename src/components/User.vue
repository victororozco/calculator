<template lang="pug">
  div.user
    b-alert(:show="dismissCountDown"
            dismissible variant="danger"
            @dismissed="dismissCountDown=0"
            height="30px"
            @dismiss-count-down="countDownChanged")
      p {{ this.error }}
      b-progress(variant="danger"
                  :max="dismissSecs"
                  :value="dismissCountDown"
                  height="4px")

    div(v-if="isLogin")
      div.login
        h1.text-center Inicio de Sesión
        b-form(@submit="onSubmit" @reset="onReset")
          b-form-group(id="label-username")
            label(for="input-username") User
            b-form-input(id="input-username"
                          type="text"
                          v-model="login.username"
                          required
                          placeholder="example")

          b-form-group(id="label-password")
            label(for="input-password") Password
            b-form-input(id="input-password"
                          type="password"
                          v-model="login.password"
                          required
                          placeholder="*********")

          div.row.justify-content-center
            b-button(type="submit" :disabled="!login.username || !login.password" variant="primary") Iniciar

          div.row.justify-content-center
            a(title="Registrarse" href="#" @click="registerUser") Registrarse

    div(v-else-if="register")
      div.signup
        h1.text-center Registro de usuario

        b-form(@submit="signup")
          b-form-group(id="emailGroup")
            label(for="email") Email
            b-form-input(id="email"
                          type="email"
                          v-model="user.email"
                          required
                          placeholder="example@gmail.com")

          b-form-group(id="usernameGroup")
            label(for="username") Usuario
            b-form-input(id="username"
                          type="text"
                          v-model="user.username"
                          required
                          placeholder="example")

          b-form-group(id="passwordGroup")
            label(for="password") Contraseña
            b-form-input(id="password"
                      type="password"
                      v-model="user.password"
                      required
                      placeholder="********")

          b-form-group(id="ConfirmPasswordGroup")
            label(for="ConfirmPassword") Confirmar contraseña
            b-form-input(id="ConfirmPassword"
                      type="password"
                      v-model="user.confirmPassword"
                      required
                      placeholder="********")

          div.row.justify-content-center
            b-button(type="submit" variant="primary") Enviar
            b-button(type="reset" variant="danger") Reset

          div.row.justify-content-center
            a(title="Login" href="#" @click="returnLogin") Login

</template>

<script>
import AuthenticationService from '@/services/usersService'

export default {
  name: 'User',
  data () {
    return {
      isLogin: true,
      register: false,
      login: {
        username: '',
        password: '',
        error: null
      },
      user: {
        email: '',
        username: '',
        password: '',
        confirmPassword: ''
      },
      error: null,
      dismissSecs: 5,
      dismissCountDown: 0
    }
  },
  methods: {
    async onSubmit (evt) {
      evt.preventDefault()

      AuthenticationService.login({
        username: this.login.username,
        password: this.login.password
      }).then(res => {
        if (res.data) {
          this.$store.dispatch('setUser', res.data)
          if (this.$store.state.isUserLoggedIn) {
            this.isLogin = false
            this.$router.push('/')
          }
        }
      }).catch(err => {
        this.error = 'Usuario o contraseña incorrecto..'
        this.dismissCountDown = this.dismissSecs
        console.log(err.response.data)
      })
    },
    signup (evt) {
      evt.preventDefault()
      AuthenticationService
        .signup({
          username: this.user.username,
          email: this.user.email,
          password1: this.user.password,
          password2: this.user.confirmPassword
        })
        .then(res => {
          if (res.data) {
            this.$store.dispatch('setUser', res.data)
            if (this.$store.state.isUserLoggedIn) {
              this.isLogin = false
              this.register = false
              this.$router.push('/')
            }
          }
        })
        .catch(err => {
          this.error = 'Registro fallido, intente de nuevo.'
          this.dismissCountDown = this.dismissSecs
          console.log(err.response.data)
        })
    },
    registerUser () {
      this.isLogin = false
      this.register = true
    },
    returnLogin () {
      this.isLogin = true
      this.register = false
    },
    onReset (evt) {
      evt.preventDefault()
      this.login.username = ''
      this.login.password = ''
    },
    countDownChanged (dismissCountDown) {
      this.dismissCountDown = dismissCountDown
    }
  },
  created () {
    if (this.$store.state.isUserLoggedIn) {
      this.isLogin = false
    }
  }
}
</script>
