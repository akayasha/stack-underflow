import type { CSSProperties, ButtonHTMLAttributes } from 'react';
import { btnPrimary, btnSecondary, btnGhost } from '../../styles/common';

type Variant = 'primary' | 'secondary' | 'ghost';

const VARIANT_STYLES: Record<Variant, CSSProperties> = {
    primary:   btnPrimary,
    secondary: btnSecondary,
    ghost:     btnGhost,
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: Variant;
    fullWidth?: boolean;
}

export default function Button({
                                   variant = 'primary',
                                   fullWidth = false,
                                   style,
                                   children,
                                   ...rest
                               }: ButtonProps) {
    return (
        <button
            style={{
                ...VARIANT_STYLES[variant],
                ...(fullWidth ? { width: '100%' } : {}),
                ...style,
            }}
            {...rest}
        >
            {children}
        </button>
    );
}