import Cube from 'cubejs';

Cube.initSolver();
self.postMessage({ type: 'INIT_DONE' });

self.onmessage = function(e) {
  if (e.data.type === 'SOLVE') {
    const string = e.data.string;
    
    // Validate string length
    if (string.length !== 54) {
      self.postMessage({ type: 'ERROR', error: "Cube string must be exactly 54 characters long." });
      return;
    }
    
    // Validate exact counts
    const counts = {};
    for (const char of string) counts[char] = (counts[char] || 0) + 1;
    const isValid = Object.values(counts).every(c => c === 9) && Object.keys(counts).length === 6;
    
    if (!isValid) {
      self.postMessage({ type: 'ERROR', error: "Invalid cube string. Must contain exactly 9 of each of the 6 colors/faces." });
      return;
    }

    try {
      const cube = Cube.fromString(string);
      const sol = cube.solve();
      self.postMessage({ type: 'SOLUTION', solution: sol });
    } catch (err) {
      self.postMessage({ type: 'ERROR', error: err.message });
    }
  }
};
