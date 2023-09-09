export const revalidateTagedPages = async (tag: string) => {
	await fetch(
		`/api/revalidate?tag=${tag}&secret=${process.env.MY_SECRET_TOKEN}`,
		{
			method: "POST",
		}
	).then((res) => res.json());
};
