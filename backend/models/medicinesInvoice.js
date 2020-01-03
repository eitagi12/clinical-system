module.exports = (sequelize, DataType) => {
    const medicinesInvoice = sequelize.define('medicinesInvoice', {
      amount: {
        type: DataType.STRING(255)
      }
    })

    return medicinesInvoice
  }