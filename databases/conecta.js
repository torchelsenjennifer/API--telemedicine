import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize("telemedicine","root","",{
  dialect: 'mysql',
  host:"localhost",
  port:3306,
})