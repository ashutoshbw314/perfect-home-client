const fs = require('fs');
const configs = require('./firebaseConfigs.js');

function printEnvsFromFirebaseConfig(config, prefix = '') {
  function makeEnvKey(s) {
    return [...s].map(l => {
      return /[A-Z]/.test(l) ? `-${l}` : l;
    }).join('').split('-').map(w => w.toUpperCase()).join('_');
  }

  return Object.entries(config).map(p => {
    return prefix + makeEnvKey(p[0]) + '=' + p[1];
  }).join('\n');
}

fs.writeFile('.env.development', printEnvsFromFirebaseConfig(configs.dev, 'VITE_'), (err) => {
    if (err) throw err;
    console.log('Dev config saved to .env.development');
});

fs.writeFile('.env.production', printEnvsFromFirebaseConfig(configs.prod, 'VITE_'), (err) => {
    if (err) throw err;
    console.log('Prod config saved to .env.production');
});

