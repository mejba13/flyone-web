import { type ReactNode } from 'react';
import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Shield, Zap, Award } from 'lucide-react';

interface AuthLayoutProps {
    children: ReactNode;
    title?: string;
}

export default function AuthLayout({ children, title }: AuthLayoutProps) {
    return (
        <>
            {title && <Head title={title} />}
            <div className="min-h-screen bg-[#08080e] flex">
                {/* Left: Video brand panel */}
                <div className="hidden lg:flex lg:w-[48%] xl:w-[52%] relative overflow-hidden">
                    {/* Video background */}
                    <video
                        autoPlay muted loop playsInline preload="auto"
                        className="absolute inset-0 w-full h-full object-cover opacity-40"
                        aria-hidden="true"
                    >
                        <source src="/videos/hero-travel.mp4" type="video/mp4" />
                    </video>

                    {/* Overlays */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#08080e]/50 via-[#08080e]/30 to-[#08080e]/80" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#08080e]/80 via-transparent to-[#08080e]/60" />

                    {/* Animated orbs */}
                    <motion.div
                        className="absolute w-[500px] h-[500px] rounded-full"
                        style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 65%)', top: '-10%', right: '10%' }}
                        animate={{ x: [0, 30, -15, 0], y: [0, -20, 10, 0] }}
                        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                    />
                    <motion.div
                        className="absolute w-[400px] h-[400px] rounded-full"
                        style={{ background: 'radial-gradient(circle, rgba(91,207,207,0.08) 0%, transparent 65%)', bottom: '5%', left: '5%' }}
                        animate={{ x: [0, -20, 15, 0], y: [0, 15, -20, 0] }}
                        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                    />

                    {/* Content overlay */}
                    <div className="relative z-10 flex flex-col justify-between p-10 xl:p-14 w-full">
                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-3 group">
                            <div className="relative">
                                <div className="absolute -inset-2 bg-primary-400/15 rounded-2xl blur-xl opacity-60 group-hover:opacity-100 transition-opacity duration-700" />
                                <div className="relative w-11 h-11 rounded-[14px] bg-gradient-to-br from-primary-500/30 via-[#1e1a35] to-[#14122a] border border-primary-400/20 flex items-center justify-center shadow-[0_4px_20px_rgba(124,58,237,0.25)] overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-br from-primary-400/15 via-transparent to-teal/10" />
                                    <svg viewBox="0 0 32 32" className="relative w-7 h-7" fill="none">
                                        <text x="5" y="25" style={{ fontSize: '24px', fontWeight: 800, fontStyle: 'italic', fontFamily: 'Playfair Display, serif' }} fill="url(#authLogoG)">F</text>
                                        <path d="M17 9 Q26 6 29 15" stroke="url(#authPathG)" strokeWidth="1.5" strokeLinecap="round" fill="none" />
                                        <circle cx="29" cy="15" r="1.5" fill="#5BCFCF" />
                                        <defs>
                                            <linearGradient id="authLogoG" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#ffffff" /><stop offset="100%" stopColor="#D6CCFF" /></linearGradient>
                                            <linearGradient id="authPathG" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#A78BFA" stopOpacity="0.5" /><stop offset="100%" stopColor="#5BCFCF" /></linearGradient>
                                        </defs>
                                    </svg>
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[21px] font-display font-bold text-white tracking-[-0.03em] leading-none">Flyone</span>
                                <span className="text-[8.5px] font-semibold tracking-[0.2em] uppercase text-primary-300/40 mt-0.5">Travel reimagined</span>
                            </div>
                        </Link>

                        {/* Headline */}
                        <div className="max-w-md">
                            <h1 className="text-[2.5rem] xl:text-[3rem] leading-[1.05]" style={{ letterSpacing: '-0.5px' }}>
                                <span className="font-serif font-bold text-white italic">Travel</span>
                                <span className="font-display font-bold text-white"> the world</span>
                                <br />
                                <span className="font-display font-bold bg-gradient-to-r from-primary-300 to-teal bg-clip-text text-transparent">with confidence.</span>
                            </h1>
                            <p className="text-white/30 text-[15px] mt-5 leading-[1.7] max-w-sm">
                                Book flights, trains, buses, and ferries all in one place. Join thousands of happy travelers across Southeast Asia.
                            </p>

                            {/* Trust signals */}
                            <div className="flex flex-col gap-3 mt-8">
                                {[
                                    { icon: Shield, text: 'PCI DSS Level 1 certified' },
                                    { icon: Zap, text: 'Instant booking confirmation' },
                                    { icon: Award, text: 'Earn rewards on every trip' },
                                ].map((item) => (
                                    <div key={item.text} className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center">
                                            <item.icon className="h-3.5 w-3.5 text-primary-400/60" />
                                        </div>
                                        <span className="text-[13px] text-white/30 font-medium">{item.text}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Bottom */}
                        <p className="text-white/15 text-[12px]">© {new Date().getFullYear()} Flyone. All rights reserved.</p>
                    </div>
                </div>

                {/* Right: Auth form panel */}
                <div className="flex-1 flex items-center justify-center p-6 sm:p-8 lg:p-12 relative">
                    {/* Subtle ambient glow */}
                    <div className="absolute top-[20%] right-[10%] w-[400px] h-[400px] bg-primary-500/[0.03] rounded-full blur-[120px] pointer-events-none" />

                    <motion.div
                        className="w-full max-w-[420px] relative"
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    >
                        {/* Mobile logo */}
                        <div className="lg:hidden flex items-center justify-center gap-3 mb-10">
                            <div className="w-10 h-10 rounded-[13px] bg-gradient-to-br from-primary-500/30 via-[#1e1a35] to-[#14122a] border border-primary-400/20 flex items-center justify-center overflow-hidden relative">
                                <div className="absolute inset-0 bg-gradient-to-br from-primary-400/15 via-transparent to-teal/10" />
                                <svg viewBox="0 0 32 32" className="relative w-6 h-6" fill="none">
                                    <text x="5" y="25" style={{ fontSize: '24px', fontWeight: 800, fontStyle: 'italic', fontFamily: 'Playfair Display, serif' }} fill="url(#mAuthLogo)">F</text>
                                    <path d="M17 9 Q26 6 29 15" stroke="url(#mAuthPath)" strokeWidth="1.5" strokeLinecap="round" fill="none" />
                                    <circle cx="29" cy="15" r="1.5" fill="#5BCFCF" />
                                    <defs>
                                        <linearGradient id="mAuthLogo" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#ffffff" /><stop offset="100%" stopColor="#D6CCFF" /></linearGradient>
                                        <linearGradient id="mAuthPath" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#A78BFA" stopOpacity="0.5" /><stop offset="100%" stopColor="#5BCFCF" /></linearGradient>
                                    </defs>
                                </svg>
                            </div>
                            <span className="text-[20px] font-display font-bold text-white tracking-[-0.03em]">Flyone</span>
                        </div>
                        {children}
                    </motion.div>
                </div>
            </div>
        </>
    );
}
