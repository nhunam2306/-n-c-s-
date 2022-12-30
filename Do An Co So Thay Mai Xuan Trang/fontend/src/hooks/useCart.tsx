import Router from "next/router";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import LoginModal from "../components/Modals/LoginModal";
import { AuthContext } from "../contexts/AuthContext";
import { api } from "../services/api";
import { IProductsProps } from "./useProducts";

interface ICartPropsProvider {
    children: ReactNode;
}

interface ICartContextData {
    productsOnCart: IProductsProps[];
    getCartProducts: () => Promise<any>;
    addProductToCart: (cod_product: string) => Promise<any>;
    removeProductCart: (cod_product: string) => Promise<any>;
}

const CartContext = createContext({} as ICartContextData);

export function CartProvider({ children }: ICartPropsProvider) {
    const [productsOnCart, setProductsOnCart] = useState([]);
    const { user } = useContext(AuthContext);

    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isLoginMode, setIsLoginMode] = useState(true);

    useEffect(() => {
        getCartProducts();
        console.log('UseEffect do Cart')
    }, [user]);

    const getCartProducts = async () => {
        await api.get(`/v1/cart/${user?.email}`).then(response => {
            setProductsOnCart(response.data.products_info);
            console.log(response);
            console.log('repetindo')
        })
    }

    const addProductToCart = async (cod_product: string) => {
        if (!user) {
            return setIsLoginModalOpen(true);
        }

        await api.post(`/v1/cart/`, {
            products_cart: cod_product,
            email: user?.email,
        });

        getCartProducts();

        return Router.push('/carrinho');
    }

    const removeProductCart = async (cod_product: string) => {
        await api.delete('/v1/cart', {
            data: {
                products_cart: cod_product,
                email: user?.email,
            }
        });

        return getCartProducts();
    }

    return (
        <CartContext.Provider
            value={{ addProductToCart, removeProductCart, productsOnCart, getCartProducts }}>
            {children}
            <LoginModal
                isOpen={isLoginModalOpen}
                onRequestClose={() => setIsLoginModalOpen(false)}
                LoginMode={isLoginMode}
            />
        </CartContext.Provider>
    )
}

export function useCart(): ICartContextData {
    const context = useContext(CartContext);

    return context;
}
