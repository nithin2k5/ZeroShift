const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

// ---- Generic request helper ----
async function request<T>(
    endpoint: string,
    options: RequestInit = {}
): Promise<T> {
    const token = typeof window !== "undefined" ? sessionStorage.getItem("zs_token") : null;
    const headers: Record<string, string> = {
        "Content-Type": "application/json",
        ...(options.headers as Record<string, string>),
    };
    if (token) headers.Authorization = `Bearer ${token}`;

    const res = await fetch(`${BASE_URL}${endpoint}`, { ...options, headers });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Something went wrong");
    return data;
}

// ---- Auth ----
export const authApi = {
    register: (data: any) => request<{ user: User, token: string }>("/auth/register", { method: "POST", body: JSON.stringify(data) }),
    login: (data: any) => request<{ user: User, token: string }>("/auth/login", { method: "POST", body: JSON.stringify(data) }),
    requestOTP: (email: string) => request<{ message: string }>("/auth/request-otp", { method: "POST", body: JSON.stringify({ email }) }),
    verifyOTP: (email: string, otp: string) => request<{ token: string; user: User }>("/auth/verify-otp", { method: "POST", body: JSON.stringify({ email, otp }) }),
    forgotPassword: (email: string) => request<{ message: string }>("/auth/forgot-password", { method: "POST", body: JSON.stringify({ email }) }),
    resetPassword: (email: string, otp: string, newPassword: string) => request<{ message: string }>("/auth/reset-password", { method: "POST", body: JSON.stringify({ email, otp, newPassword }) }),
    getMe: () => request<{ user: User }>("/auth/me", { method: "GET" }),
};

// ---- Products ----
export const productsApi = {
    getAll: (params?: Record<string, string>) => {
        const qs = params ? "?" + new URLSearchParams(params).toString() : "";
        return request<{ products: Product[]; total: number; pages: number }>(`/products${qs}`);
    },
    getById: (id: string) => request<{ product: Product }>(`/products/${id}`),
    create: (body: Partial<Product>) =>
        request<{ product: Product }>("/products", { method: "POST", body: JSON.stringify(body) }),
    update: (id: string, body: Partial<Product>) =>
        request<{ product: Product }>(`/products/${id}`, { method: "PUT", body: JSON.stringify(body) }),
    remove: (id: string) => request(`/products/${id}`, { method: "DELETE" }),
};

// ---- Orders ----
export const ordersApi = {
    create: (body: CreateOrderPayload) =>
        request<{ order: Order }>("/orders", { method: "POST", body: JSON.stringify(body) }),
    myOrders: () => request<{ orders: Order[] }>("/orders/my-orders"),
    getById: (id: string) => request<{ order: Order }>(`/orders/${id}`),
    getAll: () => request<{ orders: Order[] }>("/orders"),
    updateStatus: (id: string, status: string) =>
        request<{ order: Order }>(`/orders/${id}/status`, { method: "PUT", body: JSON.stringify({ status }) }),
};

// ---- Users ----
export const usersApi = {
    getProfile: () => request<{ user: User; addresses: Address[] }>("/users/profile"),
    updateProfile: (body: Partial<User> & { currentPassword?: string; newPassword?: string }) =>
        request<{ user: User }>("/users/profile", { method: "PUT", body: JSON.stringify(body) }),
    addAddress: (body: Omit<Address, "id" | "user_id" | "created_at">) =>
        request<{ address: Address }>("/users/addresses", { method: "POST", body: JSON.stringify(body) }),
    deleteAddress: (id: string) => request(`/users/addresses/${id}`, { method: "DELETE" }),
    getAll: () => request<{ users: User[] }>("/users"),
};

// ---- Types ----
export type User = {
    id: string;
    name: string;
    email: string;
    phone?: string;
    role: "user" | "admin";
    created_at: string;
};

export type Product = {
    id: string;
    name: string;
    description?: string;
    price: number;
    discount_price?: number;
    category: string;
    images: string[];
    sizes: string[];
    colors: string[];
    stock: number;
    badge?: string;
    is_active: boolean;
};

export type OrderItem = {
    id?: string;
    product_id?: string | null;
    name: string;
    image?: string;
    price: number;
    qty: number;
    size?: string;
    color?: string;
};

export type Order = {
    id: string;
    user_id: string;
    items: OrderItem[];
    status: string;
    total_amount: number;
    payment_method: string;
    payment_status: string;
    created_at: string;
    shipping_street: string;
    shipping_city: string;
    shipping_state: string;
    shipping_zip: string;
    shipping_country: string;
};

export type Address = {
    id: string;
    user_id: string;
    type: string;
    name: string;
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
    is_default: boolean;
    created_at: string;
};

export type CreateOrderPayload = {
    items: OrderItem[];
    shippingAddress: {
        name?: string;
        street: string;
        city: string;
        state: string;
        zip: string;
        country: string;
    };
    paymentMethod: string;
};
