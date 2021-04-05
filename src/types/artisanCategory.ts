export interface ArtisanCategoryData {
    id:          number;
    name:        string;
    description: string;
    updated_on:  Date;
    created_on:  Date;
}

export interface ArtisanCategoryCreate {
    name:        string;
    description: string;
}
