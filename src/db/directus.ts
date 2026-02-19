import {authentication, createDirectus, rest} from "@directus/sdk";

const client = createDirectus(process.env.DIRECTUS_APP_URL ?? "directus-app-url-missing")
	.with(rest())
	.with(authentication("cookie", {credentials: "include"}));

export default client;
