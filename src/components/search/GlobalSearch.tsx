import { useSearch } from "@/contexts/SearchContext";
import SearchModal from "./SearchModal";

interface GlobalSearchProps {
  onSelectDiscussion?: (discussionId: string) => void;
}

const GlobalSearch = ({ onSelectDiscussion }: GlobalSearchProps) => {
  const { isSearchOpen, closeSearch } = useSearch();

  return (
    <SearchModal
      isOpen={isSearchOpen}
      onClose={closeSearch}
      onSelectDiscussion={onSelectDiscussion}
    />
  );
};

export default GlobalSearch;
