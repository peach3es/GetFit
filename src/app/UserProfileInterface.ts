import { SQLError } from "expo-sqlite";

export interface UserProfileData {
    name: string;
    sex: string;
    dob: string; // Date of birth as a string in ISO format
    height: number;
    weight: number;
}

export type ListUserDataCallback = (success: boolean, data: UserProfileData[] | SQLError) => void;

export type AddUserDataCallback = (success: boolean, data: {insertId: number} | SQLError) => void;
export { SQLError };
