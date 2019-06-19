import DataPoint from "./DataPoint";

export default interface DataSource {
    prev(): DataPoint;
    next(): DataPoint;
}