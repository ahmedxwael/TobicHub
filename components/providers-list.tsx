"use client";

import {
	ClientSafeProvider,
	LiteralUnion,
	signIn,
	signOut,
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
				<div className="flex flex-col items-center gap-4">
					<h1>Welcome {session.user?.name}</h1>
					<button
						className="capitalize font-semibold border-2 border-white/10 disabled:cursor-not-allowed transition-colors hover:bg-white/10 disabled:opacity-70 rounded-lg py-3 px-6"
						onClick={() => signOut()}
					>
						Sign out
					</button>
				</div>
			) : providers ? (
				Object.values(providers).map((provider) => (
					<button
						key={provider.id}
						type="button"
						className="flex-1 border-2 border-white/10 hover:bg-white/80 bg-white text-black transition-colors capitalize font-semibold rounded-lg py-3 px-6"
						onClick={() => signIn(provider.id)}
					>
						{provider.name}
					</button>
				))
			) : null}
		</>
	);
};

export default ProvidersList;
