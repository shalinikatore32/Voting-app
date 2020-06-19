import React, { Component } from 'react'
import Cookies from 'js-cookie';
import axios from 'axios';
import populateStates from '../addons/NigerianStatesAndLocalGovt';
import { Redirect } from 'react-router-dom';
import { BeatLoader } from 'react-spinners'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import '../App.css';

class LoginRegister extends Component {
    
    constructor(props) {
        super(props)

        this.state = {
            emailFromLogin: '',
            passwordFromLogin: '',
            userLoggedIn: false,

            firstnameFromRegister: '',
            lastnameFromRegister: '',
            emailFromRegister: '',
            passwordFromRegister: '',
            genderFromRegister: '',
            phoneFromRegister: '',
            stateFromRegister: '',
            localGovtFromRegister: '',
            VINFromRegister: ''
       }
    
        this.loginEmailRef = React.createRef()
        this.loginPasswordRef = React.createRef()

        toast.configure()
    }

    componentDidMount() {
        if (Cookies.get('authToken') === '')
        {
            toast.success('Welcome To E-Voting', {position: toast.POSITION.BOTTOM_CENTER})

            document.getElementById('beatLoaders').style.display = 'none'
        }

        populateStates()
    }


    getLoginEmail = (event) => {
        this.setState({
            emailFromLogin: this.loginEmailRef.current.value
        })
    }

    getLoginPassword = (event) => {
        this.setState({
            passwordFromLogin: this.loginPasswordRef.current.value
        })
    }

    render() {
        if(this.state.userLoggedIn || Cookies.get('authToken') !== '')
        {
            return <Redirect to="/profile" />
        }
        else
        {  
            return (
                <div className="container">

                    <h2 className="mb-5" align="center">E-Voting</h2>

                    <div className="row">

                        <div className="col-md-5">
                            
                            <center className="mb-3"><b>Login</b></center>
                            <hr/>
                            <form onSubmit={this.handleLoginForm}>
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <div className="input-group-text"><i className="fa fa-envelope"></i></div>
                                    </div>
                                    <input type="email" className="form-control" id="loginEmail" placeholder="example@mail.com" onChange={this.getLoginEmail} ref={this.loginEmailRef} required />
                                </div>

                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <div className="input-group-text"><i className="fa fa-lock"></i></div>
                                    </div>
                                    <input type="password" className="form-control" id="loginPassword" placeholder="********" onChange={this.getLoginPassword} ref={this.loginPasswordRef} required />
                                </div>

                                <button type="submit" className="form-control btn btn-primary" id="signInButton">Sign in</button>
                            </form>
                        </div>

                        <div className="col-md-1"></div>

                        <div className="col-md-6">
                        
                            <center className="mb-3"><b>Register</b></center>
                            <hr/>
                            <form onSubmit={this.handleRegistrationForm}>
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <div className="input-group-text"><i className="fa fa-user"></i></div>
                                    </div>
                                    <input type="fname" className="form-control" id="registerFname" placeholder="Firstname" value={this.state.firstnameFromRegister} onChange={(value)=> this.setState({firstnameFromRegister: value.target.value})} required />
                                </div>

                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <div className="input-group-text"><i className="fa fa-user"></i></div>
                                    </div>
                                    <input type="text" className="form-control" id="registerLastname" placeholder="Lastname" value={this.state.lastnameFromRegister} onChange={(value)=> this.setState({lastnameFromRegister: value.target.value})} required />
                                </div>

                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <div className="input-group-text"><i className="fa fa-envelope"></i></div>
                                    </div>
                                    <input type="email" className="form-control" id="registerEmail" placeholder="example@mail.com" value={this.state.emailFromRegister} onChange={(value)=> this.setState({emailFromRegister: value.target.value})} required />
                                </div>

                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <div className="input-group-text"><i className="fa fa-lock"></i></div>
                                    </div>
                                    <input type="password" className="form-control" id="registerPassword" placeholder="********" value={this.state.passwordFromRegister} onChange={(value)=> this.setState({passwordFromRegister: value.target.value})} required />
                                    <div className="input-group-prepend">
                                        <div className="input-group-text"><i className="fa fa-eye-slash"></i></div>
                                    </div>
                                </div>

                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <div className="input-group-text"><i className="fa fa-users"></i></div>
                                    </div>
                                    <select id="registerGender" className="form-control" onChange={(value)=> this.setState({genderFromRegister: value.target.value})}>
                                        <option value="Male">Male</option>
                                        <option vlaue="Female">Female</option>
                                    </select>
                                </div>

                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <div className="input-group-text"><i className="fa fa-phone"></i></div>
                                    </div>
                                    <input type="number" className="form-control" id="registerPhone" placeholder="Mobile Number" value={this.state.phoneFromRegister} onChange={(value)=> this.setState({phoneFromRegister: value.target.value})} required />
                                </div>

                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <div className="input-group-text"><i className="fa fa-flag"></i></div>
                                    </div>
                                    <select id="registerState" name="registerState" type="text" className="form-control" list="registerState" placeholder="Select State" onChange={(value)=> this.setState({stateFromRegister: value.target.value})} required></select>
                                </div>

                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <div className="input-group-text"><i className="fa fa-flag-checkered"></i></div>
                                    </div>
                                    <select id="registerLocalGovt" name="registerLocalGovt" className="form-control" onChange={(value)=> this.setState({localGovtFromRegister: value.target.value})} required>
                                    </select>
                                </div>

                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <div className="input-group-text"><i className="fa fa-address-card-o"></i></div>
                                    </div>
                                    <input type="text" className="form-control" id="registerVIN" placeholder="Voter's Identity Number" value={this.state.VINFromRegister} onChange={(value)=> this.setState({VINFromRegister: value.target.value})} required />
                                </div>

                                <button type="submit" className="form-control btn btn-primary" id="registerButton">Register</button>
                            </form>
                        </div>
                    </div>

                    <div id="beatLoaders" align="center">
                        <BeatLoader size={50} color="#c31432" loading />
                        <b>Loading...</b>
                    </div>

                </div>
            )
        }
    }
    
