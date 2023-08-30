import React, { ReactNode, forwardRef } from "react";

type Props = {
	type: "primary" | "alt";
	children: ReactNode;
	handler: () => void;
	disabled?: boolean;
};

const Button = ({ type, children, disabled, handler }: Props) => {
	return (
		<button
			disabled={disabled}
			onClick={handler}
			className={`${type === "primary" ? "btn-primary" : "btn-alt"} btn`}
		>
			{children}
		</button>
	);
};

export default Button;
