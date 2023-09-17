"use client";

import { PubCreatorType, TopicType } from "@/types";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { BsThreeDots } from "react-icons/bs";

type Props = {
	topic: TopicType;
};

const ControlMenu = ({ topic }: Props) => {
	const { data: session } = useSession();
	const router = useRouter();
	const user = session?.user as { id: string } & Omit<PubCreatorType, "_id">;

	const hasControl = user && (user?.id === topic.creator._id || user?.admin);
	const [toggleControlMenu, setToggleControlMenu] = useState<boolean>(false);

	const menuRef = useRef<HTMLDivElement>(null);
	const menuBtnRef = useRef<HTMLButtonElement>(null);

	useEffect(() => {
		const clickHandler = (e: MouseEvent) => {
			if (
				e.target === menuBtnRef.current ||
				menuBtnRef.current?.contains(e.target as Node)
			) {
				setToggleControlMenu(true);
			} else {
				setToggleControlMenu(false);
			}
		};
		document.addEventListener("click", clickHandler);

		return () => document.removeEventListener("click", clickHandler);
	}, []);

	const handleControlMenu = () => {
		setToggleControlMenu((currState) => !currState);
	};

	const deleteTopic = async () => {
		handleControlMenu();
		const isConfirmed = confirm("Are you sure you want to delete this topic?");

		if (isConfirmed) {
			await fetch(`/api/topics/${topic._id}`, {
				method: "DELETE",
			});

			router.refresh();
		}
	};

	return (
		<>
			{hasControl ? (
				<div className="flex gap-2 items-center relative">
					<button
						ref={menuBtnRef}
						onClick={handleControlMenu}
						className="text-xl"
					>
						<BsThreeDots />
					</button>
					{toggleControlMenu ? (
						<div
							ref={menuRef}
							className="absolute top-0 right-6 rounded-xl py-3 px-4 tracking-wide text-white/60 text-sm flex flex-col gap-2 bg-neutral-800 text-start"
						>
							<button
								onClick={() => {
									handleControlMenu();
									router.push(`/edit-topic/${topic._id}`);
								}}
								className="w-full hover:text-white transition-colors"
							>
								Edit
							</button>
							<span className="inline-block w-full h-[1px] bg-white/20" />
							<button
								className="w-full hover:text-white transition-colors"
								onClick={deleteTopic}
							>
								Delete
							</button>
						</div>
					) : null}
				</div>
			) : null}
		</>
	);
};

export default ControlMenu;
