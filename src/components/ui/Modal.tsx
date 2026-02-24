import type { ReactNode } from 'react';
import { colors, radii, typography } from '../../styles/tokens';
import { windowChrome } from '../../styles/common';

// ── MacOS traffic-light dots ─────────────────────────────────────

function TrafficLights() {
    return (
        <div style={{ display: 'flex', gap: 8 }}>
            {[colors.danger, colors.warning, colors.success].map((bg) => (
                <span key={bg} style={{ width: 12, height: 12, borderRadius: '50%', background: bg, display: 'inline-block' }} />
            ))}
        </div>
    );
}

// ── Modal ────────────────────────────────────────────────────────

interface ModalProps {
    title: string;
    onClose: () => void;
    children: ReactNode;
}

export default function Modal({ title, onClose, children }: ModalProps) {
    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) onClose();
    };

    return (
        <div
            onClick={handleBackdropClick}
            style={{
                position: 'fixed',
                inset: 0,
                background: 'rgba(0,0,0,0.75)',
                backdropFilter: 'blur(4px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 1000,
                padding: 20,
            }}
        >
            <div
                className="animate-fade-up"
                style={{
                    background: colors.bg1,
                    border: `1px solid ${colors.border1}`,
                    borderRadius: radii['2xl'],
                    width: '100%',
                    maxWidth: 560,
                    overflow: 'hidden',
                    boxShadow: '0 24px 80px rgba(0,0,0,0.6)',
                }}
            >
                {/* Window chrome */}
                <div style={windowChrome}>
                    <TrafficLights />
                    <span style={{ color: colors.textMuted, fontSize: typography.sizes.sm }}>{title}</span>
                    <button
                        onClick={onClose}
                        style={{
                            background: 'none',
                            border: 'none',
                            color: colors.textMuted,
                            cursor: 'pointer',
                            fontSize: 18,
                            lineHeight: 1,
                            padding: '0 2px',
                        }}
                    >
                        ×
                    </button>
                </div>

                <div style={{ padding: 24 }}>{children}</div>
            </div>
        </div>
    );
}