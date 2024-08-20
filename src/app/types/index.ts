export interface NameData {
 name: string;
 koreanName: string;
 gender: string;
 trendYear: string;
 maleTop?: boolean;
 femaleTop?: boolean;
 trendyFemaleTop?: boolean;
 trendyMaleTop?: boolean;
 doggyName?: boolean;
 characteristic: number;
 comment?: string;
 feeling: string;
 feelingNum: string;
}

export interface Update {
 date: string;
 patchNotes: string[];
 names: string[];
}

export type ChemistryData = {
 resultNumber: string;
 character1: string;
 character2: string;
 characterNumber1: string;
 characterNumber2: string;
 line1: string;
 line2: string;
 line3: string;
 line4: string;
};
