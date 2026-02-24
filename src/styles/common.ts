import type { CSSProperties } from 'react';
import { colors, typography, radii, transitions } from './tokens';

/** ─────────────────────────────────────────────────────────────────
 *  Reusable style objects & factories
 *  Import these instead of repeating inline styles.
 * ───────────────────────────────────────────────────────────────── */

// ── Base primitives ──────────────────────────────────────────────

export const fontMono: CSSProperties = {
    fontFamily: typography.fontMono,
};

export const card: CSSProperties = {
    background: colors.bg1,
    border: `1px solid ${colors.border0}`,
    borderRadius: radii.xl,
    transition: transitions.fast,
};

export const surfaceRaised: CSSProperties = {
    background: colors.bg2,
    border: `1px solid ${colors.border1}`,
    borderRadius: radii['2xl'],
};

// ── Input ────────────────────────────────────────────────────────

export const inputBase: CSSProperties = {
    width: '100%',
    background: colors.bg0,
    border: `1px solid ${colors.border1}`,
    borderRadius: radii.md,
    color: colors.textPrimary,
    padding: '10px 14px',
    fontSize: typography.sizes.md,
    fontFamily: typography.fontMono,
    outline: 'none',
    boxSizing: 'border-box',
    resize: 'vertical' as const,
    transition: transitions.fast,
};

// ── Buttons ──────────────────────────────────────────────────────

export const btnPrimary: CSSProperties = {
    background: '#238636',
    color: '#fff',
    border: '1px solid #2ea043',
    borderRadius: radii.md,
    padding: '8px 18px',
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.bold,
    cursor: 'pointer',
    fontFamily: typography.fontMono,
    transition: transitions.fast,
    whiteSpace: 'nowrap' as const,
};

export const btnSecondary: CSSProperties = {
    ...btnPrimary,
    background: colors.bg3,
    color: colors.textMuted,
    border: `1px solid ${colors.border1}`,
};

export const btnGhost: CSSProperties = {
    background: 'none',
    border: 'none',
    color: colors.textMuted,
    cursor: 'pointer',
    fontFamily: typography.fontMono,
    fontSize: typography.sizes.sm,
    padding: 0,
    transition: transitions.fast,
};

// ── Labels ───────────────────────────────────────────────────────

export const fieldLabel: CSSProperties = {
    display: 'block',
    color: colors.textMuted,
    fontSize: typography.sizes.xs,
    fontFamily: typography.fontMono,
    marginBottom: 6,
    letterSpacing: '0.08em',
};

// ── Layout helpers ───────────────────────────────────────────────

export const flex = (
    direction: CSSProperties['flexDirection'] = 'row',
    align: CSSProperties['alignItems'] = 'center',
    gap = 8,
): CSSProperties => ({
    display: 'flex',
    flexDirection: direction,
    alignItems: align,
    gap,
});

export const windowChrome: CSSProperties = {
    background: colors.bg2,
    padding: '12px 20px',
    borderBottom: `1px solid ${colors.border0}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
};