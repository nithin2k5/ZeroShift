"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { usersApi, type User } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";

export default function ProfilePage() {
    const { user: authUser, isAuthenticated } = useAuth();
    const [user, setUser] = useState<Partial<User>>({});
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        if (!isAuthenticated) return;
        usersApi.getProfile().then((res) => setUser(res.user));
    }, [isAuthenticated]);

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(""); setSuccess("");
        if (newPassword && newPassword !== confirmPassword) {
            setError("New passwords do not match"); return;
        }
        setLoading(true);
        try {
            const res = await usersApi.updateProfile({
                name: user.name,
                email: user.email,
                phone: user.phone,
                ...(newPassword ? { currentPassword, newPassword } : {}),
            });
            setUser(res.user);
            setSuccess("Profile updated successfully!");
            setCurrentPassword(""); setNewPassword(""); setConfirmPassword("");
        } catch (e: unknown) {
            setError(e instanceof Error ? e.message : "Update failed");
        } finally {
            setLoading(false);
        }
    };

    if (!isAuthenticated) return <p className="text-muted-foreground">Please log in to view your profile.</p>;

    return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <h2 className="text-2xl font-bold tracking-tight mb-8">Personal Information</h2>

            {error && <div className="mb-6 p-3 bg-destructive/10 border border-destructive/30 rounded-sm text-destructive text-sm font-medium">{error}</div>}
            {success && <div className="mb-6 p-3 bg-green-50 border border-green-200 rounded-sm text-green-700 text-sm font-medium">{success}</div>}

            <form className="space-y-6 max-w-2xl" onSubmit={handleSave}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Full Name</label>
                        <Input value={user.name || ""} onChange={(e) => setUser(u => ({ ...u, name: e.target.value }))}
                            className="h-12 rounded-none border-border/60 shadow-none focus-visible:ring-1 focus-visible:ring-foreground" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Phone</label>
                        <Input value={user.phone || ""} onChange={(e) => setUser(u => ({ ...u, phone: e.target.value }))}
                            className="h-12 rounded-none border-border/60 shadow-none focus-visible:ring-1 focus-visible:ring-foreground" />
                    </div>
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium">Email Address</label>
                    <Input type="email" value={user.email || ""} onChange={(e) => setUser(u => ({ ...u, email: e.target.value }))}
                        className="h-12 rounded-none border-border/60 shadow-none focus-visible:ring-1 focus-visible:ring-foreground" />
                </div>

                <h3 className="text-xl font-bold tracking-tight pt-4 border-t border-border/40">Change Password</h3>
                <div className="space-y-2">
                    <label className="text-sm font-medium">Current Password</label>
                    <Input type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)}
                        className="h-12 rounded-none border-border/60 shadow-none focus-visible:ring-1 focus-visible:ring-foreground" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">New Password</label>
                        <Input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)}
                            className="h-12 rounded-none border-border/60 shadow-none focus-visible:ring-1 focus-visible:ring-foreground" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Confirm New Password</label>
                        <Input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                            className="h-12 rounded-none border-border/60 shadow-none focus-visible:ring-1 focus-visible:ring-foreground" />
                    </div>
                </div>

                <div className="pt-4 flex gap-4">
                    <Button type="submit" disabled={loading} className="h-12 px-8 rounded-none text-base font-bold shadow-none hover:scale-[1.02] transition-transform">
                        {loading ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Saving...</> : "SAVE CHANGES"}
                    </Button>
                </div>
            </form>
        </motion.div>
    );
}
