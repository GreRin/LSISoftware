import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import { catchError, finalize, Subscription, tap, throwError } from "rxjs";
import {
  Rate
} from "../../../backend-bridge/controllers/exchange-rates/interface/exchange-rate-interface";
import { ExchangeRatesService } from "../../../backend-bridge/controllers/exchange-rates/service/exchange-rates.service";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {LiveAnnouncer} from "@angular/cdk/a11y";
import {MatSort, Sort} from "@angular/material/sort";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class TableComponent implements OnInit {
  public exchangeRatesDataList$: Subscription = new Subscription();
  public exchangeCurrentDayRatesDataList$: Subscription = new Subscription();
  public dataSource: MatTableDataSource<Rate>;
  public displayedColumns: string[] = ['symbol', 'currency', 'exchange'];

  @Input() resetFilters: boolean;
  @Input() currentDate: string;
  @Output() updateResetFilter = new EventEmitter<string>();

  @ViewChild(MatPaginator) paginator: MatPaginator | null;
  @ViewChild(MatSort) sort: MatSort;
  loading: boolean = false;

  constructor(
    private exchangeRatesService: ExchangeRatesService,
    public _liveAnnouncer: LiveAnnouncer,
  ) { }

  ngOnChanges($event: any): void {
    if ($event?.currentDate?.currentValue) {
      this.loadExchangeCurrentDateCourseData(this.currentDate);
    }
    if ($event?.resetFilters?.currentValue) {
      this.loadExchangeCourseData();
    }
  }

  ngOnInit(): void {
    this.loadExchangeCourseData();
  }

  ngOnDestroy() {
    this.exchangeRatesDataList$.unsubscribe();
    this.exchangeCurrentDayRatesDataList$.unsubscribe();
  }

  loadExchangeCourseData():void {
    this.loading = true;
    this.exchangeRatesDataList$ = this.exchangeRatesService.getExchangeRatesData().pipe(
      tap(data => {
        this.dataSource = new MatTableDataSource(data[0].rates);
      }),
      catchError(err => {
        return throwError(err)
      }),
      finalize(() => {
        this.loading = false;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })
    ).subscribe();
  }

  loadExchangeCurrentDateCourseData(date):void {
    this.exchangeCurrentDayRatesDataList$ = this.exchangeRatesService.getExchangeRatesFoExactData(date)
      .pipe(
        tap(data=> {
          this.dataSource = new MatTableDataSource(data[0].rates);
          console.log(this.dataSource)
        }),
        catchError(err => {
          return throwError(err)
        }),
        finalize(() => {
          this.loading = false;
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        })
      )
      .subscribe()
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction} ended`)
    } else {
      this._liveAnnouncer.announce(`Sorting cleared`)
    }
  }
}
