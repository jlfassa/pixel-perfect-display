import { ChordType, getChordNotes, ChordQuality } from '@/lib/musicTheory';
import { cn } from '@/lib/utils';

interface ChordCardProps {
  chordType: ChordType;
  rootNote: string;
  onClick?: () => void;
}

const qualityColors: Record<ChordQuality, string> = {
  major: 'bg-chord-major/20 border-chord-major/50 hover:border-chord-major',
  minor: 'bg-chord-minor/20 border-chord-minor/50 hover:border-chord-minor',
  dominant: 'bg-chord-dominant/20 border-chord-dominant/50 hover:border-chord-dominant',
  diminished: 'bg-chord-diminished/20 border-chord-diminished/50 hover:border-chord-diminished',
  augmented: 'bg-chord-augmented/20 border-chord-augmented/50 hover:border-chord-augmented',
  suspended: 'bg-chord-suspended/20 border-chord-suspended/50 hover:border-chord-suspended',
  'half-diminished': 'bg-chord-diminished/20 border-chord-diminished/50 hover:border-chord-diminished',
};

const qualityBgColors: Record<ChordQuality, string> = {
  major: 'bg-chord-major',
  minor: 'bg-chord-minor',
  dominant: 'bg-chord-dominant',
  diminished: 'bg-chord-diminished',
  augmented: 'bg-chord-augmented',
  suspended: 'bg-chord-suspended',
  'half-diminished': 'bg-chord-diminished',
};

export function ChordCard({ chordType, rootNote, onClick }: ChordCardProps) {
  const notes = getChordNotes(rootNote, chordType);

  return (
    <button
      onClick={onClick}
      className={cn(
        'w-full text-left p-4 rounded-xl border-2 transition-all duration-300',
        qualityColors[chordType.quality]
      )}
    >
      <div className="flex items-start justify-between mb-2">
        <div>
          <h3 className="text-xl font-bold font-mono text-foreground">
            {rootNote}{chordType.symbol}
          </h3>
          <p className="text-sm text-muted-foreground">{chordType.name}</p>
        </div>
        <span className={cn(
          'px-2 py-1 rounded-md text-xs font-medium capitalize text-background',
          qualityBgColors[chordType.quality]
        )}>
          {chordType.quality}
        </span>
      </div>

      {/* Chord Notes */}
      <div className="flex flex-wrap gap-1.5 mb-3">
        {notes.map((note, index) => (
          <span
            key={index}
            className={cn(
              'px-2 py-1 rounded-md text-xs font-mono',
              index === 0
                ? cn('text-background', qualityBgColors[chordType.quality])
                : 'bg-muted text-muted-foreground'
            )}
          >
            {note}
          </span>
        ))}
      </div>

      {/* Available Tensions */}
      {chordType.tensions.length > 0 && (
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">Tensions:</span>
          <div className="flex flex-wrap gap-1">
            {chordType.tensions.slice(0, 4).map((tension) => (
              <span
                key={tension}
                className="px-1.5 py-0.5 rounded bg-accent/20 text-accent text-xs font-mono"
              >
                {tension}
              </span>
            ))}
            {chordType.tensions.length > 4 && (
              <span className="text-xs text-muted-foreground">
                +{chordType.tensions.length - 4}
              </span>
            )}
          </div>
        </div>
      )}
    </button>
  );
}
