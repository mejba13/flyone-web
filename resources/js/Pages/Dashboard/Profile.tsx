import { useForm } from '@inertiajs/react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Separator } from '@/Components/ui/separator';
import { Badge } from '@/Components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/Components/ui/avatar';
import { getInitials } from '@/Lib/utils';
import { User, Mail, Phone, Shield, Plus, Trash2, Edit2 } from 'lucide-react';
import type { User as UserType, Traveler } from '@/Types';

interface Props {
    user: UserType;
    travelers: Traveler[];
}

export default function Profile({ user, travelers }: Props) {
    const profileForm = useForm({
        name: user.name,
        email: user.email,
        phone: user.phone || '',
    });

    const travelerForm = useForm({
        full_name: '',
        date_of_birth: '',
        nationality: '',
        passport_number: '',
        passport_expiry: '',
        gender: '' as string,
    });

    const handleProfileUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        profileForm.put('/dashboard/profile');
    };

    const handleAddTraveler = (e: React.FormEvent) => {
        e.preventDefault();
        travelerForm.post('/dashboard/profile/travelers', {
            onSuccess: () => travelerForm.reset(),
        });
    };

    return (
        <DashboardLayout title="Profile">
            <div className="space-y-8">
                <h1 className="text-2xl font-display font-bold text-deep">Profile Settings</h1>

                {/* Profile Info */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><User className="h-5 w-5" /> Personal Information</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleProfileUpdate} className="space-y-4">
                            <div className="flex items-center gap-4 mb-6">
                                <Avatar className="h-16 w-16">
                                    <AvatarImage src={user.avatar} />
                                    <AvatarFallback className="text-lg">{getInitials(user.name)}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="font-display font-semibold text-lg">{user.name}</p>
                                    <Badge variant="default" className="capitalize">{user.tier} Member</Badge>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm font-medium mb-1.5 block">Full Name</label>
                                    <Input
                                        value={profileForm.data.name}
                                        onChange={(e) => profileForm.setData('name', e.target.value)}
                                        error={profileForm.errors.name}
                                    />
                                </div>
                                <div>
                                    <label className="text-sm font-medium mb-1.5 block">Email</label>
                                    <Input
                                        type="email"
                                        value={profileForm.data.email}
                                        onChange={(e) => profileForm.setData('email', e.target.value)}
                                        error={profileForm.errors.email}
                                    />
                                </div>
                                <div>
                                    <label className="text-sm font-medium mb-1.5 block">Phone</label>
                                    <Input
                                        value={profileForm.data.phone}
                                        onChange={(e) => profileForm.setData('phone', e.target.value)}
                                        error={profileForm.errors.phone}
                                    />
                                </div>
                            </div>

                            <Button type="submit" loading={profileForm.processing}>Save Changes</Button>
                        </form>
                    </CardContent>
                </Card>

                {/* Saved Travelers */}
                <Card>
                    <CardHeader>
                        <CardTitle>Saved Travelers</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {travelers.length > 0 && (
                            <div className="space-y-3 mb-6">
                                {travelers.map((t) => (
                                    <div key={t.id} className="flex items-center justify-between p-3 rounded-xl bg-soft">
                                        <div>
                                            <p className="font-medium text-sm">{t.full_name}</p>
                                            <p className="text-xs text-deep-lighter">
                                                {t.nationality} · {t.passport_number || 'No passport'}
                                                {t.is_primary && <Badge variant="teal" className="ml-2 text-[10px]">Primary</Badge>}
                                            </p>
                                        </div>
                                        <Button variant="ghost" size="icon" className="h-8 w-8">
                                            <Trash2 className="h-4 w-4 text-error" />
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        )}

                        <Separator className="my-4" />
                        <h4 className="font-medium text-sm mb-4">Add New Traveler</h4>
                        <form onSubmit={handleAddTraveler} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Input placeholder="Full Name" value={travelerForm.data.full_name} onChange={(e) => travelerForm.setData('full_name', e.target.value)} error={travelerForm.errors.full_name} />
                                <Input type="date" placeholder="Date of Birth" value={travelerForm.data.date_of_birth} onChange={(e) => travelerForm.setData('date_of_birth', e.target.value)} error={travelerForm.errors.date_of_birth} />
                                <Input placeholder="Nationality (3-letter code)" value={travelerForm.data.nationality} onChange={(e) => travelerForm.setData('nationality', e.target.value)} maxLength={3} error={travelerForm.errors.nationality} />
                                <Input placeholder="Passport Number" value={travelerForm.data.passport_number} onChange={(e) => travelerForm.setData('passport_number', e.target.value)} />
                            </div>
                            <Button type="submit" variant="secondary" loading={travelerForm.processing}>
                                <Plus className="h-4 w-4" /> Add Traveler
                            </Button>
                        </form>
                    </CardContent>
                </Card>

                {/* Security */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Shield className="h-5 w-5" /> Security</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 rounded-xl bg-soft">
                                <div>
                                    <p className="font-medium text-sm">Two-Factor Authentication</p>
                                    <p className="text-xs text-deep-lighter">
                                        {user.two_factor_confirmed_at ? 'Enabled' : 'Not enabled'}
                                    </p>
                                </div>
                                <Button variant={user.two_factor_confirmed_at ? 'destructive' : 'secondary'} size="sm">
                                    {user.two_factor_confirmed_at ? 'Disable' : 'Enable'}
                                </Button>
                            </div>
                            <div className="flex items-center justify-between p-4 rounded-xl bg-soft">
                                <div>
                                    <p className="font-medium text-sm">Change Password</p>
                                    <p className="text-xs text-deep-lighter">Update your password regularly</p>
                                </div>
                                <Button variant="secondary" size="sm">Update</Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    );
}
