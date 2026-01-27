import { useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { X, Maximize2, Minimize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { philosophyArticles, type PhilosophyArticle } from "@/data/philosophyArticles";

interface ConceptNode {
  id: string;
  title: string;
  sanskritTitle?: string;
  category: string;
  x: number;
  y: number;
  connections: string[];
}

interface ConceptMapProps {
  onClose?: () => void;
  highlightedArticle?: string;
}

const ConceptMap = ({ onClose, highlightedArticle }: ConceptMapProps) => {
  const [selectedNode, setSelectedNode] = useState<string | null>(highlightedArticle || null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Build concept nodes with positions in a circular layout
  const nodes = useMemo((): ConceptNode[] => {
    const centerX = 400;
    const centerY = 300;
    const radius = 220;

    return philosophyArticles.map((article, index) => {
      const angle = (2 * Math.PI * index) / philosophyArticles.length - Math.PI / 2;
      const connections = article.crossReferences
        .map((ref) => ref.articleId)
        .filter((id): id is string => !!id && philosophyArticles.some((a) => a.id === id));

      return {
        id: article.id,
        title: article.title.split("—")[0].trim(),
        sanskritTitle: article.sanskritTitle,
        category: article.category,
        x: centerX + radius * Math.cos(angle),
        y: centerY + radius * Math.sin(angle),
        connections,
      };
    });
  }, []);

  // Get connections as lines
  const connections = useMemo(() => {
    const lines: { from: ConceptNode; to: ConceptNode; key: string }[] = [];
    const processed = new Set<string>();

    nodes.forEach((node) => {
      node.connections.forEach((targetId) => {
        const key = [node.id, targetId].sort().join("-");
        if (!processed.has(key)) {
          const target = nodes.find((n) => n.id === targetId);
          if (target) {
            lines.push({ from: node, to: target, key });
            processed.add(key);
          }
        }
      });
    });

    return lines;
  }, [nodes]);

  const selectedArticle = useMemo(
    () => (selectedNode ? philosophyArticles.find((a) => a.id === selectedNode) : null),
    [selectedNode]
  );

  const categoryColors: Record<string, string> = {
    metaphysics: "hsl(var(--gold))",
    ethics: "hsl(142, 76%, 36%)",
    cosmology: "hsl(221, 83%, 53%)",
    ritual: "hsl(280, 87%, 65%)",
    liberation: "hsl(45, 93%, 47%)",
  };

  const categoryLabels: Record<string, string> = {
    metaphysics: "Metaphysics",
    ethics: "Ethics",
    cosmology: "Cosmology",
    ritual: "Ritual",
    liberation: "Liberation",
  };

  const handleNodeClick = useCallback((nodeId: string) => {
    setSelectedNode((prev) => (prev === nodeId ? null : nodeId));
  }, []);

  return (
    <div className={`relative ${isFullscreen ? "fixed inset-0 z-50 bg-background p-6" : ""}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display text-lg text-foreground">Concept Relationships</h3>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsFullscreen(!isFullscreen)}
          >
            {isFullscreen ? (
              <Minimize2 className="h-4 w-4" />
            ) : (
              <Maximize2 className="h-4 w-4" />
            )}
          </Button>
          {onClose && (
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-3 mb-4">
        {Object.entries(categoryLabels).map(([key, label]) => (
          <div key={key} className="flex items-center gap-2 text-xs">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: categoryColors[key] }}
            />
            <span className="text-muted-foreground">{label}</span>
          </div>
        ))}
      </div>

      <div className="relative overflow-auto border border-border rounded-lg bg-card/30">
        <svg
          width="800"
          height="600"
          viewBox="0 0 800 600"
          className="min-w-[800px]"
        >
          {/* Connection lines */}
          {connections.map(({ from, to, key }) => {
            const isHighlighted =
              selectedNode === from.id || selectedNode === to.id;
            return (
              <motion.line
                key={key}
                x1={from.x}
                y1={from.y}
                x2={to.x}
                y2={to.y}
                stroke={isHighlighted ? "hsl(var(--gold))" : "hsl(var(--border))"}
                strokeWidth={isHighlighted ? 2 : 1}
                strokeOpacity={selectedNode && !isHighlighted ? 0.2 : 0.6}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              />
            );
          })}

          {/* Nodes */}
          {nodes.map((node, index) => {
            const isSelected = selectedNode === node.id;
            const isConnected =
              selectedNode &&
              nodes.find((n) => n.id === selectedNode)?.connections.includes(node.id);

            return (
              <motion.g
                key={node.id}
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: selectedNode && !isSelected && !isConnected ? 0.4 : 1,
                  scale: 1,
                }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                style={{ cursor: "pointer" }}
                onClick={() => handleNodeClick(node.id)}
              >
                {/* Glow effect for selected */}
                {isSelected && (
                  <motion.circle
                    cx={node.x}
                    cy={node.y}
                    r={45}
                    fill={categoryColors[node.category]}
                    opacity={0.2}
                    initial={{ scale: 0.8 }}
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                )}

                {/* Main circle */}
                <motion.circle
                  cx={node.x}
                  cy={node.y}
                  r={isSelected ? 35 : 30}
                  fill={categoryColors[node.category]}
                  stroke={isSelected ? "hsl(var(--gold))" : "transparent"}
                  strokeWidth={3}
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                />

                {/* Sanskrit text */}
                <text
                  x={node.x}
                  y={node.y - 2}
                  textAnchor="middle"
                  fill="white"
                  fontSize="14"
                  fontFamily="serif"
                  fontWeight="bold"
                >
                  {node.sanskritTitle || node.title.slice(0, 2)}
                </text>

                {/* Title below */}
                <text
                  x={node.x}
                  y={node.y + 50}
                  textAnchor="middle"
                  fill="hsl(var(--foreground))"
                  fontSize="11"
                  className="font-body"
                >
                  {node.title}
                </text>
              </motion.g>
            );
          })}
        </svg>
      </div>

      {/* Selected concept detail */}
      <AnimatePresence>
        {selectedArticle && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="mt-4"
          >
            <Card className="border-gold/30">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-display text-lg text-foreground">
                      {selectedArticle.title}
                    </h4>
                    {selectedArticle.sanskritTitle && (
                      <span className="text-2xl text-gold">
                        {selectedArticle.sanskritTitle}
                      </span>
                    )}
                  </div>
                  <Badge variant="secondary">
                    {categoryLabels[selectedArticle.category]}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground font-body line-clamp-3 mb-3">
                  {selectedArticle.canonicalDefinition}
                </p>
                <div className="flex items-center gap-2">
                  <Link to={`/philosophy/${selectedArticle.id}`}>
                    <Button
                      size="sm"
                      className="bg-gold hover:bg-gold/90 text-background"
                    >
                      Read Article
                    </Button>
                  </Link>
                  {selectedArticle.crossReferences.length > 0 && (
                    <span className="text-xs text-muted-foreground">
                      Connected to {selectedArticle.crossReferences.length} concepts
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ConceptMap;
