import { useForm, Link } from '@inertiajs/react';
import AuthLayout from '@/Layouts/AuthLayout';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/Components/ui/card';
import { Separator } from '@/Components/ui/separator';
import { Mail, Lock } from 'lucide-react';

export default function Login() {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/login');
    };

    return (
        <AuthLayout title="Sign In">
            <Card className="shadow-lg">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl">Welcome back</CardTitle>
                    <CardDescription>Sign in to your Flyone account</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-3 gap-3 mb-6">
                        {[
                            { name: 'Google', href: '/auth/google/redirect', bg: 'hover:bg-red-50' },
                            { name: 'Apple', href: '/auth/apple/redirect', bg: 'hover:bg-gray-50' },
                            { name: 'Facebook', href: '/auth/facebook/redirect', bg: 'hover:bg-blue-50' },
                        ].map((provider) => (
                            <Button key={provider.name} variant="outline" size="sm" asChild className={provider.bg}>
                                <a href={provider.href}>{provider.name}</a>
                            </Button>
                        ))}
                    </div>

                    <div className="relative mb-6">
                        <Separator />
                        <span className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-3 text-xs text-deep-lighter">
                            or continue with email
                        </span>
                    </div>

                    <form onSubmit={submit} className="space-y-4">
                        <div>
                            <label className="text-sm font-medium text-deep mb-1.5 block">Email</label>
                            <Input
                                type="email"
                                icon={<Mail className="h-4 w-4" />}
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                error={errors.email}
                                placeholder="you@example.com"
                                autoFocus
                            />
                        </div>
                        <div>
                            <div className="flex items-center justify-between mb-1.5">
                                <label className="text-sm font-medium text-deep">Password</label>
                                <Link href="/forgot-password" className="text-xs text-primary-600 hover:underline">
                                    Forgot password?
                                </Link>
                            </div>
                            <Input
                                type="password"
                                icon={<Lock className="h-4 w-4" />}
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                error={errors.password}
                                placeholder="Enter your password"
                            />
                        </div>

                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={data.remember}
                                onChange={(e) => setData('remember', e.target.checked)}
                                className="accent-primary-500 rounded"
                            />
                            <span className="text-sm text-deep-lighter">Remember me</span>
                        </label>

                        <Button type="submit" loading={processing} className="w-full" size="lg">
                            Sign in
                        </Button>
                    </form>

                    <p className="text-center text-sm text-deep-lighter mt-6">
                        Don't have an account?{' '}
                        <Link href="/register" className="text-primary-600 font-medium hover:underline">
                            Sign up
                        </Link>
                    </p>
                </CardContent>
            </Card>
        </AuthLayout>
    );
}
