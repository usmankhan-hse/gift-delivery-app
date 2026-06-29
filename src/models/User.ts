import mongoose, {Schema, models, model} from "mongoose";

export type UserRole = "costumer" | "admin" | "delivery";

export interface IUser {
    name: string;
    email: string;
    image?: string;
    phone?: string;
    role : UserRole;
    provider: "credentials" | "google" | "facebook";
    providerAccountId?: string;
    isActive: boolean;
}

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    image: {
      type: String,
    },

    phone: {
      type: String,
      trim: true,
    },

    role: {
      type: String,
      enum: ["customer", "admin", "delivery"],
      default: "customer",
    },

    provider: {
      type: String,
      enum: ["credentials", "google", "facebook"],
      default: "credentials",
    },

    providerAccountId: {
      type: String,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    
    timestamps: true,
  }
);
const User = models.User || model<IUser>("User", userSchema);

export default User;

