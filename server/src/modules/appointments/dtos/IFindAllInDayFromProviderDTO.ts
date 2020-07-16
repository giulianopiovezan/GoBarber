import Month from '@shared/types/MonthEnum';

export default interface IFindAllInMonthFromProviderDTO {
  provider_id: string;
  day: number;
  month: Month;
  year: number;
}
