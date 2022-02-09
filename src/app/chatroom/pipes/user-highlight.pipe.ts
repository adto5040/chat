import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'userHighlight'
})
export class UserHighlightPipe implements PipeTransform {
  transform(text: string): string {
    return text;
  }
}
