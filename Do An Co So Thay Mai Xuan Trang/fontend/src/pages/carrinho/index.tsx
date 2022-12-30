import Head from 'next/head';
import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { useCart } from '../../hooks/useCart';
import { IProductsProps } from '../../hooks/useProducts';
import Container from './styles';

interface IProductsList extends IProductsProps {
    ammount: number;
    totalPrice: number;
}

export default function Carrinho() {
    const { user } = useContext(AuthContext);
    const { removeProductCart, addProductToCart, productsOnCart } = useCart();
    const [productsList, setProductsList] = useState<IProductsList[]>([]);
    const [priceCart, setPriceCart] = useState(0.0);

    useEffect(() => {
        if (productsOnCart.length <= 0 || !user) {
            return setProductsList([]);
        }
        const newProductsOnCart = [];
        productsOnCart.forEach(product => {
            let ammount = productsOnCart.filter((productCart => productCart.cod_product === product.cod_product)).length;
            const newProduct = Object.assign(product, {
                ammount,
                totalPrice: new Intl.NumberFormat('vi', {
                    style: 'currency',
                    currency: 'VND'
                }).format(parseFloat(product.price) * ammount),
            })
            const productAlreadyExists = newProductsOnCart.find(productOnCart => productOnCart.cod_product === product.cod_product);
            if (!productAlreadyExists) {
                newProductsOnCart.push(newProduct);
                setProductsList(newProductsOnCart);
            }
        });

        const newPriceCart = productsOnCart.reduce((prevVal, product) => prevVal + parseFloat(product.price), 0);
        setPriceCart(newPriceCart);
    }, [productsOnCart])

    return (
        <>
            <Head>
                <title>giỏ hàng</title>
            </Head>
            <Container>
                {productsList.length > 0 && user?.email
                    ? <>
                        <h2>Giỏ hàng của bạn</h2>
                        <ul>
                            {productsList.map(product => (
                                <>
                                    <li key={product.cod_product}>
                                        <img src={product.image} alt="" />
                                        <div>
                                            <h2>{product.name_product}</h2>
                                            <h3>{product.totalPrice}</h3>
                                            <h3>Số lượng: {product.ammount}</h3>
                                            <div className='buttons'>
                                                <button onClick={() => removeProductCart(product.cod_product)}>-</button>
                                                <button onClick={() => addProductToCart(product.cod_product)}>+</button>
                                            </div>
                                        </div>
                                    </li>
                                    <hr />
                                </>
                            ))}
                        </ul>
                        {priceCart <= 0
                            ? <></>
                            : <h2>Tổng cộng: {new Intl.NumberFormat('vi', {
                                style: 'currency',
                                currency: 'VND'
                            }).format(priceCart)}</h2>
                        }
                        <button>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M528.12 301.319l47.273-208C578.806 78.301 567.391 64 551.99 64H159.208l-9.166-44.81C147.758 8.021 137.93 0 126.529 0H24C10.745 0 0 10.745 0 24v16c0 13.255 10.745 24 24 24h69.883l70.248 343.435C147.325 417.1 136 435.222 136 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-15.674-6.447-29.835-16.824-40h209.647C430.447 426.165 424 440.326 424 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-22.172-12.888-41.332-31.579-50.405l5.517-24.276c3.413-15.018-8.002-29.319-23.403-29.319H218.117l-6.545-32h293.145c11.206 0 20.92-7.754 23.403-18.681z" /></svg>
                            Thủ tục thanh toán
                        </button></>
                    : <>
                        <h2>Có vẻ như không có mặt hàng nào trong giỏ hàng của bạn.</h2>
                        <p className='margin-only'><Link href={'/produtos'}>Thêm một số sản phẩm vào giỏ hàng của bạn.</Link></p>
                    </>
                }
            </Container>
        </>
    )
}