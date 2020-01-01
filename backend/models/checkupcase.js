module.exports = (sequelize, DataType) => {
    const checkupcase = sequelize.define('checkupcase', {
      firstname: {
        type: DataType.STRING(255)
      },
      lastname: {
        type: DataType.STRING(255)
      },
      congenital_disease: {
        type: DataType.STRING(255)
      },
      blood_type: {
        type: DataType.STRING(1)
      },
      allergic_medicine : {
        type: DataType.STRING(255)
      },
      weight: {
        type: DataType.INTEGER
      },
      height: {
        type: DataType.INTEGER
      },
      temperature: {
          type: DataType.INTEGER
      },
      pressure: {
          type: DataType.INTEGER
      }
      
    })
  
    // user.associate = (models) => {
    //   user.hasMany(models.post, { foreignKey: 'user_id' })
    // }
  
    return checkupcase
  }