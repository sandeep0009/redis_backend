import mongoose, { Document,Schema } from "mongoose";


export interface IUser extends Document{
    name: string;
    email: string;
    password: string;
    board: string;
    field: string;
    standard: string;
    dob: Date;
    age: number;
}

const UserSchema: Schema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    board: { type: String, required: true },
    field: { type: String, required: true },
    standard: { type: String, required: true },
    dob: { type: Date, required: true },
    age: { type: Number, required: true },
  });



export const user = mongoose.model<IUser>('user', UserSchema);