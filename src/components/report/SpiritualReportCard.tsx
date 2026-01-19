import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  Share2, Download, Copy, Check, Flame, BookOpen, 
  Target, Trophy, Calendar, Sparkles, ExternalLink 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useDharmaPath } from '@/hooks/useDharmaPath';
import { useSankalpas } from '@/hooks/useSankalpas';
import { usePracticeStreak } from '@/hooks/useSadhana';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';

interface ReportData {
  displayName: string;
  joinedAt: string;
  currentStreak: number;
  longestStreak: number;
  totalPracticeMinutes: number;
  totalMantras: number;
  scripturesStarted: number;
  chaptersCompleted: number;
  activeSankalpas: number;
  completedSankalpas: number;
  ishtaDevata: string | null;
  membershipLevel: string;
}

const SpiritualReportCard = () => {
  const { user, profile } = useAuth();
  const { dharmaPath } = useDharmaPath();
  const { data: sankalpas } = useSankalpas();
  const { data: streak } = usePracticeStreak();
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const reportRef = useRef<HTMLDivElement>(null);

  const activeSankalpas = sankalpas?.filter(s => !s.is_completed).length || 0;
  const completedSankalpas = sankalpas?.filter(s => s.is_completed).length || 0;

  const reportData: ReportData = {
    displayName: profile?.display_name || 'Sadhaka',
    joinedAt: profile?.joined_at || new Date().toISOString(),
    currentStreak: streak || dharmaPath?.currentStreak || 0,
    longestStreak: dharmaPath?.longestStreak || 0,
    totalPracticeMinutes: dharmaPath?.totalPracticeMinutes || 0,
    totalMantras: dharmaPath?.totalMantras || 0,
    scripturesStarted: dharmaPath?.readingProgress?.length || 0,
    chaptersCompleted: dharmaPath?.readingProgress?.filter(r => r.completed).length || 0,
    activeSankalpas,
    completedSankalpas,
    ishtaDevata: dharmaPath?.ishta_devata || null,
    membershipLevel: profile?.membership_level || 'seeker',
  };

  const getMembershipEmoji = (level: string) => {
    const emojis: Record<string, string> = {
      seeker: '🌱',
      questioner: '❓',
      reader: '📖',
      debater: '⚔️',
      interpreter: '🔮',
      scholar: '📚',
      guardian: '🛡️',
    };
    return emojis[level] || '🌱';
  };

  const getShareText = () => {
    const lines = [
      `🕉️ ${reportData.displayName}'s Spiritual Journey`,
      ``,
      `🔥 ${reportData.currentStreak} day streak`,
      `📿 ${reportData.totalMantras.toLocaleString()} mantras chanted`,
      `🧘 ${Math.round(reportData.totalPracticeMinutes / 60)} hours of practice`,
      `📖 ${reportData.chaptersCompleted} chapters completed`,
      `🎯 ${reportData.completedSankalpas} sankalpas fulfilled`,
      ``,
      `${getMembershipEmoji(reportData.membershipLevel)} ${reportData.membershipLevel.charAt(0).toUpperCase() + reportData.membershipLevel.slice(1)} Level`,
      ``,
      `Track your spiritual journey at RTA - Cosmic Order`,
    ];
    return lines.join('\n');
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(getShareText());
      setCopied(true);
      toast({
        title: 'Copied!',
        description: 'Report card copied to clipboard',
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: 'Error',
        description: 'Failed to copy to clipboard',
        variant: 'destructive',
      });
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${reportData.displayName}'s Spiritual Journey`,
          text: getShareText(),
          url: window.location.origin,
        });
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          handleCopy();
        }
      }
    } else {
      handleCopy();
    }
  };

  const handleDownload = () => {
    const text = getShareText();
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `spiritual-report-${format(new Date(), 'yyyy-MM-dd')}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast({
      title: 'Downloaded!',
      description: 'Report card saved to your device',
    });
  };

  if (!user) {
    return null;
  }

  const practiceHours = Math.round(reportData.totalPracticeMinutes / 60);
  const practiceProgress = Math.min((practiceHours / 100) * 100, 100);
  const mantraProgress = Math.min((reportData.totalMantras / 100000) * 100, 100);

  return (
    <Card className="bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm border-primary/20 overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Trophy className="h-5 w-5 text-primary" />
            Spiritual Report Card
          </CardTitle>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" onClick={handleCopy} title="Copy">
              {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
            </Button>
            <Button variant="ghost" size="icon" onClick={handleDownload} title="Download">
              <Download className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={handleShare} title="Share">
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6" ref={reportRef}>
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-4 border-b border-border/50"
        >
          <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center text-3xl">
            {getMembershipEmoji(reportData.membershipLevel)}
          </div>
          <h3 className="text-xl font-serif text-primary">{reportData.displayName}</h3>
          <Badge variant="outline" className="mt-2 border-primary/30 text-primary">
            {reportData.membershipLevel.charAt(0).toUpperCase() + reportData.membershipLevel.slice(1)}
          </Badge>
          {reportData.ishtaDevata && (
            <p className="text-sm text-muted-foreground mt-2">
              Devoted to {reportData.ishtaDevata}
            </p>
          )}
          <p className="text-xs text-muted-foreground mt-1">
            <Calendar className="h-3 w-3 inline mr-1" />
            Joined {format(new Date(reportData.joinedAt), 'MMMM yyyy')}
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          {/* Streak */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="p-4 rounded-lg bg-gradient-to-br from-orange-500/20 to-orange-600/10 border border-orange-500/30"
          >
            <Flame className="h-6 w-6 text-orange-400 mb-2" />
            <p className="text-2xl font-bold text-orange-300">{reportData.currentStreak}</p>
            <p className="text-xs text-orange-400/70">Day Streak</p>
            <p className="text-xs text-muted-foreground mt-1">
              Best: {reportData.longestStreak} days
            </p>
          </motion.div>

          {/* Mantras */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="p-4 rounded-lg bg-gradient-to-br from-purple-500/20 to-purple-600/10 border border-purple-500/30"
          >
            <Sparkles className="h-6 w-6 text-purple-400 mb-2" />
            <p className="text-2xl font-bold text-purple-300">
              {reportData.totalMantras.toLocaleString()}
            </p>
            <p className="text-xs text-purple-400/70">Mantras Chanted</p>
            <Progress value={mantraProgress} className="h-1 mt-2" />
          </motion.div>

          {/* Practice Hours */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="p-4 rounded-lg bg-gradient-to-br from-blue-500/20 to-blue-600/10 border border-blue-500/30"
          >
            <BookOpen className="h-6 w-6 text-blue-400 mb-2" />
            <p className="text-2xl font-bold text-blue-300">{practiceHours}</p>
            <p className="text-xs text-blue-400/70">Hours of Practice</p>
            <Progress value={practiceProgress} className="h-1 mt-2" />
          </motion.div>

          {/* Sankalpas */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="p-4 rounded-lg bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 border border-emerald-500/30"
          >
            <Target className="h-6 w-6 text-emerald-400 mb-2" />
            <p className="text-2xl font-bold text-emerald-300">{reportData.completedSankalpas}</p>
            <p className="text-xs text-emerald-400/70">Sankalpas Fulfilled</p>
            <p className="text-xs text-muted-foreground mt-1">
              {reportData.activeSankalpas} active
            </p>
          </motion.div>
        </div>

        {/* Scripture Progress */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="p-4 rounded-lg bg-background/30 border border-border/50"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-primary" />
              Scripture Study
            </span>
            <Badge variant="outline" className="text-xs">
              {reportData.scripturesStarted} scriptures
            </Badge>
          </div>
          <p className="text-2xl font-bold">{reportData.chaptersCompleted}</p>
          <p className="text-xs text-muted-foreground">Chapters Completed</p>
        </motion.div>

        {/* Share CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center pt-4 border-t border-border/50"
        >
          <Button onClick={handleShare} className="w-full">
            <Share2 className="h-4 w-4 mr-2" />
            Share Your Journey
          </Button>
          <p className="text-xs text-muted-foreground mt-2">
            Inspire others on their spiritual path
          </p>
        </motion.div>
      </CardContent>
    </Card>
  );
};

export default SpiritualReportCard;
