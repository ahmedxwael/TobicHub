import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
	const secret = request.nextUrl.searchParams.get("secret");
	const pathArray = request.nextUrl.searchParams.getAll("path");

	console.log(pathArray);
	if (secret !== process.env.MY_SECRET_TOKEN) {
		return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
	}

	if ((pathArray.length = 0)) {
		return NextResponse.json(
			{ message: "Missing path param" },
			{ status: 400 }
		);
	}

	pathArray.forEach((path) => {
		revalidatePath(path);
	});

	return NextResponse.json({ revalidated: true, now: Date.now() });
}
