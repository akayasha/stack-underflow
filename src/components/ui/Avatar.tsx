import { colorFromName } from '../../utils';
import { typography } from '../../styles/tokens';

interface AvatarProps {
    name: string;
    size?: number;
}

export default function Avatar({ name, size = 28 }: AvatarProps) {
    const color = colorFromName(name);
    return (
        <span
            style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: size,
                height: size,
                borderRadius: '50%',
                background: `${color}22`,
                border: `1.5px solid ${color}55`,
                color,
                fontSize: size * 0.4,
                fontWeight: typography.weights.black,
                fontFamily: typography.fontMono,
                flexShrink: 0,
            }}
        >
      {name[0].toUpperCase()}
    </span>
    );
}