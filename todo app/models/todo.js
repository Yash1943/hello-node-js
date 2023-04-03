"use strict";
const { Model,Op} = require("sequelize");
// import { Op } from "sequelize";
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }

    static addTodo({ title, dueDate }) {
      return this.create({ title: title, dueDate: dueDate, completed: false });
    }

    static gettodos(){
      return this.findAll({order:[["id","ASC"]]});
    }
    static Overdue(){
      return this.findAll({
        where:{
          dueDate:{
            [Op.lt]:new Date().toISOString()
          },
        },
        order:[["id","ASC"]]
      })
    }
    static duelater(){
      return this.findAll({
        where:{
          dueDate:{
            [Op.gt]:new Date().toISOString()
          },
        },
        order:[["id","ASC"]]
      })
    }
    static duetoday(){
      return this.findAll({
        where:{
          dueDate:{
            [Op.eq]:new Date().toISOString()
          },
        },
        order:[["id","ASC"]]
      })
    }
    markAsCompleted() {
      return this.update({ completed: true });
    }
  }
  Todo.init(
    {
      title: DataTypes.STRING,
      dueDate: DataTypes.DATEONLY,
      completed: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Todo",
    }
  );
  return Todo;
};