import { NextRequest, NextResponse } from "next/server";
import { validateUserData } from "./validateData";

export type UserData = {
    name: string;
    email: string;
    password: string;
    dateOfBirth: string;
    phoneNumber: string;
    termsAccepted: boolean;
};


export const POST = async (req: NextRequest) => {
    const body = await req.json();
    const formData = body.data;
    try {
        if (formData) {
            const validationErrors = validateUserData(formData);
            if (validationErrors) {
                return NextResponse.json({ error: validationErrors }, { status: 400 });
            }
            const response = await checkEmailExists(formData.email);
            console.log(response);

            if (!response) {
                await saveUser(formData)
            }
            return NextResponse.json({ message: 'success' })
        } else {
            return NextResponse.json({ message: 'not found' }, { status: 404 });
        }
    } catch (error: any) {
        console.log(error.message);
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

async function checkEmailExists(email: string): Promise<boolean> {
    // Simulate database check
    return new Promise(resolve => setTimeout(() => resolve(false), 100));
}

async function saveUser(userData: UserData): Promise<{ id: string; email: string }> {
    // Simulate saving to database
    return new Promise(resolve =>
        setTimeout(() => resolve({ id: '123', email: userData.email }), 100)
    );
}