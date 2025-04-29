<template>
  <div class="payment-view">
    <v-snackbar
      v-model="snackbar.show"
      :color="snackbar.color"
      :timeout="3000"
      location="top"
    >
      {{ snackbar.message }}
    </v-snackbar>

    <payment-form @form-submitted="processPayment" ref="paymentForm" />

    <payment-status
      v-if="currentPayment"
      :payment="currentPayment"
      @new-payment="resetPayment"
    />
  </div>
</template>

<script>
import PaymentForm from "@/components/PaymentForm.vue";
import PaymentStatus from "@/components/PaymentStatus.vue";
import api from "@/services/api";

export default {
  name: "PaymentView",
  components: { PaymentForm, PaymentStatus },
  data() {
    return {
      currentPayment: null,
      pollingInterval: null,
      snackbar: {
        show: false,
        message: "",
        color: "",
      },
    };
  },
  methods: {
    async processPayment(paymentData) {
      try {
        const response = await api.createPayment(paymentData);

        this.currentPayment = {
          ...paymentData,
          id: response.data.id,
          status: "pending",
        };

        this.showSnackbar("Pagamento criado! Verificando status...", "info");
        this.startStatusPolling(response.data.id);
      } catch (error) {
        console.error("Erro no pagamento:", error);
        this.showSnackbar(
          error.message || "Erro ao processar pagamento",
          "error"
        );
      }
    },

    startStatusPolling(paymentId) {
      this.pollingInterval = setInterval(async () => {
        try {
          const response = await api.getPaymentStatus(paymentId);
          this.currentPayment.status = response.data.status;

          if (response.data.status !== "pending") {
            this.stopStatusPolling();
            const message =
              response.data.status === "approved"
                ? "Pagamento aprovado com sucesso!"
                : "Pagamento recusado";
            this.showSnackbar(
              message,
              response.data.status === "approved" ? "success" : "error"
            );
          }
        } catch (error) {
          console.error("Erro ao verificar status:", error);
          this.stopStatusPolling();
          this.showSnackbar("Erro ao verificar status do pagamento", "error");
        }
      }, 2000);
    },

    stopStatusPolling() {
      if (this.pollingInterval) {
        clearInterval(this.pollingInterval);
        this.pollingInterval = null;
      }
    },

    resetPayment() {
      this.currentPayment = null;
      this.$refs.paymentForm.resetForm();
    },

    showSnackbar(message, color) {
      this.snackbar = { show: true, message, color };
    },
  },
  beforeUnmount() {
    this.stopStatusPolling();
  },
};
</script>

<style scoped>
.payment-view {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}
</style>