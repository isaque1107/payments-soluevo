export class Exception {
    public status: number
    public data: Error
    public code: number

    constructor(status: number, data: Error, code?: number) {
        this.status = status
        this.data = data
        this.code = code || status
    }

    reject() {
        return Promise.reject(this)
    }
}
