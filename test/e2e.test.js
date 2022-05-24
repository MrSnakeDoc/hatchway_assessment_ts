const pactum = require("pactum");

const { mock } = require("pactum");

describe("test", () => {
	beforeAll(async () => {
		mock.addInteraction({
			request: {
				method: "GET",
				path: "/api/ping",
			},
			response: {
				status: 200,
				body: { success: true },
			},
		});

		mock.addInteraction({
			request: {
				method: "GET",
				path: "/api/posts",
			},
			response: {
				status: 400,
				body: { error: "Tag parameter is required" },
			},
		});

		mock.addInteraction({
			request: {
				method: "GET",
				path: "/api/posts",
				queryParams: {
					tags: "tech",
					sortBy: "ir",
				},
			},
			response: {
				status: 400,
				body: {
					error: "direction parameter or sortBy parameter is invalid",
				},
			},
		});

		mock.addInteraction({
			request: {
				method: "GET",
				path: "/api/posts",
				queryParams: {
					tags: "tech",
					direction: "as",
				},
			},
			response: {
				status: 400,
				body: {
					error: "direction parameter or sortBy parameter is invalid",
				},
			},
		});

		mock.addInteraction({
			request: {
				method: "GET",
				path: "/api/posts",
				queryParams: {
					tags: "tech",
				},
			},
			response: {
				status: 200,
				body: {
					posts: [
						{
							author: "Rylee Paul",
							authorId: 9,
							id: 1,
							likes: 960,
							popularity: 0.13,
							reads: 50361,
							tags: ["tech", "health"],
						},
						{
							author: "Zackery Turner",
							authorId: 12,
							id: 2,
							likes: 469,
							popularity: 0.68,
							reads: 90406,
							tags: ["startups", "tech", "history"],
						},
					],
				},
			},
		});

		mock.addInteraction({
			request: {
				method: "GET",
				path: "/api/posts",
				queryParams: {
					tags: "tech",
					sortBy: "id",
				},
			},
			response: {
				status: 200,
				body: {
					posts: [
						{
							author: "Rylee Paul",
							authorId: 9,
							id: 1,
							likes: 960,
							popularity: 0.13,
							reads: 50361,
							tags: ["tech", "health"],
						},
						{
							author: "Zackery Turner",
							authorId: 12,
							id: 2,
							likes: 469,
							popularity: 0.68,
							reads: 90406,
							tags: ["startups", "tech", "history"],
						},
					],
				},
			},
		});

		mock.addInteraction({
			request: {
				method: "GET",
				path: "/api/posts",
				queryParams: {
					tags: "tech",
					sortBy: "id",
					direction: "asc",
				},
			},
			response: {
				status: 200,
				body: {
					posts: [
						{
							author: "Rylee Paul",
							authorId: 9,
							id: 1,
							likes: 960,
							popularity: 0.13,
							reads: 50361,
							tags: ["tech", "health"],
						},
						{
							author: "Zackery Turner",
							authorId: 12,
							id: 2,
							likes: 469,
							popularity: 0.68,
							reads: 90406,
							tags: ["startups", "tech", "history"],
						},
					],
				},
			},
		});

		mock.addInteraction({
			request: {
				method: "GET",
				path: "/api/posts",
				queryParams: {
					tags: "tech,health",
				},
			},
			response: {
				status: 200,
				body: {
					posts: [
						{
							author: "Rylee Paul",
							authorId: 9,
							id: 1,
							likes: 960,
							popularity: 0.13,
							reads: 50361,
							tags: ["tech", "health"],
						},
						{
							author: "Zackery Turner",
							authorId: 12,
							id: 2,
							likes: 469,
							popularity: 0.68,
							reads: 90406,
							tags: ["startups", "tech", "history"],
						},
					],
				},
			},
		});

		mock.addInteraction({
			request: {
				method: "GET",
				path: "/api/posts",
				queryParams: {
					tags: "tech,science",
					sortBy: "id",
				},
			},
			response: {
				status: 200,
				body: {
					posts: [
						{
							author: "Rylee Paul",
							authorId: 9,
							id: 1,
							likes: 960,
							popularity: 0.13,
							reads: 50361,
							tags: ["tech", "health"],
						},
						{
							author: "Zackery Turner",
							authorId: 12,
							id: 2,
							likes: 469,
							popularity: 0.68,
							reads: 90406,
							tags: ["startups", "tech", "history"],
						},
					],
				},
			},
		});

		mock.addInteraction({
			request: {
				method: "GET",
				path: "/api/posts",
				queryParams: {
					tags: "tech,design",
					sortBy: "id",
					direction: "desc",
				},
			},
			response: {
				status: 200,
				body: {
					posts: [
						{
							author: "Zackery Turner",
							authorId: 12,
							id: 2,
							likes: 469,
							popularity: 0.68,
							reads: 90406,
							tags: ["startups", "tech", "history"],
						},
						{
							author: "Rylee Paul",
							authorId: 9,
							id: 1,
							likes: 960,
							popularity: 0.13,
							reads: 50361,
							tags: ["tech", "health"],
						},
					],
				},
			},
		});

		// runs mock server on port 3000
		await mock.start(3000);
	});
	afterAll(async () => {
		await mock.stop();
	});

	test("should yield HTTP status code 200", async () => {
		await pactum.spec().get("http://localhost:3000/api/ping").expectStatus(200);
	});

	test("without tags should yield HTTP status code 400", async () => {
		await pactum
			.spec()
			.get("http://localhost:3000/api/posts")
			.expectStatus(400);
	});

	test("with tags & malformed sortBy should yield HTTP status code 400", async () => {
		await pactum
			.spec()
			.get("http://localhost:3000/api/posts?tags=tech&sortBy=ir")
			.expectStatus(400);
	});

	test("with tags&sortBy & malformed direction should yield HTTP status code 400", async () => {
		await pactum
			.spec()
			.get("http://localhost:3000/api/posts?tags=tech&direction=as")

			.expectStatus(400);
	});

	test("query tags should yield HTTP status code 200", async () => {
		await pactum
			.spec()
			.get("http://localhost:3000/api/posts?tags=tech")
			.expectStatus(200);
	});

	test("query tags&sortBy should yield HTTP status code 200", async () => {
		await pactum
			.spec()
			.get("http://localhost:3000/api/posts?tags=tech&sortBy=id")
			.expectStatus(200);
	});

	test("query tags&sortBy&direction should yield HTTP status code 200", async () => {
		await pactum
			.spec()
			.get("http://localhost:3000/api/posts?tags=tech&sortBy=id&direction=asc")
			.expectStatus(200);
	});

	test("query tags yield HTTP status code 200", async () => {
		await pactum
			.spec()
			.get("http://localhost:3000/api/posts?tags=tech,health")
			.expectStatus(200);
	});

	test("query tagss&sortBy should yield HTTP status code 200", async () => {
		await pactum
			.spec()
			.get("http://localhost:3000/api/posts?tags=tech,science&sortBy=id")
			.expectStatus(200);
	});

	test("query tagss&sortBy&direction should yield HTTP status code 200", async () => {
		await pactum
			.spec()
			.get(
				"http://localhost:3000/api/posts?tags=tech,design&sortBy=id&direction=desc"
			)
			.expectStatus(200);
	});
});
