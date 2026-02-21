"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
    Users, Package, ShoppingBag, TrendingUp,
    Plus, Trash2, Shield, UserCheck, Search,
    X, ChevronDown, BarChart3, Loader2, Check
} from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { usersApi, productsApi, ordersApi, authApi, type User, type Product } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

const tabs = ["Overview", "Users", "Products"] as const;
type Tab = typeof tabs[number];

function AddUserModal({ onClose, onSuccess }: { onClose: () => void; onSuccess: () => void }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(""); setLoading(true);
        try {
            await authApi.register({ name, email, password });
            onSuccess(); onClose();
        } catch (e: unknown) {
            setError(e instanceof Error ? e.message : "Failed to create user");
        } finally { setLoading(false); }
    };

    return (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.2 }}
                className="bg-background border border-border/60 rounded-sm p-8 w-full max-w-md shadow-2xl">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold tracking-tight">Add New User</h3>
                    <Button variant="ghost" size="icon" onClick={onClose}><X className="w-5 h-5" /></Button>
                </div>
                {error && <div className="mb-4 p-3 bg-destructive/10 border border-destructive/30 rounded-sm text-destructive text-sm">{error}</div>}
                <form className="space-y-4" onSubmit={handleCreate}>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Full Name</label>
                        <Input value={name} onChange={(e) => setName(e.target.value)} required className="h-11 rounded-none border-border/60 shadow-none" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Email Address</label>
                        <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="h-11 rounded-none border-border/60 shadow-none" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Password</label>
                        <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="h-11 rounded-none border-border/60 shadow-none" placeholder="Min. 6 characters" />
                    </div>
                    <div className="flex gap-3 pt-4">
                        <Button type="submit" disabled={loading} className="flex-1 h-11 rounded-none font-bold shadow-none">
                            {loading ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Creating...</> : "CREATE USER"}
                        </Button>
                        <Button type="button" variant="outline" className="flex-1 h-11 rounded-none border-border/60 shadow-none" onClick={onClose}>CANCEL</Button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
}

const CATEGORIES = ["men", "women", "footwear", "accessories"];

function AddProductModal({ onClose, onSuccess }: { onClose: () => void; onSuccess: () => void }) {
    const [form, setForm] = useState({
        name: "", description: "", price: "", discount_price: "",
        category: "men", stock: "", badge: "",
        sizesRaw: "", colorsRaw: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const set = (field: string, val: string) => setForm(f => ({ ...f, [field]: val }));

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(""); setLoading(true);
        try {
            await productsApi.create({
                name: form.name,
                description: form.description,
                price: Number(form.price),
                discount_price: form.discount_price ? Number(form.discount_price) : undefined,
                category: form.category,
                stock: Number(form.stock) || 0,
                badge: form.badge,
                sizes: form.sizesRaw.split(",").map(s => s.trim()).filter(Boolean),
                colors: form.colorsRaw.split(",").map(s => s.trim()).filter(Boolean),
                images: [],
            });
            onSuccess(); onClose();
        } catch (e: unknown) {
            setError(e instanceof Error ? e.message : "Failed to create product");
        } finally { setLoading(false); }
    };

    return (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.2 }}
                className="bg-background border border-border/60 rounded-sm p-8 w-full max-w-xl shadow-2xl my-8">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold tracking-tight">Add New Product</h3>
                    <Button variant="ghost" size="icon" onClick={onClose}><X className="w-5 h-5" /></Button>
                </div>
                {error && <div className="mb-4 p-3 bg-destructive/10 border border-destructive/30 rounded-sm text-destructive text-sm">{error}</div>}
                <form className="space-y-4" onSubmit={handleCreate}>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Product Name *</label>
                        <Input value={form.name} onChange={(e) => set("name", e.target.value)} required className="h-11 rounded-none border-border/60 shadow-none" placeholder="Canvas Field Jacket" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Description</label>
                        <textarea value={form.description} onChange={(e) => set("description", e.target.value)}
                            rows={3} className="w-full border border-border/60 bg-background rounded-none px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-foreground resize-none" placeholder="Describe the product..." />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Price (₹) *</label>
                            <Input type="number" value={form.price} onChange={(e) => set("price", e.target.value)} required min="0" className="h-11 rounded-none border-border/60 shadow-none" placeholder="4999" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Discount Price (₹)</label>
                            <Input type="number" value={form.discount_price} onChange={(e) => set("discount_price", e.target.value)} min="0" className="h-11 rounded-none border-border/60 shadow-none" placeholder="Optional" />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Category *</label>
                            <div className="relative">
                                <select value={form.category} onChange={(e) => set("category", e.target.value)}
                                    className="w-full h-11 bg-background border border-border/60 rounded-none px-3 text-sm appearance-none focus:outline-none focus:ring-1 focus:ring-foreground capitalize">
                                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                                </select>
                                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Stock *</label>
                            <Input type="number" value={form.stock} onChange={(e) => set("stock", e.target.value)} required min="0" className="h-11 rounded-none border-border/60 shadow-none" placeholder="50" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Sizes <span className="text-muted-foreground font-normal">(comma-separated)</span></label>
                        <Input value={form.sizesRaw} onChange={(e) => set("sizesRaw", e.target.value)} className="h-11 rounded-none border-border/60 shadow-none" placeholder="S, M, L, XL, XXL" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Colors <span className="text-muted-foreground font-normal">(comma-separated)</span></label>
                        <Input value={form.colorsRaw} onChange={(e) => set("colorsRaw", e.target.value)} className="h-11 rounded-none border-border/60 shadow-none" placeholder="Black, White, Olive" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Badge <span className="text-muted-foreground font-normal">(optional)</span></label>
                        <Input value={form.badge} onChange={(e) => set("badge", e.target.value)} className="h-11 rounded-none border-border/60 shadow-none" placeholder="New, Sale, Trending..." />
                    </div>
                    <div className="flex gap-3 pt-4">
                        <Button type="submit" disabled={loading} className="flex-1 h-11 rounded-none font-bold shadow-none">
                            {loading ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Creating...</> : "CREATE PRODUCT"}
                        </Button>
                        <Button type="button" variant="outline" className="flex-1 h-11 rounded-none border-border/60 shadow-none" onClick={onClose}>CANCEL</Button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
}


