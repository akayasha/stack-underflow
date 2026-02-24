import Avatar from '../ui/Avatar';
import Button from '../ui/Button';
import { colors, typography } from '../../styles/tokens';

interface NavbarProps {
    user: string;
    onHome: () => void;
    onLogout: () => void;
}

export default function Navbar({ user, onHome, onLogout }: NavbarProps) {
    const handleResetData = () => {
        if (window.confirm('Clear ALL questions and comments? This cannot be undone.')) {
            localStorage.removeItem('su:questions');
            localStorage.removeItem('su:comments');
            window.location.reload();
        }
    };

    return (
        <nav
            style={{
                background: colors.bg1,
                borderBottom: `1px solid ${colors.border0}`,
                padding: '0 24px',
                height: 52,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                position: 'sticky',
                top: 0,
                zIndex: 100,
            }}
        >
            {/* Logo */}
            <div
                onClick={onHome}
                style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}
            >
                <span style={{ fontSize: 20 }}>⚡</span>
                <span style={{ fontWeight: typography.weights.black, fontSize: typography.sizes.lg }}>
          Stack<span style={{ color: colors.green }}>Underflow</span>
        </span>
                <span
                    style={{
                        background: colors.greenBg,
                        border: `1px solid ${colors.greenBorder}`,
                        color: colors.green,
                        fontSize: 10,
                        padding: '1px 6px',
                        borderRadius: 4,
                    }}
                >
          beta
        </span>
            </div>

            {/* User actions */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Avatar name={user} size={26} />
                    <span style={{ color: colors.textMuted, fontSize: typography.sizes.sm }}>@{user}</span>
                </div>

                {/* Reset data — subtle, tucked away */}
                <button
                    onClick={handleResetData}
                    title="Reset all data"
                    style={{
                        background: 'none',
                        border: `1px solid transparent`,
                        color: colors.textDim,
                        cursor: 'pointer',
                        fontFamily: typography.fontMono,
                        fontSize: typography.sizes.xs,
                        padding: '4px 8px',
                        borderRadius: 6,
                        transition: 'all 0.15s',
                    }}
                    onMouseEnter={(e) => {
                        (e.currentTarget as HTMLButtonElement).style.borderColor = '#ff5f5766';
                        (e.currentTarget as HTMLButtonElement).style.color = '#ff5f57';
                    }}
                    onMouseLeave={(e) => {
                        (e.currentTarget as HTMLButtonElement).style.borderColor = 'transparent';
                        (e.currentTarget as HTMLButtonElement).style.color = colors.textDim;
                    }}
                >
                    reset data
                </button>

                <Button variant="secondary" onClick={onLogout} style={{ padding: '5px 12px', fontSize: typography.sizes.sm }}>
                    logout
                </Button>
            </div>
        </nav>
    );
}