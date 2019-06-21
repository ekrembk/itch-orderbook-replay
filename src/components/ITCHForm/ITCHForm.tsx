import React, { useState } from "react";
import Order from "../../lib/orderbook/Order";

interface Props {
    onCreate(method: string, order: Order): void;
}

interface FormInputProps {
    label: string;
    value: string;
    setValue(value: string): any
}

function createOrderFromInput(id: string, type: string, price: number, quantity: number): Order {
    return { seconds: 0, id, type, price, quantity };
}

const FormInput: React.FC<FormInputProps> = ({ label, value, setValue }) => (
    <div className="form-group">
        <label>{label}</label>
        <input className="form-control" type="text" value={value} onChange={event => setValue(event.target.value)} />
    </div>
);

const ITCHForm: React.FC<Props> = ({ onCreate }) => {
    const [method, setMethod] = useState("add");
    const [id, setId] = useState("id");
    const [type, setType] = useState("buy");
    const [price, setPrice] = useState("100");
    const [quantity, setQuantity] = useState("1");
    const [counter, setCounter] = useState(1);

    const onSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        onCreate(method, createOrderFromInput(id, type, parseInt(price), parseInt(quantity)));
        setCounter(counter + 1);
        setId('id' + counter);
    }

    return (
        <form onSubmit={onSubmit}>
            <FormInput label="Method" value={method} setValue={setMethod} />
            <FormInput label="ID" value={id} setValue={setId} />
            <FormInput label="Type" value={type} setValue={setType} />
            <FormInput label="Price" value={price} setValue={setPrice} />
            <FormInput label="Quantity" value={quantity} setValue={setQuantity} />

            <button type="submit">Submit</button>
        </form>
    );
};

export default ITCHForm;