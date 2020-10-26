import {
    AfterContentInit,
    ChangeDetectionStrategy, ChangeDetectorRef,
    Component,
    ContentChild,
    ContentChildren, ElementRef,
    QueryList,
    ViewChild,
    ViewChildren,
  } from '@angular/core';
  import { TsCheckboxComponent } from '@terminus/ui-checkbox';
  import { TS_SPACING } from '@terminus/ui-spacing';
  import { untilComponentDestroyed } from '@terminus/fe-utilities';
  import { fromEvent, merge } from 'rxjs';
  import { map } from 'rxjs/operators';
  
  @Component({
    selector: 'app-checkbox-group',
    templateUrl: './checkbox-group.component.html',
    styleUrls: ['./checkbox-group.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
  })
  export class CheckboxGroupComponent implements AfterContentInit {
    public tsSpacings = TS_SPACING;
  
    @ContentChildren(TsCheckboxComponent)
    public checkboxes!: QueryList<TsCheckboxComponent>;
  
    set checked(checked: boolean) {
      this.host.nativeElement.checked = checked;
    }
  
    constructor(
      private changeDetectorRef: ChangeDetectorRef,
      private host: ElementRef<HTMLInputElement>,
    ) {
    }
  
    public ngAfterContentInit() {
      const checkChanges$ = fromEvent(this.host.nativeElement, 'change').pipe(
        map(e => (e.target as any).checked),
      );
  
      const topCheckbox = this.checkboxes.first;
      const bottomBoxes = this.checkboxes.toArray().slice(1);
  
  
      topCheckbox.inputChange.pipe(
        untilComponentDestroyed(this),
      ).subscribe(checked => {
        bottomBoxes.forEach(c => c.isChecked = checked.checked);
        this.changeDetectorRef.detectChanges();
      });
  
      const changes = bottomBoxes.map(c => c.inputChange);
  
      merge(...changes).pipe(
        untilComponentDestroyed(this),
      ).subscribe(c => {
        const every = bottomBoxes.every(b => b.isChecked);
        const some = bottomBoxes.some(b => b.isChecked);
  
        topCheckbox.isIndeterminate = !every && every !== some;
        topCheckbox.isChecked = every;
        
        this.changeDetectorRef.detectChanges();
      });
    }
  
  
    public ngOnDestroy() { }
  
  
  }
  