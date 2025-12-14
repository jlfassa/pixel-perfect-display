import { useState } from 'react';
import { cn } from '@/lib/utils';

const MAJOR_KEYS = ['C', 'G', 'D', 'A', 'E', 'B', 'F#', 'Db', 'Ab', 'Eb', 'Bb', 'F'];
const MINOR_KEYS = ['Am', 'Em', 'Bm', 'F#m', 'C#m', 'G#m', 'D#m', 'Bbm', 'Fm', 'Cm', 'Gm', 'Dm'];

interface CircleOfFifthsProps {
  selectedKey?: string;
  onKeySelect?: (key: string) => void;
}

export function CircleOfFifths({ selectedKey, onKeySelect }: CircleOfFifthsProps) {
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);

  const getKeyPosition = (index: number, radius: number) => {
    const angle = (index * 30 - 90) * (Math.PI / 180);
    return {
      x: 150 + radius * Math.cos(angle),
      y: 150 + radius * Math.sin(angle),
    };
  };

  return (
    <div className="relative w-full max-w-[350px] mx-auto aspect-square">
      <svg viewBox="0 0 300 300" className="w-full h-full">
        {/* Outer ring background */}
        <circle
          cx="150"
          cy="150"
          r="140"
          fill="none"
          stroke="hsl(var(--border))"
          strokeWidth="2"
        />
        
        {/* Inner ring background */}
        <circle
          cx="150"
          cy="150"
          r="95"
          fill="none"
          stroke="hsl(var(--border))"
          strokeWidth="2"
        />

        {/* Center circle */}
        <circle
          cx="150"
          cy="150"
          r="50"
          fill="hsl(var(--muted))"
          stroke="hsl(var(--border))"
          strokeWidth="2"
        />
        <text
          x="150"
          y="155"
          textAnchor="middle"
          className="fill-muted-foreground text-xs font-medium"
        >
          Circle of 5ths
        </text>

        {/* Major keys (outer) */}
        {MAJOR_KEYS.map((key, index) => {
          const pos = getKeyPosition(index, 118);
          const isSelected = selectedKey === key;
          const isHovered = hoveredKey === key;

          return (
            <g key={key}>
              <circle
                cx={pos.x}
                cy={pos.y}
                r="20"
                className={cn(
                  'cursor-pointer transition-all duration-200',
                  isSelected
                    ? 'fill-primary stroke-primary'
                    : isHovered
                    ? 'fill-primary/30 stroke-primary'
                    : 'fill-card stroke-border'
                )}
                strokeWidth="2"
                onClick={() => onKeySelect?.(key)}
                onMouseEnter={() => setHoveredKey(key)}
                onMouseLeave={() => setHoveredKey(null)}
              />
              <text
                x={pos.x}
                y={pos.y + 4}
                textAnchor="middle"
                className={cn(
                  'pointer-events-none font-mono text-sm font-medium',
                  isSelected ? 'fill-primary-foreground' : 'fill-foreground'
                )}
              >
                {key}
              </text>
            </g>
          );
        })}

        {/* Minor keys (inner) */}
        {MINOR_KEYS.map((key, index) => {
          const pos = getKeyPosition(index, 73);
          const isSelected = selectedKey === key;
          const isHovered = hoveredKey === key;

          return (
            <g key={key}>
              <circle
                cx={pos.x}
                cy={pos.y}
                r="16"
                className={cn(
                  'cursor-pointer transition-all duration-200',
                  isSelected
                    ? 'fill-chord-minor stroke-chord-minor'
                    : isHovered
                    ? 'fill-chord-minor/30 stroke-chord-minor'
                    : 'fill-card stroke-border'
                )}
                strokeWidth="2"
                onClick={() => onKeySelect?.(key)}
                onMouseEnter={() => setHoveredKey(key)}
                onMouseLeave={() => setHoveredKey(null)}
              />
              <text
                x={pos.x}
                y={pos.y + 4}
                textAnchor="middle"
                className={cn(
                  'pointer-events-none font-mono text-xs font-medium',
                  isSelected ? 'fill-primary-foreground' : 'fill-muted-foreground'
                )}
              >
                {key}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
