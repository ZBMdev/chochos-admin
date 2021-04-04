export interface SkillsData {
    id:          number;
    name:        string;
    description: string;
    updated_on:  Date;
    created_on:  Date;
}

export interface CreateSkillsParam {
    name:        string;
    description: string;
    updated_on:  Date;
    created_on:  Date;
}
