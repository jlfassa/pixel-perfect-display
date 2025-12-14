import { useState } from 'react';
import { Layout } from '@/components/Layout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { NoteSelector } from '@/components/NoteSelector';
import { ChordCard } from '@/components/ChordCard';
import { 
  CHORD_TYPES, 
  ChordType, 
  getRelatedScales, 
  getTritoneSubstitution,
  getChordNotes 
} from '@/lib/musicTheory';
import { Search, ArrowRightLeft, Music2, Lightbulb } from 'lucide-react';
import { cn } from '@/lib/utils';

const Analyzer = () => {
  const [selectedRoot, setSelectedRoot] = useState('C');
  const [selectedChordType, setSelectedChordType] = useState<ChordType | null>(null);
  const [progressionInput, setProgressionInput] = useState('');
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);

  const relatedScales = selectedChordType 
    ? getRelatedScales(`${selectedRoot}${selectedChordType.symbol}`)
    : [];

  const tritoneSubstitution = selectedChordType?.quality === 'dominant'
    ? getTritoneSubstitution(`${selectedRoot}${selectedChordType.symbol}`)
    : null;

  const chordNotes = selectedChordType
    ? getChordNotes(selectedRoot, selectedChordType)
    : [];

  const handleAnalyzeProgression = () => {
    if (!progressionInput.trim()) return;
    
    // Simple analysis feedback
    const chords = progressionInput.split(/[\s,|-]+/).filter(Boolean);
    if (chords.length > 0) {
      setAnalysisResult(`Analyzing ${chords.length} chords: ${chords.join(' → ')}`);
    }
  };

  return (
    <Layout>
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Chord <span className="text-gradient">Analyzer</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Analyze chords, discover related scales, find substitutions, and explore tensions.
            </p>
          </div>

          {/* Progression Analyzer */}
          <div className="glass-card p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Search className="h-5 w-5 text-primary" />
              Analyze Progression
            </h2>
            <div className="flex gap-3">
              <Input
                placeholder="Enter chords: Dm7 G7 CMaj7 or ii-V-I..."
                value={progressionInput}
                onChange={(e) => setProgressionInput(e.target.value)}
                className="flex-1 font-mono"
              />
              <Button onClick={handleAnalyzeProgression}>
                Analyze
              </Button>
            </div>
            {analysisResult && (
              <div className="mt-4 p-4 rounded-lg bg-muted/50">
                <p className="text-sm text-muted-foreground">{analysisResult}</p>
              </div>
            )}
          </div>

          {/* Root Note Selection */}
          <div className="glass-card p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Select Root Note</h2>
            <NoteSelector
              selectedNote={selectedRoot}
              onSelect={setSelectedRoot}
            />
          </div>

          {/* Chord Type Selection */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Select Chord Type</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {CHORD_TYPES.map((chordType) => (
                <div
                  key={chordType.symbol}
                  className={cn(
                    'cursor-pointer transition-all duration-200',
                    selectedChordType?.symbol === chordType.symbol && 'ring-2 ring-primary ring-offset-2 ring-offset-background rounded-xl'
                  )}
                  onClick={() => setSelectedChordType(chordType)}
                >
                  <ChordCard
                    chordType={chordType}
                    rootNote={selectedRoot}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Selected Chord Analysis */}
          {selectedChordType && (
            <div className="space-y-6">
              {/* Chord Details */}
              <div className="glass-card p-6">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <Music2 className="h-6 w-6 text-primary" />
                  {selectedRoot}{selectedChordType.symbol}
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Chord Notes */}
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-3">Chord Tones</h3>
                    <div className="flex flex-wrap gap-2">
                      {chordNotes.map((note, index) => {
                        const intervalNames = ['Root', '3rd', '5th', '7th', '9th', '11th', '13th'];
                        return (
                          <div key={index} className="text-center">
                            <div className="w-12 h-12 rounded-lg bg-primary/20 border border-primary/50 flex items-center justify-center font-mono font-bold">
                              {note}
                            </div>
                            <span className="text-xs text-muted-foreground mt-1 block">
                              {intervalNames[index] || `${index + 1}th`}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Available Tensions */}
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-3">Available Tensions</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedChordType.tensions.map((tension) => (
                        <span
                          key={tension}
                          className="px-3 py-2 rounded-lg bg-accent/20 text-accent font-mono font-medium"
                        >
                          {tension}
                        </span>
                      ))}
                      {selectedChordType.tensions.length === 0 && (
                        <span className="text-muted-foreground text-sm">No additional tensions</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Related Scales */}
              {relatedScales.length > 0 && (
                <div className="glass-card p-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Lightbulb className="h-5 w-5 text-accent" />
                    Related Scales
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {relatedScales.map((scale, index) => (
                      <div
                        key={index}
                        className="p-4 rounded-lg bg-muted/50 border border-border/50"
                      >
                        <div className="font-mono font-medium mb-2">{scale.scale}</div>
                        <p className="text-sm text-muted-foreground">{scale.mode.character}</p>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {scale.mode.tensions.map((t) => (
                            <span key={t} className="text-xs px-1.5 py-0.5 bg-accent/20 text-accent rounded">
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tritone Substitution */}
              {tritoneSubstitution && (
                <div className="glass-card p-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <ArrowRightLeft className="h-5 w-5 text-chord-dominant" />
                    Tritone Substitution
                  </h3>
                  <div className="flex items-center gap-4">
                    <div className="p-4 rounded-lg bg-chord-dominant/20 border-2 border-chord-dominant/50">
                      <div className="font-mono text-xl font-bold">{selectedRoot}{selectedChordType.symbol}</div>
                      <div className="text-sm text-muted-foreground">Original</div>
                    </div>
                    <ArrowRightLeft className="h-6 w-6 text-muted-foreground" />
                    <div className="p-4 rounded-lg bg-chord-augmented/20 border-2 border-chord-augmented/50">
                      <div className="font-mono text-xl font-bold">{tritoneSubstitution}</div>
                      <div className="text-sm text-muted-foreground">Substitution</div>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-4">
                    The tritone substitution shares the same tritone (3rd and 7th become 7th and 3rd), 
                    creating smooth voice leading.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Analyzer;