export default function AdminDashboardPage() {
    const router = useRouter();
    const { isAdmin, isAuthenticated, loading: authLoading } = useAuth();
    const [activeTab, setActiveTab] = useState<Tab>("Overview");
    const [searchQuery, setSearchQuery] = useState("");
    const [showAddUser, setShowAddUser] = useState(false);
    const [showAddProduct, setShowAddProduct] = useState(false);
    const [users, setUsers] = useState<User[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [loadingData, setLoadingData] = useState(false);
    const [stats, setStats] = useState({ users: 0, products: 0, orders: 0 });

    useEffect(() => {
        if (authLoading) return;
        if (!isAuthenticated || !isAdmin) { router.push("/"); return; }
        fetchData();
    }, [isAdmin, isAuthenticated, authLoading]);

    const fetchData = async () => {
        setLoadingData(true);
        try {
            const [usersRes, productsRes, ordersRes] = await Promise.all([
                usersApi.getAll(),
                productsApi.getAll({ limit: "100" }),
                ordersApi.getAll(),
            ]);
            setUsers(usersRes.users);
            setProducts(productsRes.products);
            setStats({ users: usersRes.users.length, products: productsRes.total, orders: ordersRes.orders.length });
        } catch (e) {
            console.error("Failed to load admin data:", e);
        } finally {
            setLoadingData(false);
        }
    };

    const deleteUser = async (id: string) => {
        if (!confirm("Are you sure you want to delete this user?")) return;
        // TODO: add DELETE /api/users/:id endpoint
        setUsers(u => u.filter(user => user.id !== id));
    };

    const deleteProduct = async (id: string) => {
        if (!confirm("Remove this product?")) return;
        try {
            await productsApi.remove(id);
            setProducts(p => p.filter(prod => prod.id !== id));
        } catch (e) { console.error(e); }
    };

    const filteredUsers = users.filter(u =>
        u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const statCards = [
        { label: "Total Users", value: stats.users.toLocaleString(), icon: Users },
        { label: "Total Products", value: stats.products.toLocaleString(), icon: Package },
        { label: "Total Orders", value: stats.orders.toLocaleString(), icon: ShoppingBag },
        { label: "Revenue", value: "Live Soon", icon: TrendingUp },
    ];

    if (authLoading) return (
        <div className="min-h-screen flex items-center justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
        </div>
    );

    return (
        <main className="min-h-screen bg-background flex flex-col">
            <Navbar />
            {showAddUser && <AddUserModal onClose={() => setShowAddUser(false)} onSuccess={fetchData} />}
            {showAddProduct && <AddProductModal onClose={() => setShowAddProduct(false)} onSuccess={fetchData} />}

            <div className="flex-1 pt-32 pb-24">
                <div className="container mx-auto px-4 md:px-8 max-w-7xl">
                    <div className="mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                        <div>
                            <div className="inline-flex items-center gap-2 bg-muted px-3 py-1 rounded-full mb-3">
                                <Shield className="w-4 h-4" />
                                <span className="text-xs font-bold uppercase tracking-wider">Admin Panel</span>
                            </div>
                            <h1 className="text-4xl md:text-5xl font-black tracking-tighter">Dashboard</h1>
                        </div>
                        <Button className="rounded-none h-11 px-6 shadow-none font-bold gap-2 hover:scale-[1.02] transition-transform" onClick={() => setShowAddUser(true)}>
                            <Plus className="w-4 h-4" /> ADD USER
                        </Button>
                    </div>

                    {/* Tabs */}
                    <div className="flex gap-0 border-b border-border/60 mb-10">
                        {tabs.map((tab) => (
                            <button key={tab} onClick={() => { setActiveTab(tab); setSearchQuery(""); }}
                                className={`px-6 py-3 text-sm font-bold uppercase tracking-wider transition-colors border-b-2 -mb-px ${activeTab === tab ? "border-foreground text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"}`}>
                                {tab}
                            </button>
                        ))}
                    </div>

                    {loadingData && <div className="flex items-center justify-center py-24"><Loader2 className="w-8 h-8 animate-spin text-muted-foreground" /></div>}

                    {/* OVERVIEW */}
                    {!loadingData && activeTab === "Overview" && (
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                                {statCards.map((stat, i) => {
                                    const Icon = stat.icon;
                                    return (
                                        <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
                                            className="border border-border/60 rounded-sm p-6 bg-background hover:border-foreground/30 transition-colors group">
                                            <div className="flex items-center justify-between mb-4">
                                                <p className="text-sm text-muted-foreground uppercase tracking-wider font-bold">{stat.label}</p>
                                                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center group-hover:bg-foreground group-hover:text-background transition-colors">
                                                    <Icon className="w-5 h-5" />
                                                </div>
                                            </div>
                                            <p className="text-3xl font-black tracking-tight">{stat.value}</p>
                                        </motion.div>
                                    );
                                })}
                            </div>
                            <div className="border border-border/60 rounded-sm p-8 flex flex-col items-center justify-center min-h-[240px] bg-muted/30">
                                <BarChart3 className="w-12 h-12 text-muted-foreground mb-4 opacity-40" />
                                <p className="font-bold text-lg mb-1">Revenue Analytics</p>
                                <p className="text-muted-foreground text-sm">Wire payment gateway to enable live revenue chart.</p>
                            </div>
                        </motion.div>
                    )}

                    {/* USERS */}
                    {!loadingData && activeTab === "Users" && (
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                            <div className="flex flex-col sm:flex-row gap-4 mb-6">
                                <div className="relative flex-1 max-w-sm">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                    <Input placeholder="Search users..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                                        className="pl-9 h-11 rounded-none border-border/60 shadow-none" />
                                </div>
                                <Button className="rounded-none h-11 px-5 shadow-none font-bold gap-2" onClick={() => setShowAddUser(true)}>
                                    <Plus className="w-4 h-4" /> ADD USER
                                </Button>
                            </div>
                            <div className="border border-border/60 rounded-sm overflow-hidden">
                                <div className="grid grid-cols-12 bg-muted px-6 py-3 text-xs font-bold uppercase tracking-widest text-muted-foreground border-b border-border/40">
                                    <div className="col-span-4">User</div>
                                    <div className="col-span-3 hidden md:block">Email</div>
                                    <div className="col-span-2 hidden sm:block">Joined</div>
                                    <div className="col-span-2 text-center">Role</div>
                                    <div className="col-span-1 text-right">Actions</div>
                                </div>
                                {filteredUsers.map((user, i) => (
                                    <div key={user.id} className={`grid grid-cols-12 px-6 py-4 items-center hover:bg-muted/50 transition-colors ${i !== filteredUsers.length - 1 ? "border-b border-border/40" : ""}`}>
                                        <div className="col-span-4 flex items-center gap-3">
                                            <div className="w-9 h-9 rounded-full bg-muted flex items-center justify-center text-sm font-bold shrink-0">{user.name[0]}</div>
                                            <p className="font-semibold line-clamp-1">{user.name}</p>
                                        </div>
                                        <div className="col-span-3 hidden md:block text-muted-foreground text-sm truncate">{user.email}</div>
                                        <div className="col-span-2 hidden sm:block text-muted-foreground text-sm">
                                            {new Date(user.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "2-digit" })}
                                        </div>
                                        <div className="col-span-2 flex justify-center">
                                            <Badge variant={user.role === "admin" ? "default" : "secondary"} className="rounded-none shadow-none font-bold capitalize px-3">
                                                {user.role === "admin" ? <><Shield className="w-3 h-3 mr-1" /> Admin</> : <><UserCheck className="w-3 h-3 mr-1" /> User</>}
                                            </Badge>
                                        </div>
                                        <div className="col-span-1 flex justify-end gap-1">
                                            <Button variant="ghost" size="icon" className="w-8 h-8 hover:bg-destructive/10 text-muted-foreground hover:text-destructive" onClick={() => deleteUser(user.id)}>
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                                {filteredUsers.length === 0 && <div className="p-12 text-center text-muted-foreground">No users found.</div>}
                            </div>
                        </motion.div>
                    )}

                    {/* PRODUCTS */}
                    {!loadingData && activeTab === "Products" && (
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                            <div className="flex flex-col sm:flex-row gap-4 mb-6">
                                <div className="relative flex-1 max-w-sm">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                    <Input placeholder="Search products..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                                        className="pl-9 h-11 rounded-none border-border/60 shadow-none" />
                                </div>
                                <Button className="rounded-none h-11 px-5 shadow-none font-bold gap-2" onClick={() => setShowAddProduct(true)}>
                                    <Plus className="w-4 h-4" /> ADD PRODUCT
                                </Button>
                            </div>
                            <div className="border border-border/60 rounded-sm overflow-hidden">
                                <div className="grid grid-cols-12 bg-muted px-6 py-3 text-xs font-bold uppercase tracking-widest text-muted-foreground border-b border-border/40">
                                    <div className="col-span-5">Product</div>
                                    <div className="col-span-2 hidden sm:block">Category</div>
                                    <div className="col-span-2 text-right">Price</div>
                                    <div className="col-span-1 text-center">Stock</div>
                                    <div className="col-span-1 text-center hidden md:block">Active</div>
                                    <div className="col-span-1 text-right">Del.</div>
                                </div>
                                {filteredProducts.map((prod, i) => (
                                    <div key={prod.id} className={`grid grid-cols-12 px-6 py-4 items-center hover:bg-muted/50 transition-colors ${i !== filteredProducts.length - 1 ? "border-b border-border/40" : ""}`}>
                                        <div className="col-span-5">
                                            <p className="font-semibold line-clamp-1">{prod.name}</p>
                                            {prod.badge && <span className="text-xs text-muted-foreground">{prod.badge}</span>}
                                        </div>
                                        <div className="col-span-2 hidden sm:block capitalize text-muted-foreground text-sm">{prod.category}</div>
                                        <div className="col-span-2 text-right font-medium">₹{Number(prod.price).toLocaleString("en-IN")}</div>
                                        <div className={`col-span-1 text-center font-medium ${prod.stock === 0 ? "text-destructive" : prod.stock < 10 ? "text-orange-500" : ""}`}>{prod.stock}</div>
                                        <div className="col-span-1 text-center hidden md:block">
                                            {prod.is_active ? <Check className="w-4 h-4 text-green-600 mx-auto" /> : <X className="w-4 h-4 text-muted-foreground mx-auto" />}
                                        </div>
                                        <div className="col-span-1 flex justify-end">
                                            <Button variant="ghost" size="icon" className="w-8 h-8 hover:bg-destructive/10 text-muted-foreground hover:text-destructive" onClick={() => deleteProduct(prod.id)}>
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                                {filteredProducts.length === 0 && <div className="p-12 text-center text-muted-foreground">No products found.</div>}
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>
            <Footer />
        </main>
    );
}
