import React, { useState } from 'react'
import { registerUser } from '../utils/ApiFunctions'
import { Link } from 'react-router-dom'

const Registration = () => {
    const [registration, setRegistration] = useState({ firstName: "", lastName: "", email: "", password: "" })
    const [errorMessage, setErrorMessage] = useState("")
    const [successMessage, setSuccessMessage] = useState("")

    const handleInputChange = (e) => {
        setRegistration({ ...registration, [e.target.name]: e.target.value })
    }

    const handleRegistration = async (e) => {
        e.preventDefault()
        try {
            const result = await registerUser(registration)
            setSuccessMessage(result)
            setErrorMessage("")
            setRegistration({ firstName: "", lastName: "", email: "", password: "" })
        } catch (error) {
            setSuccessMessage("")
            setErrorMessage(`Lỗi đăng ký: ${error.message}`)
        }
        setTimeout(() => {
            setErrorMessage("")
            setSuccessMessage("")
        }, 5000)
    }

    return (
        <section className='container col-6 mb-5 mt-5'>
            {errorMessage && <p className='alert alert-danger'>{errorMessage}</p>}
            {successMessage && <p className='alert alert-success'>{successMessage}</p>}
            <h2>Đăng ký</h2>
            <form action="" onSubmit={handleRegistration}>
                <div className='mb-3 row'>
                    <label htmlFor="firstName" className='col-sm-2 col-form-label'>
                        Tên
                    </label>
                    <div className='col-sm-10'>
                        <input type="text" id='firstName' name='firstName' className='form-control'
                            value={registration.firstName} onChange={handleInputChange} />
                    </div>
                </div>

                <div className='mb-3 row'>
                    <label htmlFor="lastName" className='col-sm-2 col-form-label'>
                        Họ
                    </label>
                    <div className='col-sm-10'>
                        <input type="text" id='lastName' name='lastName' className='form-control'
                            value={registration.lastName} onChange={handleInputChange} />
                    </div>
                </div>

                <div className='mb-3 row'>
                    <label htmlFor="email" className='col-sm-2 col-form-label'>
                        Email
                    </label>
                    <div className='col-sm-10'>
                        <input type="text" id='email' name='email' className='form-control'
                            value={registration.email} onChange={handleInputChange} />
                    </div>
                </div>

                <div className='mb-3 row'>
                    <label htmlFor="password" className='col-sm-2 col-form-label'>
                        Mật khẩu
                    </label>
                    <div className='col-sm-10'>
                        <input type="text" id='password' name='password' className='form-control'
                            value={registration.password} onChange={handleInputChange} />
                    </div>
                </div>

                <div className='mb-3'>
                    <button type='submit' className='btn btn-hotel' style={{ marginRight: "10px" }}>
                        Đăng ký
                    </button>
                    <span style={{ marginLeft: "10px" }}>
                        Bạn có sẵn sàng để tạo một tài khoản? <Link to={"/login"}>Đăng nhập</Link>
                    </span>
                </div>
            </form>
        </section>
    )
}

export default Registration