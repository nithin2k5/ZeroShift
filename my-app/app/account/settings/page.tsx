"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function SettingsPage() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
        >
            <h2 className="text-2xl font-bold tracking-tight mb-8">Account Settings</h2>

            <div className="max-w-2xl space-y-12">

                {/* Email Preferences */}
                <section>
                    <h3 className="text-lg font-bold mb-4">Email Preferences</h3>
                    <div className="space-y-4">
                        <label className="flex items-start gap-4 cursor-pointer group">
                            <div className="flex h-6 items-center">
                                <input type="checkbox" defaultChecked className="w-5 h-5 rounded-sm border-border/60 accent-foreground cursor-pointer" />
                            </div>
                            <div className="flex flex-col">
                                <span className="font-semibold text-foreground group-hover:text-primary transition-colors">Marketing Emails</span>
                                <span className="text-sm text-muted-foreground">Receive updates on new drops, exclusive collections, and seasonal sales.</span>
                            </div>
                        </label>

                        <label className="flex items-start gap-4 cursor-pointer group">
                            <div className="flex h-6 items-center">
                                <input type="checkbox" defaultChecked className="w-5 h-5 rounded-sm border-border/60 accent-foreground cursor-pointer" />
                            </div>
                            <div className="flex flex-col">
                                <span className="font-semibold text-foreground group-hover:text-primary transition-colors">Order Updates</span>
                                <span className="text-sm text-muted-foreground">Get real-time tracking, shipping confirmation, and delivery updates via email.</span>
                            </div>
                        </label>
                    </div>
                </section>

                <hr className="border-border/40" />

                {/* SMS Preferences */}
                <section>
                    <h3 className="text-lg font-bold mb-4">SMS Notifications</h3>
                    <div className="space-y-4">
                        <label className="flex items-start gap-4 cursor-pointer group">
                            <div className="flex h-6 items-center">
                                <input type="checkbox" className="w-5 h-5 rounded-sm border-border/60 accent-foreground cursor-pointer" />
                            </div>
                            <div className="flex flex-col">
                                <span className="font-semibold text-foreground group-hover:text-primary transition-colors">Text Alerts</span>
                                <span className="text-sm text-muted-foreground">Receive instant delivery updates and time-sensitive flash sale codes via SMS.</span>
                            </div>
                        </label>
                    </div>
                </section>

                <hr className="border-border/40" />

                {/* Data & Privacy */}
                <section>
                    <h3 className="text-lg font-bold mb-4 text-destructive">Danger Zone</h3>
                    <div className="p-6 border border-destructive/30 rounded-sm bg-destructive/5 space-y-4">
                        <div>
                            <h4 className="font-bold tracking-tight">Deactivate Account</h4>
                            <p className="text-sm text-muted-foreground mt-1 mb-4">
                                This will permanently delete your account, order history, and saved addresses. This action cannot be undone.
                            </p>
                            <Button variant="destructive" className="rounded-none font-bold">
                                DEACTIVATE MY ACCOUNT
                            </Button>
                        </div>
                    </div>
                </section>

                <div className="pt-4 flex gap-4">
                    <Button type="button" className="h-12 px-8 rounded-none text-base font-bold shadow-none hover:scale-[1.02] transition-transform">
                        SAVE PREFERENCES
                    </Button>
                </div>
            </div>
        </motion.div>
    );
}
