import Month from '@shared/types/MonthEnum';

export default interface IFindAllInMonthFromProviderDTO {
  provider_id: string;
  month: Month;
  year: number;
}
