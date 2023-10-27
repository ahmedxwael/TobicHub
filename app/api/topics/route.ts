import { Topic } from "@/models/Topic";
import { connectToDB } from "@/utils/db";
import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

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

export const POST = async (request: NextRequest) => {
  const data = await request.json();

  try {
    await connectToDB();

    await Topic.create(data);
    revalidateTag("topics");
    return NextResponse.json(
      { message: "Topic created successfuly" },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: "Couldn't add the topic, " + error.message },
      { status: 500 }
    );
  }
};
