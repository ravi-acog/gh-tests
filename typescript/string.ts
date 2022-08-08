/**
 * 4. Best use of strings in typescript
 *
 */
interface Movie {
	name: string;
	//...
}

//WARN: poor use of string
function findMovieByGenre(genre: string): Movie[] {
	return [];
}

//NOTE: better way to use string args as union type
type Genre = 'Drama' | 'Comedy' | 'Action';

function findMovieByGenre_v2(genre: Genre): Movie[] {
	return [];
}

// eg.2

type OrderStatus = 'New' | 'Paid' | 'Shipped' | 'Completed';

type OrderType = {
	status: OrderStatus;
	//...
};

function proccessOrder(order: OrderType): OrderType {
	switch (order.status) {
		case 'New':
			return { status: 'New' };
		case 'Shipped':
			return { status: 'Shipped' };
		case 'Paid':
			return { status: 'Paid' };
		case 'Completed':
			return { status: 'Completed' };
	}
}

// Invalid state handling

type CreditCardInfo = {
	kind: 'creditCardInfo';
	number: number;
	//...
};
type PayPalInfo = {
	kind: 'payPalInfo';
	payPalId: string;
	//...
};

// WARN: invalid way to represent payment info
type Payment = {
	amount: number;
	creditCardInfo?: CreditCardInfo;
	payPalInfo?: PayPalInfo;
	cash: boolean;
};

//result
const payment_v1: Payment = {
	amount: 2000,
	cash: false,
};

//NOTE: better way
type Payment_v2 = {
	amount: number;
	paymentInfo: PaymentInfo;
};

type PaymentInfo = CreditCardInfo | PayPalInfo | Cash;
type Cash = {
	kind: 'cash';
	//...
};

const payment_v2: Payment_v2 = {
	amount: 3000,
	paymentInfo: {
		kind: 'creditCardInfo',
		number: 43754794542948,
	},
};

//eg.3

type OnlineOrder = {
	orderId: string;
	billingAddress: Address;
	shippingAddress?: Address;
};

type Address = {
	//....
};

type OnlineOrder_v2 = {
	orderId: string;
	billingAddress: Address;
	shipping: ShippingInfo;
};

type ShippingInfo = SameAsBilling | DigitalContent | ShippingAddress;

type SameAsBilling = {
	kind: 'sameAsBilling';
	//..
};

type DigitalContent = {
	kind: 'digitalContent';
	//...
};

type ShippingAddress = {
	kind: 'shippingAddress';
	address: Address;
};

type ShippingResult = {
	//..
};

function processShipping(order: OnlineOrder_v2): ShippingResult {
	switch (order.shipping.kind) {
		case 'digitalContent':
			return {};
		case 'sameAsBilling':
			return {};
		case 'shippingAddress':
			order.shipping.address; //Address
			return {};
	}
}
