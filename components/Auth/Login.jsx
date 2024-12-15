
import Link from 'next/link'




const Login = ({onSubmitHandler, onChangeHandler, name, email, pass, inValid, error, classList, classList2, isLoading}) => {



  return (
   <>
    <h2 className="max-w-sm mx-auto mt-20 font-bold text-3xl text-center text-slate-600  ">LOGIN PAGE</h2>
    <form className="max-w-sm mx-auto mt-10 bg-slate-100 p-10 rounded-md" onSubmit={onSubmitHandler}>
    
  <div className="mb-5">
    <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
    <input onChange={onChangeHandler} value={email} type="email" name="email" className={classList.join(' ')} placeholder="name@mail.com" required />
    {inValid.email && <p className="text-red-500">Invalid Email Address!</p>}
  </div>
  <div className="mb-5">
    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
    <input onChange={onChangeHandler} value={pass} type="password" name="password" className={classList2.join(' ')} required />
    {inValid.pass && <p className="text-red-500">Invalid Password! It must contain 8 characters.</p>}
  </div>



  <button type="submit" style={{
    width: '100px',
    height: '40px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }} className="text-white bg-blue-700 hover:bg-blue-800  font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
   {isLoading ? "Loading...!!" : 'Login'}  </button> <p className='mt-2'> <Link href={'/sign-up'}>Go to Sign up page</Link></p>
  {error && <h3  className="text-red-500 p-3 align-middle text-center">{error.response ? error.response.data.message : error.message}</h3>}
</form>
   </>
    

  )
}

export default Login