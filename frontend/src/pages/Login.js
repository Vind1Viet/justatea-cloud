import { useState, useEffect, useRef, useContext } from 'react'
import { faCheck, faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './css/Login.css'
import { AuthContext } from '../contexts/AuthContext'

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/

const Login = () => {
  const { auth, login } = useContext(AuthContext)
  const userRef = useRef()
  const errRef = useRef()

  const [user, setUser] = useState('')
  const [validName, setValidName] = useState(false)
  const [userFocus, setUserFocus] = useState(false)

  const [pwd, setPwd] = useState('')
  const [validPwd, setValidPwd] = useState(false)
  const [pwdFocus, setPwdFocus] = useState(false)

  const [errMsg, setErrMsg] = useState('')
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    userRef.current.focus()
  }, [])

  useEffect(() => {
    setValidName(USER_REGEX.test(user))
  }, [user])

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd))
  }, [pwd])

  useEffect(() => {
    setErrMsg('')
  }, [user, pwd])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const v1 = USER_REGEX.test(user)
    const v2 = PWD_REGEX.test(pwd)
    if (!v1 || !v2) {
      setErrMsg("Thông tin không hợp lệ")
      return
    }
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: user, password: pwd }),
        credentials: 'include'
      })

      if (!response.ok) {
        if (response.status === 401) {
          setErrMsg('Tên đăng nhập hoặc mật khẩu không đúng')
        } else {
          setErrMsg('Đăng nhập không thành công')
        }
        return
      }
      
      const data = await response.json();
      
      const userId = data?.arguments?.userId;
      const accessToken = data?.arguments?.accessToken;
      const role = data?.arguments?.role;
      
      login(user, userId, accessToken, role)
      setSuccess(true)
      setUser('')
      setPwd('')
    } catch (err) {
      if (!err?.response) {
        setErrMsg('Không có phản hồi từ server')
      } else if (err.response?.status === 401) {
        setErrMsg('Tên đăng nhập hoặc mật khẩu không đúng')
      } else {
        setErrMsg('Đăng nhập không thành công')
      }
      errRef.current.focus()
    }
  }

  return (
    <>
      {success ? (
        <section className="login-container">
          <h1 className="login-title">Đăng nhập thành công!</h1>
          <p className="login-success">Bạn đã đăng nhập!</p>
        </section>
      ) : (
        <section className="login-container">
          <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <h1 className="login-title">Đăng nhập</h1>
          <form className="login-form" onSubmit={handleSubmit}>
            {/* Tên đăng nhập */}
            <label htmlFor="username" className="login-label">
              Tên đăng nhập:
              <FontAwesomeIcon icon={faCheck} className={validName ? "valid" : "hide"} />
              <FontAwesomeIcon icon={faTimes} className={validName || !user ? "hide" : "invalid"} />
            </label>
            <input
              type="text"
              id="username"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setUser(e.target.value)}
              value={user}
              required
              className="login-input"
              aria-invalid={validName ? "false" : "true"}
              aria-describedby="uidnote"
              onFocus={() => setUserFocus(true)}
              onBlur={() => setUserFocus(false)}
            />
            <p id="uidnote" className={userFocus && user && !validName ? "instructions" : "offscreen"}>
              <FontAwesomeIcon icon={faInfoCircle} />  
              4 đến 24 ký tự.<br />
              Bắt đầu bằng chữ cái.<br />
              Cho phép chữ, số, gạch dưới, gạch ngang.
            </p>

            {/* Mật khẩu */}
            <label htmlFor="password" className="login-label">
              Mật khẩu:
              <FontAwesomeIcon icon={faCheck} className={validPwd ? "valid" : "hide"} />
              <FontAwesomeIcon icon={faTimes} className={validPwd || !pwd ? "hide" : "invalid"} />
            </label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
              required
              className="login-input"
              aria-invalid={validPwd ? "false" : "true"}
              aria-describedby="pwdnote"
              onFocus={() => setPwdFocus(true)}
              onBlur={() => setPwdFocus(false)}
            />
            <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
              <FontAwesomeIcon icon={faInfoCircle} />
              8 đến 24 ký tự.<br />
              Phải có chữ hoa, chữ thường, số và ký tự đặc biệt.<br />
              Cho phép ký tự: ! @ # $ %
            </p>

            <button className="login-button" disabled={!validName || !validPwd}>
              Đăng nhập
            </button>
          </form>

          <p>
            Chưa có tài khoản?<br />
            <span className="line">
              <a href="/register">Đăng ký</a>
            </span>
          </p>
        </section>
      )}
    </>
  )
}

export default Login