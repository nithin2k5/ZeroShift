"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface CartItem {
    id: string; // unique identifier (productId-size-color)
    productId: string | number;
    name: string;
    price: number;
    originalPrice?: number | null;
    image: string;
    color: string;
    size: string;
    quantity: number;
}

interface CartContextType {
    items: CartItem[];
    addItem: (item: Omit<CartItem, 'id'>) => void;
    removeItem: (id: string) => void;
    updateQuantity: (id: string, delta: number) => void;
    clearCart: () => void;
    isCartOpen: boolean;
    setCartOpen: (isOpen: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);
    const [isCartOpen, setCartOpen] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    // Load cart from local storage on mount
    useEffect(() => {
        setIsMounted(true);
        const storedCart = localStorage.getItem('zeroshift_cart');
        if (storedCart) {
            try {
                setItems(JSON.parse(storedCart));
            } catch (error) {
                console.error("Failed to parse cart items", error);
            }
        }
    }, []);

    // Save cart to local storage on change
    useEffect(() => {
        if (isMounted) {
            localStorage.setItem('zeroshift_cart', JSON.stringify(items));
        }
    }, [items, isMounted]);

    const addItem = (newItem: Omit<CartItem, 'id'>) => {
        setItems(prevItems => {
            const uniqueId = `${newItem.productId}-${newItem.size}-${newItem.color}`;
            const existingItem = prevItems.find(item => item.id === uniqueId);

            if (existingItem) {
                return prevItems.map(item =>
                    item.id === uniqueId
                        ? { ...item, quantity: item.quantity + newItem.quantity }
                        : item
                );
            }

            return [...prevItems, { ...newItem, id: uniqueId }];
        });
        setCartOpen(true); // Open the cart when item is added
    };

    const removeItem = (id: string) => {
        setItems(prev => prev.filter(item => item.id !== id));
    };

    const updateQuantity = (id: string, delta: number) => {
        setItems(prev => prev.map(item => {
            if (item.id === id) {
                const newQuantity = Math.max(1, item.quantity + delta);
                return { ...item, quantity: newQuantity };
            }
            return item;
        }));
    };

    const clearCart = () => {
        setItems([]);
    };

    return (
        <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity, clearCart, isCartOpen, setCartOpen }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}
