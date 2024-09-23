export const login = async (credentials: {
	email: string;
	password: string;
}): Promise<{ token: string }> => {
	const formData = new URLSearchParams();
	formData.append("email", credentials.email);
	formData.append("password", credentials.password);

	console.log("Form is ", formData);

	const response = await fetch(`${process.env.VITE_BASE_URL}/login`, {
		method: "POST",
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
		},
		body: formData,
	});

	if (!response.ok) {
		if (response.status == 401) throw new Error("Invalid credentials");
		throw new Error(`Login failed: ${response.statusText}`);
	}

	return response.json();
};
