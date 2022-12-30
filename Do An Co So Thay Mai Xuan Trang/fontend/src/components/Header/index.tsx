import Link from "next/link";
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import AvatarModal from "../Modals/AvatarModal";
import LoginModal from "../Modals/LoginModal";
import { Container } from "./styles";
import useLockedBody from "../../hooks/useLockedBody";

export default function Header() {
    const [locked, setLocked] = useLockedBody()
    
    const toggleOpenMenuMobile = () => {
        if (window.innerWidth >= 768) {
            return document.querySelectorAll('.mobile').forEach((element) => {
                element.classList.remove("on");
            })
        }

        document.querySelectorAll('.mobile').forEach((element) => {
            element.classList.toggle("on");
            setLocked(!locked);
        })
    }

    const [isAvatarModalOpen, setAvatarModalOpen] = useState(false);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isLoginMode, setIsLoginMode] = useState(false);

    const handleLoginModeModal = () => {
        setIsLoginMode(true);
        setIsLoginModalOpen(true);
    };

    const handleRegisterModeModal = () => {
        setIsLoginMode(false);
        setIsLoginModalOpen(true);
    };

    const { user, logout } = useContext(AuthContext);

    return (
        <Container>
            <div className="menu-mobile-icon" onClick={toggleOpenMenuMobile}>
                <div className="bar-one mobile"></div>
                <div className="bar-two mobile"></div>
                <div className="bar-three mobile"></div>
            </div>
            <Link href={'/'}><img className="logoImg" src="https://img.upanh.tv/2022/12/03/Screenshot-2022-12-03-175653.png" alt="Singular Logo" /></Link>

            <div className="user-area mobile">
                <div className="user mobile">
                    {user
                        ? <><img src={user.avatar} onClick={() => setAvatarModalOpen(true)} />
                            <h2>Xin chào, {user.username}!</h2></>
                        : <><img onClick={() => setIsLoginModalOpen(true)} src="https://portal1.iff.edu.br/desenvolvimento-institucional/imagens/avatar.jpg" />
                            <p>Hãy <a onClick={handleLoginModeModal} href="#">Đăng nhập</a> hoặc <br /><a href="#" onClick={handleRegisterModeModal}>Đăng ký tài khoản</a></p></>
                    }
                </div>
                <Link href={'/carrinho'}><svg className="cart" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M528.12 301.319l47.273-208C578.806 78.301 567.391 64 551.99 64H159.208l-9.166-44.81C147.758 8.021 137.93 0 126.529 0H24C10.745 0 0 10.745 0 24v16c0 13.255 10.745 24 24 24h69.883l70.248 343.435C147.325 417.1 136 435.222 136 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-15.674-6.447-29.835-16.824-40h209.647C430.447 426.165 424 440.326 424 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-22.172-12.888-41.332-31.579-50.405l5.517-24.276c3.413-15.018-8.002-29.319-23.403-29.319H218.117l-6.545-32h293.145c11.206 0 20.92-7.754 23.403-18.681z" /></svg></Link>
            </div>

            <nav className="nav-menu mobile">
                <ul onClick={toggleOpenMenuMobile}>
                    <li><Link href={'/'}>Trang chủ</Link></li>
                    <li><Link href={'/produtos'}>Sản phẩm</Link></li>
                    <li><Link href={'quem-somos'}>Giới thiệu</Link></li>
                    <li>Câu hỏi thường gặp</li>
                    <li><Link href={'/contato'}>Liên hệ</Link></li>
                    {user
                        ? <li onClick={logout}><a href="#">Đăng xuất</a></li>
                        : <></>
                    }
                </ul>
            </nav>

            <LoginModal
                isOpen={isLoginModalOpen}
                onRequestClose={() => setIsLoginModalOpen(false)}
                LoginMode={isLoginMode}
            />
            <AvatarModal
                isOpen={isAvatarModalOpen}
                onRequestClose={() => setAvatarModalOpen(false)}
            />
        </Container>
    );
}
