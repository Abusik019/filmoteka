export const toSearchRatingFormat = (value: number): { min: number, max: number } => {
    switch(value){
        case 1:
            return { min: 0, max: 2 };
        case 2:
            return { min: 2, max: 4 };
        case 3:
            return { min: 4, max: 6 };
        case 4:
            return { min: 6, max: 8 };
        case 5:
            return { min: 8, max: 10 };
        default:
            return { min: 0, max: 10 };
    }
}

export const toDefaultRatingFormat = (value: string): number => {
    switch(value){
        case '0-2':
            return 1;
        case '2-4':
            return 2;
        case '4-6':
            return 3;
        case '6-8':
            return 4;
        case '8-10':
            return 5;
        default:
            return 0;
    }
}