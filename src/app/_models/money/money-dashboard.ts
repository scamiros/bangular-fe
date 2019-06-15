import { MoneyCategories } from './money-categories';
import { MoneyEntrate } from './money-entrate';

export class MoneyDashboard {
    idDashboard: number;
    dashboard: string;
    dtDashboard: Date;
    categoriesList: Array<MoneyCategories>;
    
    etichetta: string;
    saldoPartenza: number;
    saldoPastMonth: number;
    entrate: number;
    totaleEntrate: number;
    entrateList: Array<MoneyEntrate>;
    
    totaleBudget: number;
    totaleSpese: number;
    totaleBilancio: number;
    
    saldo: number;
    stimaSaldo: number;
    bilancio: number;
    stimaBilancio: number;
}