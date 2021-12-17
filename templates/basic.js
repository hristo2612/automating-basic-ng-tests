module.exports = {
    main: `
    import { waitForAsync, TestBed } from '@angular/core/testing';
    $IMPORTS
    
    $COMPONENT_IMPORT
    
    describe('$COMPONENT_UNDER_TEST', () => {
      let componentUnderTest: $COMPONENT_UNDER_TEST;
      $VARIABLES
    
      describe('as unit', () => {
    
        beforeEach(waitForAsync(() => {
          TestBed.configureTestingModule({
            providers: [
              $COMPONENT_UNDER_TEST,
              $PROVIDERS
            ],
          }).compileComponents()
            .then(() => {
              $VARIABLES_ASSIGN
            });
        }));
    
        it('should create', () => {
          componentUnderTest = TestBed.get($COMPONENT_UNDER_TEST);
          expect(componentUnderTest).toBeTruthy();
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