// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const toUser = (directusReadMeResponse: any) => {
	return {
		id: directusReadMeResponse.id,
		email: directusReadMeResponse.email,
		first_name: directusReadMeResponse.first_name,
		last_name: directusReadMeResponse.last_name,
		description: directusReadMeResponse.description,
		avatar: directusReadMeResponse.avatar,
		tags: directusReadMeResponse.tags,
	};
};
