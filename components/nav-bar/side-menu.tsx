import React from "react";
import { IoClose } from "react-icons/io5";
import NavLinks from "./nav-links";
import UserButtons from "./user-buttons";

type Props = {
	menuHandler: () => void;
};

const SideMenu = ({ menuHandler }: Props) => {
	return (
		<div className="fixed top-0 left-0 w-full h-full bg-black/70 flex z-10">
			<aside className="w-[350px] max-w-full ml-auto flex flex-col gap-6 bg-black border-l-2 border-white/10 p-6">
				<div className="flex items-center gap-4 justify-between border-b-2 border-white/10 pb-6">
					<p className="font-bold text-xl">TobicHub</p>
					<button onClick={menuHandler} className="text-xl">
						<IoClose />
					</button>
				</div>
				<div className="flex flex-col gap-4 text-white/50">
					<NavLinks closeMenu={menuHandler} />
				</div>
				<div className="mt-auto border-t-2 border-white/10 pt-6">
					<UserButtons closeMenu={menuHandler} />
				</div>
			</aside>
		</div>
	);
};

export default SideMenu;
