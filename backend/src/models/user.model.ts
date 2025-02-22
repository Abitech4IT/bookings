import {
  Table,
  Column,
  Model,
  DataType,
  CreatedAt,
  UpdatedAt,
  BeforeCreate,
  BeforeUpdate,
  HasMany,
} from "sequelize-typescript";
import bcrypt from "bcryptjs";
import Booking from "./booking.model";

@Table({
  tableName: "users",
  timestamps: true,
  indexes: [
    {
      unique: true,
      fields: ["email"],
      name: "email_unique_idx",
    },
  ],
})
export default class User extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id!: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  firstName!: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  lastName!: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
    validate: {
      isEmail: {
        msg: "Email address must be valid",
      },
    },
  })
  email!: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
    validate: {
      len: {
        args: [8, 100],
        msg: "Password must be at least 8 characters long",
      },
    },
  })
  password!: string;

  @Column({
    type: DataType.ENUM("user", "admin"),
    allowNull: false,
    defaultValue: "user",
  })
  role!: string;

  // Add this relationship
  @HasMany(() => Booking)
  bookings?: Booking[];

  @CreatedAt
  createdAt!: Date;

  @UpdatedAt
  updatedAt!: Date;

  // Virtual field for full name
  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  // Method to check password
  async comparePassword(candidatePassword: string): Promise<boolean> {
    return await bcrypt.compare(candidatePassword, this.password);
  }

  // Hash password before saving
  @BeforeCreate
  @BeforeUpdate
  static async hashPassword(instance: User) {
    // Only hash the password if it has been modified
    if (instance.changed("password")) {
      const salt = await bcrypt.genSalt(10);
      instance.password = await bcrypt.hash(instance.password, salt);
    }
  }

  // When converting to JSON, exclude password
  toJSON() {
    const values = Object.assign({}, this.get());
    delete values.password;
    return values;
  }
}
