/**
 * 5. Immutability
 */

//NOTE: creating a immutable data
type Immutable<T> = {
	readonly [K in keyof T]: keyof T[K] extends undefined
		? T[K]
		: Immutable<T[K]>;
};

type _Order = Immutable<{
	orderId: string;
	customer: Customer;
	billingAddess: BillingAddress;
	shipping: ShippingInfo;
}>;

type Customer = {
	//...
};

type BillingAddress = {
	//...
};

function _processOrder(order: Immutable<_Order>) {
	//
}
