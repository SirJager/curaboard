export default function RegistrationPage() {
	return (
		<>
			<h2>Register</h2>
			<form action="/api/auth/sign-up" method="POST">
				<label>Email</label>
				<input type="email" name="email" required />
				<label>Password</label>
				<input type="password" name="password" required />
				<button type="submit">Register</button>
			</form>
		</>
	);
}
