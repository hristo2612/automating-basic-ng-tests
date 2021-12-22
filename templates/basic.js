module.exports = {
    main: `
    import { waitForAsync, TestBed, TestModuleMetadata, ComponentFixture } from '@angular/core/testing';
    import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
    $IMPORTS
    
    $COMPONENT_IMPORT

    const testBedConfiguration = (asComponent?: boolean): TestModuleMetadata => {
      return {
        declarations: asComponent ? [$COMPONENT_UNDER_TEST] : [],
        providers: [
          $COMPONENT_UNDER_TEST,
          $PROVIDERS
        ],
        schemas: asComponent ? [NO_ERRORS_SCHEMA] : []
      }
    }
    
    describe('$COMPONENT_UNDER_TEST', () => {
      let componentUnderTest: $COMPONENT_UNDER_TEST;
      $VARIABLES
    
      describe('as unit', () => {
    
        beforeEach(waitForAsync(() => {
          TestBed.configureTestingModule(testBedConfiguration())
            .compileComponents()
            .then(() => {
              $VARIABLES_ASSIGN
            });
        }));
    
        it('should create', () => {
          componentUnderTest = TestBed.inject($COMPONENT_UNDER_TEST);
          expect(componentUnderTest).toBeTruthy();
        });
      });

      describe('as component', () => {
        let fixture: ComponentFixture<$COMPONENT_UNDER_TEST>;
        let componentUnderTestDebugElement: DebugElement;
        let componentUnderTestElement: HTMLElement;
    
        function getElement(selector: string): any {
          return componentUnderTestElement.querySelector(selector);
        }

        beforeEach(waitForAsync(() => {
          TestBed.configureTestingModule(testBedConfiguration(true)).compileComponents()
            .then(() => {
              fixture = TestBed.createComponent($COMPONENT_UNDER_TEST);
              componentUnderTestDebugElement = fixture.debugElement;
              componentUnderTest = fixture.componentInstance;
              // componentUnderTest.widget = {};
              componentUnderTestElement = fixture.nativeElement;

              $VARIABLES_ASSIGN
            });
        }));

        it('should have DOM element', () => {
          fixture.detectChanges();
          expect(componentUnderTestElement).toBeTruthy();
        });
      });
    });`,
    provider: `
    {
       provide: $SERVICE_PROVIDER, 
       useValue: jasmine.createSpyObj('$SERVICE_PROVIDER', [
         $USED_METHODS
       ])
    },
    `,
    variable: `let $INSTANCE_NAME: any;`,
    variableAssign: `$INSTANCE_NAME = TestBed.inject($DEPENDENCY_NAME);`

}