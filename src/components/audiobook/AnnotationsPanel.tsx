import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";
import {
  useAudiobookAnnotations,
  useCreateAnnotation,
  useDeleteAnnotation,
  AudiobookAnnotation,
} from "@/hooks/useAudiobookAnnotations";
import { useAudioPlayer } from "@/contexts/AudioPlayerContext";
import {
  Pencil,
  Highlighter,
  Trash2,
  Plus,
  X,
  Clock,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const formatTime = (seconds: number) => {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);
  if (hrs > 0) {
    return `${hrs}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  }
  return `${mins}:${secs.toString().padStart(2, "0")}`;
};

const HIGHLIGHT_COLORS = [
  { name: "yellow", class: "bg-yellow-500/30 border-yellow-500" },
  { name: "green", class: "bg-green-500/30 border-green-500" },
  { name: "blue", class: "bg-blue-500/30 border-blue-500" },
  { name: "pink", class: "bg-pink-500/30 border-pink-500" },
  { name: "purple", class: "bg-purple-500/30 border-purple-500" },
];

interface AnnotationItemProps {
  annotation: AudiobookAnnotation;
  onSeek: (seconds: number) => void;
  onDelete: (id: string) => void;
  isDeleting: boolean;
}

const AnnotationItem = ({ annotation, onSeek, onDelete, isDeleting }: AnnotationItemProps) => {
  const colorClass = HIGHLIGHT_COLORS.find(c => c.name === annotation.highlight_color)?.class || HIGHLIGHT_COLORS[0].class;
  
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className={`p-3 rounded-lg border ${
        annotation.annotation_type === "highlight" ? colorClass : "bg-muted/30 border-border"
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            {annotation.annotation_type === "note" ? (
              <Pencil className="w-3 h-3 text-primary" />
            ) : (
              <Highlighter className="w-3 h-3 text-primary" />
            )}
            <Badge variant="outline" className="text-xs">
              Chapter {annotation.chapter_number}
            </Badge>
          </div>
          
          <p className="text-sm text-foreground mb-2">{annotation.content}</p>
          
          <button
            onClick={() => onSeek(annotation.position_seconds)}
            className="flex items-center gap-1 text-xs text-primary hover:underline"
          >
            <Clock className="w-3 h-3" />
            {formatTime(annotation.position_seconds)}
          </button>
        </div>
        
        <Button
          size="icon"
          variant="ghost"
          className="h-6 w-6 text-muted-foreground hover:text-destructive"
          onClick={() => onDelete(annotation.id)}
          disabled={isDeleting}
        >
          <Trash2 className="w-3 h-3" />
        </Button>
      </div>
      
      <p className="text-xs text-muted-foreground mt-2">
        {format(new Date(annotation.created_at), "MMM d, yyyy")}
      </p>
    </motion.div>
  );
};

const AnnotationsPanel = () => {
  const { audiobook, currentTime, currentChapter, seek } = useAudioPlayer();
  const [isOpen, setIsOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [newContent, setNewContent] = useState("");
  const [annotationType, setAnnotationType] = useState<"note" | "highlight">("note");
  const [selectedColor, setSelectedColor] = useState("yellow");
  
  const { data: annotations, isLoading } = useAudiobookAnnotations(audiobook?.id || "");
  const createAnnotation = useCreateAnnotation();
  const deleteAnnotation = useDeleteAnnotation();

  const handleCreate = async () => {
    if (!audiobook || !newContent.trim()) return;
    
    await createAnnotation.mutateAsync({
      audiobook_id: audiobook.id,
      chapter_number: currentChapter,
      position_seconds: Math.floor(currentTime),
      annotation_type: annotationType,
      content: newContent.trim(),
      highlight_color: annotationType === "highlight" ? selectedColor : undefined,
    });
    
    setNewContent("");
    setIsCreating(false);
  };

  const handleDelete = async (id: string) => {
    if (!audiobook) return;
    await deleteAnnotation.mutateAsync({ id, audiobook_id: audiobook.id });
  };

  const handleSeek = (seconds: number) => {
    seek(seconds);
    setIsOpen(false);
  };

  if (!audiobook) return null;

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2">
          <Pencil className="w-4 h-4" />
          Notes
          {annotations && annotations.length > 0 && (
            <Badge variant="secondary" className="ml-1">
              {annotations.length}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      
      <SheetContent className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="flex items-center justify-between">
            <span>Notes & Highlights</span>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setIsCreating(!isCreating)}
            >
              {isCreating ? (
                <>
                  <X className="w-4 h-4 mr-1" />
                  Cancel
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4 mr-1" />
                  Add
                </>
              )}
            </Button>
          </SheetTitle>
        </SheetHeader>

        <div className="mt-6 space-y-4">
          {/* Create new annotation */}
          <AnimatePresence>
            {isCreating && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="p-4 rounded-lg bg-muted/50 border border-border space-y-3"
              >
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Clock className="w-3 h-3" />
                  At {formatTime(currentTime)} • Chapter {currentChapter}
                </div>
                
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant={annotationType === "note" ? "default" : "outline"}
                    onClick={() => setAnnotationType("note")}
                  >
                    <Pencil className="w-3 h-3 mr-1" />
                    Note
                  </Button>
                  <Button
                    size="sm"
                    variant={annotationType === "highlight" ? "default" : "outline"}
                    onClick={() => setAnnotationType("highlight")}
                  >
                    <Highlighter className="w-3 h-3 mr-1" />
                    Highlight
                  </Button>
                </div>
                
                {annotationType === "highlight" && (
                  <div className="flex gap-2">
                    {HIGHLIGHT_COLORS.map((color) => (
                      <button
                        key={color.name}
                        onClick={() => setSelectedColor(color.name)}
                        className={`w-6 h-6 rounded-full border-2 ${color.class} ${
                          selectedColor === color.name ? "ring-2 ring-primary ring-offset-2 ring-offset-background" : ""
                        }`}
                      />
                    ))}
                  </div>
                )}
                
                <Textarea
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  placeholder={annotationType === "note" ? "Write your note..." : "What stood out to you?"}
                  rows={3}
                />
                
                <Button
                  onClick={handleCreate}
                  disabled={!newContent.trim() || createAnnotation.isPending}
                  className="w-full"
                >
                  {createAnnotation.isPending ? (
                    <Loader2 className="w-4 h-4 animate-spin mr-1" />
                  ) : (
                    <Plus className="w-4 h-4 mr-1" />
                  )}
                  Save {annotationType}
                </Button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Annotations list */}
          <ScrollArea className="h-[calc(100vh-300px)]">
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-6 h-6 animate-spin text-primary" />
              </div>
            ) : !annotations || annotations.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <Pencil className="w-10 h-10 mx-auto mb-3 opacity-50" />
                <p>No annotations yet</p>
                <p className="text-sm">Add notes while listening</p>
              </div>
            ) : (
              <div className="space-y-3 pr-4">
                <AnimatePresence>
                  {annotations.map((annotation) => (
                    <AnnotationItem
                      key={annotation.id}
                      annotation={annotation}
                      onSeek={handleSeek}
                      onDelete={handleDelete}
                      isDeleting={deleteAnnotation.isPending}
                    />
                  ))}
                </AnimatePresence>
              </div>
            )}
          </ScrollArea>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default AnnotationsPanel;
