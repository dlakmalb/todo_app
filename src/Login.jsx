import { useState } from 'react';
import { Container } from 'react-bootstrap';

const credentials = {
    username: 'admin',
    password: 'admin',
};

const Login = (props) => {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [error, setError] = useState('');

    const handleChange = (event) => {
        const { name, value } = event.target;

        const newFormData = { ...formData, [name]: value.trim() };

        setError('');
        setFormData(newFormData);
    };

    const clickLogin = () => {
        if (
            formData.username !== credentials.username ||
            formData.password !== credentials.password
        ) {
            return setError('Invalid credentials');
        }

        props.history.replace('/todo-list');
    };

    return (
        <Container className="col-md-3 login-form">
            <h1 className="form-group text-center">Login</h1>
            <div className="form-group pt-2 pb-2 d-flex align-items-center">
                <input
                    autoFocus
                    type="text"
                    id="username"
                    name="username"
                    className="form-control"
                    placeholder="Enter your username"
                    onChange={handleChange}
                />
            </div>
            <div className="form-group pt-2 pb-2 d-flex align-items-center">
                <input
                    id="password"
                    type="password"
                    name="password"
                    className="form-control"
                    placeholder="Enter password"
                    onChange={handleChange}
                />
            </div>
            {error && <div className="warning-text">{error}</div>}
            <div className="form-group pt-2">
                <button className="btn btn-primary col-12" onClick={clickLogin}>
                    Login
                </button>
            </div>
        </Container>
    );
};

export default Login;
