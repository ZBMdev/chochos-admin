/* eslint-disable*/
import { ColourData, NewColourData } from "@/types/colour";

import Model from "./Model";

export default class Colour extends Model {
    name!: string;
    hex!:  string;

    constructor(data?: Partial<ColourData>) {
        super();
        if (data) {
            Object.assign(this, data);
        }
    }

    get Hex() {
        if (!!!this.hex) return {};
        return JSON.parse(this.hex)
    }

    set Hex(hex: Record<string, string>) {
        this.hex = JSON.stringify(hex)
    }

    toCreateParam() {
        return {
            name: this.name,
            hex: this.hex,
        } as NewColourData;
    }
}