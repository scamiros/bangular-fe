import { MoneyTransactions } from './money-transactions';
import { MoneyDashboard } from './money-dashboard';

export class MoneyCategories {
    idCategory: number;
    category: string;
    tipo: string;
    budget: number;
    spesa: number;
    bilancio: number;
    mDashboard: MoneyDashboard;
    mtransactions: Array<MoneyTransactions>;
    more: boolean = false;
}