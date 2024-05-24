import toastiebun from "toastiebun";
import garlicbread from "../";

const server = new toastiebun.server();

const apiHandler = new toastiebun.server();

// "landing" api call
apiHandler.get("/", (req, res) => {
	res.send({
		code: 200,
		message: "Have a look at this sites documentation"
	});
});

apiHandler.all("*", (req, res) => {
	res.send({
		code: 404,
		message: "Invalid Endpoint"
	});
});

server.use("/api", apiHandler);
// This has merit for another library

const app = new garlicbread.site({
	hostname: "localhost:3000",
	brand: {
		name: "garlicbread",
		icon: {
			favicon: Bun.file(`${__dirname}/favicon.ico`),
			square: {
				small: Bun.file(`${__dirname}/icon_small.png`),
				medium: Bun.file(`${__dirname}/icon.png`),
				large: Bun.file(`${__dirname}/icon_large.png`),
			},
			thumbnail: {
				small: Bun.file(`${__dirname}/thumbnail_small.png`),
				medium: Bun.file(`${__dirname}/thumbnail.png`),
				large: Bun.file(`${__dirname}/thumbnail_large.png`),
			},
		}
	}
});


app.add("/", {
	// Does not need to be expressed in code,
	// Placing this metadata in a file would be better for administrators.
	// However, do note that it doesn't update after site.build()
	navigation: {
		name: "Home",
		description: `garlicbread is a bun module built on top of toastiebun
			to provide developers with enterprise level `,
	},
	handle(req) {

	}
})

server.use(app.build());

server.listen("::", 3000, () => {
	console.log("Server is active");
})