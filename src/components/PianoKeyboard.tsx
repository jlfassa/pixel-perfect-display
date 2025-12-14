import { cn } from '@/lib/utils';

interface PianoKeyboardProps {
  highlightedNotes?: string[];
  startOctave?: number;
  octaves?: number;
  onNoteClick?: (note: string) => void;
}

const WHITE_KEYS = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
const BLACK_KEYS = ['C#', 'D#', null, 'F#', 'G#', 'A#', null];

export function PianoKeyboard({
  highlightedNotes = [],
  startOctave = 4,
  octaves = 2,
  onNoteClick,
}: PianoKeyboardProps) {
  const isHighlighted = (note: string) => {
    return highlightedNotes.some(
      (n) => n === note || n === note.replace('#', 'b')
    );
  };

  const getHighlightColor = (note: string) => {
    const index = highlightedNotes.findIndex(
      (n) => n === note || n === note.replace('#', 'b')
    );
    if (index === 0) return 'bg-primary';
    return 'bg-accent';
  };

  return (
    <div className="relative flex">
      {Array.from({ length: octaves }).map((_, octaveOffset) => (
        <div key={octaveOffset} className="relative flex">
          {/* White keys */}
          {WHITE_KEYS.map((note, index) => {
            const fullNote = note;
            const highlighted = isHighlighted(fullNote);

            return (
              <button
                key={`${octaveOffset}-${note}`}
                onClick={() => onNoteClick?.(fullNote)}
                className={cn(
                  'relative w-10 h-32 border border-border rounded-b-lg transition-all duration-150',
                  highlighted
                    ? cn(getHighlightColor(fullNote), 'text-primary-foreground')
                    : 'bg-foreground text-background hover:bg-muted'
                )}
              >
                <span className="absolute bottom-2 left-1/2 -translate-x-1/2 text-xs font-mono">
                  {highlighted ? fullNote : ''}
                </span>
              </button>
            );
          })}

          {/* Black keys */}
          {BLACK_KEYS.map((note, index) => {
            if (!note) return null;

            const fullNote = note;
            const highlighted = isHighlighted(fullNote);

            // Position black keys
            const leftOffset = {
              0: 26, // C#
              1: 66, // D#
              3: 146, // F#
              4: 186, // G#
              5: 226, // A#
            }[index];

            if (leftOffset === undefined) return null;

            return (
              <button
                key={`${octaveOffset}-${note}`}
                onClick={() => onNoteClick?.(fullNote)}
                className={cn(
                  'absolute top-0 w-6 h-20 rounded-b-md z-10 transition-all duration-150',
                  highlighted
                    ? cn(getHighlightColor(fullNote), 'text-primary-foreground')
                    : 'bg-background text-foreground hover:bg-muted border border-border'
                )}
                style={{ left: `${leftOffset + octaveOffset * 280}px` }}
              >
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 text-[10px] font-mono">
                  {highlighted ? fullNote : ''}
                </span>
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
}
