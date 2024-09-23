import { Link } from "react-router-dom";

export default function Navbar() {
	return (
		<nav>
			<ul className="text-4xl w-full flex justify-center gap-10 mb-10">
				<li>
					<Link to={"/"}>Home</Link>
				</li>
				<li>
					<Link to={"/login"}>Sign In</Link>
				</li>
			</ul>
		</nav>
	);
}
