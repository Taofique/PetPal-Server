import User from "./User.js";
import Pet from "./Pet.js";
import Schedule from "./Schedule.js";
import CareLog from "./CareLog.js";
import Post from "./FeedPost.js";
import Sitter from "./Sitter.js";
import SitterRequest from "./SitterRequest.js";

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

User.hasMany(Post, { foreignKey: "userId", as: "posts" });
Post.belongsTo(User, { foreignKey: "userId", as: "user" });

Pet.hasMany(Post, { foreignKey: "petId", as: "posts" });
Post.belongsTo(Pet, { foreignKey: "petId", as: "pet" });

User.hasOne(Sitter, { foreignKey: "userId", as: "sitterProfile" });
Sitter.belongsTo(User, { foreignKey: "userId", as: "user" });

Sitter.hasMany(SitterRequest, { foreignKey: "sitterId", as: "requests" });
SitterRequest.belongsTo(Sitter, { foreignKey: "sitterId", as: "sitter" });

Pet.hasMany(SitterRequest, { foreignKey: "petId", as: "requests" });
SitterRequest.belongsTo(Pet, { foreignKey: "petId", as: "pet" });

User.hasMany(SitterRequest, { foreignKey: "userId", as: "sentRequests" });
SitterRequest.belongsTo(User, { foreignKey: "userId", as: "requester" });

export { User, Pet, Schedule, CareLog, Post, Sitter, SitterRequest };
