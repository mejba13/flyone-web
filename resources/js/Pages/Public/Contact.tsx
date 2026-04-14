import { useForm } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import { Button } from '@/Components/ui/button';
import { motion } from 'framer-motion';
import {
    Mail, MapPin, Phone, Clock, Send,
    MessageCircle, Headphones, FileText,
} from 'lucide-react';
import { useState } from 'react';

const contactMethods = [
    { icon: Mail, label: 'Email us', value: 'hello@flyone.com', href: 'mailto:hello@flyone.com', desc: 'We reply within 24 hours' },
    { icon: Headphones, label: 'Live support', value: 'Available 24/7', href: '#', desc: 'Chat with our team' },
    { icon: Phone, label: 'Call us', value: '+65 6123 4567', href: 'tel:+6561234567', desc: 'Mon-Fri, 9am-6pm SGT' },
    { icon: MapPin, label: 'Offices', value: 'Singapore · Bangkok · Jakarta', href: '#', desc: 'Visit us in person' },
];

const faqs = [
    { q: 'How do I cancel or change my booking?', a: 'You can manage your bookings from the Dashboard > My Trips section. Free cancellation is available up to 24 hours before departure.' },
    { q: 'What payment methods do you accept?', a: 'We accept Visa, Mastercard, AMEX, GoPay, and bank transfers. All payments are PCI DSS Level 1 certified.' },
    { q: 'How do loyalty points work?', a: 'Earn points on every booking. Points can be redeemed for discounts on future trips. Check your balance in Dashboard > Loyalty.' },
    { q: 'Can I book multi-city trips?', a: 'Yes! Use the Multi-City option in our search to plan complex itineraries across multiple destinations.' },
];

const fadeUp = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const } },
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } };

const inputClass = 'w-full h-12 bg-white/[0.03] border border-white/[0.07] rounded-xl pl-4 pr-4 text-[14px] text-white placeholder:text-white/20 focus:outline-none focus:bg-white/[0.05] focus:border-primary-400/25 focus:shadow-[0_0_0_3px_rgba(124,58,237,0.08)] transition-all duration-300';

