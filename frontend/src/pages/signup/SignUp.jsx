import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import GenderCheckbox from "./GenderCheckbox";
import useSignup from "../../hooks/useSignup";

const SignUp = () => {
	const [inputs, setInputs] = useState({
		fullName: "",
		username: "",
		password: "",
		confirmPassword: "",
		gender: "",
	});

	const { loading, signup } = useSignup();

	useEffect(() => {
		document.title = "SITCHAT - Sign Up";  // This changes the tab title
	}, []);

	const handleCheckboxChange = (gender) => {
		setInputs({ ...inputs, gender });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		await signup(inputs);
	};

	return (
		<div className='flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-900 to-gray-800 text-white'>
			<div className='w-full max-w-md p-8 rounded-lg shadow-xl bg-gray-700 bg-opacity-90 backdrop-blur-md'>
				<h1 className='text-4xl font-bold text-center mb-6'>
					Sign Up <span contentEditable="true" className='text-blue-400'>SITCHAT</span>
				</h1>

				<form onSubmit={handleSubmit}>
					<div className='mb-4'>
						<label className='block text-sm mb-1'>Full Name</label>
						<input
							type='text'
							placeholder='John Doe'
							className='w-full p-2 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500'
							value={inputs.fullName}
							onChange={(e) => setInputs({ ...inputs, fullName: e.target.value })}
							required
						/>
					</div>

					<div className='mb-4'>
						<label className='block text-sm mb-1'>Username</label>
						<input
							type='text'
							placeholder='johndoe'
							className='w-full p-2 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500'
							value={inputs.username}
							onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
							required
						/>
					</div>

					<div className='mb-4'>
						<label className='block text-sm mb-1'>Password</label>
						<input
							type='password'
							placeholder='Enter Password'
							className='w-full p-2 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500'
							value={inputs.password}
							onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
							required
						/>
					</div>

					<div className='mb-4'>
						<label className='block text-sm mb-1'>Confirm Password</label>
						<input
							type='password'
							placeholder='Confirm Password'
							className='w-full p-2 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500'
							value={inputs.confirmPassword}
							onChange={(e) => setInputs({ ...inputs, confirmPassword: e.target.value })}
							required
						/>
					</div>

					<GenderCheckbox onCheckboxChange={handleCheckboxChange} selectedGender={inputs.gender} />

					<div className='text-center my-4'>
						<Link to='/login' className='text-sm text-blue-400 hover:underline'>
							Already have an account? Log in
						</Link>
					</div>

					<div>
						<button
							type='submit'
							className='w-full py-2 rounded-md bg-blue-600 hover:bg-blue-700 transition disabled:opacity-50'
							disabled={loading}
						>
							{loading ? <span className='loading loading-spinner'></span> : "Sign Up"}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default SignUp;
