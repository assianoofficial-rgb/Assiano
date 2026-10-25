import React from 'react';
import { Search, X, ArrowRight } from 'lucide-react';
import { Product } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onSearchSubmit: (query: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  products,
  onSelectProduct,
  onSearchSubmit,
}) => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setSearchTerm('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const matches = searchTerm.trim()
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.fabric.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.categoryLabel.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && searchTerm.trim()) {
      onSearchSubmit(searchTerm);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="relative bg-white w-full max-w-xl rounded-sm shadow-2xl border border-neutral-200 overflow-hidden">
        {/* Search Input Bar */}
        <div className="p-4 border-b border-neutral-200 flex items-center gap-3">
          <Search className="w-5 h-5 text-[#E10613]" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search by attire, abaya, kurti, cotton, organza..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 text-sm bg-transparent border-none focus:outline-none placeholder-neutral-400 text-neutral-900"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="text-neutral-400 hover:text-black p-1 text-xs"
            >
              Clear
            </button>
          )}
          <button
            onClick={onClose}
            aria-label="Close search"
            className="p-1.5 text-neutral-400 hover:text-black rounded-full hover:bg-neutral-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results or Suggested Tags */}
        <div className="max-h-96 overflow-y-auto p-4">
          {searchTerm.trim() ? (
            matches.length > 0 ? (
              <div className="space-y-2">
                <div className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider mb-2">
                  Matching Products ({matches.length})
                </div>
                {matches.map((item) => (
                  <a
                    key={item.id}
                    href={`/product/${item.id}`}
                    onClick={(e) => {
                      if (!e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey && e.button === 0) {
                        e.preventDefault();
                        onSelectProduct(item);
                        onClose();
                      }
                    }}
                    className="p-2.5 rounded-xs hover:bg-neutral-100/80 flex items-center gap-3 transition-colors cursor-pointer group block"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-14 object-cover rounded-xs border border-neutral-200"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-semibold text-neutral-900 group-hover:text-[#E10613] truncate">
                        {item.name}
                      </h4>
                      <p className="text-[11px] text-neutral-500 truncate">{item.fabric}</p>
                    </div>
                    <span className="text-xs font-bold font-mono text-neutral-900 tabular-nums">
                      Tk {item.price.toLocaleString()}
                    </span>
                  </a>
                ))}
              </div>
            ) : (
              <div className="py-8 text-center text-xs text-neutral-500">
                No designs matched "{searchTerm}". Press Enter to search catalog.
              </div>
            )
          ) : (
            <div className="space-y-4">
              <div>
                <span className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider block mb-2">
                  Popular Searches
                </span>
                <div className="flex flex-wrap gap-2 text-xs">
                  {['Korean Nida Abaya', 'Lilac Three-Piece', 'Marigold Kurti', 'Diamond Gown', 'Cuban Shirt'].map((term) => (
                    <button
                      key={term}
                      onClick={() => {
                        setSearchTerm(term);
                        onSearchSubmit(term);
                        onClose();
                      }}
                      className="px-3 py-1 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 rounded-xs transition-colors cursor-pointer"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
