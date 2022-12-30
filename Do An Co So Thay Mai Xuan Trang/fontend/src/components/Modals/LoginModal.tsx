import Modal from 'react-modal';
import { FormEvent, useContext, useEffect, useState } from "react";
import { AuthContext } from '../../contexts/AuthContext';
import { api } from '../../services/api';

interface ILoginModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
    LoginMode: boolean;
}

export default function LoginModal({ isOpen, onRequestClose, LoginMode }: ILoginModalProps) {
    const [username, setUsername] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');

    useEffect(() => {
        setLoginMode(LoginMode);
    }, [LoginMode]);
    
    const { signIn } = useContext(AuthContext);

    const handleLogin = async (e: FormEvent) => {
        e.preventDefault();

        const response = await signIn({
            email: userEmail,
            password: userPassword,
        });

        if (!response) {
            return setErrorMessageModal('Sai tài khoản hoặc mật khẩu');
        }

        return window.location.reload();
    }

    const [errorMessageModal, setErrorMessageModal] = useState('');

    const handleRegister = async (e: FormEvent) => {
        e.preventDefault();

        const response = await api.post('/v1/user', {
            username,
            password: userPassword,
            email: userEmail,
            admin: "0",
            avatar: "https://portal1.iff.edu.br/desenvolvimento-institucional/imagens/avatar.jpg",
        });

        if (response.data.error) {
            return setErrorMessageModal(response.data.error);
        }

        await signIn({
            email: userEmail,
            password: userPassword,
        });

        return window.location.reload();
    }

    const [isLoginMode, setLoginMode] = useState(true);

    const switchLoginMode = () => {
        setErrorMessageModal('');
        return setLoginMode(!isLoginMode);
    }

    Modal.setAppElement("#__next")
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            className="content"
            overlayClassName="overlay"
        >
            <img
                src="./singular_icon.png"
                alt="Singular Logo"
                className='singularLogo' />
            <h2> Hãy {isLoginMode ? 'Đăng Nhập' : 'đăng ký tài khoản'}</h2>
            <form onSubmit={isLoginMode ? handleLogin : handleRegister}>
                {isLoginMode
                    ? <></>
                    : <input type="text" placeholder='Tài khoản'
                        value={username} onChange={(e) => setUsername(e.target.value)} />
                }
                <input type="email" placeholder='Email'
                    value={userEmail} onChange={(e) => setUserEmail(e.target.value)}
                />
                <input type="password" placeholder='Mật khẩu'
                    value={userPassword} onChange={(e) => setUserPassword(e.target.value)}
                />
                <p><b>{errorMessageModal}</b></p>
                {isLoginMode
                    ? <p>Bạn chưa có tài khoản ? <a href='#' onClick={switchLoginMode}>Đăng ký</a></p>
                    : <p>Bạn đã có tài khoản ? <a href='#' onClick={switchLoginMode}>Đăng nhập</a></p>
                }
                <button type='submit'>{isLoginMode ? "Đăng nhập" : "Đăng Ký"}</button>
            </form>
        </Modal>
    )
}
