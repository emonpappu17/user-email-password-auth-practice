import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import auth from "../../firebase/firebase.config";
import { useState } from "react";
import { Link } from "react-router-dom";

const SignUp = () => {
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = e => {
        e.preventDefault();

        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(email, password);

        // reset 
        setError('');
        setSuccess('');

        if (password.length < 6) {
            setError('Password should be at least 6 characters')
            return;
        }
        else if (!/[A-Z]/.test(password)) {
            setError('Password should be at least 1 capital letter')
            return;
        }

        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                console.log(result.user);
                setSuccess('Account created successfully')
                sendEmailVerification(result.user)
                    .then(() => {
                        alert('Please check your email')
                    })
            })
            .catch(error => {
                console.log(error);
                setError(error.message);
            })
    }

    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Sign Up now!</h1>
                    <p className="py-6">
                        Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                        quasi. In deleniti eaque aut repudiandae et a id nisi.
                    </p>
                </div>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <form onSubmit={handleSubmit} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" name="email" placeholder="email" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" name="password" placeholder="password" className="input input-bordered" required />
                        </div>
                        {
                            error && <p className="text-red-700">{error}</p>
                        }
                        {
                            success && <p className="text-green-700">{success}</p>
                        }
                        <p>If you already have an account please <Link className="underline text-blue-700" to="/signIn">Sign in</Link> now</p>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Sign Up</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignUp;