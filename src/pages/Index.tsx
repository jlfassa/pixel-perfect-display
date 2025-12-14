import { useState } from 'react';
import { Layout } from '@/components/Layout';
import { NoteSelector } from '@/components/NoteSelector';
import { ModeCard } from '@/components/ModeCard';
import { CircleOfFifths } from '@/components/CircleOfFifths';
import { PianoKeyboard } from '@/components/PianoKeyboard';
import { MODES, getScaleNotes, getDiatonicChords, getSecondaryDominants, Mode } from '@/lib/musicTheory';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Music, Layers, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

const Index = () => {
  const [selectedRoot, setSelectedRoot] = useState('C');
  const [selectedMode, setSelectedMode] = useState<Mode>(MODES[0]);
  const [selectedKey, setSelectedKey] = useState('C');

  const scaleNotes = getScaleNotes(selectedRoot, selectedMode);
  const diatonicChords = getDiatonicChords(selectedKey);
  const secondaryDominants = getSecondaryDominants(selectedKey);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-border/50">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl opacity-50" />
        
        <div className="container relative mx-auto px-4 py-16 md:py-24">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
              Master <span className="text-gradient">Music Theory</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              Explore modes, analyze chords, and understand harmony with interactive tools designed for musicians.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-4 py-12">
        <Tabs defaultValue="modes" className="space-y-8">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 bg-muted/50">
            <TabsTrigger value="modes" className="flex items-center gap-2">
              <Layers className="h-4 w-4" />
              <span className="hidden sm:inline">Modes</span>
            </TabsTrigger>
            <TabsTrigger value="harmony" className="flex items-center gap-2">
              <Music className="h-4 w-4" />
              <span className="hidden sm:inline">Harmony</span>
            </TabsTrigger>
            <TabsTrigger value="circle" className="flex items-center gap-2">
              <Zap className="h-4 w-4" />
              <span className="hidden sm:inline">Circle</span>
            </TabsTrigger>
          </TabsList>

          {/* Modes Tab */}
          <TabsContent value="modes" className="space-y-8">
            <div className="glass-card p-6">
              <h2 className="text-xl font-semibold mb-4">Select Root Note</h2>
              <NoteSelector
                selectedNote={selectedRoot}
                onSelect={setSelectedRoot}
              />
            </div>

            {/* Piano Visualization */}
            <div className="glass-card p-6 overflow-x-auto">
              <h2 className="text-xl font-semibold mb-4">
                {selectedRoot} {selectedMode.displayName}
              </h2>
              <div className="inline-block">
                <PianoKeyboard
                  highlightedNotes={scaleNotes}
                  octaves={2}
                />
              </div>
            </div>

            {/* Mode Cards Grid */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Greek Modes</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {MODES.map((mode) => (
                  <ModeCard
                    key={mode.name}
                    mode={mode}
                    rootNote={selectedRoot}
                    isSelected={selectedMode.name === mode.name}
                    onClick={() => setSelectedMode(mode)}
                  />
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Harmony Tab */}
          <TabsContent value="harmony" className="space-y-8">
            <div className="glass-card p-6">
              <h2 className="text-xl font-semibold mb-4">Key Center</h2>
              <NoteSelector
                selectedNote={selectedKey}
                onSelect={setSelectedKey}
              />
            </div>

            {/* Diatonic Chords */}
            <div className="glass-card p-6">
              <h2 className="text-xl font-semibold mb-6">
                Diatonic Chords in {selectedKey} Major
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
                {diatonicChords.map((chord, index) => (
                  <div
                    key={index}
                    className={cn(
                      'p-4 rounded-xl border-2 text-center transition-all duration-200',
                      chord.quality === 'major' && 'bg-chord-major/20 border-chord-major/50',
                      chord.quality === 'minor' && 'bg-chord-minor/20 border-chord-minor/50',
                      chord.quality === 'dominant' && 'bg-chord-dominant/20 border-chord-dominant/50',
                      chord.quality === 'half-diminished' && 'bg-chord-diminished/20 border-chord-diminished/50'
                    )}
                  >
                    <div className="text-lg font-bold font-mono mb-1">{chord.numeral}</div>
                    <div className="text-sm font-mono text-muted-foreground">{chord.chord}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Secondary Dominants */}
            <div className="glass-card p-6">
              <h2 className="text-xl font-semibold mb-2">Secondary Dominants</h2>
              <p className="text-muted-foreground text-sm mb-6">
                Dominant chords that resolve to diatonic chords other than I
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                {secondaryDominants.map((sd, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-xl bg-chord-dominant/20 border-2 border-chord-dominant/50"
                  >
                    <div className="text-lg font-bold font-mono text-chord-dominant">
                      V7/{sd.target}
                    </div>
                    <div className="text-sm font-mono text-muted-foreground mt-1">
                      {sd.dominant}
                    </div>
                    <div className="text-xs text-muted-foreground mt-2">
                      → resolves to {sd.target}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Harmonic Functions */}
            <div className="glass-card p-6">
              <h2 className="text-xl font-semibold mb-6">Harmonic Functions</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-5 rounded-xl bg-chord-major/20 border-2 border-chord-major/50">
                  <h3 className="text-lg font-semibold text-chord-major mb-2">Tonic</h3>
                  <p className="text-sm text-muted-foreground mb-3">Resolution, stability, home</p>
                  <div className="flex gap-2">
                    <span className="px-2 py-1 bg-chord-major/30 rounded font-mono text-sm">I</span>
                    <span className="px-2 py-1 bg-chord-major/30 rounded font-mono text-sm">iii</span>
                    <span className="px-2 py-1 bg-chord-major/30 rounded font-mono text-sm">vi</span>
                  </div>
                </div>
                <div className="p-5 rounded-xl bg-chord-minor/20 border-2 border-chord-minor/50">
                  <h3 className="text-lg font-semibold text-chord-minor mb-2">Subdominant</h3>
                  <p className="text-sm text-muted-foreground mb-3">Motion, preparation</p>
                  <div className="flex gap-2">
                    <span className="px-2 py-1 bg-chord-minor/30 rounded font-mono text-sm">IV</span>
                    <span className="px-2 py-1 bg-chord-minor/30 rounded font-mono text-sm">ii</span>
                  </div>
                </div>
                <div className="p-5 rounded-xl bg-chord-dominant/20 border-2 border-chord-dominant/50">
                  <h3 className="text-lg font-semibold text-chord-dominant mb-2">Dominant</h3>
                  <p className="text-sm text-muted-foreground mb-3">Tension, needs resolution</p>
                  <div className="flex gap-2">
                    <span className="px-2 py-1 bg-chord-dominant/30 rounded font-mono text-sm">V</span>
                    <span className="px-2 py-1 bg-chord-dominant/30 rounded font-mono text-sm">vii°</span>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Circle of Fifths Tab */}
          <TabsContent value="circle" className="space-y-8">
            <div className="glass-card p-6">
              <h2 className="text-xl font-semibold mb-6 text-center">Circle of Fifths</h2>
              <CircleOfFifths
                selectedKey={selectedKey}
                onKeySelect={setSelectedKey}
              />
              <p className="text-center text-muted-foreground mt-6 text-sm max-w-md mx-auto">
                Click on any key to explore its diatonic chords and relationships. 
                The outer ring shows major keys, the inner ring shows relative minors.
              </p>
            </div>

            {selectedKey && (
              <div className="glass-card p-6">
                <h3 className="text-lg font-semibold mb-4">
                  Selected: {selectedKey}
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-4 rounded-lg bg-muted/50">
                    <div className="text-sm text-muted-foreground">Relative Minor</div>
                    <div className="text-xl font-mono font-bold">
                      {selectedKey.includes('m') ? selectedKey : `${selectedKey}m`}
                    </div>
                  </div>
                  <div className="p-4 rounded-lg bg-muted/50">
                    <div className="text-sm text-muted-foreground">Perfect 5th Up</div>
                    <div className="text-xl font-mono font-bold">G</div>
                  </div>
                  <div className="p-4 rounded-lg bg-muted/50">
                    <div className="text-sm text-muted-foreground">Perfect 5th Down</div>
                    <div className="text-xl font-mono font-bold">F</div>
                  </div>
                  <div className="p-4 rounded-lg bg-muted/50">
                    <div className="text-sm text-muted-foreground">Parallel Minor</div>
                    <div className="text-xl font-mono font-bold">{selectedKey}m</div>
                  </div>
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </section>
    </Layout>
  );
};

export default Index;
