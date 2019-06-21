import DataPoint from "./DataPoint";

export default interface DataSource {
    reset(): void;
    revert(): void;
    next(): DataPoint;
}