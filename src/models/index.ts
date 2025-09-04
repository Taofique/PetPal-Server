import User from "./User.js";
import Pet from "./Pet.js";

User.hasMany(Pet, { foreignKey: "ownerId", as: "pets" });
Pet.belongsTo(User, { foreignKey: "ownerId", as: "owner" });

export { User, Pet };
