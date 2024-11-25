import { Db } from "mongodb";
import { COL } from "../../constant/constant";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_SECRET, redisClient } from "../../config/config";

const JWT_KEY = JWT_SECRET ?? "";

const create = async (db: Db, body: any): Promise<any> => {
    const { name, email, password, board, field, standard, dob, age } = body;
    console.log(body)

    const userExist = await db.collection(COL.users).findOne({ email });
    if (userExist) {
        throw {
            status: "404",
            msg: "User already exists",
        };
    }

    const hashPassword = bcrypt.hashSync(password, 5);

    const newUser = await db.collection(COL.users).insertOne({
        name,
        email,
        password: hashPassword,
        board,
        field,
        standard,
        dob,
        age,
    });

    return newUser;
};

const login = async (db: Db, body: any): Promise<any> => {
    const { email, password } = body;

    const userExist = await db.collection(COL.users).findOne({ email });
    if (!userExist) {
        throw {
            status: "404",
            msg: "Credentials error",
        };
    }

    const checkPassword = await bcrypt.compare(password, userExist.password);
    if (!checkPassword) {
        throw {
            status: "404",
            msg: "Credentials error",
        };
    }

    const token = await jwt.sign({ id: userExist._id }, JWT_KEY, { expiresIn: "12hr" });
    await redisClient.setex(`authToken:${userExist._id}`, 43200, token);

    return token;
};

const update = async (db: Db, body: any): Promise<any> => {
    const { _id, name, email, password, board, field, standard, dob, age } = body;
    if (!_id) {
        throw {
            status: "400",
            msg: "User ID is required",
        };
    }

    const userExist = await db.collection(COL.users).findOne({ _id });
    if (!userExist) {
        throw {
            status: "404",
            msg: "User not found",
        };
    }

    const updates: any = {};
    if (name) updates.name = name;
    if (email) {
        const emailExists = await db.collection(COL.users).findOne({ email, _id: { $ne: _id } });
        if (emailExists) {
            throw {
                status: "400",
                msg: "Email already in use by another user",
            };
        }
        updates.email = email;
    }
    if (password) {
        updates.password = await bcrypt.hash(password, 5);
    }
    if (board) updates.board = board;
    if (field) updates.field = field;
    if (standard) updates.standard = standard;
    if (dob) updates.dob = dob;
    if (age) updates.age = age;

    const result = await db.collection(COL.users).updateOne({ _id }, { $set: updates });

    if (result.modifiedCount === 0) {
        throw {
            status: "500",
            msg: "Failed to update user",
        };
    }

    return updates;
};

export default {
    create,
    update,
    login,
};
