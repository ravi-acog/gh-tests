/**
 * 3. Instead of using any try to use unkown if possible to some places
 *
 */

//ERROR: compile error
function exec(args: unknown) {
	// let value = args['someKey'];
}

//NOTE: good
function exec_v1<T extends { someKey: string }>(args: T) {
	args['someKey'];
}

type UserType = {
	name: string;
	roles: any;
};
