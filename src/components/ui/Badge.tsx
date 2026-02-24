import type { Status } from '../../types';
import { colors, typography, radii } from '../../styles/tokens';

const STATUS_CONFIG: Record<Status, { label: string; fg: string; bg: string; border: string }> = {
    open:     { label: '● open',     ...colors.statusOpen },
    answered: { label: '✓ answered', ...colors.statusAnswered },
    closed:   { label: '✕ closed',   ...colors.statusClosed },
};

interface BadgeProps {
    status: Status;
}

export default function StatusBadge({ status }: BadgeProps) {
    const { label, fg, bg, border } = STATUS_CONFIG[status];
    return (
        <span
            style={{
                background: bg,
                border: `1px solid ${border}`,
                color: fg,
                padding: '2px 10px',
                borderRadius: radii.sm,
                fontSize: typography.sizes.xs,
                fontFamily: typography.fontMono,
                fontWeight: typography.weights.bold,
                letterSpacing: '0.05em',
                whiteSpace: 'nowrap',
            }}
        >
      {label}
    </span>
    );
}