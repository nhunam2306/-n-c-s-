import Modal from 'react-modal';
import { FormEvent, useState } from "react";
import { useProducts } from '../../hooks/useProducts';

interface ICreateProductModal {
    isOpen: boolean;
    onRequestClose: () => void;
}

export default function CreateProductModal({ isOpen, onRequestClose }: ICreateProductModal) {
    const { addProduct } = useProducts();

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [imgUrl, setImgUrl] = useState('');

    const [errorMsg, setErrorMsg] = useState('');

    const handleCreateProduct = async (e: FormEvent) => {
        e.preventDefault();

        if (name.length >= 25) {
            return setErrorMsg('Tên của sản phẩm được đề cập là tối đa 25 ký tự.');
        }

        await addProduct(description, imgUrl, name, price);

        return onRequestClose();
    }

    Modal.setAppElement("#__next")
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            className="content"
            overlayClassName="overlay"
        >
            <svg onClick={onRequestClose} width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14 1.41L12.59 0L7 5.59L1.41 0L0 1.41L5.59 7L0 12.59L1.41 14L7 8.41L12.59 14L14 12.59L8.41 7L14 1.41Z" fill="#A8A8B3" />
            </svg>
            <h3>Thêm sản phẩm</h3>
            <form onSubmit={handleCreateProduct}>
                <input type="text" placeholder='Tên sản phẩm'
                    value={name} onChange={(e) => setName(e.target.value)}
                />
                <input type="text" placeholder='Mô tả'
                    value={description} onChange={(e) => setDescription(e.target.value)}
                />
                <input type="number" placeholder='Giá bán'
                    value={price} onChange={(e) => setPrice(e.target.value)}
                />
                <input type="text" placeholder='Url hình ảnh sản phẩm'
                    value={imgUrl} onChange={(e) => setImgUrl(e.target.value)}
                />
                <p><b>{errorMsg}</b></p>
                <button type='submit'>Tạo</button>
            </form>
        </Modal>
    )
}
