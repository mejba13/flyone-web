import { Link } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import { formatDate, getInitials } from '@/Lib/utils';
import { Avatar, AvatarFallback } from '@/Components/ui/avatar';
import { BookOpen, Clock, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import type { BlogPost, PaginatedData } from '@/Types';

interface Props {
    posts: PaginatedData<BlogPost>;
}

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.05 } } };
const fadeUp = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const } },
};

export default function BlogIndex({ posts }: Props) {
    const featured = posts.data?.[0];
    const rest = posts.data?.slice(1) || [];

    return (
        <MainLayout title="Blog">
            {/* Hero */}
            <div className="relative pt-12 pb-10 md:pt-16 md:pb-12 overflow-hidden">
                <div className="absolute inset-0">
                    <div className="absolute top-[-10%] left-[15%] w-[500px] h-[500px] bg-primary-500/6 rounded-full blur-[160px]" />
                    <div className="absolute bottom-0 right-[10%] w-[400px] h-[400px] bg-teal/4 rounded-full blur-[140px]" />
                </div>
                <div className="relative max-w-[1280px] mx-auto px-5 sm:px-8 text-center">
                    <span className="inline-flex items-center gap-2 text-[12px] font-semibold tracking-[0.08em] uppercase text-primary-400 mb-4">
                        <BookOpen className="h-3.5 w-3.5" /> Blog
                    </span>
                    <h1 className="text-[2.25rem] md:text-[3rem] font-display font-bold text-white" style={{ letterSpacing: '-0.4px' }}>
                        Travel Stories & Tips
                    </h1>
                    <p className="text-white/35 text-[16px] mt-3">Inspiration and guides for your next adventure</p>
                </div>
            </div>

            <div className="max-w-[1280px] mx-auto px-5 sm:px-8 py-16">
                {/* Featured post */}
                {featured && (
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
                        <Link href={`/blog/${featured.slug}`}>
                            <div className="group relative rounded-[20px] overflow-hidden cursor-pointer">
                                <div className="absolute -inset-[1px] rounded-[22px] bg-gradient-to-b from-primary-400/0 to-teal/0 group-hover:from-primary-400/20 group-hover:to-teal/10 transition-all duration-700 opacity-0 group-hover:opacity-100 blur-[0.5px]" />
                                <div className="relative grid md:grid-cols-2 bg-white/[0.03] border border-white/[0.06] rounded-[20px] overflow-hidden group-hover:-translate-y-0.5 transition-transform duration-500">
                                    {/* Image */}
                                    <div className="relative h-64 md:h-auto md:min-h-[360px] bg-[#12111e]">
                                        {featured.featured_image ? (
                                            <img src={featured.featured_image} alt={featured.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700" />
                                        ) : (
                                            <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-teal/10 flex items-center justify-center">
                                                <BookOpen className="h-16 w-16 text-white/10" />
                                            </div>
                                        )}
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#08080e]/30 md:bg-none" />
                                    </div>
                                    {/* Content */}
                                    <div className="p-8 md:p-10 flex flex-col justify-center">
                                        <div className="flex items-center gap-3 mb-4">
                                            {featured.category && (
                                                <span className="text-[11px] font-bold tracking-[0.08em] uppercase text-primary-400 bg-primary-500/10 border border-primary-500/15 px-3 py-1 rounded-full">
                                                    {featured.category}
                                                </span>
                                            )}
                                            <span className="text-[12px] text-white/25 font-medium">Featured</span>
                                        </div>
                                        <h2 className="text-[1.5rem] md:text-[1.75rem] font-display font-bold text-white leading-[1.2] group-hover:text-primary-200 transition-colors" style={{ letterSpacing: '-0.3px' }}>
                                            {featured.title}
                                        </h2>
                                        {featured.excerpt && (
                                            <p className="text-white/35 text-[15px] mt-4 line-clamp-3 leading-relaxed">{featured.excerpt}</p>
                                        )}
                                        <div className="flex items-center gap-4 mt-6">
                                            <div className="flex items-center gap-2.5">
                                                <Avatar className="h-7 w-7 ring-1 ring-white/10">
                                                    <AvatarFallback className="text-[10px] bg-primary-500/15 text-primary-300 font-semibold">{getInitials(featured.author?.name || '')}</AvatarFallback>
                                                </Avatar>
                                                <span className="text-[13px] text-white/40 font-medium">{featured.author?.name}</span>
                                            </div>
                                            {featured.published_at && (
                                                <span className="flex items-center gap-1.5 text-[12px] text-white/25">
                                                    <Clock className="h-3 w-3" />
                                                    {formatDate(featured.published_at)}
                                                </span>
                                            )}
                                        </div>
                                        <div className="mt-6">
                                            <span className="inline-flex items-center gap-2 text-[13px] font-semibold text-primary-400 group-hover:text-primary-300 transition-colors">
                                                Read article <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </motion.div>
                )}

                {/* Grid */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
                    initial="hidden" animate="show" variants={stagger}
                >
                    {rest.map((post) => (
                        <motion.div key={post.id} variants={fadeUp}>
                            <Link href={`/blog/${post.slug}`}>
                                <div className="group cursor-pointer">
                                    <div className="absolute -inset-[1px] rounded-[18px] bg-gradient-to-b from-primary-400/0 to-teal/0 group-hover:from-primary-400/15 group-hover:to-teal/10 transition-all duration-700 opacity-0 group-hover:opacity-100 blur-[0.5px]" />
                                    <div className="relative bg-white/[0.03] border border-white/[0.06] rounded-[18px] overflow-hidden group-hover:border-primary-400/15 group-hover:-translate-y-0.5 transition-all duration-500">
                                        {/* Image */}
                                        <div className="relative h-48 bg-[#12111e] overflow-hidden">
                                            {post.featured_image ? (
                                                <img src={post.featured_image} alt={post.title} className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-700" loading="lazy" />
                                            ) : (
                                                <div className="w-full h-full bg-gradient-to-br from-primary-500/10 to-teal/5 flex items-center justify-center">
                                                    <BookOpen className="h-10 w-10 text-white/10" />
                                                </div>
                                            )}
                                        </div>
                                        {/* Content */}
                                        <div className="p-5 md:p-6">
                                            {post.category && (
                                                <span className="text-[10px] font-bold tracking-[0.08em] uppercase text-primary-400 bg-primary-500/10 border border-primary-500/15 px-2.5 py-0.5 rounded-full mb-3 inline-block">
                                                    {post.category}
                                                </span>
                                            )}
                                            <h3 className="font-display font-bold text-white text-[17px] leading-[1.3] line-clamp-2 group-hover:text-primary-200 transition-colors mb-2" style={{ letterSpacing: '-0.15px' }}>
                                                {post.title}
                                            </h3>
                                            {post.excerpt && (
                                                <p className="text-white/30 text-[13px] line-clamp-2 leading-relaxed mb-4">{post.excerpt}</p>
                                            )}
                                            <div className="flex items-center gap-3">
                                                <Avatar className="h-6 w-6 ring-1 ring-white/10">
                                                    <AvatarFallback className="text-[9px] bg-primary-500/15 text-primary-300 font-semibold">{getInitials(post.author?.name || '')}</AvatarFallback>
                                                </Avatar>
                                                <span className="text-[12px] text-white/35 font-medium">{post.author?.name}</span>
                                                {post.published_at && (
                                                    <span className="text-[11px] text-white/20">{formatDate(post.published_at)}</span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </motion.div>

                {(!posts.data || posts.data.length === 0) && (
                    <div className="text-center py-20">
                        <BookOpen className="h-12 w-12 text-white/10 mx-auto mb-4" />
                        <p className="text-white/30 text-[16px]">No articles published yet</p>
                    </div>
                )}
            </div>
        </MainLayout>
    );
}
