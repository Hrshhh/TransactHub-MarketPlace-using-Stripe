import "./LoginForm.css"

const LoginForm = (props) => {
    return(
        <form onSubmit={props.handleSubmit} className="mt-3">
            
            <div className="form-group mb-3">
                <label className="form-label">Email</label>
                <input 
                    type="email"
                    className='form-control'
                    placeholder='Enter Email'
                    value={props.email}
                    onChange={(e) => {props.setEmail(e.target.value)}}
                />
            </div>
            <div className="form-group mb-3">
                <label className="form-label">Password</label>
                <input 
                    type="password"
                    className='form-control'
                    placeholder='Enter Password'
                    value={props.password}
                    onChange={(e) => {props.setPassword(e.target.value)}}
                />
            </div>
                
            

            <button disabled={!props.email || !props.password} className='btn btn-purple text-white'>Submit</button>
        </form>
    )
    
}

export default LoginForm;