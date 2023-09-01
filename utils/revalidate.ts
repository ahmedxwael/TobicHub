export const revalidateTag = async (tag: string = "topics") => {
	await fetch(
		`${process.env.BASE_URL}/api/revalidate?tag=${tag}&secret=${process.env.MY_SECRET_TOKEN}`
	).then((res) => res.json());
};
