export const revalidatePath = async (pathes: string[]) => {
	const pathesString = pathes.join("&path=");

	await fetch(
		`${process.env.BASE_URL}/api/revalidate?&secret=${process.env.MY_SECRET_TOKEN}&path=${pathesString}`
	).then((res) => res.json());
};
