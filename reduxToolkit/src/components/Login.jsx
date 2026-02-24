import { useActionState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom"; // 1. Import the router hook
import { loginUser } from "../features/auth/authSlice";

export default function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate(); // 2. Initialize navigate

    async function handleLogin(prevState, formData) {
        const credentials = Object.fromEntries(formData.entries());

        // This triggers the 'auth/login/fulfilled' action you see in the console
        const result = await dispatch(loginUser(credentials));


        if (result.error) {
            return { success: false, message: "Login failed" };
        } else {
            // 3. CRITICAL FIX: Tell the Top Tier to switch views
            navigate("/todos");
            return { success: true, message: "Redirecting..." };
        }
    }

    const [state, formAction, isPending] = useActionState(handleLogin, { success: null, message: "" });

    return (
        <form action={formAction}>
            <div>
                <input name="email" type="email" placeholder="Email" required />
            </div>
            <div>
                <input name="password" type="password" placeholder="Password" required />
            </div>
            <div>
                <button disabled={isPending}>
                    {isPending ? "Logging in..." : "Login"}
                </button>
            </div>
            <div>
                <p>Don't have an account? <a href="/register">Register</a></p>
            </div>
            {state.message && <p>{state.message}</p>}
        </form>
    );
}