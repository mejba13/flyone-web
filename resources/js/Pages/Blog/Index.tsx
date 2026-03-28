import { Link } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import { Card, CardContent } from '@/Components/ui/card';
import { Badge } from '@/Components/ui/badge';
import { formatDate } from '@/Lib/utils';
import { Avatar, AvatarFallback } from '@/Components/ui/avatar';
import { getInitials } from '@/Lib/utils';
import { BookOpen, Clock } from 'lucide-react';
import type { BlogPost, PaginatedData } from '@/Types';

interface Props {
    posts: PaginatedData<BlogPost>;
}

export default function BlogIndex({ posts }: Props) {
    return (
        <MainLayout title="Blog">
            <div className="bg-gradient-to-b from-deep to-deep-light py-16">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h1 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">Travel Stories & Tips</h1>
                    <p className="text-primary-200">Inspiration and guides for your next adventure</p>
                </div>
            </div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {posts.data?.map((post) => (
                        <Link key={post.id} href={`/blog/${post.slug}`}>
                            <Card className="overflow-hidden group cursor-pointer h-full hover:shadow-card-hover transition-all">
                                <div className="h-48 bg-gradient-to-br from-primary-200 to-teal/30">
                                    {post.featured_image && (
                                        <img src={post.featured_image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                    )}
                                </div>
                                <CardContent className="p-5">
                                    {post.category && <Badge variant="default" className="mb-3">{post.category}</Badge>}
                                    <h3 className="font-display font-semibold text-lg mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">{post.title}</h3>
                                    {post.excerpt && <p className="text-sm text-deep-lighter line-clamp-2 mb-4">{post.excerpt}</p>}
                                    <div className="flex items-center gap-3">
                                        <Avatar className="h-6 w-6">
                                            <AvatarFallback className="text-[10px]">{getInitials(post.author?.name || '')}</AvatarFallback>
                                        </Avatar>
                                        <span className="text-xs text-deep-lighter">{post.author?.name}</span>
                                        <span className="text-xs text-deep-lighter">{post.published_at && formatDate(post.published_at)}</span>
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>
            </div>
        </MainLayout>
    );
}
