import { Pipe, PipeTransform } from '@angular/core';
import { Virus } from '../virus';

@Pipe({
    name: 'search'
})

export class SearchVirusPipe implements PipeTransform {
    transform(items: Virus[], searchText: string): Virus[] {
        if (!items) return [];
        if (!searchText) return items; 

        searchText = searchText.toLowerCase();
        return items.filter(virus => {
            return virus.discoveries.filter(
                x => x.citation.author.includes(searchText)
            )
            // ).toLowerCase().includes(searchText);
        });
    }
}