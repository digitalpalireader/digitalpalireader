const util = require('util');
const fs = require('fs');

const readFileAsync = util.promisify(fs.readFile);
const unlinkAsync = util.promisify(fs.unlink);

const DPR_G = {};

const importScript = async path => {
  const contents = await readFileAsync(path, 'utf8');
  eval(contents);
}

function toUni(input) {
  if(!input || input == '') return input;
  var nigahita = 'ṃ';
  var Nigahita = 'Ṃ';

  input = input.replace(/aa/g, 'ā').replace(/ii/g, 'ī').replace(/uu/g, 'ū').replace(/\.t/g, 'ṭ').replace(/\.d/g, 'ḍ').replace(/\"n\b/g, 'ṅ').replace(/\"nk/g, 'ṅk').replace(/\"ng/g, 'ṅg').replace(/\.n/g, 'ṇ').replace(/\.m/g, nigahita).replace(/\u1E41/g, nigahita).replace(/\~n/g, 'ñ').replace(/\.l/g, 'ḷ').replace(/AA/g, 'Ā').replace(/II/g, 'Ī').replace(/UU/g, 'Ū').replace(/\.T/g, 'Ṭ').replace(/\.D/g, 'Ḍ').replace(/\"N/g, 'Ṅ').replace(/\.N/g, 'Ṇ').replace(/\.M/g, Nigahita).replace(/\~N/g, 'Ñ').replace(/\.L/g, 'Ḷ').replace(/\.ll/g,'ḹ').replace(/\.r/g,'ṛ').replace(/\.rr/g,'ṝ').replace(/\.s/g,'ṣ').replace(/"s/g,'ś').replace(/\.h/g,'ḥ');

  return input;
}

const main = async () => {
  await importScript('../../en/cped/index.js');

  const fileName = './cpxd.csv';
  try {
    await unlinkAsync(fileName);
  } catch { }

  var file = fs.createWriteStream(fileName, { flags: 'a' })

  file.write('word (do not translate),meaning\r\n')
  Object
    .entries(DPR_G.yt)
    .forEach(
      e => {
        file.write(`${toUni(e[0])},"${e[1][2]}"\r\n`)
      })
}

main();
