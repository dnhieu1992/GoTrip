import mongoose from 'mongoose';
import User from './user.model.js';
import Role from './role.model.js';

const db = {}
// set up mongoose
db.mongoose = mongoose;
db.user = User;
db.Role = Role;
db.ROLES = ["user", "admin", "moderator"];

export default db;