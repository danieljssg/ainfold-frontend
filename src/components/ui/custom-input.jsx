"use client";

import React, {
  useState,
  forwardRef,
  useId,
  useEffect,
  useRef,
  useImperativeHandle,
} from "react";
import { cn } from "@/lib/utils";
import { MdVisibility, MdVisibilityOff, MdClear } from "react-icons/md";

/**
 * CustomInput — Input con "floating label" inspirado en el diseño de CustomSelect.
 *
 * Soporta todas las propiedades tradicionales de un input (name, id, value, defaultValue, readOnly, disabled, inputMode, etc.)
 *
 * Props extra:
 * - showClear: (boolean) muestra un botón para limpiar el texto (solo si hay contenido).
 * - hidePasswordToggle: (boolean) si es type="password", permite ocultar el botón de ojo.
 */
const CustomInput = forwardRef(
  (
    {
      label,
      placeholder,
      className = "",
      id,
      name,
      value,
      defaultValue,
      disabled = false,
      readOnly = false,
      helperText = "",
      onFocus,
      onBlur,
      onChange,
      type = "text",
      showClear = false,
      hidePasswordToggle = false,
      icon,
      size = "xs",
      ...props
    },
    ref,
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const [internalValue, setInternalValue] = useState(
      value ?? defaultValue ?? "",
    );
    const [showPassword, setShowPassword] = useState(false);

    const internalRef = useRef(null);
    useImperativeHandle(ref, () => internalRef.current);

    const generatedId = useId();
    const inputId = id ?? generatedId;

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
      setInternalValue("");
      if (internalRef.current) {
        internalRef.current.value = "";
        internalRef.current.focus();

        // Disparar un evento de cambio manual para que los formularios de React/formik reaccionen
        const event = {
          target: internalRef.current,
          currentTarget: internalRef.current,
        };
        if (onChange) onChange(event);
      }
    };

    const togglePassword = () => {
      setShowPassword((prev) => !prev);
    };

    const hasContent =
      internalValue !== "" &&
      internalValue !== null &&
      internalValue !== undefined;
    const isFloating = isFocused || hasContent;

    // Determinar el tipo final del input
    const isPasswordField = type === "password";
    const finalType = isPasswordField && showPassword ? "text" : type;

    // Mostrar botón de limpiar solo si hay texto y no es password (o si el usuario lo pide explícitamente)
    // El usuario dijo "para el resto", lo cual interpretamos normalmente como no-password.
    const displayClear = showClear && hasContent && !disabled && !readOnly;
    const displayPasswordToggle =
      isPasswordField && !hidePasswordToggle && !disabled;

    // Definición de tamaños
    const sizes = {
      xs: {
        height: "h-10",
        px: "px-4",
        pt: "pt-2.5",
        text: "text-xs",
        labelXs: "text-[10px]",
        labelSm: "text-xs",
        translate: "-translate-y-2",
      },
      sm: {
        height: "h-12",
        px: "px-5",
        pt: "pt-3",
        text: "text-[13px]",
        labelXs: "text-[10px]",
        labelSm: "text-[13px]",
        translate: "-translate-y-2.5",
      },
      md: {
        height: "h-14",
        px: "px-5",
        pt: "pt-4",
        text: "text-sm",
        labelXs: "text-[11px]",
        labelSm: "text-sm",
        translate: "-translate-y-3",
      },
      lg: {
        height: "h-16",
        px: "px-6",
        pt: "pt-4",
        text: "text-base",
        labelXs: "text-[12px]",
        labelSm: "text-base",
        translate: "-translate-y-3.5",
      },
    };

    const currentSize = sizes[size] || sizes.sm;

    return (
      <div className={cn("relative w-full", className)}>
        <div className="relative flex items-center w-full">
          {/* Icono a la izquierda */}
          {icon && (
            <div
              className={cn(
                "absolute left-4 text-muted-foreground z-10 pointer-events-none",
                size === "xs" && "left-3",
              )}
            >
              {React.cloneElement(icon, {
                size: size === "xs" ? 14 : size === "sm" ? 16 : 18,
              })}
            </div>
          )}

          <input
            {...props}
            ref={internalRef}
            id={inputId}
            name={name}
            type={finalType}
            value={value}
            defaultValue={defaultValue}
            disabled={disabled}
            readOnly={readOnly}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleChange}
            placeholder=" "
            className={cn(
              "w-full font-medium transition-all duration-200 rounded-full",
              currentSize.height,
              currentSize.px,
              currentSize.pt,
              currentSize.text,
              "bg-input/20 dark:bg-input/10 border border-input text-foreground outline-none",
              "hover:border-ring/50 focus:border-ring focus:ring-2 focus:ring-ring/30 focus-visible:ring-0",
              isFocused && "border-ring ring-2 ring-ring/30",
              icon &&
                (size === "xs" ? "pl-9" : size === "sm" ? "pl-11" : "pl-12"),
              (displayClear || displayPasswordToggle) && "pr-12",
              displayClear && displayPasswordToggle && "pr-20",
              disabled && "opacity-50 cursor-not-allowed grayscale",
              readOnly && "cursor-default",
            )}
          />

          <label
            htmlFor={inputId}
            className={cn(
              "absolute transition-all duration-200 pointer-events-none select-none",
              currentSize.px.replace("px-", "left-"), // Dynamic left padding
              icon &&
                (size === "xs"
                  ? "left-9"
                  : size === "sm"
                    ? "left-11"
                    : "left-12"),
              isFloating
                ? cn(
                    currentSize.labelXs,
                    "font-medium text-primary-foreground",
                    currentSize.translate,
                  )
                : cn(
                    currentSize.labelSm,
                    "text-muted-foreground translate-y-0",
                  ),
            )}
          >
            {label ?? placeholder}
          </label>

          {/* Iconos de acción */}
          <div className="absolute right-4 flex items-center gap-1">
            {displayClear && (
              <button
                type="button"
                onClick={handleClear}
                className="p-1.5 text-muted-foreground hover:text-foreground transition-colors rounded-full hover:bg-black/5"
                tabIndex={-1}
                aria-label="Limpiar campo"
              >
                <MdClear
                  className={cn(size === "xs" ? "w-4 h-4" : "w-5 h-5")}
                />
              </button>
            )}

            {displayPasswordToggle && (
              <button
                type="button"
                onClick={togglePassword}
                className="p-1.5 text-muted-foreground hover:text-foreground transition-colors rounded-full hover:bg-black/5"
                tabIndex={-1}
                aria-label={
                  showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
                }
              >
                {showPassword ? (
                  <MdVisibilityOff
                    className={cn(size === "xs" ? "w-4 h-4" : "w-5 h-5")}
                  />
                ) : (
                  <MdVisibility
                    className={cn(size === "xs" ? "w-4 h-4" : "w-5 h-5")}
                  />
                )}
              </button>
            )}
          </div>
        </div>

        {helperText && (
          <span
            className={cn(
              "mt-1 ml-4 block text-muted-foreground",
              size === "xs" ? "text-[10px]" : "text-[11px]",
            )}
          >
            {helperText}
          </span>
        )}
      </div>
    );
  },
);

CustomInput.displayName = "CustomInput";

export default CustomInput;
