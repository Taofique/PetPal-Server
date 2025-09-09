import User from "./User.js";
import Pet from "./Pet.js";
import Schedule from "./Schedule.js";
import CareLog from "./CareLog.js";

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

User.hasMany(CareLog, { foreignKey: "userId", as: "careLogs" });
CareLog.belongsTo(User, { foreignKey: "userId", as: "user" });

Pet.hasMany(CareLog, { foreignKey: "petId", as: "careLogs" });
CareLog.belongsTo(Pet, { foreignKey: "petId", as: "pet" });

export { User, Pet, Schedule, CareLog };
