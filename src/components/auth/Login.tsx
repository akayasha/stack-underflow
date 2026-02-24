import { useState } from 'react';
import Button from '../ui/Button';
import { Field, Input } from '../ui/Input';
import { colors, typography } from '../../styles/tokens';

interface LoginProps {
    onLogin: (username: string) => void;
}

export default function Login({ onLogin }: LoginProps) {
    const [user, setUser] = useState('');
    const [pw, setPw]     = useState('');
    const [shake, setShake] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!user.trim()) {
            setShake(true);
            setTimeout(() => setShake(false), 500);
            return;
        }
        onLogin(user.trim());
    };

    return (
        <div
            style={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: colors.bg0,
                padding: 20,
            }}
        >
            <div className="animate-fade-up" style={{ width: '100%', maxWidth: 400 }}>
                {/* Logo */}
                <div style={{ textAlign: 'center', marginBottom: 32 }}>
                    <div style={{ fontSize: 40, marginBottom: 8 }}>⚡</div>
                    <h1 style={{ color: colors.textPrimary, fontSize: typography.sizes['3xl'], fontWeight: typography.weights.black, margin: 0, letterSpacing: '-0.03em' }}>
                        Stack<span style={{ color: colors.green }}>Underflow</span>
                    </h1>
                    <p style={{ color: colors.textMuted, fontSize: typography.sizes.base, marginTop: 6 }}>
                        where bugs come to be validated
                    </p>
                </div>

                {/* Form card */}
                <form
                    onSubmit={handleSubmit}
                    className={shake ? 'animate-shake' : ''}
                    style={{
                        background: colors.bg1,
                        border: `1px solid ${colors.border1}`,
                        borderRadius: 12,
                        padding: 28,
                    }}
                >
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 24 }}>
                        <Field label="username">
                            <Input value={user} onChange={(e) => setUser(e.target.value)} placeholder="your_username" autoFocus />
                        </Field>
                        <Field label="password (decorative)">
                            <Input type="password" value={pw} onChange={(e) => setPw(e.target.value)} placeholder="••••••••" />
                        </Field>
                    </div>
                    <Button type="submit" fullWidth style={{ padding: '11px 0', fontSize: typography.sizes.md, letterSpacing: '0.05em' }}>
                        $ ./login.sh
                    </Button>
                </form>

                <p style={{ textAlign: 'center', color: colors.textDim, fontSize: typography.sizes.xs, marginTop: 16, fontFamily: typography.fontMono }}>
                    any username works · no real auth · enjoy
                </p>
            </div>
        </div>
    );
}