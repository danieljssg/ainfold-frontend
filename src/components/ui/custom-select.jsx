'use client';

import { MdArrowDropDown as ChevronDown } from 'react-icons/md';
import {
  memo,
  useCallback,
  useRef,
  useState,
  useMemo,
  useEffect,
  useId,
  useDeferredValue,
} from 'react';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { OptionList } from '@/components/ui/option-list';
import { SearchInput } from '@/components/ui/search-input';
import { useIsMobile } from '@/hooks/use-mobile';
import { normalizeText } from '@/utils/textUtils';
import { cn } from '@/lib/utils';

/* ── Memoized sub-components ─────────────────────────────── */
const MemoizedOptionList = memo(OptionList);
const MemoizedSearchInput = memo(SearchInput);

const TriggerButton = memo(
  ({ selectId, isOpen, setIsOpen, label, placeholder, selectedLabel, disabled, size = 'xs' }) => {
    const sizes = {
      xs: {
        height: 'h-10',
        px: 'px-4',
        text: 'text-xs',
        labelXs: 'text-[10px]',
        labelSm: 'text-xs',
        translate: '-translate-y-2',
        mt: 'mt-2.5',
      },
      sm: {
        height: 'h-12',
        px: 'px-5',
        text: 'text-[13px]',
        labelXs: 'text-[10px]',
        labelSm: 'text-[13px]',
        translate: '-translate-y-2.5',
        mt: 'mt-3',
      },
      md: {
        height: 'h-14',
        px: 'px-5',
        text: 'text-sm',
        labelXs: 'text-[11px]',
        labelSm: 'text-sm',
        translate: '-translate-y-3',
        mt: 'mt-4',
      },
      lg: {
        height: 'h-14',
        px: 'px-6',
        text: 'text-base',
        labelXs: 'text-[12px]',
        labelSm: 'text-base',
        translate: '-translate-y-3.5',
        mt: 'mt-5',
      },
    };

    const currentSize = sizes[size] || sizes.xs;

    return (
      <button
        type="button"
        id={selectId}
        onClick={() => setIsOpen((v) => !v)}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        disabled={disabled}
        className={cn(
          'relative flex items-center justify-between w-full py-0 transition-all duration-200 outline-none rounded-full',
          'bg-input border-border text-input-foreground border',
          'hover:border-primary/50 focus-visible:ring-0',
          currentSize.height,
          currentSize.px,
          currentSize.text,
          isOpen ? 'border-primary ring-1 ring-primary/20' : '',
          disabled ? 'opacity-70 cursor-not-allowed grayscale' : 'cursor-pointer',
        )}
      >
        <div className="flex flex-col flex-1 overflow-hidden h-full justify-center">
          <span
            className={cn(
              'absolute transition-all duration-200 pointer-events-none select-none',
              currentSize.px.replace('px-', 'left-'),
              selectedLabel || isOpen
                ? cn(currentSize.labelXs, 'font-medium text-secondary', currentSize.translate)
                : cn(currentSize.labelSm, 'text-muted-foreground translate-y-0'),
            )}
          >
            {label ?? placeholder}
          </span>

          <span
            className={cn(
              'truncate mr-2 text-sm transition-all duration-200 font-medium',
              currentSize.mt,
              currentSize.text,
              !selectedLabel ? 'opacity-0 invisible' : 'text-foreground opacity-100 visible',
            )}
          >
            {selectedLabel ?? placeholder}
          </span>
        </div>

        <ChevronDown
          className={cn(
            'shrink-0 text-muted-foreground transition-transform duration-200',
            size === 'xs' ? 'w-4 h-4' : 'w-5 h-5',
            isOpen ? 'rotate-180' : '',
          )}
        />
      </button>
    );
  },
);

TriggerButton.displayName = 'TriggerButton';

/* ── Hook: click-outside ─────────────────────────────────── */
function useClickOutside(ref, isOpen, isMobile, close) {
  useEffect(() => {
    if (!isOpen || isMobile) return;
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) close();
    };
    document.addEventListener('mousedown', handler, { passive: true });
    return () => document.removeEventListener('mousedown', handler);
  }, [ref, isOpen, isMobile, close]);
}

/* ── Componente principal ────────────────────────────────── */

/**
 * CustomSelect — select unificado.
 *
 * @prop {boolean}  searchable  – Activa el buscador y el Drawer en mobile.
 * @prop {any}      value       – Valor controlado (opcional). Si no se pasa, usa estado interno.
 * @prop {function} onSelect    – Callback controlado (opcional).
 *
 * Todas las demás props son las mismas que antes
 * (options, label, placeholder, className, name, id, helperText, emptyMessage, size).
 */
