import { 
  ChangeDetectorRef,
  Component,
  ViewChild, } from '@angular/core';
import { TsRadioFormatFn,TsRadioChange,
  TsRadioOption, } from '@terminus/ui-radio-group';
import { Observable, of } from 'rxjs';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  TsPaginatorComponent,
  TsPaginatorMenuItem,
} from '@terminus/ui-paginator';
import { TsStyleThemeTypes } from '@terminus/ui-utilities';

const DEMO_ITEMS: TsRadioOption[] = [
  {
    foo: 'foo_value',
    bar: 'Foo Display',
    bing: 'Some helper text for my item',
  },
  {
    foo: 'bar_value',
    bar: 'Bar Display',
    bing: 'Some helper text for my item',
    disabled: false,
  },
  {
    foo: 'baz_value',
    bar: 'Baz Display',
    bing: 'Some helper text for my item',
  },
];
// @ts-ignore - Optional demo data
const DEMO_ITEMS2: TsRadioOption[] = [
  {
    foo: 'foo2_value',
    bar: 'Foo2 Display',
  },
  {
    foo: 'bar2_value',
    bar: 'Bar2 Display',
    disabled: false,
  },
  {
    foo: 'baz2_value',
    bar: 'Baz2 Display',
  },
];

const SVG = `
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="20" viewBox="0 0 18 20">
    <g>
      <path d="M7.46970091,11.9872995 C7.44612039,12.3014722 7.32579216,12.5487959 7.10871261,12.7292781 C6.89163307,12.9097603 6.60555011,13 6.25045514,13 C5.86207002,13 5.55656809,12.8739986 5.33394018,12.621992 C5.11131228,12.3699854 5,12.0240664 5,11.5842246 L5,11.4057487 C5,11.1249986 5.05132155,10.8776749 5.15396619,10.6637701 C5.25661083,10.4498652 5.40329337,10.2857626 5.59401821,10.1714572 C5.78474304,10.0571518 6.0063273,10 6.25877763,10 C6.60832424,10 6.88989923,10.0902397 7.10351105,10.2707219 C7.31712287,10.4512041 7.44057201,10.7045438 7.47386216,11.0307487 L6.8496749,11.0307487 C6.83441692,10.8422451 6.77997446,10.7055485 6.6863459,10.6206551 C6.59271735,10.5357616 6.45019602,10.4933155 6.25877763,10.4933155 C6.05071418,10.4933155 5.89501568,10.5651731 5.7916775,10.7088904 C5.68833932,10.8526077 5.63528393,11.0755333 5.63250975,11.3776738 L5.63250975,11.598262 C5.63250975,11.9137716 5.68209747,12.1443843 5.78127438,12.290107 C5.8804513,12.4358296 6.03684332,12.5086898 6.25045514,12.5086898 C6.44326061,12.5086898 6.58716901,12.4662437 6.68218466,12.3813503 C6.7772003,12.2964568 6.83164276,12.1651078 6.84551365,11.9872995 L7.46970091,11.9872995 Z M9.45045514,12.1938503 C9.45045514,12.0802133 9.40884307,11.9929816 9.32561769,11.9321524 C9.24239231,11.8713232 9.09258885,11.8071527 8.87620286,11.739639 C8.65981687,11.6721253 8.48851385,11.6056153 8.36228869,11.540107 C8.01829043,11.3609617 7.84629389,11.1196539 7.84629389,10.8161765 C7.84629389,10.6584217 7.89241393,10.5177145 7.9846554,10.3940508 C8.07689686,10.2703871 8.20936194,10.1737971 8.38205462,10.1042781 C8.55474729,10.034759 8.74859017,10 8.96358908,10 C9.17997507,10 9.37277765,10.037767 9.5420026,10.1133021 C9.71122755,10.1888373 9.84265233,10.2954539 9.93628088,10.4331551 C10.0299094,10.5708563 10.076723,10.7272718 10.076723,10.9024064 L9.45253576,10.9024064 C9.45253576,10.7687159 9.40884309,10.6647731 9.32145644,10.5905749 C9.23406978,10.5163766 9.11131418,10.4792781 8.95318596,10.4792781 C8.80060608,10.4792781 8.68201169,10.5103607 8.59739922,10.5725267 C8.51278675,10.6346928 8.47048114,10.716577 8.47048114,10.8181818 C8.47048114,10.9131021 8.52006886,10.9926467 8.61924577,11.0568182 C8.71842269,11.1209896 8.86441169,11.1811495 9.05721717,11.2372995 C9.41231214,11.3402412 9.67100049,11.4679137 9.83328999,11.6203209 C9.99557949,11.772728 10.076723,11.9625657 10.076723,12.1898396 C10.076723,12.4425146 9.97754759,12.6407078 9.77919376,12.7844251 C9.58083992,12.9281424 9.31382915,13 8.97815345,13 C8.74512237,13 8.53290083,12.9588908 8.34148244,12.8766711 C8.15006406,12.7944515 8.00407506,12.6818189 7.90351105,12.5387701 C7.80294705,12.3957212 7.7526658,12.2299475 7.7526658,12.0414439 L8.37893368,12.0414439 C8.37893368,12.363638 8.5786716,12.5247326 8.97815345,12.5247326 C9.12657205,12.5247326 9.24239231,12.4956554 9.32561769,12.4375 C9.40884307,12.3793446 9.45045514,12.2981289 9.45045514,12.1938503 Z M11.6184655,12.2359626 L12.3050715,10.040107 L13,10.040107 L11.9451235,12.959893 L11.2938882,12.959893 L10.243173,10.040107 L10.9360208,10.040107 L11.6184655,12.2359626 Z"/>
      <path d="M17.8283348,8.05948524 L16.4139386,7.00105603 L16.3975689,5.03640507 L11.3130568,8.8817842e-16 L2.02011256,0.00256782286 C1.78715794,0.00262939714 1.59834305,0.194489319 1.59834305,0.431139237 L1.59823326,7.00852601 L0.167988073,8.1033753 C0.0622055689,8.18435154 0,8.31109474 0,8.44564924 L0,14.5695531 C0,14.7687403 0.15895171,14.9302134 0.355028581,14.9302134 L1.59823326,14.9302134 L1.59823326,19.5714286 C1.59823326,19.808122 1.78711505,20 2.02011255,20 L15.9756896,20 C16.2086872,20 16.3975689,19.808122 16.3975689,19.5714286 L16.3975689,14.9302134 L17.6398194,14.9302134 C17.8373115,14.9302134 17.9962633,14.7687403 17.9962633,14.5695531 L17.9962633,12.8325478 L17.9999998,8.40490977 C18.0001149,8.26858596 17.9363797,8.1403381 17.8283348,8.05948524 Z M15.3911799,5.03523789 L11.3066011,5.03056914 L11.3105206,0.997009781 L15.3911799,5.03523789 Z M10.5980941,0.724121831 L10.5937474,5.32285171 C10.5935194,5.55951244 10.7821662,5.75156447 11.0151315,5.75184214 L15.6853729,5.75749221 L15.6853729,8.19158514 L2.31089036,8.19158514 L2.31089036,0.724121831 L10.5980941,0.724121831 Z M15.6851424,19.278446 L2.31089036,19.278446 L2.31089036,14.9302134 L15.6851424,14.9302134 L15.6851424,19.278446 Z M17.2833756,14.2088929 L0.712657099,14.2088929 L0.712657099,8.91337261 L17.2833756,8.91337261 L17.2833756,14.2088929 Z"/>
    </g>
  </svg>
`;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  myTheme: TsStyleThemeTypes = 'primary';
  recordCount = 114;
  showSelector = true;
  currentPageIndex = 0;
  location = 'below';
  pages: number[] = [0, 1, 2, 3, 4, 5];
  zeroBased = true;
  simpleMode = false;
  currentPage = this.zeroBased ? 0 : 1;

  @ViewChild(TsPaginatorComponent, { static: true })
  paginator!: TsPaginatorComponent;


  title = 'design-tokens3';

  uiFormatter: TsRadioFormatFn = v => v.bar;
  uiSubFormatter: TsRadioFormatFn = v => v.bing;
  modelFormatter: TsRadioFormatFn = v => v.foo;

  items2$: Observable<TsRadioOption[]> = of([
    {
      foo: 'foo2_value',
      bar: 'Foo2 Display',
      /*
       *template: `<strong>Custom</strong> template!`,
       */
      template: SVG,
      // template: `<img src="https://d3vv6lp55qjaqc.cloudfront.net/items/20322G0V3H2j3n2M2o3l/nice%20laptop%3Ascreen%20elevation.png"> <a href="http://google.com">Links are cool</a>`,
    },
    {
      foo: 'bar2_value',
      bar: 'Bar2 Display',
      bing: 'Some helper text for my item',
      disabled: false,
    },
    {
      foo: 'baz2_value',
      bar: 'Baz2 Display Baz2 Display Baz2 Display',
      bing: 'Some helper text. Some helper text for my item. Some helper text. And even more text.',
    },
  ]);

  myForm: FormGroup = this.formBuilder.group({
    isSmall: false,
    isCentered: true,
    myRadioGroup: [
      null,
      [
        Validators.required,
      ],
    ],
    myRadioGroup2: [
      'bar2_value',
      [
        Validators.required,
      ],
    ],
  });

  constructor(
    private formBuilder: FormBuilder,
    private changeDetectorRef: ChangeDetectorRef,
  ){}

  selected(e: TsRadioChange): void {
    console.log('DEMO: radio changed: ', e);
  }

  log(v: any): void {
    console.log('DEMO: form submission: ', v);
  }

  updatePages(isZeroBased: boolean): void {
    Promise.resolve().then(() => {
      if (isZeroBased) {
        this.pages = Array.from(Array(this.paginator.pagesArray.length).keys());
      } else {
        // NOTE: Prepending the incrementer (++) will increment the value _before_ returning the value.
        this.pages = Array.from(Array(this.paginator.pagesArray.length).keys()).map(v => ++v);
      }
      this.changeDetectorRef.detectChanges();
    });
  }

  onPageSelect(e: TsPaginatorMenuItem): void {
    console.log('DEMO: page selected: ', e);
    
    if (e.value > this.currentPage) {
      this.currentPage = this.currentPage + 1;
    }
    console.log('current page index; ', this.currentPage);
  }


  perPageChange(e: number): void {
    console.log('DEMO: records per page changed: ', e);
  }
}
