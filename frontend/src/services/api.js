import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'http://localhost:3000/api',
  headers: {
    'Authorization': 'Bearer 1234567890abcdef'
  }
})

export default {
  async createPayment(paymentData) {
    try {
      const response = await apiClient.post('/payments', paymentData)
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Erro ao criar pagamento')
    }
  },

  async getPaymentStatus(paymentId) {
    try {
      const response = await apiClient.get(`/payments/${paymentId}`)
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Erro ao verificar status')
    }
  }
}