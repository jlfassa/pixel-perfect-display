import { NOTES, NoteName } from '@/lib/musicTheory';
import { cn } from '@/lib/utils';

interface NoteSelectorProps {
  selectedNote: string;
  onSelect: (note: string) => void;
  label?: string;
}

export function NoteSelector({ selectedNote, onSelect, label }: NoteSelectorProps) {
  return (
    <div className="space-y-3">
      {label && (
        <label className="text-sm font-medium text-muted-foreground">{label}</label>
      )}
      <div className="flex flex-wrap gap-2">
        {NOTES.map((note) => (
          <button
            key={note}
            onClick={() => onSelect(note)}
            className={cn(
              'w-10 h-10 rounded-lg font-mono text-sm font-medium transition-all duration-200',
              selectedNote === note
                ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25'
                : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground'
            )}
          >
            {note}
          </button>
        ))}
      </div>
    </div>
  );
}
