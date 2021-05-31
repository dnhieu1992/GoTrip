import mongoose from 'mongoose';
import User from './user.model.js';
import Role from './role.model.js';
import Country from './country.model.js';
import City from './city.model.js';
import PropertyType from './propertyType.model.js';
import Property from './property.model.js';
import RoomType from './roomType.model.js';
import Bed from './bed.model.js';
import Breakfast from './breakfast.model.js';
import RoomName from './roomName.model.js';
import AmenityCategory from './amenityCategory.model.js';
import Amenity from './amenity.model.js';

const db = {}
// set up mongoose
db.mongoose = mongoose;
db.User = User;
db.Role = Role;
db.Country = Country;
db.City = City;
db.PropertyType = PropertyType;
db.Property = Property;
db.RoomType = RoomType;
db.Bed = Bed;
db.Breakfast = Breakfast;
db.RoomName = RoomName;
db.AmenityCategory = AmenityCategory;
db.Amenity = Amenity;
db.ROLES = ["user", "admin", "moderator"];

export default db;