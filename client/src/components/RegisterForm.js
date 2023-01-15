const RegisterForm = (props) => {
    return(
        <form onSubmit={props.handleSubmit} className="mt-3">
            <div className="form-group mb-3">
                <label className="form-label">Your Name</label>
                <input 
                    type="text"
                    className='form-control'
                    placeholder='Enter Name'
                    value={props.name}
                    onChange={(e) => {props.setName(e.target.value)}}
                />
            </div>
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
                
            

            <button disabled={!props.email || !props.password || !props.name} className='btn btn-purple text-white'>Submit</button>
        </form>
    )
    
}

export default RegisterForm;