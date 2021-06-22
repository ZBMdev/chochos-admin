// export interface OccupationData {
//     id:                    number;
//     name:                  string;
//     image:                 null;
//     description:           string;
//     occupationCategory_id: number;
//     updated_on:            Date;
//     created_on:            Date;
// }

export interface OccupationData {
    id:          number;
    name:        string;
    image:       string;
    description: string;
    tags:        string;
    isActive:    boolean;
    updated_on:  Date;
    created_on:  Date;
    deletedAt:   null;
}
export interface OccupationCreateParam {
    name:                  string;
    image:                 null;
    description:           string;
}