import { Button } from "@/components/ui/Button";
import { useAuth } from "@/hooks/useAuth";

export default function Home() {
	const { logout } = useAuth();

	return (
		<section className="flex flex-col justify-center gap-10 w-full">
			<h1 className="text-center">Welcome to the App!</h1>

			<Button className="w-fit self-center" onClick={logout}>
				Logout
			</Button>
		</section>
	);
}
