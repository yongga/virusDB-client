import { Pipe, PipeTransform } from '@angular/core';
import { Virus } from '../virus';

@Pipe({
    name: 'filter'
})

export class SearchVirusPipe implements PipeTransform {
    transform(items: Virus[], filters: []): Virus[] {
        if (!items) return [];
        if (!filters) return items; 

        return items;
        // searchText = searchText.toLowerCase();
        // return items.filter(virus => {
        //     return virus.species_name.toLowerCase().includes(searchText);
        // });
    }
}