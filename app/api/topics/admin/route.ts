import { Topic } from "@/models/Topic";
import { connectToDB } from "@/utils/db";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    await connectToDB();

    const topics = await Topic.find({})
      .populate("creator", { email: 0 })
      .sort({ _id: -1 });

    return NextResponse.json(topics, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};