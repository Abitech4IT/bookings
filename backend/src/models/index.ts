import sequelize from "../config/database";
import Booking from "./booking.model";
import User from "./user.model";

// Add all models here to ensure they are registered
const models = [User, Booking];

// Initialize models
sequelize.addModels(models);

export { User };
export default sequelize;
