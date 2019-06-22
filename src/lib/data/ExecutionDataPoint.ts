export default interface ExecutionDataPoint {
    seconds: number;
    price: number;
    quantity: number;
    aggressive_party: string;
    buyer_code: string;
    seller_code: string;
}