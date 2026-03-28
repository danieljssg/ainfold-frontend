'use client';

import React, { useState, forwardRef, useId, useEffect, useRef, useImperativeHandle } from 'react';
import { cn } from '@/lib/utils';
import { MdClear } from 'react-icons/md';

/**
 * CustomTextarea — Textarea con "floating label" inspirado en el diseño de CustomInput/CustomSelect.
 *
 * Soporta todas las propiedades tradicionales de un textarea (name, id, value, defaultValue, readOnly, disabled, rows, etc.)
 *
 * Props extra:
 * - showClear: (boolean) muestra un botón para limpiar el texto (solo si hay contenido).
 */
const CustomTextarea = forwardRef(
  (
    {
      label,
      placeholder,
      className = '',
      id,
      name,
      value,
      defaultValue,
      disabled = false,
      readOnly = false,
      helperText = '',
      onFocus,
      onBlur,
      onChange,
      showClear = false,
      rows = 4,
      size = 'sm',
      ...props
    },
    ref,
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const [internalValue, setInternalValue] = useState(value ?? defaultValue ?? '');

    const internalRef = useRef(null);
    useImperativeHandle(ref, () => internalRef.current);

    const generatedId = useId();
    const textareaId = id ?? generatedId;

    // Sincronizar internalValue si el prop value cambia (modo controlado)
    useEffect(() => {
      if (value !== undefined) {
        setInternalValue(value);
      }
    }, [value]);

    const handleFocus = (e) => {
      setIsFocused(true);
      if (onFocus) onFocus(e);
    };

    const handleBlur = (e) => {
      setIsFocused(false);
      if (onBlur) onBlur(e);
    };

    const handleChange = (e) => {
      const newVal = e.target.value;
      setInternalValue(newVal);
      if (onChange) onChange(e);
    };

    const handleClear = () => {
      setInternalValue('');
      if (internalRef.current) {
        internalRef.current.value = '';
        internalRef.current.focus();

        // Disparar un evento de cambio manual
        const event = {
          target: internalRef.current,
          currentTarget: internalRef.current,
        };
        if (onChange) onChange(event);
      }
    };

    const hasContent =
      internalValue !== '' && internalValue !== null && internalValue !== undefined;
    const isFloating = isFocused || hasContent;

    const displayClear = showClear && hasContent && !disabled && !readOnly;

    // Definición de tamaños por consistencia con otros inputs
    const sizes = {
      xs: {
        px: 'px-4',
        pt: 'pt-3.5',
        text: 'text-xs',
        labelXs: 'text-[10px]',
        labelSm: 'text-xs',
        translate: '-translate-y-2',
        labelTop: 'top-3.5',
      },
      sm: {
        px: 'px-5',
        pt: 'pt-4.5',
        text: 'text-[13px]',
        labelXs: 'text-[10px]',
        labelSm: 'text-[13px]',
        translate: '-translate-y-2.5',
        labelTop: 'top-4.5',
      },
      md: {
        px: 'px-5',
        pt: 'pt-5',
        text: 'text-sm',
        labelXs: 'text-[11px]',
        labelSm: 'text-sm',
        translate: '-translate-y-3',
        labelTop: 'top-5',
      },
      lg: {
        px: 'px-6',
        pt: 'pt-6',
        text: 'text-base',
        labelXs: 'text-[12px]',
        labelSm: 'text-base',
        translate: '-translate-y-3.5',
        labelTop: 'top-6',
      },
    };

    const currentSize = sizes[size] || sizes.sm;

    return (
      <div className={cn('relative w-full', className)}>
        <div className="relative flex w-full">
          <textarea
            {...props}
            ref={internalRef}
            id={textareaId}
            name={name}
            value={value}
            defaultValue={defaultValue}
            disabled={disabled}
            readOnly={readOnly}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleChange}
            placeholder=" "
            rows={rows}
            className={cn(
              'w-full font-medium transition-all duration-200 rounded',
              'bg-input border border-border text-foreground outline-none resize-none',
              'hover:border-primary/50 focus:border-primary focus:ring-1 focus:ring-primary/20',
              (isFocused || hasContent) && 'border-primary/50',
              isFocused && 'border-primary ring-1 ring-primary/20',
              displayClear && 'pr-12',
              disabled && 'opacity-50 cursor-not-allowed grayscale',
              readOnly && 'cursor-default',
              // Apply size-specific classes
              currentSize.px,
              currentSize.pt,
              currentSize.text,
            )}
          />

          <label
            htmlFor={textareaId}
            className={cn(
              'absolute transition-all duration-200 pointer-events-none select-none',
              currentSize.px.replace('px-', 'left-'),
              isFloating
                ? cn(
                    currentSize.labelXs,
                    'font-medium text-secondary',
                    currentSize.labelTop,
                    currentSize.translate,
                  )
                : cn(
                    currentSize.labelSm,
                    'text-muted-foreground',
                    currentSize.labelTop,
                    'translate-y-0',
                  ),
            )}
          >
            {label ?? placeholder}
          </label>

          {/* Icono de limpiar */}
          {displayClear && (
            <div className={cn('absolute right-4', currentSize.labelTop)}>
              <button
                type="button"
                onClick={handleClear}
                className="p-1.5 text-muted-foreground hover:text-foreground transition-colors rounded-full hover:bg-black/5"
                tabIndex={-1}
                aria-label="Limpiar campo"
              >
                <MdClear className={cn(size === 'xs' ? 'w-4 h-4' : 'w-5 h-5')} />
              </button>
            </div>
          )}
        </div>

        {helperText && (
          <span
            className={cn(
              'mt-1 ml-4 block text-muted-foreground',
              size === 'xs' ? 'text-[10px]' : 'text-[11px]',
            )}
          >
            {helperText}
          </span>
        )}
      </div>
    );
  },
);

CustomTextarea.displayName = 'CustomTextarea';

export default CustomTextarea;
