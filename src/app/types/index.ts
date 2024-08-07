export type NameData = {
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
};

export interface Update {
 date: string;
 patchNotes: string[];
 names: string[];
}
