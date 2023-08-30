import { useRouter } from "next/navigation";
import React from "react";

const JoinUsBtn = () => {
	const router = useRouter();

	const clickHandler = () => {
		router.push("/register");
	};
	return (
		<button className="btn btn-primary" onClick={clickHandler}>
			Join us now
		</button>
	);
};

export default JoinUsBtn;
