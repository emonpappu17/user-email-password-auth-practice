import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import auth from "../../firebase/firebase.config";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";


const SignIn = () => {
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const emailRef = useRef(null);


    const handleSubmit = e => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(email, password);
        //reset 
        setSuccess('')
        setError('')

        if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
            setError('Please give valid email')
            return;
        }

        signInWithEmailAndPassword(auth, email, password)
            .then(result => {
                console.log(result.user);
                setSuccess('Sign in successfully')

            })
            .catch(error => {
                console.error(error);
                setError(error.message);
            })
    }

    const handleForgetPass = () => {
        const email = emailRef.current.value;
        console.log(email);

        sendPasswordResetEmail(auth, email)
            .then(result => {
                console.log(result);
                alert('Check your Email')

            })
            .catch(error => {
                console.log(error);

            })


    }

    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Sign in now!</h1>
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
                            <input ref={emailRef} name="email" type="email" placeholder="email" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input name="password" type="password" placeholder="password" className="input input-bordered" required />
                            <label className="label">
                                <a onClick={handleForgetPass} href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        {
                            error && <p className="text-red-700">{error}</p>
                        }
                        {
                            success && <p className="text-green-700">{success}</p>
                        }
                        <p>If you do not have account please <Link className="underline text-blue-700" to="/signUp">Sign up</Link> now</p>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Sign in</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignIn;