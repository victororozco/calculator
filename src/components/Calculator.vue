<template lang="pug">
  div.row
    div.col-md-8
      .calculator
        .display {{ display }}
        h1.brand {{ appTitle }}
        .keyboard
          .panel-a
            .top-buttons
              button(class="btn primary" @click="clear")
                span C
              button.btn(@click="setNumber('.')")
                span .
            .numbers
              - for(var i = 9; i >= 0; i--)
                button.btn(@click="setNumber('" + i + "')")
                  span= i
          .panel-b
            button.btn(@click="operator= '+'")
              span +
            button.btn(@click="operator= '-'")
              span -
            button.btn(@click="operator= '*'")
              span *
            button.btn(@click="operator= '/'")
              span /

            button(class="btn primary" @click="calculate")
              span =

        button(class="btn success" @click="save")
          span Guardar

        button(class="btn info" @click="getHistories")
          span Recuperar

    div.col-md-4
      .history
        h1
          strong Historial

        li.text-left(v-for="history in histories") {{history.operation}}

</template>

<script>
import calculatorService from '@/services/calculatorService'

export default {
  name: 'Calculator',
  data () {
    return {
      appTitle: 'Vue Calculator',
      a: '',
      b: '',
      tot: 0,
      display: 0,
      operator: null,
      histories: []
    }
  },
  methods: {
    save () {
      this.histories.map(history => {
        calculatorService.save({ operation: history.operation })
          .then(res => {
            if (res.data) {
              this.getHistories()
            }
          }).catch(err => {
            console.log(err.response.data)
          })
      })
    },
    getHistories () {
      calculatorService.histories({token: this.$store.state.token})
        .then(res => {
          if (res.data) {
            this.histories = []
            res.data.map(i => this.histories.push(i))
          }
        }).catch(err => {
          console.log(err.response.data)
        })
    },
    setNumber (num) {
      if (this.operator === null) {
        this.a += num
        this.display = this.a
      } else {
        this.b += num
        this.display = this.b
      }
    },
    calculate () {
      switch (this.operator) {
        case '+':
          this.tot = parseFloat(this.a) + parseFloat(this.b)
          this.histories.push({operation: `${this.a} + ${this.b} = ${this.tot}`})
          break
        case '-':
          this.tot = parseFloat(this.a) - parseFloat(this.b)
          this.histories.push({operation: `${this.a} - ${this.b} = ${this.tot}`})
          break
        case '*':
          this.tot = parseFloat(this.a) * parseFloat(this.b)
          this.histories.push({operation: `${this.a} * ${this.b} = ${this.tot}`})
          break
        case '/':
          this.tot = parseFloat(this.a) / parseFloat(this.b)
          this.histories.push({operation: `${this.a} / ${this.b} = ${this.tot}`})
          break
      }
      this.display = this.tot
      this.a = '' + this.tot + ''
      this.b = ''
      this.operator = null
    },
    clear () {
      this.a = ''
      this.b = ''
      this.tot = 0
      this.display = 0
      this.operator = null
    }
  }
}
</script>
