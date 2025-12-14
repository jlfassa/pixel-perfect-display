import { useState } from 'react';
import { Layout } from '@/components/Layout';
import { Input } from '@/components/ui/input';
import { MODES, CHORD_TYPES, HARMONIC_FUNCTIONS } from '@/lib/musicTheory';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Search, BookOpen, Music, Layers, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

const Reference = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredModes = MODES.filter(
    (mode) =>
      mode.displayName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mode.character.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredChords = CHORD_TYPES.filter(
    (chord) =>
      chord.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      chord.symbol.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Layout>
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Theory <span className="text-gradient">Reference</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A comprehensive reference for modes, chord types, scales, and harmonic concepts.
            </p>
          </div>

          {/* Search */}
          <div className="glass-card p-4 mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search modes, chords, scales..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Reference Sections */}
          <Accordion type="multiple" defaultValue={['modes', 'chords']} className="space-y-4">
            {/* Modes Section */}
            <AccordionItem value="modes" className="glass-card px-6 border-none">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/20">
                    <Layers className="h-5 w-5 text-primary" />
                  </div>
                  <div className="text-left">
                    <h2 className="text-lg font-semibold">Greek Modes</h2>
                    <p className="text-sm text-muted-foreground">Seven modes derived from the major scale</p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-4">
                <div className="space-y-4">
                  {filteredModes.map((mode) => (
                    <div
                      key={mode.name}
                      className="p-4 rounded-lg bg-muted/30 border border-border/50"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold">{mode.displayName}</h3>
                          <p className="text-sm font-mono text-muted-foreground">{mode.pattern}</p>
                        </div>
                        <span className="px-2 py-1 rounded-md text-xs font-mono bg-muted">
                          {mode.chordType}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{mode.character}</p>
                      <div className="flex flex-wrap gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Tensions: </span>
                          <span className="font-mono text-accent">{mode.tensions.join(', ') || 'None'}</span>
                        </div>
                        {mode.avoidNotes.length > 0 && (
                          <div>
                            <span className="text-muted-foreground">Avoid: </span>
                            <span className="font-mono text-destructive">{mode.avoidNotes.join(', ')}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Chord Types Section */}
            <AccordionItem value="chords" className="glass-card px-6 border-none">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-accent/20">
                    <Music className="h-5 w-5 text-accent" />
                  </div>
                  <div className="text-left">
                    <h2 className="text-lg font-semibold">Chord Types</h2>
                    <p className="text-sm text-muted-foreground">Common chord voicings and their tensions</p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {filteredChords.map((chord) => (
                    <div
                      key={chord.symbol}
                      className={cn(
                        'p-4 rounded-lg border-2',
                        chord.quality === 'major' && 'bg-chord-major/10 border-chord-major/30',
                        chord.quality === 'minor' && 'bg-chord-minor/10 border-chord-minor/30',
                        chord.quality === 'dominant' && 'bg-chord-dominant/10 border-chord-dominant/30',
                        chord.quality === 'diminished' && 'bg-chord-diminished/10 border-chord-diminished/30',
                        chord.quality === 'augmented' && 'bg-chord-augmented/10 border-chord-augmented/30',
                        chord.quality === 'suspended' && 'bg-chord-suspended/10 border-chord-suspended/30',
                        chord.quality === 'half-diminished' && 'bg-chord-diminished/10 border-chord-diminished/30'
                      )}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-mono font-bold text-lg">{chord.symbol}</span>
                        <span className="text-xs capitalize text-muted-foreground">{chord.quality}</span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{chord.name}</p>
                      {chord.tensions.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {chord.tensions.map((t) => (
                            <span key={t} className="text-xs px-1.5 py-0.5 bg-muted rounded font-mono">
                              {t}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Harmonic Functions Section */}
            <AccordionItem value="functions" className="glass-card px-6 border-none">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-chord-dominant/20">
                    <Zap className="h-5 w-5 text-chord-dominant" />
                  </div>
                  <div className="text-left">
                    <h2 className="text-lg font-semibold">Harmonic Functions</h2>
                    <p className="text-sm text-muted-foreground">Tonic, subdominant, and dominant relationships</p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {HARMONIC_FUNCTIONS.map((func) => (
                    <div
                      key={func.name}
                      className={cn(
                        'p-5 rounded-lg border-2',
                        func.name === 'Tonic' && 'bg-chord-major/20 border-chord-major/50',
                        func.name === 'Subdominant' && 'bg-chord-minor/20 border-chord-minor/50',
                        func.name === 'Dominant' && 'bg-chord-dominant/20 border-chord-dominant/50'
                      )}
                    >
                      <h3 className="text-lg font-semibold mb-2">{func.name}</h3>
                      <p className="text-sm text-muted-foreground mb-4">{func.description}</p>
                      <div className="flex gap-2">
                        {func.chords.map((chord) => (
                          <span
                            key={chord}
                            className="px-2 py-1 bg-background/50 rounded font-mono text-sm"
                          >
                            {chord}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Concepts Section */}
            <AccordionItem value="concepts" className="glass-card px-6 border-none">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-muted">
                    <BookOpen className="h-5 w-5 text-foreground" />
                  </div>
                  <div className="text-left">
                    <h2 className="text-lg font-semibold">Key Concepts</h2>
                    <p className="text-sm text-muted-foreground">Important theory concepts explained</p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-4 space-y-6">
                <div className="p-4 rounded-lg bg-muted/30">
                  <h4 className="font-semibold mb-2">Tritone Substitution</h4>
                  <p className="text-sm text-muted-foreground">
                    A dominant chord can be replaced by another dominant chord a tritone away. 
                    This works because both chords share the same tritone interval (the 3rd and 7th 
                    of one become the 7th and 3rd of the other), creating smooth voice leading.
                  </p>
                </div>
                
                <div className="p-4 rounded-lg bg-muted/30">
                  <h4 className="font-semibold mb-2">Secondary Dominants</h4>
                  <p className="text-sm text-muted-foreground">
                    A dominant 7th chord that resolves to a chord other than the tonic. 
                    Written as V7/X where X is the target chord. Creates temporary tonicization 
                    and adds chromatic interest to progressions.
                  </p>
                </div>
                
                <div className="p-4 rounded-lg bg-muted/30">
                  <h4 className="font-semibold mb-2">Available Tensions</h4>
                  <p className="text-sm text-muted-foreground">
                    Extensions beyond the 7th that can be added to a chord without creating 
                    dissonance with the chord tones. Tensions add color and complexity while 
                    maintaining the chord{"'"}s function.
                  </p>
                </div>
                
                <div className="p-4 rounded-lg bg-muted/30">
                  <h4 className="font-semibold mb-2">Avoid Notes</h4>
                  <p className="text-sm text-muted-foreground">
                    Scale degrees that create strong dissonance when played against the underlying 
                    chord. These notes should be used as passing tones rather than emphasized or 
                    sustained.
                  </p>
                </div>
                
                <div className="p-4 rounded-lg bg-muted/30">
                  <h4 className="font-semibold mb-2">Modal Interchange</h4>
                  <p className="text-sm text-muted-foreground">
                    Borrowing chords from parallel modes (e.g., using chords from C minor while 
                    in C major). This technique adds color and emotional variety while maintaining 
                    the tonal center.
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>
    </Layout>
  );
};

export default Reference;
