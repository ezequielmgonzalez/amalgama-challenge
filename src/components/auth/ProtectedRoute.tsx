import { useAuth } from "@/hooks/useAuth";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({
	children,
}: {
	children: React.ReactNode;
}) {
	const { isAuthenticated } = useAuth();

	return isAuthenticated === true ? (
		children
	) : (
		<Navigate to={"/login"} replace />
	);
}
