<template>
  <v-form @submit.prevent="handleSubmit" ref="form">
    <v-card>
      <v-card-title class="bg-primary">
        <span class="text-white">Novo Pagamento</span>
      </v-card-title>

      <v-card-text>
        <v-text-field
          v-model="formData.payerName"
          label="Nome do Pagador"
          :rules="nameRules"
          required
          clearable
        ></v-text-field>

        <v-text-field
          v-model="displayAmount"
          v-mask="moneyMask"
          label="Valor"
          prefix="R$"
          :rules="amountRules"
          required
          @blur="formatCurrency"
          @focus="prepareForEdit"
          clearable
        ></v-text-field>

        <v-select
          v-model="formData.method"
          :items="paymentMethods"
          label="Método de Pagamento"
          :rules="methodRules"
          required
          clearable
        ></v-select>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="error" @click="resetForm">Limpar</v-btn>
        <v-btn 
          color="primary" 
          type="submit" 
          :loading="isSubmitting"
          :disabled="isSubmitting"
        >
          Enviar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-form>
</template>

<script>
import { VueMaskDirective } from 'v-mask'

export default {
  name: 'PaymentForm',
  directives: { mask: VueMaskDirective },
  emits: ['form-submitted'],
  data() {
    return {
      isSubmitting: false,
      displayAmount: '',
      moneyMask: '###.###.###.###,##',
      formData: {
        payerName: '',
        amount: null,
        method: null
      },
      paymentMethods: [
        { title: 'PIX', value: 'pix' },
        { title: 'Cartão de Crédito', value: 'credit_card' },
        { title: 'Boleto Bancário', value: 'boleto' }
      ],
      nameRules: [
        v => !!v || 'Nome é obrigatório',
        v => (v && v.length >= 3) || 'Mínimo 3 caracteres'
      ],
      methodRules: [v => !!v || 'Selecione um método'],
      amountRules: [
        v => !!v || 'Valor é obrigatório',
        v => {
          const value = this.unformatCurrency(v)
          return value > 0 || 'Valor deve ser positivo'
        }
      ]
    }
  },
  methods: {
    async handleSubmit() {
      const isValid = await this.validateForm()
      if (!isValid) return

      this.isSubmitting = true
      try {
        this.prepareFormData()
        this.$emit('form-submitted', this.formData)
      } catch (error) {
        console.error('Erro no formulário:', error)
      } finally {
        this.isSubmitting = false
      }
    },

    async validateForm() {
      const { valid } = await this.$refs.form.validate()
      if (!valid) {
        console.log('Corrija os erros antes de enviar')
        return false
      }
      return true
    },

    prepareFormData() {
      this.formData.amount = this.unformatCurrency(this.displayAmount)
    },

    formatCurrency() {
      if (!this.displayAmount) return
      const numericValue = this.unformatCurrency(this.displayAmount)
      this.displayAmount = numericValue.toLocaleString('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      })
    },

    prepareForEdit() {
      if (!this.displayAmount) return
      this.displayAmount = this.unformatCurrency(this.displayAmount).toString()
    },

    unformatCurrency(value) {
      if (!value) return 0
      return parseFloat(
        value.toString()
          .replace(/\./g, '')
          .replace(',', '.')
          .replace(/[^0-9.]/g, '')
      ) || 0
    },

    resetForm() {
      this.$refs.form.reset()
      this.displayAmount = ''
      this.formData.amount = null
    }
  }
}
</script>

<style scoped>
.v-card {
  max-width: 600px;
  margin: 0 auto;
}
</style>