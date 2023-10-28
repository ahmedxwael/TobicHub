import { Topic } from "@/models/Topic";
import { connectToDB } from "@/utils/db";
import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params: { id } }: { params: { id: string } }
) => {
  try {
    await connectToDB();

    const [topic] = await Topic.find({ _id: id }).populate("creator", {
      email: 0,
    });

    return NextResponse.json(topic, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};

export const PATCH = async (
  request: NextRequest,
  { params: { id } }: { params: { id: string } }
) => {
  const body = await request.json();

  console.log("from api: ", body);

  try {
    const topic = await Topic.findByIdAndUpdate(id, body);

    revalidateTag("topics");

    return NextResponse.json(topic, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error }, { status: 500 });
  }
};

export const DELETE = async (
  request: NextRequest,
  { params: { id } }: { params: { id: string } }
) => {
  try {
    await connectToDB();

    await Topic.findByIdAndDelete(id);
    revalidateTag("topics");

    return NextResponse.json(
      { message: "Deleted successfully!" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
