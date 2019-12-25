module.exports = (sequelize, DataType) => {
    const patients = sequelize.define('patients', {
      firstname: {
        type: DataType.STRING(255)
      },
      lastname: {
        type: DataType.STRING(255)
      },
      birthday: {
        type: DataType.STRING(100)
      },
      address: {
        type: DataType.STRING(100)
      },
      phone_number: {
        type: DataType.STRING(100)
      },
      phone_number_emergency: {
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
      }
    })
  
    // user.associate = (models) => {
    //   user.hasMany(models.post, { foreignKey: 'user_id' })
    // }
  
    return patients
  }