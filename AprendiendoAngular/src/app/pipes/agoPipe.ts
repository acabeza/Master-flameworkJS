import {Pipe, PipeTransform} from '@angular/core'
import { TimeAgoPipe } from 'time-ago-pipe';
@Pipe({
    name: 'timeAgo',
    pure: false
})
export class AgoPipe extends TimeAgoPipe implements PipeTransform {
    function(value: string) {
        super.transform(value);
    }
}