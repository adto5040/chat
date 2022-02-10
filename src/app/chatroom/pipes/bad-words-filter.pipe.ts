import { Pipe, PipeTransform } from '@angular/core';

const BADWORDS: string[] = [
  'fuck',
  'shit',
  'piss off',
  'dick head',
  'asshole',
  'bitch',
  'bastard',
  'damn',
  'cunt',
  'scheiß',
  'scheiss',
  'fick',
  'schlampe'
];

@Pipe({
  name: 'badWordsFilter'
})
export class BadWordsFilterPipe implements PipeTransform {
  transform(text: string): string {
    let newText = text;
    for (const badWord of BADWORDS) {
      const regex = new RegExp(badWord, 'gi');
      newText = newText.replace(regex, '*'.repeat(badWord.length));
    }

    return newText;
  }
}
