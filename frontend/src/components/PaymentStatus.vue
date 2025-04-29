<template>
  <v-card class="mt-5">
    <v-card-title class="bg-primary">
      <span class="text-white">Status do Pagamento</span>
    </v-card-title>

    <v-card-text class="pa-6">
      <v-alert
        :type="statusType"
        :icon="statusIcon"
        border
      >
        <div class="text-h6">ID: {{ payment.id }}</div>
        <div>Nome: {{ payment.payerName }}</div>
        <div>Valor: R$ {{ formattedAmount }}</div>
        <div>Método: {{ methodText }}</div>
        <div>Status: {{ statusText }}</div>
        <div v-if="payment.status === 'approved'" class="mt-2">
          Pagamento processado com sucesso!
        </div>
      </v-alert>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    payment: {
      type: Object,
      required: true
    }
  },

  computed: {
    statusType() {
      return {
        pending: "info",
        approved: "success",
        failed: "error",
      }[this.payment.status];
    },

    statusIcon() {
      return {
        pending: "mdi-clock",
        approved: "mdi-check-circle",
        failed: "mdi-alert-circle",
      }[this.payment.status];
    },

    statusText() {
      return {
        pending: "Pendente",
        approved: "Aprovado",
        failed: "Recusado",
      }[this.payment.status];
    },

    methodText() {
      return {
        pix: "PIX",
        credit_card: "Cartão de Crédito",
        boleto: "Boleto",
      }[this.payment.method];
    },

    formattedAmount() {
      return this.payment.amount?.toFixed(2) || '0.00'
    }
  },
};
</script>