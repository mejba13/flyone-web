import DashboardLayout from '@/Layouts/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { Badge } from '@/Components/ui/badge';
import { Button } from '@/Components/ui/button';
import { motion } from 'framer-motion';
import { formatDate } from '@/Lib/utils';
import { Gift, TrendingUp, Star, Trophy, Copy } from 'lucide-react';
import type { LoyaltyPoint, PaginatedData } from '@/Types';

interface Props {
    points: number;
    tier: string;
    tierProgress: { current_tier: string; next_tier: string | null; points_needed: number; progress_percent: number };
    history: PaginatedData<LoyaltyPoint>;
}

const tierColors: Record<string, string> = {
    bronze: 'from-amber-600 to-amber-700',
    silver: 'from-gray-400 to-gray-500',
    gold: 'from-yellow-400 to-yellow-500',
    platinum: 'from-purple-400 to-purple-600',
};

export default function Loyalty({ points, tier, tierProgress, history }: Props) {
    return (
        <DashboardLayout title="Loyalty">
            <div className="space-y-8">
                <h1 className="text-2xl font-display font-bold text-deep">Loyalty & Rewards</h1>

                {/* Points Card */}
                <Card className={`bg-gradient-to-r ${tierColors[tier] || tierColors.bronze} text-white p-8 border-0`}>
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="text-white/70 text-sm mb-1">Your Balance</p>
                            <motion.p
                                className="text-4xl font-display font-bold"
                                initial={{ scale: 0.5, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                            >
                                {points.toLocaleString()}
                            </motion.p>
                            <p className="text-white/70 text-sm mt-1">Flyone Points</p>
                        </div>
                        <div className="text-right">
                            <Badge className="bg-white/20 text-white capitalize text-sm">{tier} Member</Badge>
                            <div className="flex items-center gap-1 mt-2">
                                <Trophy className="h-4 w-4" />
                            </div>
                        </div>
                    </div>

                    {tierProgress.next_tier && (
                        <div className="mt-6">
                            <div className="flex justify-between text-sm text-white/70 mb-2">
                                <span className="capitalize">{tierProgress.current_tier}</span>
                                <span className="capitalize">{tierProgress.next_tier}</span>
                            </div>
                            <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                                <motion.div
                                    className="h-full bg-white rounded-full"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${tierProgress.progress_percent}%` }}
                                    transition={{ duration: 1, ease: 'easeOut' }}
                                />
                            </div>
                            <p className="text-white/70 text-xs mt-2">
                                {tierProgress.points_needed.toLocaleString()} points to {tierProgress.next_tier}
                            </p>
                        </div>
                    )}
                </Card>

                {/* Referral */}
                <Card className="p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="font-display font-semibold">Refer a Friend</h3>
                            <p className="text-sm text-deep-lighter mt-1">Earn 500 points for each friend who books</p>
                        </div>
                        <Button variant="secondary" size="sm">
                            <Copy className="h-4 w-4" /> Copy Link
                        </Button>
                    </div>
                </Card>

                {/* Points History */}
                <Card>
                    <CardHeader>
                        <CardTitle>Points History</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {history.data && history.data.length > 0 ? (
                            <div className="space-y-3">
                                {history.data.map((entry) => (
                                    <div key={entry.id} className="flex items-center justify-between p-3 rounded-xl hover:bg-soft transition-colors">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                                                entry.points > 0 ? 'bg-success/10 text-success' : 'bg-error/10 text-error'
                                            }`}>
                                                {entry.points > 0 ? <TrendingUp className="h-4 w-4" /> : <Gift className="h-4 w-4" />}
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium capitalize">{entry.type}</p>
                                                <p className="text-xs text-deep-lighter">{entry.description || entry.source}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className={`font-display font-semibold ${entry.points > 0 ? 'text-success' : 'text-error'}`}>
                                                {entry.points > 0 ? '+' : ''}{entry.points}
                                            </p>
                                            <p className="text-xs text-deep-lighter">{formatDate(entry.created_at)}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-center text-deep-lighter py-8">No points history yet. Book a trip to earn points!</p>
                        )}
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    );
}
