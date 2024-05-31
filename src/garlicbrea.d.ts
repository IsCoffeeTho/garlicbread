import type { BunFile } from "bun";

type Impossible<K extends keyof any> = {
	[P in K]: never;
};

namespace garlicbreadTypes {
	export type siteOptions = {
		hostname: string,
		brand: {
			name: string,
			abbr?: string,
			icon: {
				favicon: BunFile,
				square?: {
					small: BunFile | string,
					medium: BunFile | string,
					large: BunFile | string
				} | BunFile,
				thumbnail?: {
					small?: BunFile | string,
					medium?: BunFile | string,
					large?: BunFile | string
				} | BunFile
			} | BunFile
		}
	}

	type nodeOptions = {
		/**
		 * Provides the node with metadata information for embeds and SEO.  
		 * When the node is accessed, the last node in the tree will take precendence
		 * 
		 * 
		 */
		navigation?: {
			/**
			 * Name of the page or content
			 * The Shorter the Better.
			 * 
			 * Recommended 10 - 25 characters.
			 * @example
			 * "The Best Cup of Coffee"
			 * "Barista's Haven"
			 * "The Baristarettes"
			 */
			name: string,
			/**
			 * Give a length description of the type of content on the page 
			 */
			description: string,
			/**
			 * If present, the metadata says the page is an article
			 */
			author?: string
		},
		/**
		 * Tells the node which piece of content on the page it is representing.
		 * 
		 * Defaults to `"BODY"`
		 * 
		 * @example
		 * <!--$EXAMPLE-->
		 * == variableName: "EXAMPLE"
		 */
		variableName?: string
	}

	export type staticNodeOpt = nodeOptions & {
		/**
		 * The content to staticically provide
		 * 
		 */
		value: string | BunFile
	};

	export type dynamicNodeOpt = nodeOptions & {
		/**
		 * If present, the page will be treated as static if this returns false.
		 * This is meant as a sever side stale, client side caching will take precedence.
		 * 
		 * intended for supplying content that rarely changes quicker
		 * 
		 * @example
		 * var i = 0;
		 * var j = 0;
		 * {
		 * 	checkStale() {
		 * 		if (i == j)
		 * 			return false
		 * 		j = i;
		 * 		return true;
		 * 	},
		 * 	value() {
		 * 		return `Static Dynamic Content ${i}`;
		 * 	}
		 * }
		 * i++;
		 */
		checkStale?(): boolean,
		value(request: request): string,
	};

	export type pageNode = {
		readonly endpoint: string,
		parentNode: null | pageNode,
		childrenNodes: pageNode[],
		process(request: garlicbreadTypes.request): void
	}

	export type request = {
		nodeTrace: pageNode[];
		builder: interfaceBuilder;
	}
}

export default garlicbreadTypes;