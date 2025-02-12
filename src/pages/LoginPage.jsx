import { useEffect,  useState } from 'react';
import axios from 'axios';


const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

function LoginPage({ setIsAuth }) {
    const checkLogin = async () => {

        try {

            await axios.post(`${BASE_URL}/v2/api/user/check`);
            setIsAuth(true);
            // getProduces();
        } catch (err) {
            // console.log(err);


        }


    }

    useEffect(() => {
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/, "$1",);
        axios.defaults.headers.common['Authorization'] = token;
        checkLogin();
    }, [])

    const handleLogin = (e) => {
        e.preventDefault();
        axios.post(`${BASE_URL}/v2/admin/signin`, account)
            .then((res) => {

                const { token, expired } = res.data;
                document.cookie = `hexToken=${token}; expires=${new Date(expired)}`;
                axios.defaults.headers.common['Authorization'] = token;

                // getProduces();
                setIsAuth(true);
            })
            .catch((error) => {
                console.log(error);

                alert('登入失敗');

            })

    }
    const [account, setAccount] = useState({
        username: "example@test.com",
        password: "example"
    });
    const handleInputChange = (e) => {

        const { value, name } = e.target;
        setAccount({ ...account, [name]: value })

    }
    return (
        <div className="d-flex flex-column justify-content-center align-items-center vh-100">
            <h1 className="mb-5">請先登入</h1>
            <form className="d-flex flex-column gap-3" onSubmit={handleLogin}>
                <div className="form-floating mb-3">
                    <input type="email" className="form-control" name='username' id="username" placeholder="name@example.com" value={account.username} onChange={handleInputChange} />
                    <label htmlFor="username">Email address</label>
                </div>
                <div className="form-floating">
                    <input type="password" className="form-control" name='password' id="password" placeholder="Password" value={account.password} onChange={handleInputChange} />
                    <label htmlFor="password">Password</label>
                </div>
                <button type='submit' className="btn btn-primary" >登入</button>
            </form>
            <p className="mt-5 mb-3 text-muted">&copy; 2024~∞ - 六角學院</p>
        </div>
    )
}

export default LoginPage;