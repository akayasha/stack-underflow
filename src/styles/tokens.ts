/** ─────────────────────────────────────────────────────────────────
 *  Design Tokens
 *  All visual constants live here. Update once, applies everywhere.
 * ───────────────────────────────────────────────────────────────── */

export const colors = {
    // Backgrounds (darkest → lightest)
    bg0: '#010409',
    bg1: '#0d1117',
    bg2: '#161b22',
    bg3: '#21262d',

    // Borders
    border0: '#21262d',
    border1: '#30363d',

    // Text
    textPrimary:   '#e6edf3',
    textSecondary: '#c9d1d9',
    textMuted:     '#8b949e',
    textDim:       '#484f58',

    // Accents
    green:   '#00ff88',
    greenBg: '#00ff8818',
    greenBorder: '#00ff8833',

    blue:   '#58a6ff',
    blueBg: '#58a6ff18',
    blueBorder: '#58a6ff33',

    // Status
    statusOpen:     { fg: '#00ff88', bg: '#00ff8818', border: '#00ff8855' },
    statusAnswered: { fg: '#00d4ff', bg: '#00d4ff18', border: '#00d4ff55' },
    statusClosed:   { fg: '#8b949e', bg: '#ffffff10', border: '#ffffff25' },

    // Semantic
    danger:  '#ff5f57',
    warning: '#febc2e',
    success: '#28c840',
} as const;

export const typography = {
    fontMono: "'JetBrains Mono', 'Fira Code', 'Courier New', monospace",
    sizes: {
        xs:   11,
        sm:   12,
        base: 13,
        md:   14,
        lg:   15,
        xl:   18,
        '2xl': 22,
        '3xl': 26,
    },
    weights: {
        normal: 400,
        bold:   700,
        black:  800,
    },
} as const;

export const radii = {
    sm: 4,
    md: 6,
    lg: 8,
    xl: 10,
    '2xl': 12,
} as const;

export const spacing = {
    1:  4,
    2:  8,
    3: 12,
    4: 16,
    5: 20,
    6: 24,
    7: 28,
    8: 32,
} as const;

export const transitions = {
    fast: 'all 0.15s ease',
} as const;