export default function CustomSelect({
  options = [],
  searchable = false,
  disabled = false,
  // Controlado (opcional)
  value: controlledValue,
  onSelect,
  // UI
  label,
  placeholder = 'Seleccionar...',
  emptyMessage = 'No se encontraron resultados',
  className = '',
  helperText = '',
  name,
  id,
  size = 'xs',
}) {
  /* ── Estado ──────────────────────────────────────────── */
  const [isOpen, setIsOpen] = useState(false);
  const [internalValue, setInternalValue] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Controlado vs no-controlado
  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internalValue;

  const containerRef = useRef(null);
  const searchInputRef = useRef(null);
  const isMobile = useIsMobile();
  const generatedId = useId();
  const selectId = id ?? generatedId;

  const deferredSearch = useDeferredValue(searchTerm);

  /* ── Derivados ───────────────────────────────────────── */
  const selectedLabel = useMemo(() => {
    if (value === undefined || value === null || value === '') return null;
    return options.find((opt) => String(opt.value) === String(value))?.label ?? null;
  }, [value, options]);

  const filteredOptions = useMemo(() => {
    if (!searchable || !deferredSearch) return options;
    const normalizedSearch = normalizeText(deferredSearch);
    return options.filter((opt) => normalizeText(opt.label).includes(normalizedSearch));
  }, [options, deferredSearch, searchable]);

  /* ── Efectos ─────────────────────────────────────────── */
  // Foco en search al abrir, reset al cerrar
  useEffect(() => {
    if (!searchable) return;
    if (isOpen) {
      const t = setTimeout(() => searchInputRef.current?.focus(), 10);
      return () => clearTimeout(t);
    } else {
      setSearchTerm('');
    }
  }, [isOpen, searchable]);

  // Click outside (solo desktop)
  const close = useCallback(() => setIsOpen(false), []);
  useClickOutside(containerRef, isOpen, isMobile && searchable, close);

  /* ── Handlers ────────────────────────────────────────── */
  const handleSelect = useCallback(
    (option) => {
      if (isControlled) {
        onSelect?.(option.value);
      } else {
        setInternalValue(option.value);
      }
      setIsOpen(false);
    },
    [isControlled, onSelect],
  );

  /* ── Subcomponentes ──────────────────────────────────── */
  const trigger = (
    <TriggerButton
      selectId={selectId}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      label={label}
      placeholder={placeholder}
      selectedLabel={selectedLabel}
      disabled={disabled}
      size={size}
    />
  );

  const optionList = (
    <MemoizedOptionList
      options={filteredOptions}
      value={value}
      onSelect={handleSelect}
      emptyMessage={emptyMessage}
      className={cn(isMobile && searchable ? 'max-h-[60dvh] mr-2' : 'max-h-[240px]')}
    />
  );

  const searchPanel = searchable ? (
    <>
      <MemoizedSearchInput
        value={searchTerm}
        onChange={setSearchTerm}
        placeholder={placeholder}
        inputRef={searchInputRef}
      />
      <hr className="border-accent" />
      {optionList}
    </>
  ) : (
    optionList
  );

  const hiddenInput = (
    <input type="hidden" name={name} value={value ?? ''} id={`${selectId}`} readOnly />
  );

  const helperSpan = helperText ? (
    <span className="mt-1 ml-4 block text-[11px] text-muted-foreground">{helperText}</span>
  ) : null;

  const dropdown = (
    <div
      className="
        absolute z-50 w-full mt-1 origin-top
        bg-background border border-border
        rounded shadow-xl overflow-hidden pr-2 py-2
        animate-in fade-in zoom-in-95 duration-200
      "
    >
      {searchPanel}
    </div>
  );

  /* ── Render: mobile drawer (solo cuando searchable) ─── */
  if (isMobile && searchable) {
    return (
      <div className={`relative inline-block ${className || 'w-full'}`}>
        <Drawer open={isOpen} onOpenChange={setIsOpen}>
          <DrawerTrigger asChild>{trigger}</DrawerTrigger>
          <DrawerContent className="bg-background border-t border-border rounded-t-3xl overflow-hidden">
            {label && (
              <DrawerHeader className="pb-2">
                <DrawerTitle className="text-sm font-semibold text-foreground text-center">
                  {label}
                </DrawerTitle>
              </DrawerHeader>
            )}
            {searchPanel}
          </DrawerContent>
        </Drawer>
        {helperSpan}
        {hiddenInput}
      </div>
    );
  }

  /* ── Render: desktop dropdown (siempre) ─────────────── */
  return (
    <div className={`relative inline-block ${className || 'w-full'}`} ref={containerRef}>
      {trigger}
      {isOpen && dropdown}
      {helperSpan}
      {hiddenInput}
    </div>
  );
}
