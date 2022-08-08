/**
 * 2. Don't use null instead use option type
 *
 *
 */

interface User {
	name: string;
	//...
}

//WARN: wrong approach
function findUseById(id: string): User | null {
	return null;
}

//NOTE: best approach
type Option<T> = Some<T> | None;

type Some<T> = {
	kind: 'someOption';
	value: T;
};

type None = {
	kind: 'noneOption';
};

function findUseById_v2(id: string): Option<User> {
	return {
		kind: 'someOption',
		value: {
			name: 'Ravi',
		},
	};
}

const user = findUseById_v2('123');

if (user.kind === 'someOption') {
	user.value;
}
