/*
 * Library taxonomy and search vocabulary.
 * ---------------------------------------
 * The single place to grow the library's structure. Adding a module, topic,
 * concept or synonym here updates navigation, filters, search and recommendations
 * at the same time. No UI code needs to change.
 *
 *  subjects > modules > topics   browse hierarchy. Topics follow the lecture topics that the
 *                                academic refers to in the 2023/24 discussion threads.
 *  difficulties                  learning-difficulty categories, plus the plain-language cues
 *                                students use when they don't know the terminology
 *  types                         interactive resource types
 *  concepts                      terms = terminology and alternative names (search synonyms)
 *                                cues  = everyday descriptions that suggest the concept
 *                                related = neighbouring concepts ("related ideas")
 *
 * Cues are search hints only: they suggest resources, they never diagnose a student.
 */
window.FAQ_TAXONOMY = {
  subjects: [
    { id: 'structures', label: 'Aerospace Structures', modules: [
      { id: 'structures-3', label: 'Structures 3', note: 'From the 2023/24 Lectures & Tutorials discussion board', topics: [
        { id: 'pre', label: 'Section properties (pre-requisites)' },
        { id: 't1', label: 'Topic 1: Torsion of open sections' },
        { id: 't2', label: 'Topic 2: Torsion of closed sections' },
        { id: 't3', label: 'Topic 3: Shear flow and the shear centre' },
        { id: 't4', label: 'Topic 4: Structural idealisation' },
        { id: 't5', label: 'Topic 5: Multi-cell sections' },
        { id: 't6', label: 'Topic 6: Displacements and virtual work' },
        { id: 't7', label: 'Topic 7: Warping' },
        { id: 't8', label: 'Topic 8: Tapered beams' },
        { id: 'info', label: 'Module and exam information' }
      ]}
    ]}
  ],

  difficulties: [
    { id: 'concept', label: 'Understanding a concept', short: 'Understanding why',
      prompt: 'I can follow the steps but don’t understand why',
      cues: ['why', 'understand', 'don t understand', 'dont understand', 'confused', 'confusing', 'make sense', 'what does it mean', 'what is', 'meaning', 'idea behind', 'difference between'] },
    { id: 'equations', label: 'Interpreting equations', short: 'Reading equations',
      prompt: 'An equation, term or symbol doesn’t make sense to me',
      cues: ['equation', 'formula', 'term', 'terms', 'symbol', 'where does', 'come from', 'derive', 'derivation', 'expression', 'subscript', 'integral', 'integrals'] },
    { id: 'visualising', label: 'Visualising physical behaviour', short: 'Picturing what happens',
      prompt: 'I can’t picture what is physically happening',
      cues: ['picture', 'imagine', 'visualise', 'visualize', 'see', 'look like', 'what happens', 'happen', 'deform', 'deflect', 'twist', 'move', 'moving', 'shape', 'real life', 'intuitively', 'physically', 'direction', 'diagram'] },
    { id: 'calculations', label: 'Applying calculations', short: 'Doing the calculation',
      prompt: 'I don’t know which steps to take, or I get a different answer',
      cues: ['calculate', 'calculation', 'work out', 'compute', 'numbers', 'value', 'different value', 'different answer', 'wrong answer', 'steps', 'method', 'solve', 'solution', 'tutorial', 'exercise', 'past paper', 'exam question', 'shortcut', 'quicker'] },
    { id: 'misconceptions', label: 'Checking common misconceptions', short: 'Checking my intuition',
      prompt: 'My intuition says something different from the notes',
      cues: ['i thought', 'should it not', 'shouldn t', 'wouldn t', 'would not', 'intuition', 'intuitively', 'expected', 'surely', 'why not', 'isn t it', 'contradict', 'assumption', 'is it always', 'always'] },
    { id: 'assumptions', label: 'Knowing when assumptions apply', short: 'When to simplify',
      prompt: 'I’m not sure when I’m allowed to simplify or ignore something',
      cues: ['when can i', 'ignore', 'neglect', 'omit', 'leave out', 'assume', 'assumption', 'approximation', 'approximate', 'valid', 'allowed', 'small enough', 'thin enough', 'ok to', 'okay to', 'zero', 'by inspection'] },
    { id: 'signs', label: 'Getting signs and directions right', short: 'Signs and directions',
      prompt: 'I keep getting the sign or the direction wrong',
      cues: ['sign', 'signs', 'minus', 'negative', 'positive', 'direction', 'arrow', 'arrows', 'clockwise', 'anticlockwise', 'upwards', 'downwards', 'which way', 'sign convention'] }
  ],

  types: [
    { id: 'branching', label: 'Branching scenario' },
    { id: 'simulation', label: 'Interactive simulation' },
    { id: 'calculator', label: 'Calculation explorer' },
    { id: 'diagram', label: 'Diagram labelling' },
    { id: 'mcq', label: 'Multiple-choice questions' },
    { id: 'sort', label: 'Sorting statements' },
    { id: 'order', label: 'Ordering a method' },
    { id: 'info', label: 'Quick answer' }
  ],

  concepts: {
    'shear-centre': { label: 'Shear centre', related: ['torsion', 'shear-flow', 'torsional-equivalence'],
      terms: ['shear centre', 'shear center', 'flexural centre', 'centre of twist', 'SC'],
      cues: ['twist', 'twists', 'twisting', 'rotate', 'line of action', 'move the force', 'moving the force', 'where the force acts', 'position of the force', 'no twist', 'zero twist', 'does not twist'] },
    'torsion': { label: 'Torsion', related: ['shear-centre', 'torsion-constant', 'enclosed-area'],
      terms: ['torsion', 'torque', 'twisting moment', 'rate of twist', 'theta dash', 'GJ', 'Bredt-Batho', 'Bredt Batho', 'membrane analogy', 'soap film'],
      cues: ['twist', 'twisting', 'rotate', 'pure torque'] },
    'shear-flow': { label: 'Shear flow', related: ['basic-shear-flow', 'shear-stress', 'closed-section'],
      terms: ['shear flow', 'q', 'q distribution', 'total shear flow', 'shear flow distribution'],
      cues: ['flow round the section', 'flow around the section', 'shear going round', 'arrows on the section'] },
    'basic-shear-flow': { label: 'Basic shear flow (qb) and q0', related: ['shear-flow', 'closed-section', 'torsional-equivalence'],
      terms: ['qb', 'q_b', 'basic shear flow', 'q0', 'q_0', 'q nought', 'constant shear flow', 'open section shear flow formula', 'Dx', 'D_x'],
      cues: ['cut', 'where to cut', 'cut the section', 'make the section open', 'finding q0', 'find q0'] },
    'shear-stress': { label: 'Shear stress', related: ['shear-flow', 'torsion'],
      terms: ['shear stress', 'tau', 'τ', 'maximum shear stress', 'q/t'],
      cues: ['stress through the thickness', 'stress across the wall', 'across the thickness', 'thickest wall', 'thinnest wall'] },
    'torsional-equivalence': { label: 'Torsional equivalence', related: ['shear-centre', 'sign-convention', 'resultants'],
      terms: ['torsional equivalence', 'torque resultant', 'torsional resultant', 'moment equation', 'taking moments', '2Aq0', '2 A q0', 'p ds', 'perpendicular distance p'],
      cues: ['take moments', 'taking torques', 'moment about', 'equate the torque', 'equating torques'] },
    'resultants': { label: 'Force resultant of shear flow', related: ['torsional-equivalence', 'shear-flow'],
      terms: ['resultant', 'force resultant', 'integrate q', 'integral of q ds', 'one third base times height', 'shortcut'],
      cues: ['resultant force', 'area under', 'quick way', 'without integrating', 'moment arm'] },
    'thin-wall-approx': { label: 'Thin-walled approximation', related: ['second-moment', 'parallel-axis', 'torsion-constant'],
      terms: ['thin-walled approximation', 'thin walled', 'thin wall', 'midline', 'mid-line dimensions', 'midline dimensions', 't cubed'],
      cues: ['ignore the thickness', 'neglect the thickness', 'thin enough', 'corners', 'subtract the corners', 'overlap'] },
    'second-moment': { label: 'Second moment of area', related: ['parallel-axis', 'principal-axes', 'inclined-walls'],
      terms: ['second moment of area', 'moment of inertia', 'area moment', 'Ix', 'I_x', 'Iy', 'Ixx', 'Iyy', 'Ixy', 'product moment of area', 'product second moment'],
      cues: ['bending stiffness', 'inertia'] },
    'parallel-axis': { label: 'Parallel axis theorem', related: ['second-moment'],
      terms: ['parallel axis theorem', 'parallel axis', 'Steiner', 'A d squared'],
      cues: ['shift the axis', 'about its own axis', 'own centroidal axis', 'about its centroid'] },
    'principal-axes': { label: 'Principal axes', related: ['second-moment'],
      terms: ['principal axes', 'principal axis', 'centroidal axes', 'centroidal axis', 'Ixy zero'],
      cues: ['orientation of axes', 'rotate the axes', 'are principal axes the same as centroidal'] },
    'inclined-walls': { label: 'Inclined walls and coordinates', related: ['second-moment', 'resultants'],
      terms: ['inclined wall', 'angled wall', 'angled section', 'y coordinate', 'projected height', 'sqrt 2', 'sin 30'],
      cues: ['angled', 'sloping', 'diagonal wall', 'y equals', 'coordinate along the wall', 'check a point'] },
    'idealisation': { label: 'Boom idealisation', related: ['direct-stress', 'basic-shear-flow', 'closed-section'],
      terms: ['boom idealisation', 'boom idealization', 'booms', 'boom', 'shear panel', 'shear panels', 'structural idealisation', 'boom area', 'Dx+', 'Dx-'],
      cues: ['which parts carry the load', 'what carries the load', 'carry the load', 'parts of the structure', 'simplified model', 'why only the booms', 'panel thickness', 'passed', 'material passed', 'stress ratio', 'ratio of y'] },
    'direct-stress': { label: 'Direct stress', related: ['bending', 'idealisation'],
      terms: ['direct stress', 'axial stress', 'normal stress', 'bending stress', 'sigma', 'sigma_z', 'σ', 'My/Ix'],
      cues: ['tension', 'compression', 'boom force'] },
    'closed-section': { label: 'Closed sections', related: ['basic-shear-flow', 'multicell'],
      terms: ['closed section', 'closed tube', 'single cell', 'box section', 'cut the section'],
      cues: ['where to cut', 'cut position', 'take the cut', 'tube', 'box'] },
    'multicell': { label: 'Multi-cell sections', related: ['closed-section', 'torsion', 'symmetry'],
      terms: ['multi cell', 'multi-cell', 'multicell', 'two cell', 'multi tube', 'cells', 'radial walls', 'qo1', 'q01'],
      cues: ['more than one cell', 'several cells', 'walls between cells'] },
    'enclosed-area': { label: 'Enclosed area A', related: ['torsion', 'closed-section'],
      terms: ['enclosed area', 'area enclosed by the midline', 'A', '2A', '2Aq0'],
      cues: ['which area', 'area for q0', 'how is the area'] },
    'torsion-constant': { label: 'Torsion constant J', related: ['torsion', 'thin-wall-approx'],
      terms: ['torsion constant', 'J', 'polar', 'st venant'],
      cues: ['corners', 'open and closed parts'] },
    'open-section': { label: 'Open sections', related: ['shear-centre', 'shear-flow'],
      terms: ['open section', 'channel section', 'C section', 'I section', 'free edge'],
      cues: ['channel', 'open'] },
    'symmetry': { label: 'Symmetry', related: ['shear-flow', 'multicell'],
      terms: ['axis of symmetry', 'symmetric', 'symmetrical', 'rotational symmetry', 'mirror symmetry'],
      cues: ['other half', 'mirror', 'same on both sides', 'rotated'] },
    'bending': { label: 'Bending', related: ['second-moment', 'direct-stress'],
      terms: ['bending', 'bending moment', 'neutral axis', 'Mx', 'beam theory'],
      cues: ['bend', 'bends', 'deflection due to bending'] },
    'superposition': { label: 'Superposition', related: ['shear-centre', 'multicell'],
      terms: ['superposition', 'superimpose'],
      cues: ['add the effects', 'combine', 'sum of'] },
    'virtual-work': { label: 'Virtual work and displacements', related: ['basic-shear-flow', 'bending'],
      terms: ['virtual work', 'unit load', 'unit virtual load', 'principle of virtual forces', 'virtual shear flow', 'q bar', 'real and virtual', 'displacement of the cross section', 'deflection'],
      cues: ['dummy load', 'displacement', 'deflection at the tip', 'cross terms', 'integrals are zero', 'integrating to zero'] },
    'warping': { label: 'Warping', related: ['torsion'],
      terms: ['warping', 'warping displacement', 'planar displacement', 'axial constraint', 'constraint stresses', 'built-in end'],
      cues: ['non planar', 'out of plane', 'cross section changes shape', 'built into a wall'] },
    'tapered': { label: 'Tapered beams', related: ['idealisation', 'torsional-equivalence'],
      terms: ['tapered beam', 'taper', 'Py', 'Pz', 'boom vertical component', 'web shear force', 'Syw'],
      cues: ['angled booms', 'booms not horizontal', 'tan alpha'] },
    'sign-convention': { label: 'Sign conventions', related: ['torsional-equivalence', 'shear-flow'],
      terms: ['sign convention', 'positive face', 'negative face', '+ve face', '-ve face', 'positive direction', 'p sign'],
      cues: ['minus sign', 'negative', 'sign is wrong', 'wrong sign', 'direction of arrows', 'which way round', 'clockwise', 'anticlockwise', 'upwards', 'downwards'] },
    'exam': { label: 'Exams and module information', related: [],
      terms: ['exam', 'examinable', 'non examinable', 'past paper', 'past papers', 'derivation', 'derivations', 'mark scheme', 'datasheet'],
      cues: ['will it be in the exam', 'do we need to know', 'what is expected', 'practice questions'] }
  },

  spellings: {
    center: 'centre', centers: 'centres', idealization: 'idealisation', idealized: 'idealised', idealize: 'idealise',
    fiber: 'fibre', behavior: 'behaviour', analyze: 'analyse', visualize: 'visualise',
    thinwalled: 'thin walled', 'thin-walled': 'thin walled', 'mid-line': 'midline', ix: 'i_x', sigmaz: 'sigma_z',
    'multi-cell': 'multicell', 'q_0': 'q0', 'q_b': 'qb', 'q nought': 'q0'
  },

  suggestedSearches: [
    'Why does the beam twist when I move the force?',
    'When can I ignore the thickness in calculations?',
    'Which parts of the structure carry the load?',
    'How do I find q0?',
    'Why is my sign wrong in the moment equation?',
    'What is warping?'
  ]
};
