import User from "./User.js";
import Pet from "./Pet.js";
import Schedule from "./Schedule.js";

User.hasMany(Pet, { foreignKey: "ownerId", as: "pets" });
Pet.belongsTo(User, { foreignKey: "ownerId", as: "owner" });

User.hasMany(Schedule, { foreignKey: "ownerId", as: "schedules" });
Schedule.belongsTo(User, { foreignKey: "ownerId", as: "owner" });

Pet.hasMany(Schedule, {
  foreignKey: "petId",
  as: "schedules",
  onDelete: "CASCADE",
});
Schedule.belongsTo(Pet, { foreignKey: "petId", as: "pet" });

export { User, Pet, Schedule };
