import mongoose from 'mongoose';
import User from './user.model.js';
import Role from './role.model.js';
import Country from './country.model.js';
import City from './city.model.js';
import PropertyType from './propertyType.model.js';

const db = {}
// set up mongoose
db.mongoose = mongoose;
db.User = User;
db.Role = Role;
db.Country = Country;
db.City = City;
db.PropertyType = PropertyType;
db.ROLES = ["user", "admin", "moderator"];

export default db;