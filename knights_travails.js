const readline = require('readline');

function knightMoves(start, end) {
  const moves = [
    [2, 1], [2, -1], [-2, 1], [-2, -1],
    [1, 2], [1, -2], [-1, 2], [-1, -2]
  ];

  const isValid = (x, y) => x >= 0 && x < 8 && y >= 0 && y < 8;

  const queue = [[start]];
  const visited = new Set();
  visited.add(start.toString());

  while (queue.length > 0) {
    const path = queue.shift();
    const [x, y] = path[path.length - 1];

    if (x === end[0] && y === end[1]) {
      console.log(`\nYou made it in ${path.length - 1} moves! Here's your path:`);
      path.forEach(pos => console.log(pos));
      return path;
    }

    for (let [dx, dy] of moves) {
      const newX = x + dx;
      const newY = y + dy;
      if (isValid(newX, newY) && !visited.has([newX, newY].toString())) {
        visited.add([newX, newY].toString());
        queue.push([...path, [newX, newY]]);
      }
    }
  }
}

// Driver interattivo
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Inserisci le coordinate di partenza (es. 0,0): ', startInput => {
  rl.question('Inserisci le coordinate di arrivo (es. 7,7): ', endInput => {
    const start = startInput.split(',').map(Number);
    const end = endInput.split(',').map(Number);

    // Controllo rapido
    if (
      start.length !== 2 || end.length !== 2 ||
      start.some(n => n < 0 || n > 7) || end.some(n => n < 0 || n > 7)
    ) {
      console.log('Errore: le coordinate devono essere numeri tra 0 e 7.');
      rl.close();
      return;
    }

    knightMoves(start, end);
    rl.close();
  });
});
