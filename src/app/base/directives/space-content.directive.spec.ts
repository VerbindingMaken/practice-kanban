import { MockBuilder, MockRender } from 'ng-mocks';

import { SpaceContentDirective } from './space-content.directive';

describe('SpaceContentDirective', () => {
	const width = 'simply-space-content__width';
	const small = 'simply-space-content__small';
	const regular = 'simply-space-content__regular';
	const large = 'simply-space-content__large';

	beforeEach(() => MockBuilder(SpaceContentDirective));

	it('should add width and regular class by default', () => {
		const directive = MockRender('<div simplySpaceContent></div>');
		const rendered = directive.nativeElement.innerHTML;

		expect(rendered).toContain(`class="${width} ${regular}"`);
	});

	it('should add width and small class when input is "small"', () => {
		const directive = MockRender('<div simplySpaceContent="small"></div>');
		const rendered = directive.nativeElement.innerHTML;

		expect(rendered).toContain(`class="${width} ${small}"`);
	});

	it('should add width and regular class when input is "regular"', () => {
		const directive = MockRender('<div simplySpaceContent="regular"></div>');
		const rendered = directive.nativeElement.innerHTML;

		expect(rendered).toContain(`class="${width} ${regular}"`);
	});

	it('should add width and large class when input is "large"', () => {
		const directive = MockRender('<div simplySpaceContent="large"></div>');
		const rendered = directive.nativeElement.innerHTML;

		expect(rendered).toContain(`class="${width} ${large}"`);
	});
});
