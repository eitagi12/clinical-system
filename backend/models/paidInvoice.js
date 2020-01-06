module.exports = (sequelize, DataType) => {
    const paidInvoice = sequelize.define('paidInvoice', {
      firstname: {
        type: DataType.STRING(255)
      },
      lastname: {
        type: DataType.STRING(255)
      },
      total: {
        type: DataType.INTEGER
      }
    })
  
  
    return paidInvoice
  }