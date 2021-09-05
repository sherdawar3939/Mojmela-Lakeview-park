'use strict'

module.exports = function (sequelize, DataTypes) {
  const Order = sequelize.define('Order', {
    title: {
      type: DataTypes.STRING(),
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM(['Active', 'InActive']),
      allowNull: false,
      defaultValue: 'Active'
    },
    total: {
      type: DataTypes.DECIMAL(9, 2)
    },
    discount: {
      type: DataTypes.DECIMAL(8, 2)
    },
    orderType: {
      type: DataTypes.ENUM(['Standard', 'Ride', 'Gate'])
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {
    associate: function (models) {
      Order.hasMany(models.OrderProduct, { foreignKey: 'OrderId', as: 'orderProducts' })
      Order.belongsTo(models.Stall, { foreignKey: 'StallId', as: 'orderStalls' })
      Order.hasMany(models.Transaction, { foreignKey: 'OrderId', as: 'orderTransaction' })
    }
  })
  return Order
}
