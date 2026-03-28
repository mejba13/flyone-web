import { Link } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import { Card } from '@/Components/ui/card';
import { Badge } from '@/Components/ui/badge';
import { Button } from '@/Components/ui/button';
import { Avatar, AvatarFallback } from '@/Components/ui/avatar';
import { formatDate, getInitials } from '@/Lib/utils';
import { ArrowLeft, Clock, Eye } from 'lucide-react';
import type { BlogPost } from '@/Types';

interface Props {
    post: BlogPost;
    related: BlogPost[];
}

export default function BlogShow({ post, related }: Props) {
    return (
        <MainLayout title={post.title}>
            <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <Button variant="ghost" size="sm" className="mb-6" asChild>
                    <Link href="/blog"><ArrowLeft className="h-4 w-4" /> Back to blog</Link>
                </Button>
                {post.category && <Badge variant="default" className="mb-4">{post.category}</Badge>}
                <h1 className="text-3xl md:text-4xl font-display font-bold text-deep mb-4">{post.title}</h1>
                <div className="flex items-center gap-4 mb-8 text-sm text-deep-lighter">
                    <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8"><AvatarFallback>{getInitials(post.author?.name || '')}</AvatarFallback></Avatar>
                        <span>{post.author?.name}</span>
                    </div>
                    {post.published_at && <span>{formatDate(post.published_at)}</span>}
                    <span className="flex items-center gap-1"><Eye className="h-4 w-4" />{post.view_count}</span>
                </div>
                {post.featured_image && (
                    <div className="rounded-2xl overflow-hidden mb-8">
                        <img src={post.featured_image} alt={post.title} className="w-full h-64 md:h-96 object-cover" />
                    </div>
                )}
                <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />
            </article>
        </MainLayout>
    );
}