    handleLoginForm = (event) => {
        event.preventDefault();

        if(this.state.emailFromLogin === "")
        {
            toast.error('Login email is empty', {position: toast.POSITION.TOP_LEFT})
        }
        else if(this.state.passwordFromLogin === "")
        {
            toast.error('Login password is empty', {position: toast.POSITION.TOP_LEFT})
        }
        else
        {
            document.getElementById('beatLoaders').style.display = 'block';
            document.getElementById('signInButton').disabled = 'true';
            document.getElementById('registerButton').disabled = 'true';

            const baseUrl = "https://sdg-team-40.herokuapp.com/login"
     
            const datapost = {
                email : this.state.emailFromLogin,
                password : this.state.passwordFromLogin
            }
        
            axios.post(baseUrl,datapost)
            .then(result=>{
                document.getElementById('beatLoaders').style.display = 'none';
                if (result.data)
                {
                    Cookies.set('authToken', `${result.data.data.token}`, { expires: 7, path: '/' });
                    toast.success('Login Successful', {position: toast.POSITION.TOP_LEFT});

                    this.setState({
                        userLoggedIn: true
                    })
                    
                }
            }).catch(error=>{
                document.getElementById('beatLoaders').style.display = 'none';
                document.getElementById("signInButton").disabled = false;
                document.getElementById("registerButton").disabled = false;
                
                toast.error(error.response.data, {position: toast.POSITION.TOP_LEFT, autoClose: 8000})

                // if (error.response.status === 404)
                // {
                //     toast.error('Email Is Not Registered With Us', {position: toast.POSITION.TOP_LEFT, autoClose: 8000})
                // }
                // else if (error.response.status === 500)
                // {
                //     toast.error('We Encountered An Internal Error, Try Again...', {position: toast.POSITION.TOP_LEFT, autoClose: 8000})
                // }
                // else if(error.response.status === 401)
                // {
                //     toast.error('Incorrect password!', {position: toast.POSITION.TOP_LEFT, autoClose: 8000})
                // }
            })
        }
        
    }
}

export default LoginRegister
