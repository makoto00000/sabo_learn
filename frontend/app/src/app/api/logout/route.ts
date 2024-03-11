import { NextResponse } from "next/server";
import { deleteCookie } from "../../utils/Cookie";

export async function POST() {
  try {
    deleteCookie('user_id');
    return NextResponse.json({
      message: "success",
    }, { status: 200 });
  } catch (error) {
    return NextResponse.json({
      message: error,
    }, { status: 500 });
  }
}
