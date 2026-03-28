import { useForm, Link } from '@inertiajs/react';
import AuthLayout from '@/Layouts/AuthLayout';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/Components/ui/card';
import { Separator } from '@/Components/ui/separator';
import { User, Mail, Lock } from 'lucide-react';

export default function Register() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/register');
    };

    return (
        <AuthLayout title="Create Account">
            <Card className="shadow-lg">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl">Create your account</CardTitle>
                    <CardDescription>Start booking amazing trips today</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-3 gap-3 mb-6">
                        {[
                            { name: 'Google', href: '/auth/google/redirect' },
                            { name: 'Apple', href: '/auth/apple/redirect' },
                            { name: 'Facebook', href: '/auth/facebook/redirect' },
                        ].map((provider) => (
                            <Button key={provider.name} variant="outline" size="sm" asChild>
                                <a href={provider.href}>{provider.name}</a>
                            </Button>
                        ))}
                    </div>

                    <div className="relative mb-6">
                        <Separator />
                        <span className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-3 text-xs text-deep-lighter">
                            or sign up with email
                        </span>
                    </div>

                    <form onSubmit={submit} className="space-y-4">
                        <div>
                            <label className="text-sm font-medium text-deep mb-1.5 block">Name</label>
                            <Input
                                icon={<User className="h-4 w-4" />}
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                error={errors.name}
                                placeholder="Your full name"
                                autoFocus
                            />
                        </div>
                        <div>
                            <label className="text-sm font-medium text-deep mb-1.5 block">Email</label>
                            <Input
                                type="email"
                                icon={<Mail className="h-4 w-4" />}
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                error={errors.email}
                                placeholder="you@example.com"
                            />
                        </div>
                        <div>
                            <label className="text-sm font-medium text-deep mb-1.5 block">Password</label>
                            <Input
                                type="password"
                                icon={<Lock className="h-4 w-4" />}
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                error={errors.password}
                                placeholder="Create a password"
                            />
                        </div>
                        <div>
                            <label className="text-sm font-medium text-deep mb-1.5 block">Confirm Password</label>
                            <Input
                                type="password"
                                icon={<Lock className="h-4 w-4" />}
                                value={data.password_confirmation}
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                error={errors.password_confirmation}
                                placeholder="Confirm your password"
                            />
                        </div>

                        <Button type="submit" loading={processing} className="w-full" size="lg">
                            Create Account
                        </Button>
                    </form>

                    <p className="text-center text-sm text-deep-lighter mt-6">
                        Already have an account?{' '}
                        <Link href="/login" className="text-primary-600 font-medium hover:underline">
                            Sign in
                        </Link>
                    </p>
                </CardContent>
            </Card>
        </AuthLayout>
    );
}
