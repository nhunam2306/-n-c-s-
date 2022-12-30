import Container from "./styles";

export default function Footer() {
    return (
        <Container>
            <div className='payment-methods'>
                <h3>Phương thức thanh toán</h3>
                <ul>
                    <li><img loading='lazy' src="https://bizweb.dktcdn.net/100/414/728/themes/867455/assets/payment_1.svg?1669971002234" alt="Bandeira Visa" /></li>
                    <li><img loading='lazy' src="https://bizweb.dktcdn.net/100/414/728/themes/867455/assets/payment_3.svg?1669971002234" alt="Bandeira Mastercard" /></li>
                    <li><img loading='lazy' src="https://bizweb.dktcdn.net/100/414/728/themes/867455/assets/payment_2.svg?1669971002234" alt="Bandeira Hipercard" /></li>
                    <li><img loading='lazy' src="https://bizweb.dktcdn.net/100/414/728/themes/867455/assets/payment_5.svg?1669971002234" alt="Bandeira Elo" /></li>
                </ul>
            </div>
            <hr />
            <div className='footer-menu'>
                <ul>
                    <li><h3>Đường Dẫn Nhanh</h3></li>
                    <li><a href="#">Trang Chủ</a></li>
                    <li><a href="#">Sản Phẩm</a></li>
                    <li><a href="#">SALE HOT</a></li>
                    <li><a href="#">Giới Thiệu</a></li>
                </ul>
                <ul>
                    <li><h3>Trợ Giúp & Hỗ Trợ</h3></li>
                    <li><a href="#">Trung Tâm Hỗ Trợ</a></li>
                    <li><a href="#">Trò Chuyện Trực Tiếp</a></li>
                    <li><a href="#">Câu Hỏi Thường Gặp</a></li>
                    <li><a href="#">Chính sách bảo mật</a></li>
                </ul>
            </div>
            <p>Copyright © 2022 Trường Đại học PHENIKAA</p>
        </Container>
    )
}