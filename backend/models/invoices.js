module.exports = (sequelize, DataType) => {
    const invoices = sequelize.define('invoices', {
      firstname: {
        type: DataType.STRING(255)
      },
      lastname: {
        type: DataType.STRING(255)
      },
      diagnose: {
        type: DataType.STRING(255)
      }
    })
  
    invoices.associate = (models) => {
      invoices.belongsToMany(models.medicines, { through:models.medicinesInvoice})
    }
  
    return invoices
  }