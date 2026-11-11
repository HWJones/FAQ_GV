/* Search evaluation set: query -> ids that should appear in the top results.
 * Use it to compare the local provider with any future semantic provider
 * (node tests/search-eval.js). Add real, anonymised student queries as they are collected. */
module.exports = [
  // intended behaviour examples from the project brief
  { q: 'Why does the beam twist when I move the force?', expect: ['shear-centre'] },
  { q: 'When can I ignore the thickness in calculations?', expect: ['thin-wall', 'torsion-constant-midline'] },
  { q: "I don't understand which parts of the structure carry the load", expect: ['boom-idealisation'] },
  // learning-difficulty phrasing
  { q: "I don't understand why the beam twists", expect: ['shear-centre'] },
  { q: 'why only the booms and not the panels', expect: ['boom-idealisation'] },
  { q: 'does it matter where I cut the section', expect: ['boom-idealisation', 'material-passed-dx', 'symmetry-of-shear-flow'] },
  { q: 'my Ix is different from the solution', expect: ['thin-wall', 'tutorial-solution-checks'] },
  { q: 'which area do I use for 2Aq0', expect: ['enclosed-area'] },
  { q: 'why is my sign wrong in the moment equation', expect: ['signs-in-torsional-equivalence', 'tutorial-solution-checks'] },
  { q: 'I cant picture what warping looks like', expect: ['warping-and-constraint'] },
  { q: 'which booms have I passed when calculating Dx', expect: ['material-passed-dx'] },
  { q: 'is the unit load applied at the shear centre', expect: ['unit-load-and-torque'] },
  { q: 'why are the cross terms zero in virtual work', expect: ['virtual-work-cross-terms'] },
  { q: 'why do two cells have the same shear flow', expect: ['multicell-symmetry'] },
  { q: 'does max shear stress occur in the thickest wall', expect: ['multicell-torsion'] },
  { q: 'when does the 1/3 base times height shortcut work', expect: ['resultants-of-shear-flow'] },
  { q: 'how do I find q0', expect: ['two-ways-to-find-q0', 'enclosed-area', 'torque-resultant-of-shear-flow'] },
  { q: 'shear force upwards on one face and downwards on the other', expect: ['faces-and-arrows'] },
  // terminology and synonyms
  { q: 'shear centre', expect: ['shear-centre', 'two-ways-to-find-q0'] },
  { q: 'flexural centre', expect: ['shear-centre', 'two-ways-to-find-q0'] },
  { q: 'moment of inertia thin walled', expect: ['thin-wall'] },
  { q: 'are principal axes the same as centroidal axes', expect: ['principal-axes'] },
  { q: 'subtract the corners for J', expect: ['torsion-constant-midline'] },
  { q: 'tapered beam boom forces', expect: ['tapered-beam-boom-forces'] },
  { q: 'y coordinate along an angled wall', expect: ['inclined-walls'] },
  { q: 'idealisation when there is torsion', expect: ['idealisation-bending-shear-torsion'] },
  // module information
  { q: 'is topic 9 examinable', expect: ['whats-examinable'] },
  { q: 'do I need to know the derivations', expect: ['derivations-in-exam'] },
  { q: 'should I leave q as Fy/Ix', expect: ['presenting-shear-flow-answers'] },
  // misspellings
  { q: 'sheer centre', expect: ['shear-centre', 'two-ways-to-find-q0'] },
  { q: 'thin wall aproximation', expect: ['thin-wall', 'torsion-constant-midline'] },
  { q: 'boom idealisaton', expect: ['boom-idealisation'] },
  { q: 'principle axes', expect: ['principal-axes'] },
  { q: 'warpping', expect: ['warping-and-constraint'] },
  { q: 'torsional equivelance sign', expect: ['signs-in-torsional-equivalence'] },
  // difficulty-only description
  { q: 'I keep getting the sign wrong', expectCount: 4 }
];
