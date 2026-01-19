import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Target, Check, Trash2, ChevronDown, ChevronUp, Calendar, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { 
  useSankalpas, 
  useCreateSankalpa, 
  useUpdateSankalpa, 
  useDeleteSankalpa,
  SANKALPA_CATEGORIES,
  Sankalpa 
} from '@/hooks/useSankalpas';
import { format } from 'date-fns';

const SankalpaTracker = () => {
  const [showForm, setShowForm] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [newSankalpa, setNewSankalpa] = useState({
    title: '',
    description: '',
    category: 'general',
    target_date: '',
    progress: 0,
    is_completed: false,
  });

  const { data: sankalpas, isLoading } = useSankalpas();
  const createSankalpa = useCreateSankalpa();
  const updateSankalpa = useUpdateSankalpa();
  const deleteSankalpa = useDeleteSankalpa();

  const handleCreate = () => {
    if (!newSankalpa.title.trim()) return;
    
    createSankalpa.mutate({
      title: newSankalpa.title,
      description: newSankalpa.description || null,
      category: newSankalpa.category,
      target_date: newSankalpa.target_date || null,
      progress: 0,
      is_completed: false,
    });
    
    setNewSankalpa({
      title: '',
      description: '',
      category: 'general',
      target_date: '',
      progress: 0,
      is_completed: false,
    });
    setShowForm(false);
  };

  const handleComplete = (sankalpa: Sankalpa) => {
    updateSankalpa.mutate({
      id: sankalpa.id,
      is_completed: !sankalpa.is_completed,
      completed_at: !sankalpa.is_completed ? new Date().toISOString() : null,
      progress: !sankalpa.is_completed ? 100 : sankalpa.progress,
    });
  };

  const handleProgressUpdate = (id: string, progress: number) => {
    updateSankalpa.mutate({ id, progress });
  };

  const activeSankalpas = sankalpas?.filter(s => !s.is_completed) || [];
  const completedSankalpas = sankalpas?.filter(s => s.is_completed) || [];

  const getCategoryLabel = (value: string) => {
    return SANKALPA_CATEGORIES.find(c => c.value === value)?.label || value;
  };

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-primary/20">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg flex items-center gap-2">
          <Target className="h-5 w-5 text-primary" />
          Sankalpa Tracker
        </CardTitle>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowForm(!showForm)}
          className="border-primary/30"
        >
          <Plus className="h-4 w-4 mr-1" />
          New Sankalpa
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* New Sankalpa Form */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="p-4 rounded-lg bg-background/50 border border-primary/20 space-y-3">
                <Input
                  placeholder="Enter your sankalpa (spiritual intention)..."
                  value={newSankalpa.title}
                  onChange={(e) => setNewSankalpa({ ...newSankalpa, title: e.target.value })}
                  className="bg-background/50"
                />
                <Textarea
                  placeholder="Description (optional)..."
                  value={newSankalpa.description}
                  onChange={(e) => setNewSankalpa({ ...newSankalpa, description: e.target.value })}
                  className="bg-background/50 min-h-[60px]"
                />
                <div className="flex gap-3">
                  <Select
                    value={newSankalpa.category}
                    onValueChange={(value) => setNewSankalpa({ ...newSankalpa, category: value })}
                  >
                    <SelectTrigger className="flex-1 bg-background/50">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      {SANKALPA_CATEGORIES.map((cat) => (
                        <SelectItem key={cat.value} value={cat.value}>
                          {cat.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Input
                    type="date"
                    value={newSankalpa.target_date}
                    onChange={(e) => setNewSankalpa({ ...newSankalpa, target_date: e.target.value })}
                    className="flex-1 bg-background/50"
                  />
                </div>
                <div className="flex gap-2 justify-end">
                  <Button variant="ghost" size="sm" onClick={() => setShowForm(false)}>
                    Cancel
                  </Button>
                  <Button 
                    size="sm" 
                    onClick={handleCreate}
                    disabled={!newSankalpa.title.trim() || createSankalpa.isPending}
                  >
                    <Sparkles className="h-4 w-4 mr-1" />
                    Set Sankalpa
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Active Sankalpas */}
        {isLoading ? (
          <div className="text-center py-8 text-muted-foreground">Loading...</div>
        ) : activeSankalpas.length === 0 && !showForm ? (
          <div className="text-center py-8 text-muted-foreground">
            <Target className="h-12 w-12 mx-auto mb-3 opacity-50" />
            <p>No active sankalpas</p>
            <p className="text-sm">Set a spiritual intention to begin your journey</p>
          </div>
        ) : (
          <div className="space-y-3">
            {activeSankalpas.map((sankalpa) => (
              <motion.div
                key={sankalpa.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 rounded-lg bg-background/30 border border-border/50 hover:border-primary/30 transition-colors"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="font-medium truncate">{sankalpa.title}</h4>
                      <Badge variant="outline" className="text-xs">
                        {getCategoryLabel(sankalpa.category)}
                      </Badge>
                    </div>
                    {sankalpa.target_date && (
                      <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                        <Calendar className="h-3 w-3" />
                        Target: {format(new Date(sankalpa.target_date), 'MMM d, yyyy')}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7"
                      onClick={() => setExpandedId(expandedId === sankalpa.id ? null : sankalpa.id)}
                    >
                      {expandedId === sankalpa.id ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 text-emerald-400 hover:text-emerald-300"
                      onClick={() => handleComplete(sankalpa)}
                    >
                      <Check className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mt-2 flex items-center gap-2">
                  <Progress value={sankalpa.progress} className="flex-1 h-2" />
                  <span className="text-xs text-muted-foreground w-10 text-right">
                    {sankalpa.progress}%
                  </span>
                </div>

                {/* Expanded Content */}
                <AnimatePresence>
                  {expandedId === sankalpa.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-3 pt-3 border-t border-border/50 space-y-3">
                        {sankalpa.description && (
                          <p className="text-sm text-muted-foreground">{sankalpa.description}</p>
                        )}
                        <div className="space-y-2">
                          <label className="text-xs text-muted-foreground">Update Progress</label>
                          <Slider
                            value={[sankalpa.progress]}
                            onValueChange={(value) => handleProgressUpdate(sankalpa.id, value[0])}
                            max={100}
                            step={5}
                            className="w-full"
                          />
                        </div>
                        <div className="flex justify-end">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-destructive hover:text-destructive"
                            onClick={() => deleteSankalpa.mutate(sankalpa.id)}
                          >
                            <Trash2 className="h-4 w-4 mr-1" />
                            Remove
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        )}

        {/* Completed Sankalpas */}
        {completedSankalpas.length > 0 && (
          <div className="pt-4 border-t border-border/50">
            <h4 className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-2">
              <Check className="h-4 w-4 text-emerald-400" />
              Completed ({completedSankalpas.length})
            </h4>
            <div className="space-y-2">
              {completedSankalpas.slice(0, 3).map((sankalpa) => (
                <div
                  key={sankalpa.id}
                  className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-between"
                >
                  <span className="text-sm line-through opacity-70">{sankalpa.title}</span>
                  <Badge variant="outline" className="text-emerald-400 border-emerald-500/30 text-xs">
                    ✓ Complete
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SankalpaTracker;
