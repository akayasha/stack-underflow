import type { InputHTMLAttributes, TextareaHTMLAttributes } from 'react';
import { inputBase, fieldLabel } from '../../styles/common';
import { colors, typography } from '../../styles/tokens';

// ── Field wrapper with label ─────────────────────────────────────

interface FieldProps {
    label: string;
    children: React.ReactNode;
}

export function Field({ label, children }: FieldProps) {
    return (
        <div>
            <label style={fieldLabel}>// {label.toUpperCase()}</label>
            {children}
        </div>
    );
}

// ── Input ────────────────────────────────────────────────────────

export function Input(props: InputHTMLAttributes<HTMLInputElement>) {
    return <input style={inputBase} {...props} />;
}

// ── Textarea ─────────────────────────────────────────────────────

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    minHeight?: number;
}

export function Textarea({ minHeight = 80, style, ...rest }: TextareaProps) {
    return (
        <textarea
            style={{ ...inputBase, minHeight, ...style }}
            {...rest}
        />
    );
}

// ── Select ───────────────────────────────────────────────────────

interface SelectProps {
    value: string;
    onChange: (value: string) => void;
    options: { value: string; label: string }[];
}

export function Select({ value, onChange, options }: SelectProps) {
    return (
        <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            style={{
                background: colors.bg3,
                border: `1px solid ${colors.border1}`,
                color: colors.textPrimary,
                borderRadius: 6,
                padding: '4px 8px',
                fontSize: typography.sizes.sm,
                fontFamily: typography.fontMono,
                cursor: 'pointer',
            }}
        >
            {options.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
            ))}
        </select>
    );
}