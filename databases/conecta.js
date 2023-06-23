import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize("waterfall-especialistas","root","",{
  dialect: 'mysql',
  host:"localhost",
  port:3306,
})