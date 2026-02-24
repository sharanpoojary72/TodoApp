import { useActionState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../features/auth/authSlice";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // React 19 Action Function
    async function handleRegister(prevState, formData) {
        const username = formData.get("username");
        const email = formData.get("email");
        const password = formData.get("password");

        // Dispatch the Redux Thunk
        const result = await dispatch(registerUser({ username, email, password }));

        if (result.error) {
            return { success: false, message: "Registration failed. Try again." };
        } else {
            navigate("/todos"); // Redirect to the list after success
            return { success: true, message: "Welcome!" };
        }
    }

    // useActionState handles the state and the 'isPending' (loading) status automatically
    const [state, formAction, isPending] = useActionState(handleRegister, { success: null, message: "" });

    return (
        <div className="auth-container">
            <h2>Create Account</h2>
            <form action={formAction}>
                <div>
                    <input name="username" type="text" placeholder="Username" required />
                </div>
                <div>
                    <input name="email" type="email" placeholder="Email" required />
                </div>
                <div>
                    <input name="password" type="password" placeholder="Password" required />
                </div>

                <button type="submit" disabled={isPending}>
                    {isPending ? "Signing up..." : "Register"}
                </button>

                {/* Display server messages or errors */}
                {state.message && (
                    <p style={{ color: state.success ? "green" : "red" }}>
                        {state.message}
                    </p>
                )}
            </form>
            <p>Already have an account? <Link to="/login">Login</Link></p>
        </div>
    );
}