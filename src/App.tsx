import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/ui/navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { AuthProvider } from "./contexts/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ProtectedRoute from "./components/auth/protected-route";

const queryClinet = new QueryClient();

function App() {
	return (
		<main className="h-full min-h-screen bg-background text-foreground p-10">
			<QueryClientProvider client={queryClinet}>
				<BrowserRouter>
					<AuthProvider>
						<Navbar />

						<Routes>
							<Route
								path="/"
								element={
									<ProtectedRoute>
										<Home />
									</ProtectedRoute>
								}
							/>
							<Route path="/login" element={<Login />} />
						</Routes>
					</AuthProvider>
				</BrowserRouter>
			</QueryClientProvider>
		</main>
	);
}

export default App;
