import { createContext, useState, ReactNode, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { login as apiLogin } from "@/services/api";

interface AuthContextType {
	token: string | null;
	login: (email: string, password: string) => Promise<void>;
	logout: () => void;
	isAuthenticated: boolean;
	isLoading: boolean;
	error: string | null;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	const [token, setToken] = useState<string | null>(
		localStorage.getItem("token")
	);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const navigate = useNavigate();

	const login = useCallback(
		async (email: string, password: string) => {
			setIsLoading(true);
			setError(null);
			try {
				const response = await apiLogin({ email, password });
				localStorage.setItem("token", response.token);
				setToken(response.token);
				navigate("/");
			} catch (error) {
				const errorMessage =
					error instanceof Error ? error.message : String(error);
				setError(errorMessage);
				console.error("Login failed:", error);
			} finally {
				setIsLoading(false);
			}
		},
		[navigate]
	);

	const logout = useCallback(() => {
		setToken(null);
		localStorage.removeItem("token");
		navigate("/login");
	}, [navigate]);

	const value = {
		token,
		login,
		logout,
		isAuthenticated: !!token,
		isLoading,
		error,
	};

	return (
		<AuthContext.Provider value={value}>{children}</AuthContext.Provider>
	);
};
