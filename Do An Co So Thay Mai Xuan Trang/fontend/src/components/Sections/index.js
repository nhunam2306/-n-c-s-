import { useContext, useEffect, useState } from 'react';
import { api } from '../../services/api';
import Container from './styles';
import Carousel from 'react-elastic-carousel';

import { useCart } from '../../hooks/useCart';
import { AuthContext } from '../../contexts/AuthContext';

export default function Sections() {
    const breakPoints = [
        { width: 1, itemsToShow: 1 },
        { width: 550, itemsToShow: 2, itemsToScroll: 2, pagination: false },
        { width: 850, itemsToShow: 3 },
        // { width: 1150, itemsToShow: 4, itemsToScroll: 2 },
        // { width: 1450, itemsToShow: 5 },
        // { width: 1750, itemsToShow: 6 },
    ]

    const [sections, setSections] = useState([]);
    const { addProductToCart } = useCart();

    const { user } = useContext(AuthContext);

    useEffect(() => {
        getSections();
    }, []);

    const getSections = () => {
        api.get('/v1/section').then(response => setSections(response.data));
    }

    const deleteSection = (id_section) => {
        api.delete(`/v1/section/${id_section}`).then(_response => getSections());
    }

    return (
        <Container>
            {sections
                ? sections.map(section => (
                    <section className='products-section' key={section.id_section}>
                        {user?.admin
                            ? <svg className="close" onClick={() => deleteSection(section.id_section)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 448c-110.5 0-200-89.5-200-200S145.5 56 256 56s200 89.5 200 200-89.5 200-200 200zm101.8-262.2L295.6 256l62.2 62.2c4.7 4.7 4.7 12.3 0 17l-22.6 22.6c-4.7 4.7-12.3 4.7-17 0L256 295.6l-62.2 62.2c-4.7 4.7-12.3 4.7-17 0l-22.6-22.6c-4.7-4.7-4.7-12.3 0-17l62.2-62.2-62.2-62.2c-4.7-4.7-4.7-12.3 0-17l22.6-22.6c4.7-4.7 12.3-4.7 17 0l62.2 62.2 62.2-62.2c4.7-4.7 12.3-4.7 17 0l22.6 22.6c4.7 4.7 4.7 12.3 0 17z" /></svg>
                            : <></>
                        }
                        <h2>{section.name_section}</h2>
                        <Carousel showEmptySlots breakPoints={breakPoints}>
                            {section.info_products.map((product) => (
                                <article className="item" key={product.cod_product}>
                                    <img src={product.image} alt={product.description} />
                                    <h3>{product.name_product}</h3>
                                    <h4>{new Intl.NumberFormat('vi', {
                                        style: 'currency',
                                        currency: 'VND'
                                    }).format(parseFloat(product.price))}</h4>
                                    <button onClick={() => (addProductToCart(product.cod_product))}>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M0 24C0 10.75 10.75 0 24 0H96C107.5 0 117.4 8.19 119.6 19.51L121.1 32H312V134.1L288.1 111C279.6 101.7 264.4 101.7 255 111C245.7 120.4 245.7 135.6 255 144.1L319 208.1C328.4 218.3 343.6 218.3 352.1 208.1L416.1 144.1C426.3 135.6 426.3 120.4 416.1 111C407.6 101.7 392.4 101.7 383 111L360 134.1V32H541.8C562.1 32 578.3 52.25 572.6 72.66L518.6 264.7C514.7 278.5 502.1 288 487.8 288H170.7L179.9 336H488C501.3 336 512 346.7 512 360C512 373.3 501.3 384 488 384H159.1C148.5 384 138.6 375.8 136.4 364.5L76.14 48H24C10.75 48 0 37.25 0 24V24zM224 464C224 490.5 202.5 512 176 512C149.5 512 128 490.5 128 464C128 437.5 149.5 416 176 416C202.5 416 224 437.5 224 464zM416 464C416 437.5 437.5 416 464 416C490.5 416 512 437.5 512 464C512 490.5 490.5 512 464 512C437.5 512 416 490.5 416 464z" /></svg>
                                        Thêm vào giỏ hàng
                                    </button>
                                </article>
                            ))}
                        </Carousel>
                    </section>
                ))
                : <></>}
        </Container>
    )
}
