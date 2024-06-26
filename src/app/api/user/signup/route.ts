import User from "@/models/userModel";
import { connect } from "@/db/db.connect";
import { NextRequest, NextResponse } from "next/server";
const bcryptjs = require("bcryptjs");
connect();
export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { username, email, password } = reqBody;
    // Parses the request body to extract username, email, and password.

    //Checks if a user with the provided email already exists.
    const user = await User.findOne({ email });

    //If yes, returns a 400 response.
    if (user) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    //hash password using bcryptjs.
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    // Saves the new user to the database.
    const savedUser = await newUser.save();

    return NextResponse.json({
      message: "User created successfully",
      success: true,
      savedUser,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
