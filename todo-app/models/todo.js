"use strict";
const { Model } = require("sequelize");
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

    static addTodo(title, dueDate ) {
      return this.create({ title: title, dueDate: dueDate, completed: false });
    }

    //create a fun to  show a todo we can create 
    static getTodos() {
      return this.findAll({order:[["id","ASC"]]})    //it can return all todos store in database
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