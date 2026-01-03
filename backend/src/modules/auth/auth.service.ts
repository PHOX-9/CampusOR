import { User, UserRole } from "./user.model.js";
import bcrypt from "bcryptjs"; // for encrypting and matching the password
import jwt, { SignOptions } from "jsonwebtoken";
import { env } from "../../config/env.js";
const SALT = 10;

//----------------REGISTER SERVICE----------------------------------------
export interface RegisterDetails {
  name: string;
  email: string;
  password: string;
  role?: UserRole;
  // Role-specific fields
  collegeEmail?: string; // Required for "user" role
  department?: string; // Required for "operator" role
  position?: string; // Required for "operator" role
}

export interface SafeUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  collegeEmail?: string;
  department?: string;
  position?: string;
  createdAt: Date;
  updatedAt: Date;
}

export const registerUser = async (
  input: RegisterDetails
): Promise<SafeUser> => {
  const { name, email, password, role, collegeEmail, department, position } = input;
  
  // Determine final role (default to "user")
  const finalRole = role || "user";

  // Validate role-specific required fields
  if (finalRole === "user") {
    if (!collegeEmail) {
      throw new Error("College email is required for user role");
    }
  } else if (finalRole === "operator") {
    if (!department) {
      throw new Error("Department is required for operator role");
    }
    if (!position) {
      throw new Error("Position is required for operator role");
    }
  }

  // 1)check if email already exists
  const existing = await User.findOne({ email });
  if (existing) {
    // for now we just throw a normal Error, controller will map it to 400
    throw new Error("Email is already registered");
  }

  // 2 : Hash password
  const hashedPassword = await bcrypt.hash(password, SALT);

  // 3) Prepare user data with role-specific fields
  const userData: {
    name: string;
    email: string;
    password: string;
    role: UserRole;
    collegeEmail?: string;
    department?: string;
    position?: string;
  } = {
    name,
    email,
    password: hashedPassword,
    role: finalRole,
  };

  // Add role-specific fields conditionally
  if (finalRole === "user" && collegeEmail) {
    userData.collegeEmail = collegeEmail;
  } else if (finalRole === "operator") {
    if (department) userData.department = department;
    if (position) userData.position = position;
  }

  // 4) Create user in DB
  const userResult = await User.create(userData);
  // Mongoose create can return array or single doc, ensure we have single doc
  const user = Array.isArray(userResult) ? userResult[0] : userResult;

  // 5) safe data (no password)
  return {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    role: user.role,
    collegeEmail: user.collegeEmail,
    department: user.department,
    position: user.position,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
};

///-------------------------LOGIN SERVICE---------------------------------------------

export interface LoginDetails {
  email: string;
  password: string;
}

export interface LoginResult {
  token: string;
  user: SafeUser;
}

export const loginUser = async (input: LoginDetails): Promise<LoginResult> => {
  const { email, password } = input;

  // 1) Find user by email
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Invalid email or password");
  }

  // 2) Compare passwords
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid email or password");
  }

  // 3) Build safe user object
  const safeUser: SafeUser = {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    role: user.role,
    collegeEmail: user.collegeEmail,
    department: user.department,
    position: user.position,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };

  // 4) Create JWT payload
  const payload = {
    sub: safeUser.id, // subject
    role: safeUser.role,
  };

  // 5) Sign JWT
  const signOptions: SignOptions = {
    expiresIn: env.JWT_EXPIRES_IN as SignOptions["expiresIn"],
  };
  const token = jwt.sign(payload, env.JWT_SECRET, signOptions);

  return { token, user: safeUser };
};
