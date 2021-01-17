const fs = require("fs");

const { o: overwrite } = require('minimist')(process.argv.slice(2));

const srcPath = 'examples'
const dstPath = ''

const fileToCopy = [
  '.env.example',
  'event.issue.example.json',
  'event.pr.example.json',
  'labels.local.example.json',
]

const rename = filename => filename.replace('.example','')

let skippedFiles = 0
console.log('\n');

fileToCopy.forEach( fileName => {
  const dstFile = `${dstPath}${rename(fileName)}`
  if (fs.existsSync(dstFile) && !overwrite) {
    console.log(dstFile, ` - exists coping skipped !`)
    skippedFiles ++;
  } else {
    fs.copyFileSync(`${srcPath}/${fileName}`, dstFile) 
  }
});

if (skippedFiles >0) {
  console.log('\n','Use -o flag to copy with overwrite','\n')
} else {
  console.log('Copied', fileToCopy.length , "files", '\n')
}
