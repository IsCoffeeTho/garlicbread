import toastiebun from "toastiebun";
import garlicbread from "../";
import interfaceBuilder from "../src/interfaceBuilder";

const server = new toastiebun.server();

const apiHandler = new toastiebun.server();

/* "landing" api call */
apiHandler.get("/", (req, res) => {
	res.send({
		code: 200,
		message: "Have a look at this sites documentation"
	});
});

apiHandler.all("*", (req, res) => {
	res.status(404).send({
		code: 404,
		message: "Invalid Endpoint"
	});
});

server.use("/api", apiHandler);
/* End API Section // Potential for another library */

const app = new garlicbread.site({
	hostname: "localhost:3000",
	brand: {
		name: "garlicbread",
		icon: {
			favicon: Bun.file(`${__dirname}/assets/favicon.ico`),
			square: {
				small: `/static/icon_small.png`,
				medium: `/static/icon.png`,
				large: `/static/icon_large.png`,
			},
			thumbnail: {
				small: `/static/thumbnail_small.png`,
				medium: `/static/thumbnail.png`,
				large: `/static/thumbnail_large.png`,
			},
		}
	}
});

server.get("/static", (req, res) => { res.status(404).send("404 File Not Found"); });
server.get("/static/*", (req, res) => {
	console.log(`${__dirname}/assets${req.path}`);
	res.sendStatic(`${__dirname}/assets${req.path}`, (err) => {
		if (err)
			res.status(404).send("404 File Not Found");
	});
})

app.staticNode("/", {
	navigation: {
		/*
			Does not need to be expressed in code,
			Placing this metadata in a file would be better for administrators.
			However, do note that it doesn't update after site.build()
		*/
		name: "Home",
		description: `garlicbread is a bun module built on top of toastiebun
			to provide developers with enterprise level `,
	},
	value: "<h1>Hello <!--$USER--></h1><!--$CONTENT-->"
});

/* Login Information */
app.dynamicNode("/*", {
	// no 'checkStale()' means always dynamic
	variableName: "USER",
	value(request) {
		return request.cookies.get("username") ?? "Guest";
	}
});

app.staticNode("/changelog", {
	navigation: {
		name: "Changelog",
		description: `Information about garlicbread and its versions`,
	},
	section: "CONTENT",
	content: "<ul><li>Begun</li></ul>"
});

server.use(app.build());

server.listen("::", 3000, () => {
	console.log("Server is active");
})