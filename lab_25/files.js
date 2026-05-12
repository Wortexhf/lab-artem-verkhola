const fs = require('fs');
const readline = require('readline');
const path = require('path');

const filePath = path.join(__dirname, 'info.txt');

fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error('Помилка читання файлу:', err);
    return;
  }
  console.log('=== Вміст файлу info.txt ===');
  console.log(data);

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.question('Введіть текст для запису у файл: ', (input) => {
    fs.appendFile(filePath, '\n' + input, 'utf8', (err) => {
      if (err) {
        console.error('Помилка запису у файл:', err);
      } else {
        console.log('Текст успішно записано у файл info.txt!');
      }
      rl.close();
    });
  });
});