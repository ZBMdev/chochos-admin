export interface OccupationData {
    id:                    number;
    name:                  string;
    image:                 null;
    description:           string;
    occupationCategory_id: number;
    updated_on:            Date;
    created_on:            Date;
}

export interface OccupationCreateParam {
    name:                  string;
    image:                 null;
    description:           string;
}