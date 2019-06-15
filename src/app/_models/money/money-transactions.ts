import { MoneyCategories } from './money-categories';

export class MoneyTransactions {
    idTransaction: number;
    dtTransaction: Date;
    amount: number;
    transaction: string;
    mCategory: MoneyCategories;
    category: string;
}