import LoginForm from "@/components/auth/LoginForm";
import { useAuth } from "@/hooks/useAuth";
import { Navigate, useNavigate } from "react-router-dom";

export default function Login() {
	const navigate = useNavigate();
	const { isAuthenticated, login, error, isLoading } = useAuth();

	if (isAuthenticated === true) return <Navigate to={"/"} replace />;

	const handleLogin = (values: { email: string; password: string }) => {
		login(values.email, values.password).then(() => {
			navigate("/");
		});
	};

	return (
		<div className="flex flex-col">
			<LoginForm handleLogin={handleLogin} isLoading={isLoading} />
			<p className="text-xl text-red-500">{error}</p>
		</div>
	);
}
