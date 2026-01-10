import { motion } from "framer-motion";
import { MapPin, Calendar, BookOpen } from "lucide-react";
import { Temple } from "@/data/temples";
import { Link } from "react-router-dom";

interface TempleCardProps {
  temple: Temple;
  index: number;
}

const TempleCard = ({ temple, index }: TempleCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <Link
        to={`/temples/${temple.id}`}
        className="group block bg-card border border-border hover:border-gold/50 transition-all duration-300"
      >
        {/* Temple Image */}
        <div className="aspect-[4/3] bg-muted relative overflow-hidden">
          <img 
            src={temple.imageUrl} 
            alt={temple.name}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {/* Gradient overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          {/* Sanskrit name overlay */}
          <div className="absolute bottom-4 left-4 right-4">
            <p className="font-sanskrit text-xl text-gold drop-shadow-lg">{temple.sanskritName}</p>
          </div>
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-gold/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="font-display text-xl text-foreground mb-2 group-hover:text-gold transition-colors">
            {temple.name}
          </h3>
          
          <div className="flex items-center gap-2 text-muted-foreground text-sm mb-4">
            <MapPin className="w-4 h-4 text-gold/70" />
            <span className="font-body">
              {temple.location.city}, {temple.location.state}
            </span>
          </div>

          <p className="font-body text-sm text-muted-foreground line-clamp-2 mb-4">
            {temple.description}
          </p>

          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-gold/60" />
              <span>{temple.festivals.length} festivals</span>
            </div>
            <div className="flex items-center gap-1">
              <BookOpen className="w-3.5 h-3.5 text-gold/60" />
              <span>{temple.linkedScriptures.length} scriptures</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default TempleCard;
