"use client";

import {
	ClientSafeProvider,
	LiteralUnion,
	signIn,
	useSession,
} from "next-auth/react";

type Props = {
	providers: Record<LiteralUnion<string>, ClientSafeProvider> | null;
};

const ProvidersList = ({ providers }: Props) => {
	const { data: session } = useSession();

	return (
		<>
			{session ? (
				<h1 className="text-center font-bold text-2xl">
					Welcome {session.user?.name}
				</h1>
			) : (
				<form className="flex-col flex gap-6 border-2 p-6 border-white/10 rounded-lg w-[500px] max-w-full">
					<h1 className="capitalize text-center font-bold text-2xl">
						Sign in to TopicHub
					</h1>
					{providers
						? Object.values(providers).map((provider) => (
								<button
									key={provider.id}
									type="button"
									className="flex-1 btn btn-primary capitalize"
									onClick={() =>
										signIn(provider.id, {
											callbackUrl: process.env.BASE_URL!,
										})
									}
								>
									{provider.name}
								</button>
						  ))
						: null}
				</form>
			)}
		</>
	);
};

export default ProvidersList;
