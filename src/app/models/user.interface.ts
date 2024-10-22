import { Order } from "./order.interface";

export interface User {
    id: number;
    name: string;
    surname: string;
    email: string;
    password: string;
    role: string;
    orderList?: Order[];
}