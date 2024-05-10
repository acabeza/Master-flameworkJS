import {Pipe, PipeTransform} from '@angular/core'
import { LocalTimePipe } from 'angular2-moment';
@Pipe({
    name: 'locale',
    pure: false
})
export class LocalePipe extends LocalTimePipe implements PipeTransform {
    function(value: string) {
        super.transform(value);
    }
}