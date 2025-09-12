import { useState, useEffect, useRef, use } from 'react'
import { faCheck, faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './css/Register.css'   // import CSS riêng cho Register

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
const PHONE_REGEX = /^[0-9]{9,11}$/
const FULLNAME_REGEX = /^[A-Za-zÀ-ỹ\s]{3,50}$/

const Register = () => {
  const userRef = useRef()
  const errRef = useRef()

  const [user, setUser] = useState('')
  const [validName, setValidName] = useState(false)
  const [userFocus, setUserFocus] = useState(false)

  const [pwd, setPwd] = useState('')
  const [validPwd, setValidPwd] = useState(false)
  const [pwdFocus, setPwdFocus] = useState(false)

  const [matchPwd, setMatchPwd] = useState('')
  const [validMatch, setValidMatch] = useState(false)
  const [matchFocus, setMatchFocus] = useState(false)

  const [fullName, setFullName] = useState('')
  const [validFullName, setValidFullName] = useState(false)

  const [email, setEmail] = useState('')
  const [validEmail, setValidEmail] = useState(false)
  const [emailFocus, setEmailFocus] = useState(false)

  const [address, setAddress] = useState('')

  const [phone, setPhone] = useState('')
  const [validPhone, setValidPhone] = useState(false)
  const [phoneFocus, setPhoneFocus] = useState(false)

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
    setValidMatch(pwd === matchPwd)
  }, [pwd, matchPwd])

  useEffect(() => {
    setValidFullName(FULLNAME_REGEX.test(fullName))
  }, [fullName])

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email))
  }, [email])

  useEffect(() => {
    setValidPhone(PHONE_REGEX.test(phone))
  }, [phone])

  useEffect(() => {
    setErrMsg('')
  }, [fullName, user, pwd, matchPwd, email, address, phone])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const v1 = USER_REGEX.test(user)
    const v2 = PWD_REGEX.test(pwd)
    if (!v1 || !v2) {
      setErrMsg("Thông tin không hợp lệ")
      return
    }
    try {
      const response = await fetch(
        'http://localhost:5000/api/auth/register',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            username: user,
            password: pwd,
            fullName,
            phoneNumber: phone,
            address,
            email
          }),
          withCredentials: true
        }
      )
      const data = await response.json()
      console.log(data)
      setSuccess(true)

      // clear input fields
      setFullName('')
      setUser('')
      setPwd('')
      setMatchPwd('')
      setEmail('')
      setAddress('')
      setPhone('')
    } catch (err) {
      setErrMsg('Đăng ký thất bại')
      errRef.current.focus()
    }
  }

  return (
    <>
      {success ? (
        <section className="register-container">
          <h1>Đăng ký thành công!</h1>
          <p>
            <a href="/login">Đăng nhập</a>
          </p>
        </section>
      ) : (
        <section className="register-container">
          <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
          <h1 className='register-title'>Đăng ký</h1>
          <form onSubmit={handleSubmit} className='register-form'>
            {/* Họ và tên */}
            <label htmlFor="fullname" className='register-label'>
              Họ và tên:
              <span className={validFullName ? "valid" : "hide"}>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span className={validFullName || !fullName ? "hide" : "invalid"}>
                <FontAwesomeIcon icon={faTimes} />
              </span>
            </label>
            <input
              type="text"
              id="fullname"
              onChange={(e) => setFullName(e.target.value)}
              value={fullName}
              required
              aria-invalid={validFullName ? "false" : "true"}
              ref={userRef}
              onFocus={() => setUserFocus(true)}
              onBlur={() => setUserFocus(false)}
              className='register-input'
            />
            <p className={!validFullName && fullName ? "instructions" : "offscreen"}>
              <FontAwesomeIcon icon={faInfoCircle} />
              Họ tên phải từ 3–50 ký tự, chỉ gồm chữ cái và khoảng trắng.
            </p>

            {/* Tên đăng nhập */}
            <label htmlFor="username" className='register-label'>
              Tên đăng nhập:
              <span className={validName ? "valid" : "hide"}>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span className={validName || !user ? "hide" : "invalid"}>
                <FontAwesomeIcon icon={faTimes} />
              </span>
            </label>
            <input
              type="text"
              id="username"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setUser(e.target.value)}
              value={user}
              required
              aria-invalid={validName ? "false" : "true"}
              aria-describedby="uidnote"
              onFocus={() => setUserFocus(true)}
              onBlur={() => setUserFocus(false)}
              className='register-input'
            />
            <p id="uidnote" className={userFocus && user && !validName ? "instructions" : "offscreen"}>
              <FontAwesomeIcon icon={faInfoCircle} />
              4 đến 24 ký tự.<br />
              Bắt đầu bằng chữ cái.<br />
              Cho phép chữ, số, dấu gạch dưới, gạch ngang.
            </p>

            {/* Email */}
            <label htmlFor="email" className='register-label'>
              Email:
              <span className={validEmail ? "valid" : "hide"}>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span className={validEmail || !email ? "hide" : "invalid"}>
                <FontAwesomeIcon icon={faTimes} />
              </span>
            </label>
            <input
              type="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
              aria-invalid={validEmail ? "false" : "true"}
              aria-describedby="emailnote"
              onFocus={() => setEmailFocus(true)}
              onBlur={() => setEmailFocus(false)}
              ref={userRef}
              className='register-input'
            />
            <p id="emailnote" className={emailFocus && email && !validEmail ? "instructions" : "offscreen"}>
              <FontAwesomeIcon icon={faInfoCircle} />
              Email phải hợp lệ (ví dụ: example@domain.com).
            </p>

            {/* Địa chỉ */}
            <label htmlFor="address" className='register-label'>Địa chỉ:</label>
            <input
              type="text"
              id="address"
              onChange={(e) => setAddress(e.target.value)}
              value={address}
              required
              ref={userRef}
              onFocus={() => setUserFocus(true)}
              onBlur={() => setUserFocus(false)}
              className='register-input'
            />

            {/* Số điện thoại */}
            <label htmlFor="phone" className='register-label'>
              Số điện thoại:
              <span className={validPhone ? "valid" : "hide"}>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span className={validPhone || !phone ? "hide" : "invalid"}>
                <FontAwesomeIcon icon={faTimes} />
              </span>
            </label>
            <input
              type="text"
              id="phone"
              onChange={(e) => setPhone(e.target.value)}
              value={phone}
              required
              aria-invalid={validPhone ? "false" : "true"}
              aria-describedby="phonenote"
              onFocus={() => setPhoneFocus(true)}
              onBlur={() => setPhoneFocus(false)}
              ref={userRef}
              className='register-input'
            />
            <p id="phonenote" className={phoneFocus && phone && !validPhone ? "instructions" : "offscreen"}>
              <FontAwesomeIcon icon={faInfoCircle} />
              Số điện thoại phải có từ 9–11 chữ số.
            </p>

            {/* Mật khẩu */}
            <label htmlFor="password" className='register-label'>
              Mật khẩu:
              <span className={validPwd ? "valid" : "hide"}>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span className={validPwd || !pwd ? "hide" : "invalid"}>
                <FontAwesomeIcon icon={faTimes} />
              </span>
            </label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
              required
              aria-invalid={validPwd ? "false" : "true"}
              aria-describedby="pwdnote"
              onFocus={() => setPwdFocus(true)}
              onBlur={() => setPwdFocus(false)}
              ref={userRef}
              className='register-input'
            />
            <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
              <FontAwesomeIcon icon={faInfoCircle} />
              8 đến 24 ký tự.<br />
              Phải có chữ hoa, chữ thường, số và ký tự đặc biệt.<br />
              Ký tự đặc biệt cho phép: ! @ # $ %
            </p>

            {/* Xác nhận mật khẩu */}
            <label htmlFor="confirm_pwd" className='register-label'>
              Xác nhận mật khẩu:
              <span className={validMatch && matchPwd ? "valid" : "hide"}>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span className={validMatch || !matchPwd ? "hide" : "invalid"}>
                <FontAwesomeIcon icon={faTimes} />
              </span>
            </label>
            <input
              type="password"
              id="confirm_pwd"
              onChange={(e) => setMatchPwd(e.target.value)}
              value={matchPwd}
              required
              aria-invalid={validMatch ? "false" : "true"}
              aria-describedby="confirmnote"
              onFocus={() => setMatchFocus(true)}
              onBlur={() => setMatchFocus(false)}
              ref={userRef}
              className='register-input'
            />
            <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
              <FontAwesomeIcon icon={faInfoCircle} />
              Phải trùng khớp với mật khẩu đã nhập.
            </p>

            <button className="register-button" disabled={!validName || !validPwd || !validMatch}>
              Đăng ký
            </button>
          </form>
          <p>
            Đã có tài khoản?<br />
            <span className="line">
              <a href="/Login">Đăng nhập</a>
            </span>
          </p>
        </section>
      )}
    </>
  )
}

export default Register
