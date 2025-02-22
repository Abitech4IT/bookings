import {
  Table,
  Column,
  Model,
  DataType,
  CreatedAt,
  UpdatedAt,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import User from "./user.model";

@Table({
  tableName: "bookings",
  timestamps: true,
})
export default class Booking extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id!: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
    validate: {
      notNull: { msg: "Title is required" },
      notEmpty: { msg: "Title cannot be empty" },
    },
  })
  title!: string;

  // Foreign key column
  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  userId!: string;

  // Association with User model
  @BelongsTo(() => User)
  user!: User;

  @CreatedAt
  createdAt!: Date;

  @UpdatedAt
  updatedAt!: Date;
}
