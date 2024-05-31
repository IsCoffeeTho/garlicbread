import type garlicbreadTypes from "./garlicbrea.d";
import { readFileSync } from "fs";
import pkg from "../package.json";

const skeletonHTML = readFileSync(`${__dirname}/skeleton.html`).toString().replace("#GC_VERSION#", `v${pkg.version}`);


export default class interfaceBuilder {
	constructor() {

	}
}

