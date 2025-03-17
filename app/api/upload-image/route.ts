import prisma from "@/prisma";
import { SUPABASE_SERVICE_ROLE_KEY, SUPABASE_URL } from "@/shared/flags";
import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

const BUCKET_NAME = "avatars";

export async function POST(request: NextRequest) {
  // 1. Use environment variables properly
  const supabase = createClient(SUPABASE_URL!, SUPABASE_SERVICE_ROLE_KEY!);

  try {
    // 2. Missing bucket list retrieval
    const { data: buckets, error: listError } =
      await supabase.storage.listBuckets();

    if (listError) {
      return NextResponse.json(
        { message: "Couldn't list buckets", error: listError.message },
        { status: 500 }
      );
    }

    const bucketExists = buckets?.some((bucket) => bucket.name === BUCKET_NAME);

    if (!bucketExists) {
      const { error: createBucketError } = await supabase.storage.createBucket(
        BUCKET_NAME,
        { public: true }
      );

      if (createBucketError) {
        console.error("Create bucket error:", createBucketError);
        return NextResponse.json(
          {
            message: "Couldn't create the bucket",
            error: createBucketError.message,
          },
          { status: 500 }
        );
      }
    }

    const userId = request.nextUrl.searchParams.get("userId");
    const formData = await request.formData();

    const image = formData.get("image") as any;

    if (!image) {
      return NextResponse.json(
        { message: "Image is required." },
        { status: 404 }
      );
    }

    const relativeImagePath = `public/${userId}/${image.name}`;

    const { error }: any = await supabase.storage
      .from(BUCKET_NAME)
      .upload(relativeImagePath, image, { cacheControl: "3600", upsert: true });

    if (error) {
      const message = `Couldn't upload the image. ${error?.error || error?.message}`;
      const status = error?.status || Number(error?.statusCode) || 500;

      return NextResponse.json({ message }, { status });
    }

    const signedUrlData = await supabase.storage
      .from(BUCKET_NAME)
      .createSignedUrl(relativeImagePath, 60 * 60 * 24 * 360);

    if (!signedUrlData || !signedUrlData.data) {
      return NextResponse.json(
        {
          message:
            "Couldn't create a signed url for the image." +
            signedUrlData.error.message,
        },
        { status: 500 }
      );
    }

    await prisma.user.update({
      where: { id: userId! },
      data: { avatar: signedUrlData.data.signedUrl },
    });

    return NextResponse.json({ message: "Success" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong." },
      { status: 500 }
    );
  }
}
