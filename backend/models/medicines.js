module.exports = (sequelize, DataType) => {
    const medicines = sequelize.define('medicines', {
      name: {
        type: DataType.STRING(255)
      },
      type: {
        type: DataType.STRING(255)
      },
      price: {
        type: DataType.INTEGER
      }
    })
  
    medicines.associate = (models) => {
      medicines.belongsToMany(models.invoices, { through:models.medicinesInvoice})
    }
  
    return medicines
  }