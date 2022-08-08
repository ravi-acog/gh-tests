/**
 * 1. Return value and exception handeling in typescript
 *
 */

interface Order {
	//order details
	id: string;
	//...
}
interface OrderOptions {
	//order details
	payment: string;
	//...
}

interface ProcessedOrder {
	//
}
interface OrderAction {
	//
}

// WARN: Worng way
function orderProcess(
	order: Order,
	options: OrderOptions
): string | ProcessedOrder | OrderAction {
	///
	return '';
}

// NOTE:Better way ↓

type OrderResult = ProcessedOrder | OrderAction | string;

function orderProcess_v1(order: Order, options: OrderOptions): OrderResult {
	return '';
}

//NOTE: best approach
type OrderProcessingError = string;
type OrderResult_v1 = ProcessedOrder | OrderAction | OrderProcessingError;

function orderProcess_v2(order: Order, options: OrderOptions): OrderResult_v1 {
	return '';
}

//NOTE: exception handeling

type Result<TResult, TError> = Success<TResult> | Failure<TError>;

type Success<T> = {
	kind: 'successResult';
	value: T;
};
type Failure<T> = {
	kind: 'failureResult';
	error: T;
};

type OrderResult_v2 = Result<
	ProcessedOrder | OrderAction,
	OrderProcessingError
>;

function orderProcess_v3(order: Order, options: OrderOptions): OrderResult_v2 {
	return {
		kind: 'failureResult',
		error: 'no data available',
	};
}

const result = orderProcess_v3({ id: '1' }, { payment: 'cash' });

if (result.kind === 'failureResult') {
	result.error;
}
if (result.kind === 'successResult') {
	result.value;
}
