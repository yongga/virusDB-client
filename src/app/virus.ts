import { citation } from './citation';

export interface Virus {
    _id: string,
    species_name: string,
    discoveries: [{
        id: number,
        country: string,
        date_found: string,
        citation: citation,
    }]
}