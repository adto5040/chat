import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'userHighlight'
})
export class UserHighlightPipe implements PipeTransform {
  transform(text: string): string {
    const regex = new RegExp('(^|\\s)(@[a-zA-Z]+)', 'g');
    return text.replace(regex, '$1<b>$2</b>');
  }
}
