import { Mode, getScaleNotes, NOTES } from '@/lib/musicTheory';
import { cn } from '@/lib/utils';

interface ModeCardProps {
  mode: Mode;
  rootNote: string;
  isSelected?: boolean;
  onClick?: () => void;
}

const modeColors: Record<string, string> = {
  ionian: 'bg-mode-ionian/20 border-mode-ionian/50 hover:border-mode-ionian',
  dorian: 'bg-mode-dorian/20 border-mode-dorian/50 hover:border-mode-dorian',
  phrygian: 'bg-mode-phrygian/20 border-mode-phrygian/50 hover:border-mode-phrygian',
  lydian: 'bg-mode-lydian/20 border-mode-lydian/50 hover:border-mode-lydian',
  mixolydian: 'bg-mode-mixolydian/20 border-mode-mixolydian/50 hover:border-mode-mixolydian',
  aeolian: 'bg-mode-aeolian/20 border-mode-aeolian/50 hover:border-mode-aeolian',
  locrian: 'bg-mode-locrian/20 border-mode-locrian/50 hover:border-mode-locrian',
};

const modeBgColors: Record<string, string> = {
  ionian: 'bg-mode-ionian',
  dorian: 'bg-mode-dorian',
  phrygian: 'bg-mode-phrygian',
  lydian: 'bg-mode-lydian',
  mixolydian: 'bg-mode-mixolydian',
  aeolian: 'bg-mode-aeolian',
  locrian: 'bg-mode-locrian',
};

export function ModeCard({ mode, rootNote, isSelected, onClick }: ModeCardProps) {
  const scaleNotes = getScaleNotes(rootNote, mode);

  return (
    <button
      onClick={onClick}
      className={cn(
        'w-full text-left p-5 rounded-xl border-2 transition-all duration-300',
        modeColors[mode.name],
        isSelected && 'ring-2 ring-primary ring-offset-2 ring-offset-background'
      )}
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="text-lg font-semibold text-foreground">{mode.displayName}</h3>
          <p className="text-sm text-muted-foreground font-mono">{mode.pattern}</p>
        </div>
        <span className={cn(
          'px-2 py-1 rounded-md text-xs font-medium text-background',
          modeBgColors[mode.name]
        )}>
          {mode.chordType}
        </span>
      </div>

      <p className="text-sm text-muted-foreground mb-4">{mode.character}</p>

      {/* Scale Notes */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {scaleNotes.map((note, index) => (
          <span
            key={index}
            className={cn(
              'px-2 py-1 rounded-md text-xs font-mono',
              index === 0
                ? cn('text-background', modeBgColors[mode.name])
                : 'bg-muted text-muted-foreground'
            )}
          >
            {note}
          </span>
        ))}
      </div>

      {/* Tensions */}
      <div className="flex items-center gap-2">
        <span className="text-xs text-muted-foreground">Tensions:</span>
        <div className="flex gap-1">
          {mode.tensions.map((tension) => (
            <span
              key={tension}
              className="px-1.5 py-0.5 rounded bg-accent/20 text-accent text-xs font-mono"
            >
              {tension}
            </span>
          ))}
        </div>
      </div>

      {mode.avoidNotes.length > 0 && (
        <div className="flex items-center gap-2 mt-2">
          <span className="text-xs text-muted-foreground">Avoid:</span>
          <div className="flex gap-1">
            {mode.avoidNotes.map((note) => (
              <span
                key={note}
                className="px-1.5 py-0.5 rounded bg-destructive/20 text-destructive text-xs font-mono"
              >
                {note}
              </span>
            ))}
          </div>
        </div>
      )}
    </button>
  );
}
