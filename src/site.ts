import toastiebun from "toastiebun";
import type garlicbreadTypes from "./garlicbrea";
import type { staticNode, dynamicNode } from "./pageNode";

export default class site {
	constructor(opt: garlicbreadTypes.siteOptions) {

	}

	staticNode(url: string, opt: garlicbreadTypes.staticNodeOpt) {

	}

	dynamicNode(url: string, opt: garlicbreadTypes.dynamicNodeOpt) {

	}

	#addNode(url: string, node: staticNode | dynamicNode) {

	}

	buildSiteGraph() {

	}

	build() {
		this.buildSiteGraph();
		const toastiebunServer = new toastiebun.server()

		

		return toastiebunServer;
	}

	static santizeUrl(url: string) {
		/**
		 * @todo Implement genuine santization. 
		 */
		return url;
	}

	static validateUrl(url: string) {
		if (!url.startsWith('/'))
			throw new Error("URL must begin with a '/' character.");
		if (url.match(/[&?#;[\]@!$&'\()+,=]/g))
			throw new Error("URL has reserved characters");
		return true;
	}
}