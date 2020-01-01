module.exports = (sequelize, DataType) => {
    const user = sequelize.define('user', {
      username: {
        type: DataType.STRING(255)
      },
      password: {
        type: DataType.STRING(255)
      },
      firstname: {
        type: DataType.STRING(100)
      },
      lastname: {
        type: DataType.STRING(100)
      },
      birthday: {
        type: DataType.STRING(100)
      },
      address: {
        type: DataType.STRING(255)
      },
      phone_number: {
        type: DataType.STRING(10)
      },
      role: {
        type: DataType.ENUM("nurse", "doctor","admin")
      }
    })
  
    // user.associate = (models) => {
    //   user.hasMany(models.post, { foreignKey: 'user_id' })
    // }
  
    return user
  }