export default function Contact() {
    const [submitted, setSubmitted] = useState(false);
    const { data, setData, reset } = useForm({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
        reset();
        setTimeout(() => setSubmitted(false), 4000);
    };

    return (
        <MainLayout title="Contact Us">
            {/* Hero */}
            <div className="relative pt-12 pb-10 md:pt-16 md:pb-12 overflow-hidden">
                <div className="absolute inset-0">
                    <div className="absolute top-[-10%] right-[15%] w-[500px] h-[500px] bg-primary-500/6 rounded-full blur-[160px]" />
                    <div className="absolute bottom-[-15%] left-[10%] w-[400px] h-[400px] bg-teal/4 rounded-full blur-[140px]" />
                </div>
                <div className="relative max-w-[1280px] mx-auto px-5 sm:px-8 text-center">
                    <span className="inline-flex items-center gap-2 text-[12px] font-semibold tracking-[0.08em] uppercase text-primary-400 mb-4">
                        <MessageCircle className="h-3.5 w-3.5" /> Get in touch
                    </span>
                    <h1 className="text-[2.25rem] md:text-[3rem] font-display font-bold text-white" style={{ letterSpacing: '-0.4px' }}>
                        Contact Us
                    </h1>
                    <p className="text-white/35 text-[16px] mt-3 max-w-lg mx-auto">
                        Have a question about your booking? Need help planning your trip? We're here to help.
                    </p>
                </div>
            </div>

            {/* Contact methods */}
            <div className="max-w-[1280px] mx-auto px-5 sm:px-8 py-16">
                <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
                    initial="hidden" animate="show" variants={stagger}
                >
                    {contactMethods.map((method) => (
                        <motion.a
                            key={method.label}
                            href={method.href}
                            variants={fadeUp}
                            className="group bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 hover:border-primary-400/20 hover:bg-white/[0.05] transition-all duration-500"
                        >
                            <div className="w-11 h-11 rounded-xl bg-primary-500/10 border border-primary-500/15 flex items-center justify-center mb-4 group-hover:bg-primary-500/15 transition-colors">
                                <method.icon className="h-5 w-5 text-primary-400" />
                            </div>
                            <h3 className="font-display font-semibold text-white text-[16px]">{method.label}</h3>
                            <p className="text-primary-300 text-[14px] mt-1 font-medium">{method.value}</p>
                            <p className="text-white/30 text-[13px] mt-1">{method.desc}</p>
                        </motion.a>
                    ))}
                </motion.div>
            </div>

            {/* Form + FAQ */}
            <div className="max-w-[1280px] mx-auto px-5 sm:px-8 pb-20 md:pb-24">
                <div className="grid lg:grid-cols-[1fr_420px] gap-8 lg:gap-14">
                    {/* Contact form */}
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                        <div className="relative">
                            <div className="absolute -inset-1 rounded-[24px] bg-gradient-to-br from-primary-500/10 via-transparent to-teal/8 blur-lg opacity-50" />
                            <div className="relative bg-white/[0.03] backdrop-blur-sm border border-white/[0.07] rounded-[20px] p-7 md:p-9">
                                <h2 className="text-[22px] font-display font-bold text-white mb-2" style={{ letterSpacing: '-0.2px' }}>
                                    Send us a message
                                </h2>
                                <p className="text-white/30 text-[14px] mb-7">Fill out the form and we'll get back to you shortly.</p>

                                {submitted ? (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="text-center py-12"
                                    >
                                        <div className="w-16 h-16 bg-teal/10 border border-teal/20 rounded-full flex items-center justify-center mx-auto mb-5">
                                            <Send className="h-7 w-7 text-teal" />
                                        </div>
                                        <h3 className="text-white font-display font-bold text-[20px] mb-2">Message sent!</h3>
                                        <p className="text-white/35 text-[15px]">We'll get back to you within 24 hours.</p>
                                    </motion.div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div>
                                                <label className="text-[13px] font-medium text-white/50 mb-2 block">Name</label>
                                                <input
                                                    value={data.name}
                                                    onChange={(e) => setData('name', e.target.value)}
                                                    placeholder="Your name"
                                                    required
                                                    className={inputClass}
                                                />
                                            </div>
                                            <div>
                                                <label className="text-[13px] font-medium text-white/50 mb-2 block">Email</label>
                                                <input
                                                    type="email"
                                                    value={data.email}
                                                    onChange={(e) => setData('email', e.target.value)}
                                                    placeholder="you@example.com"
                                                    required
                                                    className={inputClass}
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="text-[13px] font-medium text-white/50 mb-2 block">Subject</label>
                                            <select
                                                value={data.subject}
                                                onChange={(e) => setData('subject', e.target.value)}
                                                required
                                                className={`${inputClass} appearance-none`}
                                            >
                                                <option value="" className="bg-[#12111e] text-white/40">Select a topic</option>
                                                <option value="booking" className="bg-[#12111e] text-white">Booking inquiry</option>
                                                <option value="refund" className="bg-[#12111e] text-white">Refund request</option>
                                                <option value="technical" className="bg-[#12111e] text-white">Technical issue</option>
                                                <option value="partnership" className="bg-[#12111e] text-white">Partnership</option>
                                                <option value="other" className="bg-[#12111e] text-white">Other</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="text-[13px] font-medium text-white/50 mb-2 block">Message</label>
                                            <textarea
                                                value={data.message}
                                                onChange={(e) => setData('message', e.target.value)}
                                                placeholder="How can we help you?"
                                                required
                                                rows={5}
                                                className="w-full bg-white/[0.03] border border-white/[0.07] rounded-xl px-4 py-3 text-[14px] text-white placeholder:text-white/20 focus:outline-none focus:bg-white/[0.05] focus:border-primary-400/25 focus:shadow-[0_0_0_3px_rgba(124,58,237,0.08)] transition-all duration-300 resize-none"
                                            />
                                        </div>
                                        <div className="relative group pt-1">
                                            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-500 to-primary-400 rounded-xl blur-sm opacity-30 group-hover:opacity-50 transition-opacity duration-500" />
                                            <Button
                                                type="submit"
                                                className="relative w-full h-12 bg-gradient-to-r from-primary-500 to-primary-400 text-white hover:from-primary-400 hover:to-primary-500 rounded-xl text-[14px] font-semibold shadow-none transition-all duration-300"
                                            >
                                                <Send className="h-4 w-4" />
                                                Send message
                                            </Button>
                                        </div>
                                    </form>
                                )}
                            </div>
                        </div>
                    </motion.div>

                    {/* FAQ sidebar */}
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                        <div className="lg:sticky lg:top-24">
                            <div className="flex items-center gap-2 mb-6">
                                <FileText className="h-4 w-4 text-primary-400" />
                                <h3 className="text-[18px] font-display font-bold text-white">Frequently Asked</h3>
                            </div>
                            <div className="space-y-3">
                                {faqs.map((faq, i) => (
                                    <details key={i} className="group bg-white/[0.02] border border-white/[0.05] rounded-xl overflow-hidden">
                                        <summary className="flex items-center justify-between p-4 cursor-pointer text-[14px] font-medium text-white/70 hover:text-white transition-colors list-none [&::-webkit-details-marker]:hidden">
                                            {faq.q}
                                            <span className="text-white/20 group-open:rotate-45 transition-transform duration-300 text-lg ml-3">+</span>
                                        </summary>
                                        <div className="px-4 pb-4 text-[13px] text-white/35 leading-relaxed border-t border-white/[0.04] pt-3">
                                            {faq.a}
                                        </div>
                                    </details>
                                ))}
                            </div>

                            {/* Business hours */}
                            <div className="mt-8 bg-white/[0.02] border border-white/[0.05] rounded-xl p-5">
                                <div className="flex items-center gap-2 mb-3">
                                    <Clock className="h-4 w-4 text-primary-400/60" />
                                    <h4 className="text-[14px] font-semibold text-white/60">Business Hours</h4>
                                </div>
                                <div className="space-y-1.5 text-[13px]">
                                    <div className="flex justify-between">
                                        <span className="text-white/35">Monday - Friday</span>
                                        <span className="text-white/55 font-medium">9:00 AM - 6:00 PM SGT</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-white/35">Saturday</span>
                                        <span className="text-white/55 font-medium">10:00 AM - 4:00 PM SGT</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-white/35">Sunday</span>
                                        <span className="text-white/35">Closed</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </MainLayout>
    );
}
