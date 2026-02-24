/** Returns a human-readable relative time string, e.g. "3h ago" */
export function timeAgo(iso: string): string {
    const diff = Date.now() - new Date(iso).getTime();
    const m = Math.floor(diff / 60000);
    if (m < 1) return 'just now';
    if (m < 60) return `${m}m ago`;
    const h = Math.floor(m / 60);
    if (h < 24) return `${h}h ago`;
    return `${Math.floor(h / 24)}d ago`;
}

/** Generates a consistent color from a name string */
export function colorFromName(name: string): string {
    const palette = [
        '#00ff88', '#00d4ff', '#ff6b35', '#a78bfa',
        '#f59e0b', '#ec4899', '#10b981', '#3b82f6',
    ];
    return palette[name.charCodeAt(0) % palette.length];
}

/** Creates a unique ID string */
export function uid(): string {
    return Date.now().toString();
}